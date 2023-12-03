import React, { useContext, useEffect, useState } from 'react';
import './EPOReceiveBill.scss';
import { Divider, TableContainer, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const EPOReceiveBill = () => {
    const navigate = useNavigate();
    const { currentPoint } = useContext(AuthContext);
    const [billData, setBillData] = useState();

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

    return (
        <div className='epobill'>
            <div className='top'>
                <div className='title'>Bill Management</div>
                <Divider />
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
                            {billData && (
                                billData.map((el, i) => (
                                    <Tr key={i} onClick={() => navigate(`/epohome/bill/${el._id}`)} cursor='pointer'>
                                        <Td>{el._id}</Td>
                                        <Td>{el.sender.name}</Td>
                                        <Td>{el.receiver.name}</Td>
                                        <Td>{el.timeSent}</Td>
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