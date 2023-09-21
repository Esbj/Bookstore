import { Book } from "./BookInterface";

export interface Order {
    firstName: string;
    lastName: string;
    address: { zip: string; streetAddress: string; city: string };
    phoneNumber: string;
    email: string;
    books: Book[];
    totalPriceWithShipping: number;
    status?: string;
}

export interface ShippingMethod {
    shippingMethod: {
        [Method: string]: {
            cost: number;
            shippingTime: number;
            expectedDelivery: string;
        };
    };
}
export interface PaymentMethod {
    paymentMethod: {
        swish: { phone: string };
        card: { name: string; cardNumber: string; CVC: string; phone: string };
    };
}
