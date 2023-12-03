import './EPOOutOrder.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import ConfirmModal from '../../CPStaff/CPSInOrder/ConfirmModal';
import CancelModal from '../../CPStaff/CPSInOrder/CancelModal';
import { ORDERSTATUS } from '../../../common/const';
import { useNavigate } from 'react-router-dom';

const EPOOutOrder = () => {
  const [orderData, setOrderData] = useState();
  const { currentPoint } = useContext(AuthContext);
  const [confirmModal, setConfirmModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    async function fetchOrder() {
      try {
        const res = await axios.get(`http://localhost:2504/order/from`, {
          params: {
            id: currentPoint.epoint
          }
        });
        if (!ignore) {
          setOrderData(res.data);
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

  const onClickConfirm = async (id) => {
    setConfirmModal(true);
    setCurrentId(id);
  }

  const confirm = async () => {
    try {
      console.log(currentId);
      const res = await axios.put('http://localhost:2504/order/confirm', {
        id: currentId
      });
      if (res.status === 200) {
        console.log(res);
        setConfirmModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='outorder'>
      <div className='top'>
        <div className='title'>Outgoing Delivery Order</div>
        <Divider />
      </div>

      {confirmModal && <ConfirmModal isOpen={confirmModal} onClose={() => setConfirmModal(false)} confirm={confirm} />}
      {cancelModal && <CancelModal isOpen={cancelModal} onClose={() => setCancelModal(false)} />}

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
              {orderData && (
                orderData.map((el, i) => (
                  <Tr key={i} onClick={() => navigate(`/epohome/order/${el._id}`)} cursor='pointer'>
                    <Td>{el.bill}</Td>
                    <Td>{el.to.name}</Td>
                    <Td>{el.createdAt}</Td>
                    <Td>
                      {
                        el.status === ORDERSTATUS.NOTCONFIRMED ? (
                          <div className='buttons'>
                            <button onClick={() => onClickConfirm(el._id)} className='confirm'>
                              <div>Confirm</div>
                            </button>
                            <button onClick={() => setCancelModal(true)} className='cancel'>
                              <div>Cancel</div>
                            </button>
                          </div>
                        ) : (
                          <div className='buttons'>
                            <button className='confirmed'>
                              <div>Confirmed</div>
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

export default EPOOutOrder;