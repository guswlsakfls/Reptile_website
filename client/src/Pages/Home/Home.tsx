import styled from "styled-components";
import { Footer } from "../../Components/Common/Footer";
import { Navbar } from "../../Components/Common/Navbar";
import { CardButton } from "../../Components/Common/Button";
import { CardContainer, CardBox, Card, CardBody, CardHeader, CardText, CardFooter } from "../../Components/Common/Card";
import { Text } from "../../Components/Common/Text";
import { Container, Header, HeaderTitle, HeaderBody, Divide, Div, SubTitle, Title } from "./Home.element";


export default function Home() {
    let list = [];

    let i = 0;
    while (i < 10) {
        list.push(  <CardBox>
                        <Card>
                            <CardBody>
                                <CardHeader>
                                    Title
                                </CardHeader>
                                <CardText>
                                    <Text size={'18px'} margin={'0 0 4px 0;'}>
                                        Body
                                    </Text>
                                    <Text size={'18px'}>
                                        (pc)
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
                    </CardBox>  )
        i = i + 1;
    }

    return (
        <Div>
            <Navbar>
                <Title>심심할때 보는 유튜브 채널 링크 모아보기</Title>
            </Navbar>
            <Container>
                <Header>
                    <HeaderTitle>
                        header
                    </HeaderTitle>
                    <HeaderBody>
                        모프 계산기가 들어갈 것이다.
                    </HeaderBody>
                    <CardButton>
                        <Text size={'20px'}>
                            바로가기
                        </Text>
                    </CardButton>
                </Header>
                <Divide>
                    <SubTitle>
                        박스리스트
                    </SubTitle>
                </Divide>
                <CardContainer>
                    { list }
                </CardContainer>
            </Container>
            <Footer>
                Copyright c pablo 2022-2022<br/><br/>
                광고 및 제휴 문의: guswlsakfls@gmail.com
            </Footer>
        </Div>
    );
};