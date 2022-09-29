import { Footer } from "../../Components/Common/Footer";
import { Navbar } from "../../Components/Common/Navbar";
import { CardButton } from "../../Components/Common/Button";
import { CardContainer } from "../../Components/Common/Card";
import { Text } from "../../Components/Common/Text";
import { Container, Header, HeaderTitle, HeaderBody, Divide, Div, SubTitle, Title } from "./Home.element";
import { getAllCustomerApi } from '../../Components/Container/getApi';
import { useState, useEffect } from 'react';
import { CardList } from "../../Components/Presentation/CardList";

export default function Home() {
    return (
        <Div>
            <Navbar>
                <Title>제목</Title>
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
                    <CardList />
                </CardContainer>
            </Container>
            <Footer>
                Copyright c pablo 2022-2022<br/><br/>
                광고 및 제휴 문의: guswlsakfls@gmail.com
            </Footer>
        </Div>
    );
};