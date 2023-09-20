import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../OrderContext";
import { PaymentMethod } from "../data/OrderInterface";

export default function Payment() {
    const { order, paymentMethod, setPaymentMethod } = useContext(OrderContext);
    const newOrder = order[order.length - 1];

    const [payment, setPayment] = useState<{
        swish?: { phone: string };
        card?: {
            name: string;
            cardNumber: string;
            CVC: string;
            phone: string;
        };
    }>({});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const selectedPaymentMethod: PaymentMethod = payment;
        setPaymentMethod(selectedPaymentMethod);

    };

    return (
        <>
            <h4>Your Total</h4>
            <div>{newOrder?.totalPriceWithShipping}</div>
            <form onSubmit={handleSubmit}>
                <h4>Select payment option</h4>

                <input
                    type="radio"
                    name="paymentMethod"
                    value="swish"
                    checked={payment && payment.swish !== undefined}
                    onChange={(e) => setPayment(newOrder.phoneNumber)}
                />
                
                <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={payment && payment.card !== undefined}
                    onChange={(e) => setPayment(e.target.value)}
                />

                {payment && payment.card !== undefined && (
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
                        <input type="text" name="CVC" placeholder="CVC" />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone number"
                        />
                    </>
                )}
                <button type="submit">Complete your order</button>
            </form>
        </>
    );
}
