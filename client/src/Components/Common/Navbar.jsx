import styled from "styled-components"

export const Navbar = styled.nav`
    background-color: ${ (props) => props.theme.color.background };
    border-bottom: 1px solid black;
    position: fixed;
    padding: 20px 0rem;
    top: 0;
    right: 0;
    left: 0;
`

export const Title = styled.nav`
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
    color: ${ (props) => props.theme.color.text };
    font-size: 30px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
`