
export default function BoardList() {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox"></input>
                        </td>
                        <td>1</td>
                        <td>게시글1</td>
                        <td>artistJay</td>
                        <td>2022-03-19</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"></input>
                        </td>
                        <td>2</td>
                        <td>게시글2</td>
                        <td>artistJay</td>
                        <td>2022-03-19</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox"></input>
                        </td>
                        <td>3</td>
                        <td>게시글2</td>
                        <td>artistJay</td>
                        <td>2022-03-19</td>
                    </tr>
                </tbody>
            </table>
            <button>글쓰기</button>
            <button>수정하기</button>
            <button>삭제하기</button>
        </>
    );
};
