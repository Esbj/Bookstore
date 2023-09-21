import { useContext, useState } from "react";
import { OrderContext } from "../OrderContext";
import { PaymentMethod } from "../data/OrderInterface";

export default function Payment() {
    const { order, setPaymentMethod, shippingMethod } =
        useContext(OrderContext);
    const newOrder = order[order.length - 1];

    const [payment, setPayment] = useState<PaymentMethod>({
        paymentMethod: {
            swish: { phone: "" },
            card: { name: "", cardNumber: "", CVC: "", phone: "" },
        },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const selectedPaymentMethod: PaymentMethod = payment;
        setPaymentMethod([selectedPaymentMethod]);
        console.log("shippingMethod:", shippingMethod);
        const orderWithMethods = {
            ...newOrder,
            shippingMethod: shippingMethod,
            // paymentMethod: selectedPaymentMethod,
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
        }
    };

    return (
        <>
            <h4>Your Total</h4>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <div>{newOrder?.totalPriceWithShipping}</div>
                <form onSubmit={handleSubmit}>
                    <h4>Select payment option</h4>
                    <div style={{ flexBasis: "1" }}>
                        <img
                            style={{ width: "5rem" }}
                            src="https://images.ctfassets.net/zrqoyh8r449h/5Kbx9XCa4oJjwgUP0RNDZY/176707fc098ba9c33a4cef9b039236f6/Swish_Logo_Primary_Light-BG_P3.png?w=600"
                        />
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="swish"
                            checked={
                                payment.paymentMethod &&
                                payment.paymentMethod.swish !== undefined
                            }
                            onChange={(e) =>
                                setPayment((prevState) => ({
                                    ...prevState,
                                    swish: { phone: newOrder.phoneNumber },
                                }))
                            }
                        />
                    </div>
                    <div style={{ flexBasis: "1" }}>
                        <img
                            style={{ width: "5rem" }}
                            src="https://cdn.icon-icons.com/icons2/38/PNG/512/creditcard_payment_4578.png"
                        />
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={
                                payment.paymentMethod &&
                                payment.paymentMethod.card !== undefined
                            }
                            onChange={(e) => setPayment(e.target.value)}
                        />

                        {payment &&
                            payment.paymentMethod.card !== undefined && (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name on card"
                                    />
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="Card number"
                                    />
                                    <input
                                        type="text"
                                        name="CVC"
                                        placeholder="CVC"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone number"
                                    />
                                </>
                            )}
                    </div>
                    <button type="submit">Complete your order</button>
                </form>
            </div>
        </>
    );
}
