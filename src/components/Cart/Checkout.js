import React from "react";
import classes from './Checkout.module.css'
import useInput from "../../hooks/use-input";

const isEmpty = (input) => input.trim() !== '';
const isNotFiveChar = (input) => input.trim().length === 5;

const Checkout = props => {
    const {
        valueInput: nameInput,
        inputIsValid: nameIsValid,
        inputClasses: nameInputClasses,
        isTouched: nameIsTouched,
        inputChangeHandler: nameChangeHandler,
        blurChangeHandler: nameBlurHandler,
        resetStates: nameResetHandler,
    } = useInput(isEmpty);

    const {
        valueInput: streetInput,
        inputIsValid: streetIsValid,
        inputClasses: streetInputClasses,
        isTouched: streetIsTouched,
        inputChangeHandler: streetChangeHandler,
        blurChangeHandler: streetBlurHandler,
        resetStates: streetResetHandler,
    } = useInput(isEmpty);

    const {
        valueInput: postalInput,
        inputIsValid: postalIsValid,
        inputClasses: postalInputClasses,
        isTouched: postalIsTouched,
        inputChangeHandler: postalChangeHandler,
        blurChangeHandler: postalBlurHandler,
        resetStates: postalResetHandler,
    } = useInput(isNotFiveChar);

    const {
        valueInput: cityInput,
        inputIsValid: cityIsValid,
        inputClasses: cityInputClasses,
        isTouched: cityIsTouched,
        inputChangeHandler: cityChangeHandler,
        blurChangeHandler: cityBlurHandler,
        resetStates: cityResetHandler,
    } = useInput(isEmpty);

    let formIsValid = false;

    if (nameIsValid && postalIsValid && streetIsValid && cityIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
           name: nameInput,
           city: cityInput,
           street: streetInput,
           postalCode: postalInput,
        });

        cityResetHandler();
        nameResetHandler();
        streetResetHandler();
        postalResetHandler();
    }
    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your name</label>
                <input
                    spellCheck={"false"}
                    autoComplete={"off"}
                    type="text"
                    id={"name"}
                    value={nameInput}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {!nameIsValid && nameIsTouched && <p>Please enter a valid name.</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input
                    autoComplete={"off"}
                    spellCheck={"false"}
                    type="text"
                    id={"street"}
                    value={streetInput}
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                />
                {!streetIsValid && streetIsTouched && <p>Please enter a valid street.</p>}
            </div>
            <div className={postalInputClasses}>
                <label htmlFor="postal">Postal code</label>
                <input
                    autoComplete={"off"}
                    spellCheck={"false"}
                    type="text"
                    id={"postal"}
                    value={postalInput}
                    onChange={postalChangeHandler}
                    onBlur={postalBlurHandler}
                />
                {!postalIsValid && postalIsTouched && <p>Please enter a valid postal code(5 char long).</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input
                    autoComplete={"off"}
                    spellCheck={"false"}
                    type="text"
                    id={"city"}
                    value={cityInput}
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                />
                {!cityIsValid && cityIsTouched && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel} type={'button'}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;