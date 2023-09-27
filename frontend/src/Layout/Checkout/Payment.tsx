import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../OrderContext";
import { PaymentMethod } from "../../data/OrderInterface";
import Button from "@mui/material/Button";
import "./CheckoutPages.scss";
import Typography from "@mui/material/Typography";

export default function Payment() {
  const { order, setPaymentMethod, shippingMethod } = useContext(OrderContext);
  const newOrder = order[order.length - 1];
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  useEffect(() => {
    if (order.length > 0 && payment?.paymentMethod.type && orderId) {
      navigate("/ordercompleted/" + orderId);
    }
  }, [order, payment, orderId, navigate]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!payment) {
      console.error("Please select a payment method");
      return;
    }

    const selectedPaymentMethod = payment.paymentMethod;

    setPaymentMethod([{ paymentMethod: selectedPaymentMethod }]);

    const orderWithMethods = {
      ...newOrder,
      shippingMethod: shippingMethod,
      paymentMethod: selectedPaymentMethod,
    };
    console.log(JSON.stringify(orderWithMethods, null, 2));

    const response = await fetch("http://localhost:3000/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderWithMethods),
    });

    if (!response.ok) {
      console.error("Failed to post order", response);
    } else {
      const responseData = await response.json();
      console.log("Order posted successfully", responseData);

      const orderId = responseData._id;
      console.log("the ID:" + orderId);

      setOrderId(orderId);
    }
  };
  function paymentInfoAdded() {
    if ((payment?.paymentMethod.details.cardNumber && payment?.paymentMethod.details.CVC && payment?.paymentMethod.details.name) || payment?.paymentMethod.details.phone)
      return true
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="paymentOptionContainer">
          <Typography variant="h4" className="heading">
            Select payment option
          </Typography>
          <div className="paymentOptionWrapper">
            <div
              className="paymentOption"
              onClick={() => {
                setPayment({
                  paymentMethod: {
                    type: "swish",
                    details: {
                      phone: newOrder.phoneNumber,
                    },
                  },
                });
              }}
            >
              <img
                className="paymentIcon"
                src="https://images.ctfassets.net/zrqoyh8r449h/5Kbx9XCa4oJjwgUP0RNDZY/176707fc098ba9c33a4cef9b039236f6/Swish_Logo_Primary_Light-BG_P3.png?w=600"
              />
              <input
                className="inputFieldPayment"
                type="radio"
                name="paymentMethod"
                value="swish"
                checked={payment?.paymentMethod.type === "swish"}
                onChange={() => {
                  setPayment({
                    paymentMethod: {
                      type: "swish",
                      details: {
                        phone: newOrder.phoneNumber,
                      },
                    },
                  });
                }}
              />
            </div>

            <div
              className="paymentOption"
              onClick={() => {
                setPayment({
                  paymentMethod: {
                    type: "card",
                    details: {
                      name: "",
                      cardNumber: "",
                      CVC: "",
                      phone: "",
                    },
                  },
                });
              }}
            >
              <img
                className="paymentIcon"
                src="https://cdn.icon-icons.com/icons2/38/PNG/512/creditcard_payment_4578.png"
              />
              <input
                className="inputFieldPayment"
                type="radio"
                name="paymentMethod"
                value="card"
                checked={payment?.paymentMethod.type === "card"}
                onChange={() => {
                  setPayment({
                    paymentMethod: {
                      type: "card",
                      details: {
                        name: "",
                        cardNumber: "",
                        CVC: "",
                        phone: "",
                      },
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="paymentDetailsContainer">
            {payment?.paymentMethod.type === "swish" && (
              <div className="paymentDetails">
                <input
                  required
                  className="inputFieldPayment"
                  type="text"
                  value={newOrder.phoneNumber}
                  placeholder="Phone number"
                  onChange={(e) => {
                    const newPhoneNumber = e.target.value;
                    setPayment((prevState) => ({
                      paymentMethod: {
                        type: "swish",
                        details: {
                          ...prevState?.paymentMethod.details,
                          phone: newPhoneNumber,
                        },
                      },
                    }));
                  }}
                />
              </div>
            )}

            {payment?.paymentMethod.type === "card" && (
              <div className="paymentDetails">
                <input
                  required
                  className="inputFieldPayment"
                  type="text"
                  name="name"
                  placeholder="Name on card"
                  onChange={(e) => {
                    const newName = e.target.value;
                    setPayment((prevState) => ({
                      paymentMethod: {
                        type: "card",
                        details: {
                          ...prevState?.paymentMethod.details,
                          name: newName,
                        },
                      },
                    }));
                  }}
                />
                <input
                  required
                  className="inputFieldPayment"
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  onChange={(e) => {
                    const newCardNumber = e.target.value;
                    setPayment((prevState) => ({
                      paymentMethod: {
                        type: "card",
                        details: {
                          ...prevState?.paymentMethod.details,
                          cardNumber: newCardNumber,
                        },
                      },
                    }));
                  }}
                />
                <input
                  required
                  className="inputFieldPayment"
                  type="text"
                  name="CVC"
                  placeholder="CVC"
                  onChange={(e) => {
                    const newCVC = e.target.value;
                    setPayment((prevState) => ({
                      paymentMethod: {
                        type: "card",
                        details: {
                          ...prevState?.paymentMethod.details,
                          CVC: newCVC,
                        },
                      },
                    }));
                  }}
                />
              </div>
            )}
            {paymentInfoAdded() &&
              <>
                <div className="total">
                  <Typography variant="h4" className="heading">
                    Your Total
                  </Typography>
                  <Typography
                    sx={{
                      paddingBottom: "2rem",
                    }}
                    variant="h4"
                  >
                    {newOrder?.totalPriceWithShipping}$
                  </Typography>
                </div>
                <Button className="checkout-btn" variant="contained" type="submit">
                  Complete your order
                </Button>
              </>
            }

          </div>
        </div>
      </form>
    </>
  );
}
