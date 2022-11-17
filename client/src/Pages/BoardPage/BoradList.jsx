import styled from "styled-components";
import { Link } from "react-router-dom";

export default function BoardList({boardList}) {

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td><Link to={`/board/${item.id}`}>{item.title}</Link></td>
                            <td>{item.nickName}</td>
                            <td>{item.date}</td>
                            <td>{item.view}</td>
                            <td>{item.like}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

const Table = styled.table`
    width: 100%;
    /* border-collapse: collapse; */
    border: 1px solid #000;
    th {
        border: 1px solid #000;
        padding: 10px;
        text-align: center;
    }
    td {
        border: 1px solid #000;
        padding: 10px;
        text-align: center;
    }
`;