import React, { useContext, useEffect, useState } from 'react';
import "./EPMDashboard.scss";
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';

const EPMDashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [pointInfo, setPointInfo] = useState({});

    useEffect(() => {
        let ignore = false;
        const id = currentUser.epoint;

        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:2504/point/${id}`);
                if (!ignore) {
                    setPointInfo(res.data[0]);
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

    useEffect(() => {
        console.log(pointInfo);
    }, [pointInfo])

    return (
        <div className='bdashboard'>
            <div className='top'>
                <div className='title'>Dashboard</div>
            </div>

            <div className='content'>
                <div className='branch'>{pointInfo.name} (Exchange Point)</div>
                <div className='number'>
                    <SimpleGrid spacing={4} templateColumns='1fr 1fr 1fr' columnGap={40}>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9CFF84'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Sent Packages</Heading>
                                <LocalPostOfficeOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.sentPackage}</Text>
                            </CardBody>
                        </Card>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#FF738C'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Pending Packages</Heading>
                                <LocalShippingOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.pendingPackage}</Text>
                            </CardBody>
                        </Card>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9EC5FF'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Received Packages</Heading>
                                <CallReceivedOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.receivedPackage}</Text>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </div>
            </div>
        </div>
    )
}

export default EPMDashboard;