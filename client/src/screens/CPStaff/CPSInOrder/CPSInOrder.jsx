import React, { useContext, useEffect, useState } from 'react';
import "./CPSInOrder.scss";
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AuthContext } from '../../../context/authContext';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import CancelModal from './CancelModal';
import { CONFIRMORDER, ORDERSTATUS } from '../../../common/const';
import { formatTime } from '../../../common/const';

const CPSInOrder = () => {
    const [orderData, setOrderData] = useState();
    const { currentPoint } = useContext(AuthContext);
    const [confirmModal, setConfirmModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [orderDateView, setOrderDataView] = useState();
    const [menuName, setMenuName] = useState("Choose status");

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
                    setOrderDataView(res.data);
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

    const onClickConfirm = async (id) => {
        setConfirmModal(true);
        setCurrentId(id);
    }

    const filter = (type) => {
        if (type === "All") {
            setOrderDataView(orderData);
            setMenuName("All");
        } else {
            const tmpArr = orderData.filter((order) => order.status === type);
            setOrderDataView(tmpArr);
            setMenuName(type);
        }
    }

    const confirm = async () => {
        try {
            console.log(currentId);
            const res = await axios.put('http://localhost:2504/order/confirm', {
                id: currentId,
                type: CONFIRMORDER.RECEIVEBILL
            });
            if (res.status === 200) {
                console.log(res);
                setConfirmModal(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='inorder'>
            <div className='top'>
                <div className='title'>Incoming Delivery Order</div>
                <Divider />
            </div>

            <div className='option'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {menuName}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => filter("All")}>All</MenuItem>
                        <MenuItem onClick={() => filter(ORDERSTATUS.CONFIRMED)}>Confirmed</MenuItem>
                        <MenuItem onClick={() => filter(ORDERSTATUS.NOTCONFIRMED)}>Not Confirmed</MenuItem>
                        <MenuItem onClick={() => filter(ORDERSTATUS.CANCEL)}>Cancel</MenuItem>
                    </MenuList>
                </Menu>
            </div>

            {confirmModal && <ConfirmModal isOpen={confirmModal} onClose={() => setConfirmModal(false)} confirm={confirm} />}
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
                            {orderDateView && (
                                orderDateView.map((el, i) => (
                                    <Tr key={i}>
                                        <Td>{el.bill}</Td>
                                        <Td>{el.from?.name}</Td>
                                        <Td>{formatTime(el.createdAt)}</Td>
                                        <Td>
                                            {
                                                el.status === ORDERSTATUS.NOTCONFIRMED ? (
                                                    <div className='buttons'>
                                                        <button onClick={() => onClickConfirm(el._id)} className='confirm'>
                                                            <div>Confirm</div>
                                                        </button>
                                                        <button onClick={() => setCancelModal(true)} className='cancel'>
                                                            <div>Cancel</div>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className='buttons'>
                                                        <button className='confirmed'>
                                                            <div>Confirmed</div>
                                                        </button>
                                                    </div>
                                                )
                                            }

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