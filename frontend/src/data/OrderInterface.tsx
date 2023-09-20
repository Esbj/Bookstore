import { Book } from "./BookInterface";

export interface Order {
    firstName: string;
    lastName: string;
    address: { zip: string; streetAddress: string; city: string };
    phoneNumber: string;
    email: string;
    books: Book[];
    totalPriceWithShipping: number;
    shippingMethod: {
        [Method: string]: {
            cost: number;
            shippingTime: number;
            expectedDelivery: Date;
        };
    };
    paymentMethod?: { [Method: string]: string };
    status?: string;
}
