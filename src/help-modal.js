import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import "./modal.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HelpModal() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="modal">
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title> How to Play</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p>In each level, you'll see 5 pictures of the same animal and one picture of a different animal. The goal of the game is to click the different animal as quickly as possible. </p>
          <p> Click Ready to start! </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}