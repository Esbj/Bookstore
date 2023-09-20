import { ReactNode, createContext, useState } from "react";
import { Order } from "./data/OrderInterface";

interface ContextValue {

    order: Order[];
    setOrder: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderContext = createContext<ContextValue>({ 
    order: [],
    setOrder: () => {},
})
interface Props {
    children: ReactNode;
}

export default function OrderProvider({ children }: Props) {
    const [order, setOrder] = useState<Order[]>([]);

    return (
        <OrderContext.Provider
            value={{
                order,
                setOrder, 
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}