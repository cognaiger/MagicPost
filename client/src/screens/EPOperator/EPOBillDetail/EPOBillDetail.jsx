import { Divider } from '@chakra-ui/react';
import "./EPOBillDetail.scss";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm";
import { AuthContext } from '../../../context/authContext';
import { BILLSTATUS, ORDERTYPE } from '../../../common/const';

const EPOBillDetail = () => {
    const { id } = useParams();
    const [billData, setBillData] = useState();
    const { currentPoint } = useContext(AuthContext);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const navigate = useNavigate();

    async function fetchData(ignore) {
        try {
            const res = await axios.get(`http://localhost:2504/bill/${id}`);
            console.log(res.data);
            if (!ignore) {
                setBillData(res.data);
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

    const createDelivery = async () => {
        let newOrder;
        if (billData.status === BILLSTATUS.PENDING) {
            newOrder = {
                bill: billData._id,
                from: currentPoint.epoint,
                to: currentPoint.associatedPoint,
                type: ORDERTYPE.TOCP1
            }
        } else {
            newOrder = {
                bill: billData._id,
                from: currentPoint.epoint,
                type: ORDERTYPE.TOCUS
            }
        }
        try {
            const res = await axios.post("http://localhost:2504/order/add", newOrder);
            if (res) {
                console.log('successful');
                setConfirmOpen(false);
                fetchData();
            }
        } catch (err) {
            console.log('in catch');
            console.log(err);
        }
    }

    const deleteBill = async () => {
        try {
            const res = await axios.delete("http://localhost:2504/bill", {
                params: {
                    id: id
                }
            });
            if (res.status === 200) {
                console.log('successful');
                setConfirmOpen(false);
                navigate("/epohome/sbill")
            }
        } catch (err) {
            console.log('in catch');
            console.log(err);
        }
    }

    if (!billData) {
        return (
            <div>loading</div>
        )
    }

    return (
        <div className='epobilldetail'>
            <div className='top'>
                <div className='title'>Bill #{billData._id}</div>
                <Divider />
            </div>

            <div className='content'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 540
                }}>
                    <div>
                        <div className='header1'>1. Sender</div>
                        <div>_ Name: {billData.sender.name}</div>
                        <div>_ Address: {billData.sender.address}</div>
                        <div>_ Mobile Number: {billData.sender.mobile}</div>
                    </div>

                    <div>
                        <div className='header1'>2. Receiver</div>
                        <div>_ Name: {billData.receiver.name}</div>
                        <div>_ Address: {billData.receiver.address}</div>
                        <div>_ Mobile Number: {billData.receiver.mobile}</div>
                    </div>
                </div>
                <div className='header1'>3. Package Type</div>
                <div> {billData.packageType}</div>
                <div className='header1'>4. Fail Option</div>
                <div>{billData.failOption}</div>
                <div className='header1'>5. Time created</div>
                <div>{billData.timeSent}</div>
                <div className='header1'>6. Fee</div>
                <div>${billData.fee}</div>
                <div className='header1'>7. Weigh</div>
                <div>{billData.weigh} kg</div>
                <div className='header1'>8. Receiver's Payment</div>
                <div>${billData.receiverPayment}</div>
                <div className='header1'>9. Status</div>
                <div>{billData.status}</div>
            </div>

            <div className='action'>
                {
                    currentPoint.epoint === billData.sender.point ? (
                        billData.status === BILLSTATUS.PENDING ? (
                            <div className='action'>
                                <button className='btn1' onClick={() => setConfirmOpen(true)}>
                                    <div className='text'>
                                        Create Delivery Order
                                    </div>

                                </button>
                                <button className='btn2' onClick={() => setConfirmDeleteOpen(true)}>
                                    <div className='text'>Delete Bill</div>
                                </button>
                            </div>
                        ) : (
                            <div className='action'>
                                <button className='btn1'>
                                    <div className='text'>
                                        Have Created Delivery Order
                                    </div>
                                </button>
                                <button className='btn2' onClick={() => setConfirmDeleteOpen(true)}>
                                    <div className='text'>Delete Bill</div>
                                </button>
                            </div>
                        )
                    ) : (
                        billData.status === BILLSTATUS.REACHDESEP ? (
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

            {confirmOpen && <ModalConfirm isOpen={confirmOpen} close={() => setConfirmOpen(false)} confirm={createDelivery}
                title={"Create delivery order"} />}
            {confirmDeleteOpen && <ModalConfirm isOpen={confirmDeleteOpen} close={() => setConfirmDeleteOpen(false)} confirm={deleteBill}
                title="Delete Bill" />}
        </div>
    )
}

export default EPOBillDetail;