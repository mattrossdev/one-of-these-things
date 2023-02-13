import React, { useState, useEffect, render } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function WinModal(props) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const copiedMessage = document.getElementById("copied-message");

  const copyScore = () => {
    navigator.clipboard.writeText(
      "I beat One of These Things in " + props.time + "!"
    );
    copiedMessage.style.display = "inline-block";
  };

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
      <Modal show={open}>
        <Modal.Header>
          <Modal.Title> You Win! </Modal.Title>
          <button
            type="button"
            className="btn-close"
            id="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div id="win-modal-body">
            <span> Good job! You won in {props.time}. </span> <br /> <br />
            <button type="button" className="share-button" onClick={copyScore}>
              <label> Share </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-share"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
            </button>
            <br /> <br />
            <div id="copied-message">
              <span id="copied-text"> Copied to clipboard </span>{" "}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
