import React, { useEffect, useState } from 'react';
import "./CPMAccount.scss";
import { Button, Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import AddAccountCPS from '../../../components/AddAccountCPS/AddAccountCPS';

const CPMAccount = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:2504/auth/account", {
                    params: {
                        type: 'CPStaff'
                    }
                });

                if (!ignore) {
                    setAccountData(res.data);
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


    return (
        <div className='cpmaccount'>
            <div className='top'>
                <div className='title'>Account Management</div>
                <Divider />
            </div>

            <div className='option'>
                <Button colorScheme='purple' leftIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
                    Add account
                </Button>
            </div>

            <div className='content'>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Branch</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {accountData.map((el, i) => (
                                <Tr key={i}>
                                    <Td>{el.fullName}</Td>
                                    <Td>{el.email}</Td>
                                    <Td>{el.branch}</Td>
                                    <Td>
                                        <MoreVertIcon />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <AddAccountCPS addOpen={addOpen} setAddOpen={setAddOpen} accountData={accountData} setAccountData={setAccountData} />
        </div>
    )
}

export default CPMAccount;