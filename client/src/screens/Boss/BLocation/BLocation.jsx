import React, { useEffect, useState } from 'react';
import './BLocation.scss';
import { Menu, MenuButton, MenuItem, MenuList, Button, Divider } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import LocationInfo from '../../../components/LocationInfo/LocationInfo';
import AddLocation from '../../../components/AddLocationModal/AddLocation';
import axios from 'axios';
import { POINTTYPE } from '../../../common/const';

const BLocation = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [locationView, setLocationView] = useState([]);
  const [menuOption, setMenuOption] = useState("Choose type");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:2504/point", {
          params: {
            type: "both"
          }
        });
        if (!ignore) {
          setLocationData(res.data);
          setLocationView(res.data);
        }
      } catch(err) {
        console.log(err);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    }
  }, []);

  const addLocation = () => {
    setAddOpen(true);
  }

  const filter = (type) => {
    if (type === 'all') {
      setLocationView(locationData);
      setMenuOption("All");
    } else {
      const tmpData = locationData.filter((point) => point.type === type);
      setLocationView(tmpData);
      setMenuOption(type);
    }
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
            {menuOption}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => filter("all")}>All</MenuItem>
            <MenuItem onClick={() => filter(POINTTYPE.TPoint)}>Exchange Point</MenuItem>
            <MenuItem onClick={() => filter(POINTTYPE.CPoint)}>Collection Point</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className='info'>
        {
          locationView.map((el, i) => (
            <LocationInfo id={el._id} name={el.name} location={el.location} head={el.managerName} type={el.type} key={i} setLocationData={setLocationData} />
          ))
        }
      </div>

      <AddLocation addOpen={addOpen} setAddOpen={setAddOpen} locationData={locationData} setLocationData={setLocationData} setLocationView={setLocationView} />
    </div>
  )
}

export default BLocation;