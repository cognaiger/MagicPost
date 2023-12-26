import React, { useEffect, useState } from 'react';
import "./BAccount.scss";
import { Button, Divider, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import AddAccount from '../../../components/AddAccountModal/AddAccount';
import { ROLE } from '../../../common/const';

const BAccount = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [accountView, setAccountView] = useState([]);
  const [menuName, setMenuName] = useState("Choose type");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const res1 = await axios.get("http://localhost:2504/auth/account", {
          params: {
            type: 'EPManager',
            branchId: "all"
          }
        });
        const res2 = await axios.get("http://localhost:2504/auth/account", {
          params: {
            type: 'CPManager',
            branchId: "all"
          }
        });
        if (!ignore) {
          setAccountData([...res1.data, ...res2.data]);
          setAccountView([...res1.data, ...res2.data]);
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

  const filter = (type) => {
    if (type === "all") {
      setAccountView(accountData);
      setMenuName("All");
    } else {
      const tempArray = accountData.filter((account) => account.role === type);
      setAccountView(tempArray);
      setMenuName(type)
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
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {menuName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => filter("all")}>All</MenuItem>
            <MenuItem onClick={() => filter(ROLE.EPMANAGER)}>Exchange Point Manager</MenuItem>
            <MenuItem onClick={() => filter(ROLE.CPMANAGER)}>Collection Point Manager</MenuItem>
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
              {accountView.map((el, i) => (
                <Tr key={i}>
                  <Td>{el.fullName}</Td>
                  <Td>{el.email}</Td>
                  <Td>{el.role === 'EPManager' ? "Exchange Point Manager" : "Collection Point Manager"}</Td>
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

      <AddAccount addOpen={addOpen} setAddOpen={setAddOpen} accountData={accountView} setAccountData={setAccountData} setAccoutView={setAccountView} />
    </div>
  )
}

export default BAccount;