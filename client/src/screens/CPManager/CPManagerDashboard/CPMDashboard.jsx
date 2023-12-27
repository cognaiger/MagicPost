import React, { useContext, useEffect, useState } from 'react';
import "./CPMDashboard.scss";
import { AuthContext } from '../../../context/authContext';
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import axios from 'axios';
import BarChart from '../../../components/BarChart/BarChart';

const CPMDashboard = () => {
    const { currentPoint } = useContext(AuthContext);
    const [pointInfo, setPointInfo] = useState();

    const [fakeData, _] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Incoming',
                data: [25, 14, 566, 3, 123, 34, 12, 345, 21, 78, 123, 321],
                backgroundColor: 'rgba(86, 181, 168, 0.1)',
                borderColor: 'rgba(86, 181, 168, 1)',
                borderWidth: 1,
            },
            {
                label: 'Outgoing',
                data: [253, 14, 566, 43, 123, 134, 132, 345, 311, 78, 123, 321],
                backgroundColor: 'rgba(44, 111, 170, 0.1)',
                borderColor: 'rgba(44, 111, 170, 1)',
                borderWidth: 1,
            }
        ],
    })

    useEffect(() => {
        let ignore = false;
        const id = currentPoint.cpoint;

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

    if (!pointInfo) {
        return (
            <div>loading...</div>
        )
    }


    return (
        <div className='cpmdashboard'>
            <div className='top'>
                <div className='title'>Dashboard</div>
            </div>

            <div className='content'>
                <div className='branch'>{pointInfo.name}</div>
                <div className='number'>
                    <SimpleGrid spacing={4} templateColumns='1fr 1fr' columnGap={40}>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9CFF84' ml={200}>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Incoming Packages</Heading>
                                <CallReceivedOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.receivedPackage}</Text>
                            </CardBody>
                        </Card>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9EC5FF'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Outgoing Packages</Heading>
                                <CallMadeOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{pointInfo.sentPackage}</Text>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </div>

                <div className='chart'>
                    <BarChart data={fakeData} />
                </div>
            </div>
        </div>
    )
}

export default CPMDashboard;