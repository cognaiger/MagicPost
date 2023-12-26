import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AddLocation = ({ addOpen, setAddOpen, locationData, setLocationData, setLocationView }) => {
    const [type, setType] = useState('EPoint');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [cpointData, setCpointData] = useState();
    const [associatedCP, setAssociatedCP] = useState();
    const [associatedCPName, setAssociatedCPName] = useState('');

    useEffect(() => {
        let ignore = false;

        async function fetchCPoint() {
            try {
                const res = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "cp"
                    }
                });
                if (!ignore) {
                    setCpointData(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchCPoint();

        return () => {
            ignore = true;
        }
    }, []);

    const addLocation = async (e) => {
        e.preventDefault();

        let newLocation = {
            name: name,
            location: location,
            type: type
        }

        if (type === 'EPoint') {
            newLocation = {
                ...newLocation,
                associatedPoint: associatedCP
            }
        }

        try {
            const response = await axios.post("http://localhost:2504/point/add", newLocation);

            if (response.status === 201) {
                console.log("successful");
                setLocationData([newLocation, ...locationData]);
                setLocationView([newLocation, ...locationData]);
            } else {
                console.log("err");
            }
            setAddOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    const onChooseItem = (id, name) => {
        setAssociatedCP(id);
        setAssociatedCPName(name);
        console.log(id);
        console.log(name);
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
                            <Radio value='EPoint' onChange={() => setType('EPoint')}>Exchange Point</Radio>
                            <Radio value='CPoint' onChange={() => setType('CPoint')}>Collection Point</Radio>
                        </Stack>
                    </RadioGroup>

                    {type === 'EPoint' && (
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={6}>
                                {associatedCPName === '' ? "Choose Associated Collection Point" : associatedCPName}
                            </MenuButton>
                            <MenuList>
                                {
                                    cpointData?.map((el, i) => (
                                        <MenuItem key={i} onClick={() => onChooseItem(el._id, el.name)}>{el.name}</MenuItem>
                                    ))
                                }
                            </MenuList>
                        </Menu>
                    )}
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