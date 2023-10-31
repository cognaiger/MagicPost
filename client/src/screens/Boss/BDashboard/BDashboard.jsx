import React from 'react';
import "./BDashBoard.scss";
import { Button, Card, CardBody, CardHeader, Heading, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';

const BDashboard = () => {
  return (
    <div className='bdashboard'>
        <div className='top'>
            <div className='title'>Dashboard</div>
            <div className='select'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Choose point type
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Exchange Point</MenuItem>
                        <MenuItem>Collection Point</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>

        <div className='content'>
            <div className='number'>
                <SimpleGrid spacing={4} templateColumns='1fr 1fr 1fr' columnGap={40}>
                    <Card width={400} height={250} borderRadius={8} backgroundColor='#9CFF84'>
                        <CardHeader display='flex' justifyContent='space-between'>
                            <Heading size='md'>Sent Packages</Heading>
                            <LocalPostOfficeOutlinedIcon />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize={50} fontWeight={700}>500</Text>
                        </CardBody>
                    </Card>
                    <Card width={400} height={250} borderRadius={8} backgroundColor='#FF738C'>
                        <CardHeader display='flex' justifyContent='space-between'>
                            <Heading size='md'>Pending Packages</Heading>
                            <LocalShippingOutlinedIcon />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize={50} fontWeight={700}>500</Text>
                        </CardBody>
                    </Card>
                    <Card width={400} height={250} borderRadius={8} backgroundColor='#9EC5FF'>
                        <CardHeader display='flex' justifyContent='space-between'>
                            <Heading size='md'>Received Packages</Heading>
                            <CallReceivedOutlinedIcon />
                        </CardHeader>
                        <CardBody>
                            <Text fontSize={50} fontWeight={700}>500</Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>
            </div>
        </div>
    </div>
  )
}

export default BDashboard;