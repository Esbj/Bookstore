import { Book } from "./book";

export interface order {
    firstName: string,
    lastName: string,
    address: { zip: string, streetAddress: string, city: string },
    phoneNumber: string,
    email: string,
    books: [Book],
    totalPrice: number,
    shippingMethod: string,
    paymentMethod: string,
    status: string,
}
