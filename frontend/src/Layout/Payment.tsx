import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../OrderContext";
import { PaymentMethod } from "../data/OrderInterface";
import Button from "@mui/material/Button";
import "../Layout/Checkout/CheckoutPages.scss";

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="paymentOptionContainer">
            <h2 className="heading">Select payment option</h2>
            <div className="paymentOption">
              <img
                style={{ width: "5rem" }}
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
            {payment?.paymentMethod.type === "swish" && (
              <div className="paymentDetails">
                <input
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

            <div className="paymentOption">
              <img
                style={{ width: "5rem" }}
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

            {payment?.paymentMethod.type === "card" && (
              <div className="paymentDetails">
                <input
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
                <input
                  className="inputFieldPayment"
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  onChange={(e) => {
                    const newPhoneNumber = e.target.value;
                    setPayment((prevState) => ({
                      paymentMethod: {
                        type: "card",
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
            <div className="total">
              <h2 className="heading">Your Total</h2>
              <h2>{newOrder?.totalPriceWithShipping}$</h2>
            </div>
            <Button variant="contained" type="submit">
              Complete your order
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
