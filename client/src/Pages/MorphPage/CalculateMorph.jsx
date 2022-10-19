import gekoMorph from './gekoMorph.json';

// dfs로 table.col 값 계산
export function dfsCal(list, res, value, totalLength) {
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

const checkName = (gene, alphaValues) => {
    let res = [];
    let gekoList = [];
    let inputList = [];

    // inputList에 input문자열을 배열로 넣기
    inputList = gene.split(';');

    for (let i = 0; i < inputList.length; i++) {
        gekoMorph.forEach((item) => {
            if (item.name === inputList[i]) {
                if (item.type === 'dominant') {
                    gekoList.push({
                        "name" : item.name,
                        "type" : String.fromCharCode(alphaValues.uppercase),
                    });
                    alphaValues.uppercase += 1;
                }
                else if (item.type === 'recessive') {
                    gekoList.push({
                        "name" : item.name,
                        "type" : String.fromCharCode(alphaValues.lowercase),
                    });
                    alphaValues.lowercase += 1;
                }
            }
        });
    }
    return (gekoList);
}

// 자식 유전자 계산
export const calculate = (gene1, gene2, setResult, e) => {
    // gene1, gene2 예시) oreo;stripe, stripe

    e.preventDefault(); // 이거 왜함?
    let parent1;
    let parent2;
    let geneList1 = null;
    let geneList2 = null;
    let alphaValues = {
        "uppercase": 65,
        "lowercase": 97,
    };

    geneList1 = checkName(gene1, alphaValues); // gnenList1 = {name: oreo, type: A}, {name: stripe, type: a}
    // console.log(geneList1);
    geneList2 = checkName(gene2, alphaValues);
    // console.log(geneList2);

    // 중복 체크 (중복되는 유전자가 있으면 같은 부모로 간주)
    for (let i = 0; i < geneList1.length; i++) {
        for (let j = 0; j < geneList2.length; j++) {
            if (geneList1[i].name === geneList2[j].name) {
                geneList2[j].type = geneList1[i].type;;
            }
        }
    }
    // console.log(geneList1);
    // console.log(geneList2);

    parent1 = geneList1.map((item, index) => { // parent1 = [Aa, aa]
        // check uppercase
        let checkUpperLower = item.type;
        if (checkUpperLower === checkUpperLower.toUpperCase()) { 
            return (checkUpperLower + 'N');
        }
        else {
            return (checkUpperLower + checkUpperLower);
        }
    }).toString();
    parent1 = parent1.replace(/,/g, '');

    parent2 = geneList2.map((item, index) => {
        // check uppercase
        let checkUpperLower = item.type;
        if (checkUpperLower === checkUpperLower.toUpperCase()) { 
            return (checkUpperLower + 'N');
        }
        else {
            return (checkUpperLower + checkUpperLower);
        }
    }).toString();
    parent2 = parent2.replace(/,/g, '');

    let tmpCol = [];
    let tmpRow = [];
    let col = [];
    let row = [];
    let calRes = [];

    for (let i = 0; i < parent1.length; i += 2) {
            tmpCol.push(parent1[i] + parent1[i + 1]);
    }
    for (let i = 0; i < parent2.length; i += 2) {
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
                tmp += col[i][k];
            }
            for (let k = 0; k < row[j].length; k++) {
                tmp += row[j][k];
            }
            calRes.push(tmp);
        }
    }

    // ABCD ... xyz 순서로 정렬
    let traitList = [];
    for (let i = 0; i < calRes.length; i++) {
        calRes[i] = calRes[i].split('').sort().join('');
    }

    // 중복 제거
    for (let i = 0; i < calRes.length; i++) {
        // 만약 리스트에 없으면 추가
        if (traitList.length === 0) {
            traitList.push({
                "name": calRes[i],
                "count": 1,
                "percent": 0
            });
        }
        else {
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

    // 확률 계산
    for (let i = 0; i < traitList.length; i++) {
        traitList[i].percent = (traitList[i].count / calRes.length) * 100;
    }

    // 이름 매치
    // console.log(traitList);
    // console.log(geneList1);

    // geneList1, geneList2 중복 제거, 알파벳과 이름 매치시키기 위해
    let mixGeneList = [];
    geneList1.forEach((item) => {
        mixGeneList.push(item);
    });
    geneList2.forEach((item) => {
        let flag = false;
        for (let i = 0; i < mixGeneList.length; i++) {
            if (mixGeneList[i].name === item.name) {
                flag = true;
            }
        }
        if (flag === false) {
            mixGeneList.push(item);
        }
    });
    // console.log(mixGeneList);

    console.log(traitList);
    // 알파벳 이름으로 매치(super, het 붙이기)
    for (let i = 0; i < traitList.length; i++) {
        let tmp = "";
        let tmpHet = "";
        let maxLength = traitList[i].name.length;

        for (let j = 0; j < maxLength; j++) {
            for (let k = 0; k < mixGeneList.length; k++) {
                if (traitList[i].name[j] === mixGeneList[k].type) {
                    // super and 우성
                    // 하나가 대문자 이면
                    if (traitList[i].name[j] === traitList[i].name[j].toUpperCase()) {
                        // 우성에서 마지막 알파벳이면
                        if (maxLength === j + 1 || traitList[i].name[j] !== traitList[i].name[j + 1]) {
                            tmp += mixGeneList[k].name + ';';
                            break;
                        }
                        // 우성 대문자 두개면 
                        else if (traitList[i].name[j] === traitList[i].name[j + 1]) {
                            tmp += "super " + mixGeneList[k].name + ';';
                            j += 1;
                            break;
                        }
                        // 우성 대문자 하고 뒤에 'N' 이면
                        else if (traitList[i].name[j + 1] === 'N') {
                            tmp += mixGeneList[k].name + ';';
                            j += 1;
                            break;
                        }
                    }
                    // 열성 and 100%het
                    else {
                        if (traitList[i].name[j] !== traitList[i].name[j+1]) {
                            tmpHet += mixGeneList[k].name + ' ';
                            break;
                        }
                        if (traitList[i].name[j+1] !== null && traitList[i].name[j] === traitList[i].name[j+1]) {
                            tmp += mixGeneList[k].name + ';';
                            j += 1;
                            break;
                        }
                    }
                }
            }
        }
        traitList[i].name = tmp;
        if (tmpHet !== "") {
            traitList[i].name += "100% Het " + tmpHet;
        }
    }
    // console.log(traitList);
    setResult(traitList);
}