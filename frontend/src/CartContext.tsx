import { ReactNode, createContext, useState } from "react";
import { Book, CartProduct } from "./data/BookInterface";

interface ContextValue {
    cart: CartProduct[];
    addToCart: (book: Book) => void;
    decreaseQuantity: (book: Book) => void;
    increaseQuantity: (book: Book) => void;
    toggleCart: () => void;
    totalPrice: () => number;
    isCartOpen: boolean;
}

export const CartContext = createContext<ContextValue>({
    cart: [],
    addToCart: () => {},
    decreaseQuantity: () => {},
    increaseQuantity: () => {},
    toggleCart: () => {},
    totalPrice: () => 0,
    isCartOpen: false,
});

interface Props {
    children: ReactNode;
}

export default function CartProvider({ children }: Props) {
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const totalPrice = () => {
        let total = 0;
        cart.forEach((book) => {
            const subtotal = book.price * book.quantity;
            total += subtotal;
        });
        return total;
    };

    const addToCart = (book: Book) => {
        console.log("test");

        const productInCart = cart.find(
            (cartProduct) => cartProduct._id === book._id
        );
        if (productInCart) {
            const updatedCart = cart.map((cartProduct) => {
                if (cartProduct._id === book._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1,
                    };
                } else {
                    return cartProduct;
                }
            });
            setCart(updatedCart);
        } else {
            const updatedCart = [...cart, { ...book, quantity: 1 }];
            setCart(updatedCart);
            console.log(updatedCart);
        }
    };

    const decreaseQuantity = (bookToRemove: Book) => {
        setCart((prevState) => {
            const productExists = prevState.find(
                (book: Book) => book._id === bookToRemove._id
            );
            if (productExists && productExists.quantity > 1) {
                return prevState.map((book) =>
                    book._id === bookToRemove._id
                        ? { ...book, quantity: book.quantity - 1 }
                        : book
                );
            } else {
                return prevState.filter(
                    (book: Book) => book._id !== bookToRemove._id
                );
            }
        });
    };
    const increaseQuantity = (bookToIncreaseCount: Book) => {
        setCart((prevState) => {
            const productExists = prevState.find(
                (book: Book) => book._id === bookToIncreaseCount._id
            );
            if (productExists) {
                return prevState.map((book) =>
                    book._id === bookToIncreaseCount._id
                        ? { ...book, quantity: book.quantity + 1 }
                        : book
                );
            } else {
                return [...prevState, { ...bookToIncreaseCount, quantity: 1 }];
            }
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                increaseQuantity,
                isCartOpen,
                totalPrice,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
