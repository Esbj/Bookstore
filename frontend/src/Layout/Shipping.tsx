import { useState, useContext, useEffect } from "react";
import { Book } from "../data/BookInterface";
import { CartContext } from "../CartContext";
import { Order, ShippingMethod } from "../data/OrderInterface";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../OrderContext";

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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "20rem",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <div>
                <h4>Delivery Address</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
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
                        type="text"
                        placeholder="Phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <h4>Delivery Options</h4>

                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Method1"
                        checked={shipping["Method1"] !== undefined}
                        onChange={(e) => {
                            const shippingTime = 5; 
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
                    />
                    <p>Delivery to parcel locker</p>
                    <p>3$</p>
                    <p>
                        Shipping time: {shipping["Method1"]?.shippingTime} days
                    </p>
                    <p>
                        Expected delivery:{" "}
                        {shipping[
                            "Method1"
                        ]?.expectedDelivery}
                    </p>
                    <hr />
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Method2"
                        checked={shipping["Method2"] !== undefined}
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
                    />
                    <p>Delivery to home address</p>
                    <p>6$</p>
                    <p>
                        Shipping time: {shipping["Method2"]?.shippingTime} days
                    </p>
                    <p>
                        Expected delivery:{" "}
                        {shipping[
                            "Method2"
                        ]?.expectedDelivery}
                    </p>
                    <hr />
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Method3"
                        checked={shipping["Method3"] !== undefined}
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
                                    expectedDelivery:expectedDelivery.toLocaleString(),
                                },
                            });
                        }}
                    />
                    <p>Delivery to office address</p>
                    <p>9$</p>
                    <p>
                        Shipping time: {shipping["Method3"]?.shippingTime} days
                    </p>
                    <p>
                        Expected delivery:{" "}
                        {shipping[
                            "Method3"
                        ]?.expectedDelivery}
                    </p>
                    <hr />
                    <div>
                        <p>Subtotal: {totalPrice()}</p>
                        <p>
                            Shipping:{" "}
                            {Object.values(shipping)[0]?.cost ||
                                "No delivery selected"}
                        </p>

                        {Object.values(shipping).length > 0 ? (
                            <p>
                                Total:{" "}
                                {totalPrice() +
                                    (Object.values(shipping)[0]?.cost || 0)}
                            </p>
                        ) : null}
                    </div>
                    <button type="submit">Payment</button>
                </form>
            </div>
        </div>
    );
}
