import { Navbar, Title } from "../../Components/Common/Navbar";
import { Div } from "../../Components/Common/Body"
import styled from "styled-components"
import {CardButton} from "../../Components/Common/Button"
import { useState, useEffect } from "react";

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

    // dfs로 table.col 값 계산
    function dfsCal(list, res, value, totalLength) {
        if (list.length === 0) {
            return (res);
        }
        let tmpRes = res;
        let value1 = value;
        let value2 = value;
        let tmpListValue = list.shift();
        let tmpList = JSON.parse(JSON.stringify(list));
        value1 += tmpListValue[0];

        if (value1.length === totalLength) {
            tmpRes.push(value1);
        }
        tmpRes = dfsCal(tmpList, tmpRes, value1, totalLength);

        value2 += tmpListValue[1];
        if (value2.length === totalLength) {
            tmpRes.push(value2);
        }
        return tmpRes = dfsCal(list, tmpRes, value2, totalLength);
    }

    // 자식 유전자 계산
    const calculate = (e) => {
        e.preventDefault(); // 이거 왜함?
        let tmpCol = [];
        let tmpRow = [];
        let col = [];
        let row = [];
        let calRes = [];
        for (let i = 0; i < parent1.length; i += 2) {
                tmpCol.push(parent1[i] + parent1[i + 1]);
                tmpRow.push(parent2[i] + parent2[i + 1]);
        }

        // table col, row 계산
        col = dfsCal(tmpCol, [], "", tmpCol.length);
        row = dfsCal(tmpRow, [], "", tmpRow.length);

        // punnett square 계산
        for (let i = 0; i < col.length; i++) {
            for (let j = 0; j < row.length; j++) {
                let tmp = "";
                for (let k = 0; k < col[i].length; k++) {
                    tmp += col[i][k] + row[j][k];
                }
                calRes.push(tmp);
            }
        }

        // ABCD ... xyz 순서로 정렬
        let traitList = [];
        for (let i = 0; i < calRes.length; i++) {
            calRes[i] = calRes[i].split('').sort().join('');
        }

        // 중복 제거 및 추가
        for (let i = 0; i < calRes.length; i++) {
            // 만약 리스트에 없으면 추가
            if (traitList.length === 0) {
                traitList.push({
                    "name": calRes[i],
                    "count": 1
                });
            } else {
                let flag = false;
                for (let j = 0; j < traitList.length; j++) {
                    if (traitList[j].name === calRes[i]) {
                        traitList[j].count += 1;
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    traitList.push({
                        "name": calRes[i],
                        "count": 1
                    });
                }
            }
        }
        console.log(traitList);
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
                <CardButton onClick={ calculate }>계산</CardButton><CardButton>삭제</CardButton>
                <CalResBody>
                    {parent1} x {parent2}
                </CalResBody>
                <ResultBox>
                    {/* {result[0]} */}
                </ResultBox>
            </Body>
        </Div>
    );
};

const Body = styled.div`
    margin-top: 100px;
    text-align: center;
`

const CalResBody = styled.div`
    margin-top: 100px;
    text-align: center;
    font-size: 50px;
`

const ResultBox = styled.div`
    margin-top: 100px;
    text-align: center;
    font-size: 50px;
`