import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function HelpModal(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="modal">
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title> How to Play</Modal.Title>
          <button
            type="button"
            className="btn-close"
            id="btn-close"
            aria-label="Close"
            onClick={props.handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p>
            In each level, you'll see 5 pictures of the same animal and one
            picture an animal that doesn't belong. The goal of the game is to
            complete all three levels as quickly as possible.{" "}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
