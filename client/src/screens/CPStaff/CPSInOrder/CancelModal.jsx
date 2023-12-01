import React from 'react';
import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

const CancelModal = ({ isOpen, onClose, confirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cancel order delivery</ModalHeader>
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

export default CancelModal;