import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import "./TrackingModal.scss";
import { BILLSTATUS, ORDERTYPE, formatTime } from '../../common/const';


const TrackingModal = ({ trackOpen, setTrackOpen, orderData, billId, billStatus }) => {
    return (
        <Modal isOpen={trackOpen} onClose={() => setTrackOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Bill #{billId}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <div className='content'>
                        {orderData.map((el, i) => (
                            <div className='milestone' key={i}>
                                <CheckCircleIcon fontSize='large' />
                                <div className='info'>
                                    <div className='content'>
                                        {el.type === ORDERTYPE.TOCP1 ?
                                            "Reached collection point 1" : el.type === ORDERTYPE.TOCP2 ?
                                                "Reached collection point 2" : el.type === ORDERTYPE.TODESEP ?
                                                    "Reached destination exchange point" : "Delivered to customer successfully"
                                        }
                                    </div>
                                    <div className='time'>
                                        {formatTime(el.confirmedAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {billStatus !== BILLSTATUS.DELIVERED && (
                            <div className='milestone'>
                                <LocalShippingOutlinedIcon fontSize='large' />
                                <div className='info'>
                                    <div className='content'>
                                        {billStatus === BILLSTATUS.PENDING ?
                                            "Bill is processed at exchange point" : billStatus === BILLSTATUS.INTRANSIT4 ?
                                                "Bill is delivered to customer" : "Bill is in transit"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' onClick={() => setTrackOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TrackingModal;