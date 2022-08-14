import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    event.code === 'Escape' && this.props.onClose();
  };

  handleOverlayClick = event => {
    event.currentTarget === event.target && this.props.onClose();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Modal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export default ModalWindow;
