import { useContext } from "react";
import { OrderContext } from "../OrderContext";

export default function Payment() {
    const { order } = useContext(OrderContext);

    const newOrder = order[order.length - 1];
    console.log(newOrder);

    return (
        <>
            <h4>Your Total</h4>
            <div>{newOrder?.totalPriceWithShipping}</div>
        </>
    );
}
