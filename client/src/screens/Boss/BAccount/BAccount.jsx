import React, { useEffect, useState } from 'react';
import "./BAccount.scss";
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import AddAccount from '../../../components/AddAccountModal/AddAccount';

const BAccount = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const res1 = await axios.get("http://localhost:2504/auth/account", {
          params: {
            type: 'EPManager'
          }
        });
        const res2 = await axios.get("http://localhost:2504/auth/account", {
          params: {
            type: 'CPManager'
          }
        });
        if (!ignore) {
          setAccountData([...res1.data, ...res2.data]);
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
    <div className='baccount'>
      <div className='top'>
        <div className='title'>Account Management</div>
        <Divider />
      </div>

      <div className='option'>
        <Button colorScheme='purple' leftIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
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
              </Tr>
            </Thead>
            <Tbody>
              {accountData.map((el, i) => (
                <Tr key={i}>
                  <Td>{el.fullName}</Td>
                  <Td>{el.email}</Td>
                  <Td>{el.role === 'EPManager' ? "Exchange Point Manager" : "Collection Point Manager"}</Td>
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

      <AddAccount addOpen={addOpen} setAddOpen={setAddOpen} accountData={accountData} setAccountData={setAccountData} />
    </div>
  )
}

export default BAccount;