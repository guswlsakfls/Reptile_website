import styled from "styled-components"

export const Footer = styled.div`
    background-color: ${(props: { theme: any; }) => props.theme.color.basis};
    color: white;
    padding: 30px 0px ;
    text-align: center;
    font-size: 15px;
    margin-top: auto;
`