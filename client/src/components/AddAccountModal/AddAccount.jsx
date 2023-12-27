import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AddAccount = ({ addOpen, setAddOpen, accountData, setAccountData, setAccoutView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EPManager');
    const [branchId, setBranchId] = useState('');
    const [branchName, setBranchName] = useState('');
    const [ePoint, setEPoint] = useState([]);
    const [cPoint, setCPoint] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res1 = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "ep"
                    }
                });
                const res2 = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "cp"
                    }
                });
                if (!ignore) {
                    setEPoint(res1.data);
                    setCPoint(res2.data);
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

    const addAccount = async (e) => {
        e.preventDefault();

        const newAccount = {
            fullName: name,
            email: email,
            password: password,
            role: role,
            branch: branchName
        }

        role === "EPManager" ? newAccount['ePoint'] = branchId : newAccount['cPoint'] = branchId;
        console.log(newAccount);

        try {
            const response = await axios.post("http://localhost:2504/auth/bregister", newAccount);

            if (response.status === 201) {
                console.log("successful");
                setAccoutView([newAccount, ...accountData]);
                setAccountData([newAccount, ...accountData]);
                setEmail('');
                setName('');
                setPassword('');
                setBranchId('');
                setBranchName('');
            } else {
                console.log("err");
            }
            setAddOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    const onChooseItem = (id, name) => {
        setBranchId(id);
        setBranchName(name);
        console.log(id);
        console.log(name);
    }

    return (
        <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <RadioGroup onChange={setRole} value={role} mt={6}>
                        <Stack direction='row'>
                            <Radio value='EPManager' onChange={() => setRole('EPManager')}>Exchange Point Manager</Radio>
                            <Radio value='CPManager' onChange={() => setRole('CPManager')}>Collection Point Manager</Radio>
                        </Stack>
                    </RadioGroup>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={6}>
                            {branchName === '' ? "Choose Branch" : branchName}
                        </MenuButton>
                        <MenuList>
                            {
                                role === 'EPManager' ?
                                ePoint.map((el, i) => (
                                    <MenuItem key={i} onClick={() => onChooseItem(el._id, el.name)}>{el.name}</MenuItem>
                                ))
                                :
                                cPoint.map((el, i) => (
                                    <MenuItem key={i} onClick={() => onChooseItem(el._id, el.name)}>{el.name}</MenuItem>
                                ))
                            }
                        </MenuList>
                    </Menu>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={addAccount}>
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

export default AddAccount;