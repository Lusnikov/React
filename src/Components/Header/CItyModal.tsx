import React from 'react'
import Modal from '../ui/Modal'

type Props = {
    onClose: () => void
}

const CItyModal = ({onClose}: Props) => {
  return (
    <Modal onClose={onClose}>
        <div>
            Выберите город
        </div>
    </Modal>
  )
}

export default CItyModal