import { CartContext } from "contexts/CartContext";
import React, { useContext, useEffect, useState } from "react";

import "./addToCart.css";

export const AddToCartButton = (props: {
    artPiece: IArtPieceResponse;
    quantity?: number;
    size?: string;
}) => {
    const { artPiece, quantity, size } = props;
    const { cartItems, setCartItems } = useContext(CartContext);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        if (cartItems) {
            const found = cartItems.find((item) => item.id === artPiece._id);
            if (found) {
                setInCart(true);
            } else {
                setInCart(false);
            }
        }
    }, [artPiece._id, cartItems]);

    const handleAddToCart = () => {
        const selectedSize = artPiece.otherSizes?.find(
            (s) => s.id === size
        );
        const newItem: ICartItem = {
            id: artPiece._id,
            title: artPiece.title,
            image: artPiece.image,
            width: selectedSize ? selectedSize.width : artPiece.width,
            height: selectedSize ? selectedSize.height : artPiece.height,
            price: selectedSize ? selectedSize.price : artPiece.price,
            quantity: quantity ?? 1,
            selectedSizeId: size
        };
        const cartItems = localStorage.getItem("cartItems");

        if (cartItems) {
            const existingItems = JSON.parse(cartItems) as ICartItem[];
            existingItems.push(newItem);
            localStorage.setItem("cartItems", JSON.stringify(existingItems));
            setCartItems?.(existingItems);
            setInCart(true);
        } else {
            const items = JSON.stringify([newItem]);
            localStorage.setItem("cartItems", items);
            setCartItems?.([newItem]);
            setInCart(true);
        }
    };

    const removeFromCart = () => {
        const cartItems = localStorage.getItem("cartItems");

        if (cartItems) {
            const existingItems = JSON.parse(cartItems) as ICartItem[];
            const update = existingItems.filter(
                (item) => item.id !== artPiece._id
            );
            localStorage.setItem("cartItems", JSON.stringify(update));
            setCartItems?.(update);
            setInCart(false);
        }
    };

    return (
        <div
            className="add-to-cart"
            onClick={() => (inCart ? removeFromCart() : handleAddToCart())}
        >
            {inCart ? "Remove From Cart" : "Add To Cart"}
        </div>
    );
};
