import './EPOOrderDetail.scss';
import { Divider } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from '../../../components/ModalConfirm/ModalConfirm';
import { CONFIRMORDER, ORDERSTATUS, formatTime } from '../../../common/const';

const EPOOrderDetail = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState();
    const [successDeliverOpen, setSuccessDeliverOpen] = useState(false);
    const [failDeliverOpen, setFailDeliverOpen] = useState(false);

    async function fetchData(ignore) {
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

    useEffect(() => {
        let ignore = false;

        fetchData(ignore);

        return () => {
            ignore = true;
        }
    }, [id]);

    const confirmSuccessDeliver = async () => {
        try {
            const res = await axios.put('http://localhost:2504/order/confirm', {
                id: orderData._id,
                type: CONFIRMORDER.SUCCESSDELIVER
            });
            if (res.status === 200) {
                console.log(res);
                setSuccessDeliverOpen(false);
                fetchData(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const confirmFailDeliver = async () => {
        try {
            const res = await axios.put('http://localhost:2504/order/confirm', {
                id: orderData._id,
                type: CONFIRMORDER.FAILDELIVER
            });
            if (res.status === 200) {
                console.log(res);
                setFailDeliverOpen(false);
                fetchData(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                    <div className='col'>
                        <div className='header'>
                            1. From: <span>{orderData.from?.name}</span>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='header'>
                            2. To: <span>{orderData.to?.name}</span>
                        </div>
                        {
                            orderData.to?._id === '656b4524130a2b089708c464' && (
                                <div>
                                    <div className='header1'>
                                        Name: <span>{orderData.bill?.receiver?.name}</span>
                                    </div>
                                    <div className='header1'>
                                        Mobile Number: <span>{orderData.bill?.receiver?.mobile}</span>
                                    </div>
                                    <div className='header1'>
                                        Address: <span>{orderData.bill?.receiver.address}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>
                            3. Status: <span>{orderData.status}</span>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='header'>
                            4. Created At: <span>{formatTime(orderData.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className='top'>
                <div className='title'>Bill #{orderData.bill?._id}</div>
            </div>
            <div className='content'>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>1. Sender</div>
                        <div className='header1'>
                            Name: <span>{orderData.bill?.sender.name}</span>
                        </div>
                        <div className='header1'>
                            Address: <span>{orderData.bill?.sender.address}</span>
                        </div>
                        <div className='header1'>
                            Mobile Number: <span>{orderData.bill?.sender.mobile}</span>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='header'>2. Receiver</div>
                        <div className='header1'>
                            Name: <span>{orderData.bill?.receiver.name}</span>
                        </div>
                        <div className='header1'>
                            Address: <span>{orderData.bill?.receiver.address}</span>
                        </div>
                        <div className='header1'>
                            Mobile Number: <span>{orderData.bill?.receiver.mobile}</span>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='header'>3. Package Type</div>
                        <div> {orderData.bill?.packageType}</div>
                    </div>

                    <div className='col'>
                        <div className='header'>4. Fail Option</div>
                        <div>{orderData.bill?.failOption}</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='header'>5. Time created</div>
                        <div>{formatTime(orderData.bill?.timeSent)}</div>
                    </div>

                    <div className='col'>
                        <div className='header'>6. Fee</div>
                        <div>${orderData.bill?.fee}</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='header'>7. Weigh</div>
                        <div>{orderData.bill?.weigh} kg</div>
                    </div>

                    <div className='col'>
                        <div className='header'>8. Receiver's Payment</div>
                        <div>${orderData.bill?.receiverPayment}</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='header'>9. Status</div>
                        <div>{orderData.bill?.status}</div>
                    </div>
                </div>
            </div>

            {
                orderData.to?._id === '656b4524130a2b089708c464' ? (
                    orderData.status === ORDERSTATUS.NOTCONFIRMED ? (
                        <div className='action'>
                            <button className='btn1' onClick={() => setSuccessDeliverOpen(true)}>
                                <div className='text'>
                                    Deliver successfully
                                </div>
                            </button>
                            <button className='btn2' onClick={() => setFailDeliverOpen(true)}>
                                <div className='text'>
                                    Deliver Fail
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className='action'>
                            <button className='btn1' onClick={() => setSuccessDeliverOpen(true)}>
                                <div className='text'>
                                    Create Delivery Order
                                </div>
                            </button>
                            <button className='btn2'>
                                <div className='text'>Create Return Order</div>
                            </button>
                        </div>
                    )
                ) : (
                    <div className='action'>
                    </div>
                )
            }

            {successDeliverOpen &&
                <ModalConfirm
                    isOpen={successDeliverOpen}
                    close={() => setSuccessDeliverOpen(false)}
                    title="Confirm deliver successfully"
                    confirm={confirmSuccessDeliver}
                />
            }
            {failDeliverOpen &&
                <ModalConfirm
                    isOpen={failDeliverOpen}
                    close={() => setFailDeliverOpen(false)}
                    title="Confirm deliver fail"
                    confirm={confirmFailDeliver}
                />
            }
        </div>
    )
}

export default EPOOrderDetail;