import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const AddAccountCPS = ({ addOpen, setAddOpen, accountData, setAccountData }) => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addAccount = async (e) => {
        e.preventDefault();

        const newAccount = {
            fullName: name,
            email: email,
            role: "CPStaff",
            password: password,
            cPoint: currentUser.cpoint,
            branch: currentUser.branch
        }

        try {
            const response = await axios.post("http://localhost:2504/auth/cpregister", newAccount);

            if (response.status === 201) {
                console.log("successful");
                setAccountData([newAccount, ...accountData]);
            } else {
                console.log("err");
            }
            setAddOpen(false);
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log("in catch");
            console.log(err);
        }
    }

    return (
        <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Staff Account</ModalHeader>
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

export default AddAccountCPS;