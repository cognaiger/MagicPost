import './EPOOrderDetail.scss';
import { Divider } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from '../EPOBillDetail/ModalConfirm';
import { AuthContext } from '../../../context/authContext';
import { BILLSTATUS } from '../../../common/const';

const EPOOrderDetail = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState();
    const { currentPoint } = useContext(AuthContext);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:2504/order/${id}`);
                if (!ignore && res.status === 200) {
                    setOrderData(res.data);
                } else {
                    console.log('response status different from 200');
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        }
    }, [id]);

    if (!orderData) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className='epoorderdetail'>
            <div className='top'>
                <div className='title'>Order #{orderData._id}</div>
                <Divider />
            </div>

            <div className='ordercontent'>
                <div className='row'>
                    <div className='header'>
                        1. From: <span>{orderData.from.name}</span>
                    </div>
                    <div>
                        <div className='header'>
                            2. To: <span>{orderData.to.name}</span>
                        </div>
                        {
                            orderData.to._id === '656b4524130a2b089708c464' && (
                                <div>
                                    <div className='header1'>
                                        Name: <span>{orderData.bill.receiver.name}</span>
                                    </div>
                                    <div className='header1'>
                                        Mobile Number: <span>{orderData.bill.receiver.mobile}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='header'>
                        3. Status: <span>{orderData.status}</span>
                    </div>
                    <div className='header'>
                        4. Created At: <span>{orderData.createdAt}</span>
                    </div>
                </div>
            </div>

            <Divider />
            <div className='top'>
                <div className='title'>Bill #{orderData.bill._id}</div>
            </div>
            <div className='content'>
                <div className='peopleInfo'>
                    <div>
                        <div className='header'>1. Sender</div>
                        <div>Name: {orderData.bill.sender.name}</div>
                        <div>Address: {orderData.bill.sender.address}</div>
                        <div>Mobile Number: {orderData.bill.sender.mobile}</div>
                    </div>

                    <div>
                        <div className='header'>2. Receiver</div>
                        <div>Name: {orderData.bill.receiver.name}</div>
                        <div>Address: {orderData.bill.receiver.address}</div>
                        <div>Mobile Number: {orderData.bill.receiver.mobile}</div>
                    </div>
                </div>
                <div className='header'>3. Package Type</div>
                <div> {orderData.bill.packageType}</div>
                <div className='header'>4. Fail Option</div>
                <div>{orderData.bill.failOption}</div>
                <div className='header'>5. Time created</div>
                <div>{orderData.bill.timeSent}</div>
                <div className='header'>6. Fee</div>
                <div>${orderData.bill.fee}</div>
                <div className='header'>7. Weigh</div>
                <div>{orderData.bill.weigh} kg</div>
                <div className='header'>8. Receiver's Payment</div>
                <div>${orderData.bill.receiverPayment}</div>
                <div className='header'>9. Status</div>
                <div>{orderData.bill.status}</div>
            </div>

            <div className='action'>
                {
                    currentPoint.epoint === orderData.bill.sender.point ? (
                        orderData.bill.status === BILLSTATUS.PENDING ? (
                            <button className='btn1' onClick={() => setConfirmOpen(true)}>
                                <div className='text'>
                                    Create Delivery Order
                                </div>
                            </button>
                        ) : (
                            <button className='btn1'>
                                <div className='text'>
                                    Have Created Delivery Order
                                </div>
                            </button>
                        )
                    ) : (
                        orderData.bill.status === BILLSTATUS.REACHDESEP ? (
                            <div className='action'>
                                <button className='btn1' onClick={() => setConfirmOpen(true)}>
                                    <div className='text'>
                                        Create Delivery Order
                                    </div>
                                </button>
                                <button className='btn2'>
                                    <div className='text'>Create Return Order</div>
                                </button>
                            </div>
                        ) : (
                            <button className='btn1'>
                                <div className='text'>
                                    Have Created Delivery Order
                                </div>
                            </button>
                        )
                    )
                }
            </div>

            {confirmOpen && <ModalConfirm isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />}
        </div>
    )
}

export default EPOOrderDetail;