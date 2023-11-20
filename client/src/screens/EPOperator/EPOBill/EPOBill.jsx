import React, { useEffect, useState } from 'react';
import "./EPOBill.scss";
import { Menu, MenuButton, MenuItem, MenuList, Button, Divider } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import LocationInfo from '../../../components/LocationInfo/LocationInfo';
import AddLocation from '../../../components/AddLocationModal/AddLocation';
import axios from 'axios';
import AddBillModal from '../../../components/AddBillModal/AddBillModal';

const EPOBill = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "all"
                    }
                });
                if (!ignore) {
                    setLocationData(res.data);
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

    const addBill = () => {
        setAddOpen(true);
    }

    const getCollectionPoint = () => {

    }

    const getExchangePoint = () => {

    }

    return (
        <div className='blocation'>
            <div className='top'>
                <div className='title'>Bill Management</div>
                <Divider />
            </div>

            <div className='option'>
                <Button colorScheme='purple' leftIcon={<AddIcon />} onClick={addBill}>
                    Add bill
                </Button>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Choose type
                    </MenuButton>
                    <MenuList>
                        <MenuItem>All</MenuItem>
                        <MenuItem onClick={getExchangePoint}>Exchange Point</MenuItem>
                        <MenuItem onClick={getCollectionPoint}>Collection Point</MenuItem>
                    </MenuList>
                </Menu>
            </div>

            <div className='info'>
                {
                    locationData.map((el, i) => (
                        <LocationInfo name={el.name} location={el.location} head={el.head} type={el.type} key={i} />
                    ))
                }
            </div>

            <AddBillModal addOpen={addOpen} setAddOpen={setAddOpen} locationData={locationData} setLocationData={setLocationData} />
        </div>
    )
}

export default EPOBill;