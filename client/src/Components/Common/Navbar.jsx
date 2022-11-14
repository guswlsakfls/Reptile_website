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
            <Logo onClick={() => navigate("/")}>
                <img src={logo}></img>
            </Logo>
            <div>
            <MenuList>
                <MenuListContent
                isPathMatch={pathname === "/board" ? true : false}
                onClick={() => navigate("/board")}
                >
                자유게시판
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/morph" ? true : false}
                onClick={() => navigate("/morph")}
                >
                모프계산기
                </MenuListContent>
                <MenuListContent
                isPathMatch={pathname === "/login" ? true : false}
                onClick={() => navigate("/login")}
                >
                로그인
                </MenuListContent>
            </MenuList>
            </div>
        </NavContainer>
      </Container>
    </>
  );
};

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

const Container = styled.nav`
    background-color: ${ (props) => props.theme.color.background };
    border-bottom: 1px solid black;
    position: fixed;
    padding: 20px 0px;
    top: 0;
    right: 0;
    left: 0;
`

const Logo = styled.button`
    width: 40px;
    height: 40px;
    border: 0.1px solid black;
    padding-left: 15px;
    background: url("/image/logo.jpg") no-repeat 50% 50%;
    &:hover {
    cursor: pointer;
    }
`;

const MenuList = styled.ul`
    display: flex;
`;

const MenuListContent = styled.li`
    margin-left: 15px;
    color: ${(prop) => (prop.isPathMatch ? "blue" : "black")};
    &:hover {
    cursor: pointer;
    }
`;

export default Navbar;