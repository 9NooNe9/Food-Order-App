import React from "react";
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

const BackDrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}/>
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays')

const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onClick={props.onclick}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
};

export default Modal;