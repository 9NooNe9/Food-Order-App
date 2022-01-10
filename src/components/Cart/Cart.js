import React, {useContext, useState} from 'react'
import Modal from "../UI/Modal";
import classes from './Cart.module.css';
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    }

    const submitOrderHandler = async (userInfos) => {
        setIsSubmitting(true);
        const response = await fetch(
            "https://react-demo-food-app-default-rtdb.asia-southeast1.firebasedatabase.app/orderList.json",
            {
                method: "POST",
                body: JSON.stringify({
                    userInfo: userInfos,
                    orderedItems: cartCtx.items,
                })
            });

        if (!response.ok) {
            throw new Error("We have a problem submitting your order please try again... :(");
        }

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => (
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}/>
    ))}</ul>

    const actionButtons = (
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckOut && actionButtons}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Finishing your order please wait ... :)</p>

    const submittedModalContent = (
        <React.Fragment>
            <p className={classes.success}>Your order is on the way thanks for your choice.</p>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes.button}>Close</button>
            </div>
        </React.Fragment>
    )

    return (
        <Modal onclick={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {!isSubmitting && didSubmit && submittedModalContent}
        </Modal>
    );
};

export default Cart;