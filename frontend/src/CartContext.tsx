import { ReactNode, createContext, useState } from "react";
import { Book, CartProduct } from "./data/book";

interface ContextValue {
    cart: CartProduct[];
    addToCart: (book: Book) => void;
    decreaseQuantity: (book: Book) => void;
    increaseQuantity: (book: Book) => void;
    toggleCart: () => void;
    isCartOpen: boolean;
}

export const CartContext = createContext<ContextValue>({
    cart: [],
    addToCart: () => {},
    decreaseQuantity: () => {},
    increaseQuantity: () => {},
    toggleCart: () => {},
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
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
