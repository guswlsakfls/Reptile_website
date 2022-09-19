import { AnyTxtRecord } from "dns";
import styled from "styled-components";

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
                    <Headerbody>
                        모프 계산기가 들어갈 것이다.
                    </Headerbody>
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

// css
const mainColor = `RGB(42,42,42)`;
const backColor = `RGB(23,23,23)`;
const cardFooterColor = `RGB(60,60,60)`;

const CardHeader = styled.div`
    font-size: 30px;
    color: white;
    margin-bottom: 10px;
    font-weight: 500;
`

const HeaderTitle = styled.h1`
    font-size: 60px;
    margin-bottom: 20px;
`

const Headerbody = styled.p`
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 15px;
`

const Text = styled.div`
    color: ${(props: { color: any; }) => props.color || 'white'};;
    font-size: ${(props: { size: any; }) => props.size || '1rem' };
    margin: ${(props: {margin: any;}) => props.margin || '0'};
`

const Footer = styled.div`
    background-color: ${mainColor};
    color: white;
    padding: 30px 0px ;
    text-align: center;
    font-size: 15px;
`

const CardButton = styled.button`
    color: white;
    background-color: orange;
    border-radius: 0.3rem;
    padding: 7px 13px;
`

const CardBody = styled.div`
    padding: 20px;
`

const CardText = styled.div`
    font-size: 1rem;
    color: white;
`

const CardFooter = styled.div`
    background-color: ${cardFooterColor};
    padding: 15px 0;
    border-radius: 0px 0px 5px 5px;
`

const CardBox = styled.div`
    @media (min-width: 1200px) {
        max-width: 1140px;
        flex-basis: 25%;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 960px;
        flex-basis: 33.33%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 720px;
        flex-basis: 50%;
    }
    @media (max-width: 767px) {
        max-width: 540px;
        flex-basis: 100%;
    }
    background-color: ${backColor};
    margin-bottom: 30px;
    padding: 0 15px;
    `
    
const Card = styled.div`
    background-color: ${mainColor};
    border-radius: 5px;
    text-align: center;
`

const CardContainer = styled.div`
    background-color: ${backColor};
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`

const Divide = styled.div`
    border-top: 1px solid ${mainColor};
    border-bottom: 1px solid ${mainColor};
    padding: 15px 0;
    margin-top: 50px;
    margin-bottom: 15px;
`

const Header = styled.header`
    background-color: ${mainColor};
    color: white;
    padding: 60px 15px;
`

const Div = styled.div`
    padding-top: 90px;
`

const Navbar = styled.nav`
    background-color: ${mainColor};
    position: fixed;
    padding: 20px 0rem;
    top: 0;
    right: 0;
    left: 0;
`

const SubTitle = styled.span`
    color: white;
    padding-left: 15px;
    font-size: 15px;
    font-weight: 700;
`

const Title = styled.nav`
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 960px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 720px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        max-width: 540px;
    }
    color: white;
    font-size: 30px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`
const Container = styled.div`
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 960px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 720px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        max-width: 540px;
    }
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 0 15px;
`
