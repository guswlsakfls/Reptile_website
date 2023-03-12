import morphList from './morphList.json';

// dfs로 table col row 값 계산
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

// input 리스트 받아서 있는 모프면 데이터 입력
const checkName = (gene, alphaValues) => {
    let inputMorphList = [];
    let inputList = [];

    inputList = gene;

    if (inputList.length === 0) {
        inputMorphList.push({
            "engName": "Normal",
            "alphaCode": 'N',
            "type": "dominant",
            "character": "Normal"
        });
    }
    else {
        for (let i = 0; i < inputList.length; i++) {
        morphList.forEach((item) => {
            // 우성 유전자
            if (item.engName === inputList[i] && item.type === 'dominant') {
                inputMorphList.push({
                    // 영어 or 한글
                    // "engName" : item.engName,
                    "engName" : item.korName,
                    "alphaCode" : String.fromCharCode(alphaValues.uppercase),
                    "type" : item.type,
                    "character" : ""
                });
                alphaValues.uppercase += 1;
                return;
            }
            // 열성 유전자
            else if (item.engName === inputList[i]) {
                inputMorphList.push({
                    // 영어 or 한글
                    // "engName" : item.engName,
                    "engName" : item.korName,
                    "alphaCode" : String.fromCharCode(alphaValues.lowercase),
                    "type" : item.type,
                    "character" : ""
                });
                alphaValues.lowercase += 1;
                return;
            }
            // super 유전자일 경우
            else if (("Super" + item.engName) === inputList[i]) {
                inputMorphList.push({
                    // 영어 or 한글
                    // "engName" : item.engName,
                    "engName" : item.korName,
                    "alphaCode" : String.fromCharCode(alphaValues.uppercase),
                    "type" : item.type,
                    "character" : "Super"
                });
                alphaValues.uppercase += 1;
                return;
            }
            // het 유전자일 경우
            else if (("Het" + item.engName) === inputList[i]) {
                inputMorphList.push({
                    // 영어 or 한글
                    // "engName" : item.engName,
                    "engName" : item.korName,
                    "alphaCode" : String.fromCharCode(alphaValues.lowercase),
                    "type" : item.type,
                    "character" : "Het"
                });
                alphaValues.lowercase += 1;
                return;
            }
        });}
    }

    // 중복 제거, 예시) 오레오, 헷오레오 -> 헷오레오 제거
    let result = inputMorphList.filter((item1, idx1)=>{
        return inputMorphList.findIndex((item2, idx2)=>{
            return item1.engName === item2.engName;
        }) === idx1;
    });
    return (result);
    // return (inputMorphList);
}

// 한국어 -> 영어로 변환
const convertKorToEng = (inputList) => {
    let tmp = JSON.parse(JSON.stringify(inputList)); // 깊은 복사, 화면에 보여지는 원본값 변경 방지
    tmp.forEach((item, i) => {
        morphList.forEach((morph) => {
            if (item.includes(morph.korName)) {
                if (item.includes("슈퍼")){
                    tmp[i] = ("Super" + morph.engName);
                }
                else if (item.includes("헷")){
                    tmp[i] = ("Het" + morph.engName);
                }
                else {
                    tmp[i] = (morph.engName);
                }
            }
        });
    });
    return (tmp);
}

// 자식 유전자 계산
export const calculate = (gene1, gene2, setResult, e, setParentsName1, setParentsName2) => {
    // gene1, gene2 예시) ["오레오", "스트라이프"] 또는 ["Oreo", "Stripe"]

    console.log(gene1);
    console.log(gene2);

    let geneEng1 = convertKorToEng(gene1);
    let geneEng2 = convertKorToEng(gene2);

    console.log(geneEng1);
    console.log(geneEng2);

    e.preventDefault(); // 이거 왜함?
    let parent1;
    let parent2;
    let geneList1 = null;
    let geneList2 = null;
    let alphaValues = {
        "uppercase": 65,
        "lowercase": 97
    };


    geneList1 = checkName(geneEng1, alphaValues); // gnenList1 = {engName: oreo, alphaCode: A, character: super or het}, {engName: stripe, alphaCode: a}
    geneList2 = checkName(geneEng2, alphaValues);


    // console.log 로 디버깅 하면 계산이 다 된 후에 출력되어서 디버깅이 어려움
    // console.log(geneList1);
    // console.log(geneList2);

    // 중복 체크 (부모1, 부모2 에서 중복되는 유전자가 있으면 같은 부모로 간주)
    for (let i = 0; i < geneList1.length; i++) {
        for (let j = 0; j < geneList2.length; j++) {
            if (geneList1[i].engName === geneList2[j].engName) {
                geneList2[j].alphaCode = geneList1[i].alphaCode;;
            }
        }
    }

    // console.log("부모1: ", geneList1);
    // console.log("부모2: ", geneList2);

    let parentsName1 = [];
    // 우성 열성 짝 맞춰주기
    parent1 = geneList1.map((item, index) => { // parent1 = [Aa, aa]
        parentsName1.push(item.engName);

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
    
    let parentsName2 = [];
    parent2 = geneList2.map((item, index) => {
        parentsName2.push(item.engName);

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

    // console.log(parentsName1);
    // console.log(parentsName2);

    setParentsName1(parentsName1);
    setParentsName2(parentsName2);

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
    // console.log(tmpCol);
    // console.log(tmpRow);

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

    console.log(calRes);

    // 총 유전자 경우의 수
    let totalLength = calRes.length;
    // console.log(calRes);

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
                "engName": "",
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
                    "engName": "",
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
            if (mixGeneList[i].engName === item.engName) {
                flag = true;
            }
        }
        if (flag === false) {
            mixGeneList.push(item);
        }
    });

    // console.log(mixGeneList);
    // het 리스트만 뽑아서 나중에 %het 계산
    let hetGeneList = [];
    mixGeneList.forEach((item) => {
        if (item.type === "recessive") {
            if (hetGeneList === []) {
                hetGeneList.push({
                    "engName": item.engName,
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
        let tmp = [];
        let maxLength = traitList[i].alphaCode.length;

        for (let j = 0; j < maxLength; j++) {
            for (let k = 0; k < mixGeneList.length; k++) {
                if (traitList[i].alphaCode[j] === mixGeneList[k].alphaCode) {
                    // character and 우성
                    // 하나가 대문자 이면
                    if (traitList[i].alphaCode[j] === traitList[i].alphaCode[j].toUpperCase()) {
                        // 우성에서 마지막 알파벳이면
                        if (maxLength === j + 1 || traitList[i].alphaCode[j] !== traitList[i].alphaCode[j + 1]) {
                            tmp.push(mixGeneList[k].engName);
                            break;
                        }
                        // 우성 대문자 두개면
                        else if (traitList[i].alphaCode[j] === traitList[i].alphaCode[j + 1]) {
                            tmp.push("Super " + mixGeneList[k].engName);
                            j += 1;
                            break;
                        }
                        // 우성 대문자 하고 뒤에 'N' 이면
                        else if (traitList[i].alphaCode[j + 1] === 'N') {
                            tmp.push(mixGeneList[k].engName);
                            j += 1;
                            break;
                        }
                    }
                    // 발현되는 열성
                    else if (traitList[i].alphaCode[j+1] !== null && traitList[i].alphaCode[j] === traitList[i].alphaCode[j+1]) {
                        tmp.push(mixGeneList[k].engName);
                        j += 1;
                        break;
                    }
                }
            }
        }
        // console.log(tmp)
        traitList[i].engName = tmp;
    }
    
    // 발현되는 모프 별로 분류 및 대표 인덱스 찾기 ex) morphList = { {engName: "Oreo;Stipe", "allCount": 3}, {engName: "Stripe", "allCount": 3} }
    let morphList = [{
        "visual" : traitList[0].engName,
        "hetName" : [],
        "alphaCode" : traitList[0].alphaCode,
        "allCount" : traitList[0].count,
        "percent" : ""
    }];
    let morphIndex = [0];
    let traitListLength = traitList.length;

    // 맨처음 나오는 모프 넣어 준다.
    // visual 이름이 같으면 allCount 더해주고, 다르면 morphList에 추가
    // 대표 모프 인덱스 찾기
    for (let i = 1; i < traitListLength; i++) {
        let flag = false;
        
        for (let j = 0; j < morphList.length; j++) {
            // visual에 있는 리스트 모든 이름이 같으면 allCount 더해주고, 다르면 morphList에 추가
            let visualLength = morphList[j].visual.length;
            let traitLength = traitList[i].engName.length;
            let count = 0;
            for (let k = 0; k < visualLength; k++) {
                for (let l = 0; l < traitLength; l++) {
                    if (morphList[j].visual[k] === traitList[i].engName[l]) {
                        count += 1;
                    }
                }
            }
            if (count === visualLength && count === traitLength) {
                morphList[j].allCount += traitList[i].count;
                flag = true;
                break;
            }
        }
        if (flag === false) {
            morphList.push({
                "visual": traitList[i].engName,
                "hetName": "",
                "alphaCode": traitList[i].alphaCode,
                "allCount": traitList[i].count,
                "percent": ""
            });
            morphIndex.push(i);
        }
    }

    console.log(morphList);
    console.log(traitList);

    // 대표 모프 het 계산
    // 대표 모프 뽑기 (여기서 hetGeneList 사용), hetGeneList 사용할 필요가 없나?
    let traitMaxLength = traitList.length;
    for (let i = 0; i < morphIndex.length; i++) {
        let tmpHet = [];
        let het100 = [];
        let het66 = [];
        let het50 = [];        
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
            // console.log(item.het);
            hetGeneList.forEach((hetGene) => {
                if (item.alphaCode === hetGene.alphaCode) {
                    if (item.het === 100) {
                        het100.push("100% 헷 " + hetGene.engName);
                    }
                    else if (item.het === 67) {
                        het66.push("66% 헷 " + hetGene.engName);
                    }
                    else if (item.het === 50) {
                        het50.push("50% 헷 " + hetGene.engName);
                    }
                }
            });
        });

        // console.log(het100);
        // console.log(het66);
        // console.log(het50);
        // het 100, 66, 50 순서대로 리스트 이어 붙이기
        morphList[i].hetName = [
            ...het100, ...het66, ...het50
        ];
    }

    // 각 콤보 모프 확률 계산
    for (let i = 0; i < morphList.length; i++) {
        morphList[i].percent = (morphList[i].allCount / totalLength) * 100;
    }

    console.log(morphList);
    setResult(morphList); // morphList는 리스트로 받아와야 한다.
}
