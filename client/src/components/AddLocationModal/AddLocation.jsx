import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

const AddLocation = ({ addOpen, setAddOpen, locationData, setLocationData }) => {
    const [type, setType] = useState('TPoint');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const addLocation = async (e) => {
        e.preventDefault();

        const newLocation = {
            name: name,
            location: location,
            type: type
        }

        try {
            const response = await axios.post("http://localhost:2504/point/add", newLocation);

            if (response.status === 201) {
                console.log("successful");
                setLocationData([...locationData, newLocation])
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
                <ModalHeader>Add Location</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Location</FormLabel>
                        <Input placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                    </FormControl>

                    <RadioGroup onChange={setType} value={type} mt={6}>
                        <Stack direction='row'>
                            <Radio value='TPoint' onChange={() => setType('TPoint')}>Transaction Point</Radio>
                            <Radio value='CPoint' onChange={() => setType('CPoint')}>Collection Point</Radio>
                        </Stack>
                    </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={addLocation}>
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

export default AddLocation;