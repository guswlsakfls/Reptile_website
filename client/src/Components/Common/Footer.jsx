import styled from "styled-components"

export const Footer = styled.div`
    background-color: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.black};
    padding: 30px 0px ;
    text-align: center;
    font-size: 15px;
    margin-top: auto;
    border-top: 1px solid gray;
`