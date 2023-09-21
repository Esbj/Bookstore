import { useState, useContext, useEffect } from "react";
import { Book } from "../data/BookInterface";
import { CartContext } from "../CartContext";
import { Order } from "../data/OrderInterface";

export default function Shipping() {
    const { cart, totalPrice } = useContext(CartContext);

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

    const [shippingMethod, setShippingMethod] = useState<{
        [key: string]: number;
    }>({});

    useEffect(() => {
        setBooks(cart);
    }, [cart]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newOrder: Order = {
            firstName,
            lastName,
            address,
            phoneNumber,
            email,
            books,
            totalPrice: totalPrice(),
            shippingMethod: shippingMethod,
        };
        console.log(newOrder);
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
                        checked={shippingMethod["Method1"] !== undefined}
                        onChange={(e) =>
                            setShippingMethod({ [e.target.value]: 3 })
                        }
                    />
                    <p>Delivery to parcel locker</p>
                    <p>3$</p>
                    <hr />
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Method2"
                        checked={shippingMethod["Method2"] !== undefined}
                        onChange={(e) =>
                            setShippingMethod({ [e.target.value]: 6 })
                        }
                    />
                    <p>Delivery to home address</p>
                    <p>6$</p>
                    <hr />
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Method3"
                        checked={shippingMethod["Method3"] !== undefined}
                        onChange={(e) =>
                            setShippingMethod({ [e.target.value]: 9 })
                        }
                    />
                    <p>Delivery to office address</p>
                    <p>9$</p>
                    <hr />
                    

                    <button type="submit">Payment</button>
                </form>
            </div>
        </div>
    );
}
