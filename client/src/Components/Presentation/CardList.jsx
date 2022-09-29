import { CardBox, Card, CardBody, CardHeader, CardText, CardFooter } from "../Common/Card";
import { Text } from "../Common/Text";
import { CardButton } from "../Common/Button";
import { useEffect, useState } from "react";
import { getAllCustomerApi } from '../Container/getApi';


export function CardList() {
    const [customers, setCustomers] = useState([{id: 0, title: '', body: ''}]);

    useEffect(() => {
        getAllCustomerApi()
        .then(res => {setCustomers(res);})
        .catch(err => console.log(err));
    }, [])

    const list = (title, body, id) => [
        <div key={id}>
            <CardBox>
                    <Card>
                        <CardBody>
                            <CardHeader>
                                { title }
                            </CardHeader>
                            <CardText>
                                <Text size={'18px'} margin={'0 0 4px 0;'}>
                                    { body }
                                </Text>
                                <Text size={'18px'}>
                                    ({id})
                                </Text>
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <CardButton>
                                <Text size = {'15px'}>
                                    바로가기
                                </Text>
                            </CardButton>
                        </CardFooter>
                    </Card>
            </CardBox>
        </div>
    ];
    
    return (
        <>
            { customers.map((v) => list(v.title, v.body, v.id))}
        </>
    )
}