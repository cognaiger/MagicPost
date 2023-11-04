import React from 'react';
import './BLocation.scss';
import { Menu, MenuButton, MenuItem, MenuList, Button, Divider } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import LocationInfo from '../../../components/LocationInfo/LocationInfo';

const BLocation = () => {
  return (
    <div className='blocation'>
      <div className='top'>
        <div className='title'>Location Management</div>
        <Divider />
      </div>

      <div className='option'>
        <Button colorScheme='purple' leftIcon={<AddIcon />}>
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
        <LocationInfo name='Transaction Point 2' location='212 Wall Street, Pa, New York' head='Jame Miller' type='Transaction Point' />
        <LocationInfo name='Transaction Point 2' location='212 Wall Street, Pa, New York' head='Jame Miller' type='Transaction Point' />
        <LocationInfo name='Transaction Point 2' location='212 Wall Street, Pa, New York' head='Jame Miller' type='Transaction Point' />
      </div>
    </div>
  )
}

export default BLocation;