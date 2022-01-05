import React, {useContext, useEffect, useState} from "react";
import classes from "./HeaderCartButton.module.css"
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [buttonAnimationActivate, setButtonAnimationActivate] = useState(false)

    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((current, item) => {
        return current + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${buttonAnimationActivate ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonAnimationActivate(true);
        const timer = setTimeout(() => {
            setButtonAnimationActivate(false)
        }, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;