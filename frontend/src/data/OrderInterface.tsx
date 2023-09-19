import { Book } from "./BookInterface";

export interface Order {
    firstName: string;
    lastName: string;
    address: { zip: string; streetAddress: string; city: string };
    phoneNumber: string;
    email: string;
    books: Book[];
    totalPrice: number;
    shippingMethod: { [key: string]: number };
    paymentMethod?: { [key: string]: string };
    status?: string;
}
