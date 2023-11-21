import React from 'react';
import "./CPSInOrder.scss";
import { Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const CPSInOrder = () => {
    return (
        <div className='inorder'>
            <div className='top'>
                <div className='title'>Incoming Delivery Order</div>
                <Divider />
            </div>

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
                            <Tr>
                                <Td>00122333</Td>
                                <Td>00122333</Td>
                                <Td>00122333</Td>
                                <Td>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                        <button>
                                            <div>Confirm</div>
                                        </button>
                                        <button>
                                            <div>Cancel</div>
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default CPSInOrder;