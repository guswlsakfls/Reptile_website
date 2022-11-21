import { Body } from "../../Components/Common/Body"
import styled from "styled-components"
import { CardButton } from "../../Components/Common/Button"
import { useState, useEffect } from "react";
import { calculate } from "./CalculateMorph";
import AddMorphName from "./MorphFuc";
import AutoCompleteInput from "./AutoCompleteInput";
import Navbar from "../../Components/Common/Navbar";

export default function CalMorph() {
    const [parent1, setParent1] = useState(""); // 부 유전자
    const [parentList1, setParentList1] = useState([]); // 부 유전자 리스트
    const [parent2, setParent2] = useState(""); // 모 유전자
    const [parentList2, setParentList2] = useState([]); // 모 유전자 리스트
    const [result, setResult] = useState([]); // 결과    

    const deletAllInput = (e) => {
        setParentList1([]);
        setParentList2([]);
    }

    useEffect(() => {

    }, );

    return (
        <>
            <Navbar />
            <Body>
                <Div>
                    <h1>펫 테일게코 계산기</h1><br/>
                    <h2>번식할 때 짝을 이룰 두 부모 모프를 입력하면 계산기가 유전적 가능성을 표시합니다.</h2><br/>
                    <InputContiner>
                        <Ul>
                            <AddMorphName
                                morphList={parentList1}
                                setMorphList={setParentList1}>
                            </AddMorphName>
                            <AutoCompleteInput
                                parent={parent1}
                                setParent={setParent1}
                                parentList={parentList1}
                                setParentList={setParentList1}>
                            </AutoCompleteInput>
                        </Ul>
                    </InputContiner>
                    x
                    <InputContiner>
                        <Ul>
                            <AddMorphName
                                morphList={parentList2}
                                setMorphList={setParentList2}>
                            </AddMorphName>
                            <AutoCompleteInput
                                parent={parent2}
                                setParent={setParent2}
                                parentList={parentList2}
                                setParentList={setParentList2}>
                            </AutoCompleteInput>
                        </Ul>
                    </InputContiner>
                    <CardButton onClick={(e) => {calculate(parentList1, parentList2, setResult, e)} } >계산</CardButton>
                    <CardButton onClick={(e) => {deletAllInput(e)}} >삭제</CardButton>
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
                </Div>
            </Body>
        </>
    );
};

// 인풋 박스
const InputContiner = styled.div`
    width: 250px;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
`

const Ul = styled.ul`
    padding: 0;
    margin: 0;
`

const Datalist = styled.datalist`
    max-height: 20em;
    cursor: pointer;
`

// 여기 까지 연습
const Div = styled.div`
    margin-top: 100px;
    margin-left: 50px;
    margin-right: 50px;
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
