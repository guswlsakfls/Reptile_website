import { Footer } from "../../Components/Common/Footer";
import { Navbar, Title } from "../../Components/Common/Navbar";
import { CardButton } from "../../Components/Common/Button";
import { CardContainer } from "../../Components/Common/Card";
import { Text } from "../../Components/Common/Text";
import { Div } from "../../Components/Common/Body";
import { Container, Header, HeaderTitle, HeaderBody, Divide, SubTitle } from "./Home.element";
import { CardList } from "../../Components/Presentation/CardList";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Div>
            <Navbar>
                <Title>도마뱀 사이트</Title>
            </Navbar>
            <Container>
                <Link to="/page1">
                    <Header>
                        <HeaderTitle>
                            모프계산기
                        </HeaderTitle>
                        <HeaderBody>
                            당신의 도마뱀을 계산해 보세요.
                        </HeaderBody>
                    </Header>
                </Link>
                <Divide>
                    <SubTitle>
                        브리더
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