import React from 'react'
import {
  withState,
  withProps,
  compose,
} from 'recompose'
import Modal from '../Modal'

function ModalBtn({
  children,
  content: Content,
  closeModal,
  openModal,
  isModalVisible,
  onClick = () => {},
}){
  return (
    <div
      onClick={(e) => (onClick(e), openModal())}
    >
      {children}
      <Modal
        isOpen={isModalVisible}
        close={closeModal}
      >
        <Content closeThisModal={closeModal} />
      </Modal>
    </div>
  )
}

export default compose(
  withState('isModalVisible', 'setModalVisibility', false),
  withProps(({ setModalVisibility }) => ({
    openModal: () => setModalVisibility(true),
    closeModal: () => setModalVisibility(null),
  })),
)(ModalBtn)
