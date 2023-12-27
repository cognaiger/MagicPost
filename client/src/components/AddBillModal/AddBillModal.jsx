import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FailOption } from '../../common/const';
import { AuthContext } from '../../context/authContext';

const AddBillModal = ({ addOpen, setAddOpen, billData, setBillData, setBillDataView }) => {
    const [senderEmail, setSenderEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderNum, setSenderNum] = useState('');
    const [senderAddr, setSenderAddr] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverNum, setReceiverNum] = useState('');
    const [receiverAddr, setReceiverAddr] = useState('');
    const [type, setType] = useState('Document');
    const [failOption, setFailOption] = useState(FailOption.Op1);
    const [fee, setFee] = useState(0);
    const [weigh, setWeigh] = useState(0);
    const [receiverPayment, setReceiverPayment] = useState(0);
    const [desEP, setDesEP] = useState('');
    const [desEPName, setDesEPName] = useState('');
    const [ePoint, setEPoint] = useState([]);

    const { currentPoint } = useContext(AuthContext);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "ep"
                    }
                });
                if (!ignore) {
                    setEPoint(res.data);
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

    const addBill = async (e) => {
        e.preventDefault();
        console.log(currentPoint?.epoint);

        const newBill = {
            senderEmail: senderEmail,
            senderName: senderName,
            senderNum: senderNum,
            senderAddr: senderAddr,
            senderPoint: currentPoint.epoint,
            receiverEmail: receiverEmail,
            receiverName: receiverName,
            receiverNum: receiverNum,
            receiverAddr: receiverAddr,
            receiverPoint: desEP,
            packageType: type,
            failOption: failOption,
            fee: fee,
            weigh: weigh,
            receiverPayment: receiverPayment
        }

        console.log(newBill);

        try {
            const response = await axios.post("http://localhost:2504/bill/add", newBill);
            if (response.status === 201) {
                console.log(response.data);
                setBillData([response.data, ...billData]);
                setBillDataView([response.data, ...billData]);
            } else {
                console.log("err");
            }
            setAddOpen(false);
        } catch (err) {
            console.log("in catch");
            console.log(err);
        }
    }

    const onChooseItem = (id, name) => {
        setDesEP(id);
        setDesEPName(name);
        console.log(id);
        console.log(name);
    }

    return (
        <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} isCentered size='full'>
            <ModalOverlay />
            <ModalContent mt={80}>
                <ModalHeader mt={20}>Add Bill</ModalHeader>
                <ModalCloseButton mt={20} />
                <ModalBody>
                    <FormControl>
                        <FormLabel fontWeight={600}>Sender</FormLabel>
                        <Input placeholder='Email' value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
                        <Input placeholder='Name' value={senderName} onChange={(e) => setSenderName(e.target.value)} mt={6} />
                        <Input placeholder='Mobile Number' value={senderNum} onChange={(e) => setSenderNum(e.target.value)} mt={6} />
                        <Input placeholder='Address' value={senderAddr} onChange={(e) => setSenderAddr(e.target.value)} mt={6} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel fontWeight={600}>Receiver</FormLabel>
                        <Input placeholder='Email' value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />
                        <Input placeholder='Name' value={receiverName} onChange={(e) => setReceiverName(e.target.value)} mt={6} />
                        <Input placeholder='Mobile Number' value={receiverNum} onChange={(e) => setReceiverNum(e.target.value)} mt={6} />
                        <Input placeholder='Address' value={receiverAddr} onChange={(e) => setReceiverAddr(e.target.value)} mt={6} />
                    </FormControl>

                    <Text mt={6} fontWeight={600}>Choose Destination Exchange Point</Text>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={4}>
                            {desEPName === '' ? "Choose Branch" : desEPName}
                        </MenuButton>
                        <MenuList>
                            {
                                ePoint.map((el, i) => (
                                    <MenuItem key={i} onClick={() => onChooseItem(el._id, el.name)}>{el.name}</MenuItem>
                                ))

                            }
                        </MenuList>
                    </Menu>

                    <Text mt={6} fontWeight={600}>Type of Package</Text>
                    <RadioGroup onChange={setType} value={type} mt={2}>
                        <Stack direction='row' gap={200}>
                            <Radio value='Document' onChange={(e) => setType(e.target.value)}>Document</Radio>
                            <Radio value='Good' onChange={(e) => setType(e.target.value)}>Good</Radio>
                        </Stack>
                    </RadioGroup>

                    <Text mt={6} fontWeight={600}>When parcel can't be delivered</Text>
                    <RadioGroup onChange={setFailOption} value={failOption} mt={2}>
                        <Stack direction='row' wrap='wrap' gap={100}>
                            <Radio value={FailOption.Op1} onChange={(e) => setFailOption(e.target.value)}>Return immediately</Radio>
                            <Radio value={FailOption.Op2} onChange={(e) => setFailOption(e.target.value)}>Return before the date</Radio>
                            <Radio value={FailOption.Op3} onChange={(e) => setFailOption(e.target.value)}>Return when the storage time expires</Radio>
                            <Radio value={FailOption.Op4} onChange={(e) => setFailOption(e.target.value)}>Call the sender</Radio>
                            <Radio value={FailOption.Op5} onChange={(e) => setFailOption(e.target.value)}>Cancel</Radio>
                        </Stack>
                    </RadioGroup>

                    <FormControl mt={4}>
                        <FormLabel fontWeight={600}>Shipping fee</FormLabel>
                        <Input placeholder='Fee' value={fee} onChange={(e) => setFee(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel fontWeight={600}>Weigh</FormLabel>
                        <Input placeholder='Weigh' value={weigh} onChange={(e) => setWeigh(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel fontWeight={600}>Receiver's Payment</FormLabel>
                        <Input placeholder='Payment' value={receiverPayment} onChange={(e) => setReceiverPayment(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={addBill}>
                        Add
                    </Button>
                    <Button variant='ghost' onClick={() => setAddOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddBillModal;