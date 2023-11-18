import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AddAccount = ({ addOpen, setAddOpen, accountData, setAccountData }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EPManager');

    const addAccount = async (e) => {
        e.preventDefault();

        const newAccount = {
            name: name,
            email: email,
            password: password,
            role: role
        }

        try {
            const response = await axios.post("http://localhost:2504/auth/bregister", newAccount);

            if (response.status === 201) {
                console.log("successful");
                setAccountData([...accountData, newAccount]);
            } else {
                console.log("err");
            }
            setAddOpen(false);
        } catch (err) {
            console.log(err);
        }
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
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}  mt={6}>
                            Choose Branch
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Hello</MenuItem>
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