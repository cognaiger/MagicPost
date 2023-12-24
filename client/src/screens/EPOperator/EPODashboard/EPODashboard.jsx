import React, { useContext, useEffect, useState } from 'react';
import "./EPODashboard.scss";
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';

const EPODashboard = () => {
  const { currentPoint } = useContext(AuthContext);
    const [pointInfo, setPointInfo] = useState({});

    useEffect(() => {
        let ignore = false;
        const id = currentPoint.epoint;

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
    }, [currentPoint.epoint]);

    useEffect(() => {
        console.log(pointInfo);
    }, [pointInfo])

    return (
        <div className='epodashboard'>
            <div className='top'>
                <div className='title'>Dashboard</div>
            </div>

            <div className='content'>
                <div className='branch'>{pointInfo.name}</div>
                <div className='number'>
                    <SimpleGrid spacing={4} templateColumns='1fr 1fr' columnGap={80}>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9CFF84' marginLeft={300}>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Successful Delivery</Heading>
                                <LocalPostOfficeOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.suPackage}</Text>
                            </CardBody>
                        </Card>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#FF738C'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Return Packages</Heading>
                                <LocalShippingOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.returnPackage}</Text>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </div>
            </div>
        </div>
    )
}

export default EPODashboard;