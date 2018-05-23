
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class CustomModal extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                    <Button bsStyle={this.props.bsStyle} onClick={this.props.handleAccept}>{this.props.acceptTitle}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CustomModal;