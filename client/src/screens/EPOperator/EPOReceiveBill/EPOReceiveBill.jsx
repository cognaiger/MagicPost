import React, { useContext, useEffect, useState } from 'react';
import './EPOReceiveBill.scss';
import { Divider, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Menu, MenuButton, Button, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { BILLSTATUS } from '../../../common/const';

const EPOReceiveBill = () => {
    const navigate = useNavigate();
    const { currentPoint } = useContext(AuthContext);
    const [billData, setBillData] = useState();
    const [billDataView, setBillDataView] = useState();
    const [menuName, setMenuName] = useState("Choose status");

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:2504/bill/atpoint`, {
                    params: {
                        id: currentPoint.epoint
                    }
                });
                if (!ignore) {
                    setBillData(res.data);
                    setBillDataView(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        }
    }, [currentPoint.epoint]);

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

    const filter = (status) => {
        if (status === "All") {
            setMenuName("All");
            setBillDataView(billData);
        } else if (status === BILLSTATUS.PENDING) {
            const tmp = billData.filter((bill) => bill.status === BILLSTATUS.PENDING);
            setBillDataView(tmp);
            setMenuName("Pending");
        }
        else if (status === BILLSTATUS.DELIVERED) {
            const tmp = billData.filter((bill) => bill.status === BILLSTATUS.DELIVERED);
            setBillDataView(tmp);
            setMenuName("Delivered");
        } else if (status === BILLSTATUS.RETURN) {
            const tmp = billData.filter((bill) => bill.status === BILLSTATUS.RETURN);
            setBillDataView(tmp);
            setMenuName("Return");
        } else {
            const tmp = billData.filter((bill) => bill.status !== BILLSTATUS.PENDING && bill.status !== BILLSTATUS.RETURN && bill.status !== BILLSTATUS.DELIVERED);
            setBillDataView(tmp);
            setMenuName("In transit");
        }
    }

    return (
        <div className='epobill'>
            <div className='top'>
                <div className='title'>Bill Management</div>
                <Divider />
            </div>

            <div className='option'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {menuName}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => filter("All")}>All</MenuItem>
                        <MenuItem onClick={() => filter(BILLSTATUS.PENDING)}>Pending</MenuItem>
                        <MenuItem onClick={() => filter(BILLSTATUS.INTRANSIT1)}>In transit</MenuItem>
                        <MenuItem onClick={() => filter(BILLSTATUS.DELIVERED)}>Delivered</MenuItem>
                        <MenuItem onClick={() => filter(BILLSTATUS.RETURN)}>Return</MenuItem>
                    </MenuList>
                </Menu>
            </div>

            <div className='content'>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Sender</Th>
                                <Th>Receiver</Th>
                                <Th>Time created</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {billDataView && (
                                billDataView.map((el, i) => (
                                    <Tr key={i} onClick={() => navigate(`/epohome/bill/${el._id}`)} cursor='pointer'>
                                        <Td>{el._id}</Td>
                                        <Td>{el.sender.name}</Td>
                                        <Td>{el.receiver.name}</Td>
                                        <Td>{formatTime(el.timeSent)}</Td>
                                        <Td>{el.status}</Td>
                                    </Tr>
                                ))
                            )}

                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default EPOReceiveBill;