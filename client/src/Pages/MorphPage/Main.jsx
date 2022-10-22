import { Navbar, Title } from "../../Components/Common/Navbar";
import { Div } from "../../Components/Common/Body"
import styled from "styled-components"
import {CardButton} from "../../Components/Common/Button"
import { useState, useEffect } from "react";
import { calculate } from "./CalculateMorph";

export default function Page1() {
    const [parent1, setParent1] = useState([]); // 부 유전자
    const [parent2, setParent2] = useState([]); // 모 유전자
    const [result, setResult] = useState([]); // 결과

    // 부모 유전자 입력
    const onChangeParent1 = (e) => {
        setParent1(e.target.value);
    }
    const onChangeParent2 = (e) => {
        setParent2(e.target.value);
    }

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <Div>
            <Navbar>
                <Title>모프계산기</Title>
            </Navbar>
            <Body>
                <h1>펫 테일게코 계산기</h1><br/>
                <h2>번식할 때 짝을 이룰 두 부모 모프를 입력하면 계산기가 유전적 가능성을 표시합니다.</h2><br/>
                <input
                    id="text"
                    name="id"
                    placeholder="부 모프를 입력하세요"
                    onChange={onChangeParent1}
                />
                x
                <input
                    id="text"
                    name="id"
                    placeholder="모 모프를 입력하세요."
                    onChange={onChangeParent2}
                />
                <CardButton onClick={(e) => {calculate(parent1, parent2, setResult, e)} } >계산</CardButton><CardButton>삭제</CardButton>
                {/* item output to screen */}
                <ResultBox>
                    <ResultTable>
                        <ResultTableHead>
                            <ResultTableHeadRow>
                                <ResultTableHeadCol>유전자</ResultTableHeadCol>
                                <ResultTableHeadCol>개수</ResultTableHeadCol>
                                <ResultTableHeadCol>확률</ResultTableHeadCol>
                            </ResultTableHeadRow>
                        </ResultTableHead>
                        <ResultTableBody>
                            {result.map((item, index) => (
                                <ResultTableBodyRow key={index}>
                                    <ResultTableBodyCol>{item.visual}{item.hetName}</ResultTableBodyCol>
                                    <ResultTableBodyCol>{item.allCount}</ResultTableBodyCol>
                                    <ResultTableBodyCol>{item.percent}%</ResultTableBodyCol>
                                </ResultTableBodyRow>
                            ))}
                        </ResultTableBody>
                    </ResultTable>
                </ResultBox>
            </Body>
        </Div>
    );
};

const Body = styled.div`
    margin-top: 100px;
    text-align: center;
`

const ResultBox = styled.div`
    margin-top: 100px;
    text-align: center;
    font-size: 50px;
`

const ResultTable = styled.table`
    margin: 0 auto;
    border-collapse: collapse;
    border: 1px solid #000;
`

const ResultTableHead = styled.thead`
    border: 1px solid #000;
`

const ResultTableHeadRow = styled.tr`
    border: 1px solid #000;
`

const ResultTableHeadCol = styled.th`
    border: 1px solid #000;
    padding: 10px;
`

const ResultTableBody = styled.tbody`
    border: 1px solid #000;
`

const ResultTableBodyRow = styled.tr`
    border: 1px solid #000;
`

const ResultTableBodyCol = styled.td`
    border: 1px solid #000;
    padding: 10px;
`
