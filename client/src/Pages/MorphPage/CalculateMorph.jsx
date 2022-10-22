import morphList from './morphList.json';

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
    let inputMorphList = [];
    let inputList = [];

    // inputList에 input문자열을 배열로 넣기
    inputList = gene.split(';');
    console.log(inputList.length);

    if (inputList.length === 1) {
        inputMorphList.push({
            "name": "Normal",
            "alphaCode": 'N',
            "type": "dominant",
            "character": "Normal"
        });
    }
    else {
        for (let i = 0; i < inputList.length; i++) {
        morphList.forEach((item) => {
            // 우성 유전자
            if (item.name === inputList[i] && item.type === 'dominant') {
                inputMorphList.push({
                    "name" : item.name,
                    "alphaCode" : String.fromCharCode(alphaValues.uppercase),
                    "type" : item.type,
                    "character" : ""
                });
                alphaValues.uppercase += 1;
                return;
            }
            // 열성 유전자
            else if (item.name === inputList[i]) {
                inputMorphList.push({
                    "name" : item.name,
                    "alphaCode" : String.fromCharCode(alphaValues.lowercase),
                    "type" : item.type,
                    "character" : ""
                });
                alphaValues.lowercase += 1;
                return;
            }
            // super 유전자일 경우
            else if (("Super" + item.name) === inputList[i]) {
                inputMorphList.push({
                    "name" : item.name,
                    "alphaCode" : String.fromCharCode(alphaValues.uppercase),
                    "type" : item.type,
                    "character" : "Super"
                });
                alphaValues.uppercase += 1;
                return;
            }
            // het 유전자일 경우
            else if (("Het" + item.name) === inputList[i]) {
                inputMorphList.push({
                    "name" : item.name,
                    "alphaCode" : String.fromCharCode(alphaValues.lowercase),
                    "type" : item.type,
                    "character" : "Het"
                });
                alphaValues.lowercase += 1;
                return;
            }
        });}
    }
    return (inputMorphList);
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
        "lowercase": 97
    };

    geneList1 = checkName(gene1, alphaValues); // gnenList1 = {name: oreo, alphaCode: A, character: super or het}, {name: stripe, alphaCode: a}
    geneList2 = checkName(gene2, alphaValues);
    console.log(geneList1);
    console.log(geneList2);

    // 중복 체크 (중복되는 유전자가 있으면 같은 부모로 간주)
    for (let i = 0; i < geneList1.length; i++) {
        for (let j = 0; j < geneList2.length; j++) {
            if (geneList1[i].name === geneList2[j].name) {
                geneList2[j].alphaCode = geneList1[i].alphaCode;;
            }
        }
    }

    // 우성 열성 짝 맞춰주기
    parent1 = geneList1.map((item, index) => { // parent1 = [Aa, aa]
        // check uppercase
        const checkUpperLower = item.alphaCode;
        const checkChar = item.character;

        if (checkUpperLower === checkUpperLower.toUpperCase()) {
            if (checkChar === "Super") {
                return (checkUpperLower + checkUpperLower);
            }
            else {
                return (checkUpperLower + 'N');
            }
        }
        else {
            if (checkChar === "Het") {
                return (checkUpperLower + 'n');
            }
            else {
                return (checkUpperLower + checkUpperLower);
            }
        }
    }).toString();
    parent1 = parent1.replace(/,/g, '');

    parent2 = geneList2.map((item, index) => {
        const checkUpperLower = item.alphaCode;
        const checkChar = item.character;

        if (checkUpperLower === checkUpperLower.toUpperCase()) {
            if (checkChar === "Super") {
                return (checkUpperLower + checkUpperLower);
            }
            else {
                return (checkUpperLower + 'N');
            }
        }
        else {
            if (checkChar === "Het") {
                return (checkUpperLower + 'n');
            }
            else {
                return (checkUpperLower + checkUpperLower);
            }
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
    console.log(tmpCol);
    console.log(tmpRow);
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
    // 총 유전자 경우의 수
    let totalLength = calRes.length;
    console.log(calRes);

    // ABCD ... xyz 순서로 정렬
    for (let i = 0; i < calRes.length; i++) {
        calRes[i] = calRes[i].split('').sort().join('');
    }
    
    let traitList = [];
    // 중복 제거
    for (let i = 0; i < calRes.length; i++) {
        // 처음에 리스트에 없으면 추가
        if (traitList.length === 0) {
            traitList.push({
                "alphaCode": calRes[i],
                "name": "",
                "percent": 0,
                "count": 1
            });
        }
        else {
            // 중복 카운터
            let flag = false;
            for (let j = 0; j < traitList.length; j++) {
                if (traitList[j].alphaCode === calRes[i]) {
                    traitList[j].count += 1;
                    flag = true;
                    break;
                }
            }
            // 중복이 아니면 추가
            if (!flag) {
                traitList.push({
                    "alphaCode": calRes[i],
                    "name": "",
                    "count": 1,
                    "percent": 0
                });
            }
        }
    }

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

    console.log(mixGeneList);
    // het 리스트만 뽑아서 나중에 %het 계산
    let hetGeneList = [];
    mixGeneList.forEach((item) => {
        if (item.type === "recessive") {
            if (hetGeneList === []) {
                hetGeneList.push({
                    "name": item.name,
                    "alphaCode": item.alphaCode,
                    "character": item.character
                });
            }
            else {
                hetGeneList.push(item);
            }
        }
    });

    // 알파벳 이름으로 매치(character, het 붙이기)
    for (let i = 0; i < traitList.length; i++) {
        let tmp = "";
        let maxLength = traitList[i].alphaCode.length;

        for (let j = 0; j < maxLength; j++) {
            for (let k = 0; k < mixGeneList.length; k++) {
                if (traitList[i].alphaCode[j] === mixGeneList[k].alphaCode) {
                    // character and 우성
                    // 하나가 대문자 이면
                    if (traitList[i].alphaCode[j] === traitList[i].alphaCode[j].toUpperCase()) {
                        // 우성에서 마지막 알파벳이면
                        if (maxLength === j + 1 || traitList[i].alphaCode[j] !== traitList[i].alphaCode[j + 1]) {
                            tmp += mixGeneList[k].name + ';';
                            break;
                        }
                        // 우성 대문자 두개면
                        else if (traitList[i].alphaCode[j] === traitList[i].alphaCode[j + 1]) {
                            tmp += "Super " + mixGeneList[k].name + ';';
                            j += 1;
                            break;
                        }
                        // 우성 대문자 하고 뒤에 'N' 이면
                        else if (traitList[i].alphaCode[j + 1] === 'N') {
                            tmp += mixGeneList[k].name + ';';
                            j += 1;
                            break;
                        }
                    }
                    // 발현되는 열성
                    else if (traitList[i].alphaCode[j+1] !== null && traitList[i].alphaCode[j] === traitList[i].alphaCode[j+1]) {
                        tmp += mixGeneList[k].name + ';';
                        j += 1;
                        break;
                    }
                }
            }
        }
        traitList[i].name = tmp;
    }
    
    // 발현되는 모프 별로 분류 및 대표 인덱스 찾기 ex) morphList = { {name: "Oreo;Stipe", "allCount": 3}, {name: "Stripe", "allCount": 3} }
    let morphList = [{
        "visual" : traitList[0].name,
        "hetName" : "",
        "alphaCode" : traitList[0].alphaCode,
        "allCount" : traitList[0].count,
        "percent" : ""
    }];
    let morphIndex = [0];
    let traitListLength = traitList.length;

    // 맨처음 나오는 모프 넣어 준다.
    for (let i = 1; i < traitListLength; i++) {
        let flag = false;
        
        for (let j = 0; j < morphList.length; j++) {
            if (morphList[j].visual === traitList[i].name) {
                morphList[j].allCount += traitList[i].count;
                flag = true;
                break;
            }
        }
        if (flag === false) {
            morphList.push({
                "visual": traitList[i].name,
                "hetName": "",
                "alphaCode": traitList[i].alphaCode,
                "allCount": traitList[i].count,
                "percent": ""
            });
            morphIndex.push(i);
        }
    }

    // 대표 모프 het 계산
    // 대표 모프 뽑기 (여기서 hetGeneList 사용), hetGeneList 사용할 필요가 없나?
    let traitMaxLength = traitList.length;
    for (let i = 0; i < morphIndex.length; i++) {
        let tmpHet = [];
        let het100 = "";
        let het66 = "";
        let het50 = "";        
        let alphaMaxLength = traitList[morphIndex[i]].alphaCode.length;

        // 대표 모프 알파벳 코드에서 het 계산
        for (let k = 0; k < alphaMaxLength; k++) {
            // 소문자일 경우
            if (traitList[morphIndex[i]].alphaCode[k] !== traitList[morphIndex[i]].alphaCode[k].toUpperCase()) {
                // 소문자, 다음 알파벳이 같지 않은 경우 예) aa 인 경우 한번더 건너 뛴다.
                if ((k + 1) !== alphaMaxLength && traitList[morphIndex[i]].alphaCode[k] === traitList[morphIndex[i]].alphaCode[k + 1]) {
                    k += 1;
                }
                // 마지막 문자인 경우인데 n 이 아닌 경우
                else if (traitList[morphIndex[i]].alphaCode[k] !== 'n') {

                    let tmpAlphaCode = traitList[morphIndex[i]].alphaCode[k];
                    let tmpCount = 0;
                    let tmpTotalCount = 0;

                    // het열성, 모든 유전자유형 모프에서 확률 계산
                    for (let j = 0; j < traitMaxLength; j++) {
                        // 발현되지 않은 모프유형에서, %Het =  해당 알파벳이 있는 개수 / 발현되지 않은 모프유형의 총 개수
                        if (traitList[j].alphaCode.includes(tmpAlphaCode + tmpAlphaCode) === true) {
                            continue ;
                        }
                        else if (traitList[j].alphaCode.includes(tmpAlphaCode)) {
                            tmpCount += traitList[j].count;
                            tmpTotalCount += traitList[j].count;
                        }
                        else {
                            tmpTotalCount += traitList[j].count;
                        }
                    }
                    // %Het 계산
                    tmpHet.push({
                        "alphaCode": tmpAlphaCode,
                        "het" : Math.round((tmpCount / tmpTotalCount) * 100)
                    });
                }
            }
        }

        // %Het 100, 66, 50 분류
        tmpHet.forEach((item) => {
            console.log(item.het);
            hetGeneList.forEach((hetGene) => {
                if (item.alphaCode === hetGene.alphaCode) {
                    if (item.het === 100) {
                        het100 += hetGene.name + ' ';
                    }
                    else if (item.het === 67) {
                        het66 += hetGene.name + ' ';
                    }
                    else if (item.het === 50) {
                        het50 += hetGene.name + ' ';
                    }
                }
            });
        });

        // 대표 모프 이름에 %Het 붙이기
        if (het100 !== "") {
            morphList[i].hetName += "100% Het " + het100;
        }
        if (het66 !== "") {
            morphList[i].hetName += "66% Het " + het66;
        }
        if (het50 !== "") {
            morphList[i].hetName += "50% Het " + het50;
        }
        console.log(het100);
        console.log(het66);
        console.log(het50);
    }
    
    // 각 콤보 모프 확률 계산
    for (let i = 0; i < morphList.length; i++) {
        morphList[i].percent = (morphList[i].allCount / totalLength) * 100;
    }

    console.log(morphList);
    setResult(morphList);
}