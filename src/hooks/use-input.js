import {useState} from "react";
import classes from '../components/Cart/Checkout.module.css'

const useInput = (validateFn) => {
    const [valueInput, setValueInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const inputIsValid = isTouched && validateFn(valueInput);
    let inputClasses = classes.control
    if (isTouched) {
        inputClasses = `${classes.control} ${!inputIsValid ? classes.invalid : ""}`
    }

    const inputChangeHandler = (event) => {
        setValueInput(event.target.value);
    }

    const blurChangeHandler = () => {
        setIsTouched(true);
    }

    const resetStates = () => {
        setValueInput("");
        setIsTouched(false);
    }

    return {
        valueInput,
        inputIsValid,
        inputClasses,
        isTouched,
        inputChangeHandler,
        blurChangeHandler,
        resetStates,
    }
}

export default useInput;