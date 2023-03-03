import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../logo.svg"

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
        <Container>
            <NavContainer>
                <MenuList>
                    <MenuListContent
                    onClick={() => navigate("/")}
                    >
                        <Logo>
                            <img src={logo}></img>
                        </Logo>
                    </MenuListContent>
                    <MenuListContent
                    isPathMatch={pathname === "/" ? true : false} // 홈화면일때 타이틀 색깔 바뀌는거도 괜찮을 듯?
                    onClick={() => navigate("/")}
                    >
                        <TitleAuto>
                            KoLab
                        </TitleAuto>
                    </MenuListContent>
                </MenuList>
                <MenuList>
                    <MenuListContent
                        isPathMatch={pathname === "/board/list" ? true : false}
                        onClick={() => navigate("/board/list?table=free-board")}
                    >
                        로그인
                    </MenuListContent>
                    <MenuListContent
                        isPathMatch={pathname === "/board/list" ? true : false}
                        onClick={() => navigate("/board/list?table=free-board")}
                    >
                        회원가입
                    </MenuListContent>
                </MenuList>
            </NavContainer>
        </Container>
        <Container>
        <NavContainer>
            {/* <MenuList>
                <MenuListContent
                onClick={() => navigate("/")}
                >
                    <Logo>
                        <img src={logo}></img>
                    </Logo>
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/" ? true : false} // 홈화면일때 타이틀 색깔 바뀌는거도 괜찮을 듯?
                onClick={() => navigate("/")}
                >
                    <TitleAuto>
                        KoLab
                    </TitleAuto>
                </MenuListContent>
            </MenuList> */}
            <MenuList>
                <MenuListContent
                isPathMatch={pathname === "/board/list" ? true : false}
                onClick={() => navigate("/board/list?table=free-board")}
                >
                자유게시판
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/morph/cal" ? true : false}
                onClick={() => navigate("/morph/cal")}
                >
                모프계산기
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/morph/view" ? true : false}
                onClick={() => navigate("/morph/view")}
                >
                모프소개
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/login" ? true : false}
                onClick={() => navigate("/login")}
                >
                </MenuListContent>
            </MenuList>
        </NavContainer>
        </Container>
    </>
  );
};

const Container = styled.nav`
    background-color: ${ (props) => props.theme.color.background };
    border-bottom: 1px solid black;
    /* position: fixed;  네비바 위에 고정되서 따라오게끔  */
    padding: 10px 0px;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
`

const NavContainer = styled.div`
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`;


const Logo = styled.button`
    width: 40px;
    height: 40px;
    border: 0.1px solid black;
    background: url("/image/logo.jpg") no-repeat 50% 50%;
    &:hover {
    cursor: pointer;
    }
`;

const MenuList = styled.ul`
    display: flex;
`;

const MenuListContent = styled.li`
    margin-left: 8px;
    margin-right: 8px;
    color: ${(prop) => (prop.isPathMatch ? "blue" : "black")};
    &:hover {
    cursor: pointer;
    }
`;

const TitleAuto = styled.div`
    font-size: 21px;
    font-weight: bold;
    margin-top: 10px;
`;

export default Navbar;