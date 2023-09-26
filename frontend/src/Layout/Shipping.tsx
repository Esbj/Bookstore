import { useState, useContext, useEffect } from "react";
import { Book } from "../data/BookInterface";
import { CartContext } from "../CartContext";
import { Order, ShippingMethod } from "../data/OrderInterface";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../OrderContext";
import "../Layout/Checkout/CheckoutPages.scss";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";

export default function Shipping() {
  const { cart, totalPrice } = useContext(CartContext);
  const { order, setOrder, shippingMethod, setShippingMethod } =
    useContext(OrderContext);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState({
    zip: "",
    streetAddress: "",
    city: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPriceWithShipping, setTotalPriceWithShipping] = useState(
    totalPrice()
  );
  const [shipping, setShipping] = useState<{
    [Method: string]: {
      cost: number;
      shippingTime: number;
      expectedDelivery: string;
    };
  }>({});

  useEffect(() => {
    setBooks(cart);
  }, [cart]);

  useEffect(() => {
    let shippingCost = 0;
    if (shipping["Method1"]) {
      shippingCost = shipping["Method1"].cost;
    } else if (shipping["Method2"]) {
      shippingCost = shipping["Method2"].cost;
    } else if (shipping["Method3"]) {
      shippingCost = shipping["Method3"].cost;
    }
    let total = 0;
    cart.forEach((book) => {
      const subtotal = book.price * book.quantity;
      total += subtotal;
    });
    setTotalPriceWithShipping(total + shippingCost);
  }, [cart, shipping]);

  useEffect(() => {
    if (order.length > 0 && shippingMethod.length > 0) {
      navigate("/payment");
    }
  }, [order, shippingMethod, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newOrder: Order = {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      books,
      totalPriceWithShipping,
    };

    const selectedShippingMethod: ShippingMethod = {
      shippingMethod: {
        ...shipping,
        expectedDelivery: shipping.expectedDelivery,
      },
    };

    setOrder([...order, newOrder]);
    setShippingMethod([...shippingMethod, selectedShippingMethod]);
  };
  return (
    <CssBaseline>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="formContainer">
            <Typography variant="h4" className="heading">
              Delivery Address
            </Typography>
            <input
              required
              className="inputField"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="Street Address"
              value={address.streetAddress}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  streetAddress: e.target.value,
                }))
              }
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="Postal Code"
              value={address.zip}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  zip: e.target.value,
                }))
              }
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
            <input
              required
              className="inputField"
              type="text"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <hr />
            <div className="deliveryOptionContainer">
              <Typography variant="h4" className="heading">
                Delivery Options
              </Typography>

              <label className="deliveryOption">
                <FormControl component="fieldset">
                  <RadioGroup
                    name="deliveryOption"
                    value={Object.keys(shipping)[0] || ""}
                    onChange={(e) => {
                      const shippingTime = 4;
                      const currentDate = new Date();
                      const expectedDelivery = new Date(
                        currentDate.setDate(
                          currentDate.getDate() + shippingTime
                        )
                      );
                      setShipping({
                        [e.target.value]: {
                          cost: 3,
                          shippingTime,
                          expectedDelivery: expectedDelivery.toLocaleString(),
                        },
                      });
                    }}
                  >
                    <FormControlLabel
                      value="Method1"
                      control={<Radio />}
                      label=""
                    />
                  </RadioGroup>
                </FormControl>
                <div className="deliveryText">
                  <h3>Delivery to parcel locker</h3>
                  <p>Shipping time: {shipping["Method1"]?.shippingTime} days</p>
                  <p>
                    Expected delivery: {shipping["Method1"]?.expectedDelivery}
                  </p>
                </div>
                <div className="deliveryCost">
                  <h3>3$</h3>
                  <img
                    className="deliveryIcon"
                    src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5dee1c1af8ee0e0001ad5cad/0x0.png"
                    alt="Delivery Company"
                  />
                </div>
              </label>
              <hr />

              <label className="deliveryOption">
                <FormControl component="fieldset">
                  <RadioGroup
                    name="deliveryOption"
                    value={Object.keys(shipping)[0] || ""}
                    onChange={(e) => {
                      const shippingTime = 2;
                      const currentDate = new Date();
                      const expectedDelivery = new Date(
                        currentDate.setDate(
                          currentDate.getDate() + shippingTime
                        )
                      );
                      setShipping({
                        [e.target.value]: {
                          cost: 6,
                          shippingTime,
                          expectedDelivery: expectedDelivery.toLocaleString(),
                        },
                      });
                    }}
                  >
                    <FormControlLabel
                      value="Method2"
                      control={<Radio />}
                      label=""
                    />
                  </RadioGroup>
                </FormControl>
                <div className="deliveryText">
                  <h3>Delivery to home address</h3>
                  <p>Shipping time: {shipping["Method2"]?.shippingTime} days</p>
                  <p>
                    Expected delivery: {shipping["Method2"]?.expectedDelivery}
                  </p>
                </div>
                <div className="deliveryCost">
                  <h3>6$</h3>
                  <img
                    className="deliveryIcon"
                    src="https://logo.clearbit.com/airmee.com?size=100"
                    alt="Delivery Company"
                  />
                </div>
              </label>
              <hr />
              <label className="deliveryOption">
                <FormControl component="fieldset">
                  <RadioGroup
                    name="deliveryOption"
                    value={Object.keys(shipping)[0] || ""}
                    onChange={(e) => {
                      const shippingTime = 1;
                      const currentDate = new Date();
                      const expectedDelivery = new Date(
                        currentDate.setDate(
                          currentDate.getDate() + shippingTime
                        )
                      );
                      setShipping({
                        [e.target.value]: {
                          cost: 9,
                          shippingTime,
                          expectedDelivery: expectedDelivery.toLocaleString(),
                        },
                      });
                    }}
                  >
                    <FormControlLabel
                      value="Method3"
                      control={<Radio />}
                      label=""
                    />
                  </RadioGroup>
                </FormControl>
                <div className="deliveryText">
                  <h3>Delivery to office address</h3>
                  <p>Shipping time: {shipping["Method3"]?.shippingTime} day</p>
                  <p>
                    Expected delivery: {shipping["Method3"]?.expectedDelivery}
                  </p>
                </div>
                <div className="deliveryCost">
                  <h3>9$</h3>
                  <img
                    className="deliveryIcon"
                    src="https://banner2.cleanpng.com/20180803/wwb/kisspng-logo-deutsche-bahn-db-cargo-db-schenker-rail-db-ko-our-partners-5b64b648588982.7212028215333269203627.jpg"
                    alt=""
                  />
                </div>
              </label>
            </div>
            <hr />
            <div>
              <hr />
              <p>Subtotal: {totalPrice()}</p>
              <p>
                Shipping:{" "}
                {Object.values(shipping)[0]?.cost || "No delivery selected"}
              </p>

              {Object.values(shipping).length > 0 ? (
                <p>
                  Total:{" "}
                  {totalPrice() + (Object.values(shipping)[0]?.cost || 0)}
                </p>
              ) : null}
            </div>

            <Button
              variant="contained"
              type="submit"
              sx={{
                margin: "2rem",
              }}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </form>
    </CssBaseline>
  );
}
