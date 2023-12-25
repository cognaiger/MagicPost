import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import "./TrackingModal.scss";
import { BILLSTATUS, ORDERTYPE } from '../../common/const';


const TrackingModal = ({ trackOpen, setTrackOpen, orderData, billId, billStatus }) => {
    const formatTime = (dateString) => {
        let res = '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        res += hour < 10 ? `0${hour}h:` : `${hour}h:`;
        res += min < 10 ? `0${min}m:` : `${min}m:`;
        res += sec < 10 ? `0${sec}s ` : `${sec}s `;
        res += day < 10 ? `0${day}/` : `${day}/`;
        res += month < 10 ? `0${month}/` : `${month}/`;
        res += year;
        return res;
    }

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