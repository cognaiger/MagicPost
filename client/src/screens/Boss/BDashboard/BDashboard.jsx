import React, { useEffect, useState } from 'react';
import "./BDashBoard.scss";
import { Button, Card, CardBody, CardHeader, Heading, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import axios from 'axios';
import BarChart from '../../../components/BarChart/BarChart';

const BDashboard = () => {
    const [point, setPoint] = useState();
    const [branchName, setBranchName] = useState();
    const [sentPackage, setSentPackage] = useState(0);
    const [receivedPackage, setReceivedPackage] = useState(0);

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

    console.log(fakeData)

    const chooseBranch = (name, index) => {
        setBranchName(name);
        setSentPackage(point[index].sentPackage);
        setReceivedPackage(point[index].receivedPackage);
    }

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res1 = await axios.get("http://localhost:2504/point", {
                    params: {
                        type: "all"
                    }
                });
                if (!ignore) {
                    setPoint(res1.data);
                    setSentPackage(res1.data[0].sentPackage);
                    setReceivedPackage(res1.data[0].receivedPackage);
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

    return (
        <div className='bdashboard'>
            <div className='top'>
                <div className='title'>Dashboard</div>
                <div className='select'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {branchName ? branchName : "Choose branch"}
                        </MenuButton>
                        {!point ? (
                            <MenuItem>Loading...</MenuItem>
                        ) : (
                            <MenuList>
                                {point.map((el, i) => (
                                    <MenuItem key={i} onClick={() => chooseBranch(el.name, i)}>{el.name}</MenuItem>
                                ))}
                            </MenuList>
                        )}
                    </Menu>
                </div>
            </div>

            <div className='chart'>
                <BarChart data={fakeData}/>
            </div>

            <div className='content'>
                <div className='branch'>{branchName ? branchName : "All"}</div>
                <div className='number'>
                    <SimpleGrid spacing={4} templateColumns='1fr 1fr' columnGap={40}>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9CFF84' marginLeft={350}>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Sent Packages</Heading>
                                <LocalPostOfficeOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{sentPackage}</Text>
                            </CardBody>
                        </Card>
                        <Card width={350} height={200} borderRadius={8} backgroundColor='#9EC5FF'>
                            <CardHeader display='flex' justifyContent='space-between'>
                                <Heading size='md'>Received Packages</Heading>
                                <CallReceivedOutlinedIcon />
                            </CardHeader>
                            <CardBody>
                                <Text fontSize={50} fontWeight={700}>{receivedPackage}</Text>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </div>
            </div>
        </div>
    )
}

export default BDashboard;