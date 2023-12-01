import { Divider } from '@chakra-ui/react';
import "./EPOBillDetail.scss";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';

const EPOBillDetail = () => {
    const { id } = useParams();
    const [billData, setBillData] = useState();
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
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

        fetchData();

        return () => {
            ignore = true;
        }
    }, []);

    const createDelivery = async () => {
        try {
            const res = await axios.post("http://localhost:2504/order/add", {
                bill: billData._id,
            })
        } catch (err) {
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
                <button className='btn1' onClick={() => setConfirmOpen(true)}>
                    <div className='text'>
                        Create Delivery Order
                    </div>
                </button>
                <button className='btn2'>
                    <div className='text'>Cancel Bill</div>
                </button>
            </div>

            {confirmOpen && <ModalConfirm isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} confirm={createDelivery} />}
        </div>
    )
}

export default EPOBillDetail;