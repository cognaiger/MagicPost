import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const AddAccountEPO = ({ addOpen, setAddOpen, accountData, setAccountData }) => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addAccount = async (e) => {
        e.preventDefault();

        const newAccount = {
            fullName: name,
            email: email,
            role: "EPOperator",
            password: password,
            ePoint: currentUser.epoint,
            branch: currentUser.branch
        }

        console.log(currentUser);
        console.log(newAccount);

        try {
            const response = await axios.post("http://localhost:2504/auth/epregister", newAccount);

            if (response.status === 201) {
                console.log("successful");
                setAccountData([...accountData, newAccount]);
            } else {
                console.log("err");
            }
            setAddOpen(false);
        } catch (err) {
            console.log("in catch");
            console.log(err);
        }
    }

    return (
        <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Exchange Point Operator Account</ModalHeader>
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

export default AddAccountEPO;