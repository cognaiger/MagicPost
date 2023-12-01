import React, { useContext, useEffect, useState } from 'react';
import "./EPOBill.scss";
import { Button, Divider, TableContainer, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import AddBillModal from '../../../components/AddBillModal/AddBillModal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const EPOBill = () => {
    const navigate = useNavigate();
    const { currentPoint } = useContext(AuthContext);
    const [addOpen, setAddOpen] = useState(false);
    const [billData, setBillData] = useState();

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:2504/bill/point`, {
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
    }, []);

    const addBill = () => {
        setAddOpen(true);
    }

    return (
        <div className='epobill'>
            <div className='top'>
                <div className='title'>Bill Management</div>
                <Divider />
            </div>

            <div className='option'>
                <Button colorScheme='purple' leftIcon={<AddIcon />} onClick={addBill}>
                    Add bill
                </Button>
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
                                    <Tr key={i} onClick={() => navigate(`${el._id}`)} cursor='pointer'>
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

            <AddBillModal addOpen={addOpen} setAddOpen={setAddOpen} billData={billData} setBillData={setBillData} />
        </div>
    )
}

export default EPOBill;