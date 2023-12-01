import React, { useContext, useEffect, useState } from 'react';
import "./CPSInOrder.scss";
import { Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import CancelModal from './CancelModal';

const CPSInOrder = () => {
    const [orderData, setOrderData] = useState();
    const { currentPoint } = useContext(AuthContext);
    const [confirmModal, setConfirmModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function fetchOrder() {
            try {
                const res = await axios.get(`http://localhost:2504/order/to`, {
                    params: {
                        id: currentPoint.cpoint
                    }
                });
                if (!ignore) {
                    setOrderData(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchOrder();

        return () => {
            ignore = true;
        }
    }, [currentPoint.cpoint]);

    return (
        <div className='inorder'>
            <div className='top'>
                <div className='title'>Incoming Delivery Order</div>
                <Divider />
            </div>

            {confirmModal && <ConfirmModal isOpen={confirmModal} onClose={() => setConfirmModal(false)} />}
            {cancelModal && <CancelModal isOpen={cancelModal} onClose={() => setCancelModal(false)} />}

            <div className='content'>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Bill</Th>
                                <Th>From</Th>
                                <Th>Time created</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orderData && (
                                orderData.map((el, i) => (
                                    <Tr>
                                        <Td>{el.bill}</Td>
                                        <Td>{el.from.name}</Td>
                                        <Td>{el.createdAt}</Td>
                                        <Td>
                                            <div className='buttons'>
                                                <button onClick={() => setConfirmModal(true)}>
                                                    <div>Confirm</div>
                                                </button>
                                                <button onClick={() => setCancelModal(true)}>
                                                    <div>Cancel</div>
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default CPSInOrder;