import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

const ConfirmModal = ({ isOpen, onClose, confirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm order delivery</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={confirm}>
                        Confirm
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmModal;