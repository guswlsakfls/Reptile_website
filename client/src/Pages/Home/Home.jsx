import { Footer } from "../../Components/Common/Footer";
import { CardContainer } from "../../Components/Common/Card";
import { Body, NavContainer } from "../../Components/Common/Body";
import { Header, HeaderTitle, HeaderBody, Divide, SubTitle } from "./Home.element";
import { CardList } from "../../Components/Presentation/CardList";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Body>
                <NavContainer>
                    <Link to="/morph">
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
                </NavContainer>
                <Footer>
                    Copyright c pablo 2022-2022<br/><br/>
                    광고 및 제휴 문의: guswlsakfls@gmail.com
                </Footer>
            </Body>
        </>
    );
};