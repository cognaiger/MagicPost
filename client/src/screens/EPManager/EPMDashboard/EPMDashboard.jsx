import React, { useContext, useEffect, useState } from 'react';
import "./EPMDashboard.scss";
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import BarChart from '../../../components/BarChart/BarChart';

const EPMDashboard = () => {
    const { currentPoint } = useContext(AuthContext);
    const [pointInfo, setPointInfo] = useState({});

    const [fakeData, _] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
              label: 'Sent',
              data: [25, 14, 566, 3, 123, 34, 12, 345, 21, 78, 123, 321],
              backgroundColor: 'rgba(86, 181, 168, 0.1)',
              borderColor: 'rgba(86, 181, 168, 1)',
              borderWidth: 1,
            },
            {
              label: 'Pending',
              data: [253, 14, 566, 43, 123, 134, 132, 345, 311, 78, 123, 321],
              backgroundColor: 'rgba(44, 111, 170, 0.1)',
              borderColor: 'rgba(44, 111, 170, 1)',
              borderWidth: 1,
            },
            {
              label: 'Received',
              data: [245, 143, 5, 33, 53, 341, 132, 3, 51, 34, 55, 100],
              backgroundColor: 'rgba(146, 52, 193, 0.1)',
              borderColor: 'rgba(146, 52, 193, 1)',
              borderWidth: 1,
            },
          ],
      })

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
        <div className='bdashboard'>
            <div className='top'>
                <div className='title'>Dashboard</div>
            </div>

            <div className='chart'>
                <BarChart data={fakeData}/>
            </div>

            <div className='content'>
                <div className='branch'>{pointInfo.name}</div>
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