import { ReactNode, createContext, useState } from "react";
import { Order, ShippingMethod, PaymentMethod } from "./data/OrderInterface";

interface ContextValue {
    order: Order[];
    setOrder: React.Dispatch<React.SetStateAction<Order[]>>;
    shippingMethod: ShippingMethod[];
    setShippingMethod: React.Dispatch<React.SetStateAction<ShippingMethod[]>>;
    paymentMethod: PaymentMethod[];
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
}

export const OrderContext = createContext<ContextValue>({
    order: [],
    setOrder: () => {},
    shippingMethod: [],
    setShippingMethod: () => {},
    paymentMethod: [],
    setPaymentMethod: () => {},
});
interface Props {
    children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
    const [order, setOrder] = useState<Order[]>([]);
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);

    return (
        <OrderContext.Provider
            value={{
                order,
                setOrder,
                shippingMethod,
                setShippingMethod,
                paymentMethod,
                setPaymentMethod,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
