import React from "react";
import { Modal, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export default function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modelTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button key={index} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button variant="primary" onClick={props.onSubmit}>
            שמור שינוים
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
