import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

const ModalConfirm = ({ isOpen, close, confirm, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={confirm}>
                    Confirm
                </Button>
                <Button variant='ghost' onClick={close}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ModalConfirm;