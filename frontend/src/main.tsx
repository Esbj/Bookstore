import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./CartContext.tsx";
import OrderProvider from "./OrderContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CartProvider>
            <OrderProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </OrderProvider>
        </CartProvider>
    </React.StrictMode>
);
