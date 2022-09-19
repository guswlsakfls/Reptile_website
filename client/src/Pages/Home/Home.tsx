import styled from "styled-components";

export default function Home() {
    return (
        <Div>
            <Navbar>
                <Title>심심할때 보는 유튜브 채널 링크 모아보기</Title>
            </Navbar>
            <Container>
                <Header>
                    header<br/>
                    여기 설명<br/>
                    <button>보기</button>
                </Header>
                <br/>
                <Divide>
                    <Text>
                        박스리스트
                    </Text>
                </Divide>
                <br/>
                <BoxContainer>
                    box
                </BoxContainer>
            </Container>
        </Div>
    );
};

// css
const BoxContainer = styled.div`
    background-color: gray;
`

const Divide = styled.div`
    border-top: 1px solid RGB(42,42,42);
    border-bottom: 1px solid RGB(42,42,42);
    padding: 20px 0;
`

const Header = styled.header`
    background-color: RGB(42,42,42);
    padding-left: 15px;
`

const Div = styled.div`
    padding-top: 90px;
`

const Navbar = styled.nav`
    border-bottom: 1px solid gray;
    background-color: RGB(42,42,42);
    position: fixed;
    padding: 20px 0rem;
    top: 0;
    right: 0;
    left: 0;
`

const Text = styled.span`
    color: white;
    padding-left: 15px;
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
        border: 1px solid blue;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 960px;
        border: 1px solid blue;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 720px;
        border: 1px solid blue;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        max-width: 540px;
        border: 1px solid blue;
    }
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`
