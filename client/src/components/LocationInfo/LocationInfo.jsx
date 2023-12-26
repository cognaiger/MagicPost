import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './LocationInfo.scss';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

const LocationInfo = ({ id, name, location, head, type, setLocationData }) => {
    const modifyLocation = () => {

    }

    const deleteLocation = async () => {
        try {
            const res = await axios.delete("http://localhost:2504/point", {
                params: {
                    id: id
                }
            })

            if (res.status === 200) {
                setLocationData((prev) => (prev.filter((point) => point._id !== id)));
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='detail'>
            <div className='name'>{name}</div>
            <div className='info'>
                <div className='prop'>
                    <div className='key'>Location</div>
                    <div className='value'>{location}</div>
                </div>
                <div className='prop'>
                    <div className='key'>Head</div>
                    <div className='value'>{head}</div>
                </div>
                <div className='prop'>
                    <div className='key'>Type</div>
                    <div className='value'>{type === 'EPoint' ? "Exchange Point" : "Collection Point"}</div>
                </div>
            </div>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<MoreVertIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem icon={<EditIcon />} onClick={() => modifyLocation()}>
                        Modify Location
                    </MenuItem>
                    <MenuItem icon={<DeleteIcon />} onClick={() => deleteLocation()}>
                        Delete Location
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default LocationInfo;