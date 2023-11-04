import React from 'react';
import "./BAccount.scss";
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const BAccount = () => {
  return (
    <div className='baccount'>
      <div className='top'>
        <div className='title'>Account Management</div>
        <Divider />
      </div>

      <div className='option'>
        <Button colorScheme='purple' leftIcon={<AddIcon />}>
          Add account
        </Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Choose type
          </MenuButton>
          <MenuList>
            <MenuItem>All</MenuItem>
            <MenuItem>Exchange Point</MenuItem>
            <MenuItem>Collection Point</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className='content'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Branch</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Ragnar Lothbrok</Td>
                <Td>ragnar@gmail.com</Td>
                <Td>Head of exchange point</Td>
                <Td>123A, PA, New York</Td>
                <Td>April 10, 2023 7:20 PM</Td>
                <Td>
                  <MoreVertIcon />
                </Td>
              </Tr>
              <Tr>
                <Td>Ragnar Lothbrok</Td>
                <Td>ragnar@gmail.com</Td>
                <Td>Head of exchange point</Td>
                <Td>123A, PA, New York</Td>
                <Td>April 10, 2023 7:20 PM</Td>
                <Td>
                  <MoreVertIcon />
                </Td>
              </Tr>
              <Tr>
                <Td>Ragnar Lothbrok</Td>
                <Td>ragnar@gmail.com</Td>
                <Td>Head of exchange point</Td>
                <Td>123A, PA, New York</Td>
                <Td>April 10, 2023 7:20 PM</Td>
                <Td>
                  <MoreVertIcon />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default BAccount;