import './CPSOutOrder.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import { ORDERSTATUS, formatTime } from '../../../common/const';
import { useNavigate } from 'react-router-dom';

const CPSOutOrder = () => {
  const [orderData, setOrderData] = useState();
  const { currentPoint } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState("Choose status");
  const [orderDateView, setOrderDataView] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchOrder() {
      try {
        const res = await axios.get(`http://localhost:2504/order/from`, {
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
  }, [currentPoint.epoint]);

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

  return (
    <div className='outorder'>
      <div className='top'>
        <div className='title'>Outgoing Delivery Order</div>
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

      <div className='content'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Bill</Th>
                <Th>To</Th>
                <Th>Time created</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderDateView && (
                orderDateView.map((el, i) => (
                  <Tr key={i}>
                    <Td>{el.bill}</Td>
                    <Td>{el.to ? el.to.name : "null"}</Td>
                    <Td>{formatTime(el.createdAt)}</Td>
                    <Td>
                      {
                        el.status === ORDERSTATUS.NOTCONFIRMED ? (
                          <div className='buttons'>
                            <button className='notconfirm'>
                              <div>Not Confirmed</div>
                            </button>
                          </div>
                        ) : el.status === ORDERSTATUS.CONFIRMED ? (
                          <div className='buttons'>
                            <button className='confirmed'>
                              <div>Confirmed</div>
                            </button>
                          </div>
                        ) : (
                          <div className='buttons'>
                            <button className='cancel'>
                              <div>Canceled</div>
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

export default CPSOutOrder;