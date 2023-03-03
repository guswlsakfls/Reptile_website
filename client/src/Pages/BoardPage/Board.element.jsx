import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkButton = styled(Link)`
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 3px;
    color: #000;
    text-decoration: none;
    &:hover {
        background-color: #000;
        color: #fff;
    }
`;

export const Button = styled.button`
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 3px;
    color: #000;
    text-decoration: none;
    &:hover {
        background-color: #000;
        color: #fff;
        cursor: pointer;
    }
`;