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
    _id: number;

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
    type: "swish" | "card";
    details: {
      phone?: string;
      name?: string;
      cardNumber?: string;
      CVC?: string;
    };
  };
}
