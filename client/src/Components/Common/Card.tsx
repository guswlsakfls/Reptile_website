import styled from "styled-components";

export const CardContainer = styled.div`
    background-color: ${(props: {theme: any;}) => props.theme.color.background};
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`
export const CardBox = styled.div`
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
    background-color: ${(props: {theme: any;}) => props.theme.color.background};
    margin-bottom: 30px;
    padding: 0 15px;
`

export const Card = styled.div`
    background-color: ${(props: {theme: any;}) => props.theme.color.basis};
    border-radius: 5px;
    text-align: center;
`

export const CardBody = styled.div`
    padding: 20px;
`

export const CardHeader = styled.div`
    font-size: 30px;
    color: white;
    margin-bottom: 10px;
    font-weight: 500;
`

export const CardText = styled.div`
    font-size: 1rem;
    color: white;
`

export const CardFooter = styled.div`
    background-color: ${(props: {theme: any;}) => props.theme.color.cardFooter};
    padding: 15px 0;
    border-radius: 0px 0px 5px 5px;
`