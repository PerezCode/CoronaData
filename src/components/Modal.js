import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

const Modal = (props) => {
  if(props.isOpen){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="Modal__container">
          <button className="Modal__close" onClick={props.onCloseModal}>X</button>
          <div>{props.data.code}</div>
        </div>
      </div>,
      document.getElementById("modal"));
  } else {
    return null;
  }
}

export default Modal;