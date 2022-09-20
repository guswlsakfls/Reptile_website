import styled from "styled-components"

export const Navbar = styled.nav`
    background-color: ${ (props: {theme: any;}) => props.theme.color.basis };
    position: fixed;
    padding: 20px 0rem;
    top: 0;
    right: 0;
    left: 0;
`