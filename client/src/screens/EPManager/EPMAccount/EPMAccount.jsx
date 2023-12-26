import React, { useContext, useEffect, useState } from 'react';
import "./EPMAccount.scss";
import { Button, Divider, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import AddAccountEPO from '../../../components/AddAccountEPO/AddAccountEPO';
import { AuthContext } from '../../../context/authContext';

const EPMAccount = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const { currentPoint } = useContext(AuthContext);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:2504/auth/account", {
          params: {
            type: 'EPOperator',
            branchId: currentPoint.epoint
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
  }, [currentPoint.epoint]);

  const modifyAccount = () => {

  }

  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete("http://localhost:2504/auth/account", {
        params: {
          id: id
        }
      })

      if (res.status === 200) {
        setAccountData((prev) => prev.filter((account) => account._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  }


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
                  <Td>Exchange Point Operator</Td>
                  <Td>{el.branch}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<MoreVertIcon />}
                        variant='outline'
                      />
                      <MenuList>
                        <MenuItem icon={<EditIcon />} onClick={() => modifyAccount()}>
                          Modify Account
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={() => deleteAccount(el._id)}>
                          Delete Account
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <AddAccountEPO addOpen={addOpen} setAddOpen={setAddOpen} accountData={accountData} setAccountData={setAccountData} />
    </div>
  )
}

export default EPMAccount;