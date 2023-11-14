import React, { useState } from 'react';
import './BLocation.scss';
import { Menu, MenuButton, MenuItem, MenuList, Button, Divider } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import LocationInfo from '../../../components/LocationInfo/LocationInfo';
import AddLocation from '../../../components/AddLocationModal/AddLocation';

const BLocation = () => {
  const [addOpen, setAddOpen] = useState(false);

  const locationData = [
    {
      name: "Transaction Point 2",
      location: "212 Wall Street, Pa, New York",
      head: "Jame Miller",
      type: "Transaction Point"
    },
    {
      name: "Transaction Point 2",
      location: "212 Wall Street, Pa, New York",
      head: "Jame Miller",
      type: "Transaction Point"
    },
    {
      name: "Transaction Point 2",
      location: "212 Wall Street, Pa, New York",
      head: "Jame Miller",
      type: "Transaction Point"
    },
    {
      name: "Transaction Point 2",
      location: "212 Wall Street, Pa, New York",
      head: "Jame Miller",
      type: "Transaction Point"
    }
  ]

  const addLocation = () => {
    setAddOpen(true);
  }

  return (
    <div className='blocation'>
      <div className='top'>
        <div className='title'>Location Management</div>
        <Divider />
      </div>

      <div className='option'>
        <Button colorScheme='purple' leftIcon={<AddIcon />} onClick={addLocation}>
          Add location
        </Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Choose type
          </MenuButton>
          <MenuList>
            <MenuItem>All</MenuItem>
            <MenuItem>Exchange Point</MenuItem>
            <MenuItem>Collection Point</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className='info'>
        {
          locationData.map((el, i) => (
            <LocationInfo name={el.name} location={el.location} head={el.head} type={el.type} />
          ))
        }
      </div>

      <AddLocation addOpen={addOpen} setAddOpen={setAddOpen} />
    </div>
  )
}

export default BLocation;