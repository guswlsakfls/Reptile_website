import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ko';

export default function BoardList({boardList, table, page}) {

    // date 형식 바꾸기
    const changeDateFormat = (date) => {
        const nowDate = moment().format('YYYY-MM-DD');

        // 만약 오늘 날짜 라면 시간만 보여주기
        if (date.substring(0, 10) === nowDate) {
            return date.substring(11, 19);
        }
        // 아니라면 날짜만 보여주기
        else {
            return date.substring(0, 10);
        }
    }

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
                            <td><Link to={`/board/view?table=${table}&page=${page}&no=${item.id}`}>{item.title}</Link></td>
                            <td>{item.nickName}</td>
                            <td>{changeDateFormat(item.date)}</td>
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
    border-collapse: collapse;
    border: 1px solid #000;
    th:nth-child(3) {
        @media (min-width: 1200px) {
            width: 700px;
        }
        @media (min-width: 992px) and (max-width: 1199px) {
            width: 600px;
        }
        @media (min-width: 768px) and (max-width: 991px) {
            width: 400px;
        }
        @media (min-width: 576px) and (max-width: 767px) {
            width: 200px;
        }
        @media (max-width: 576px) {
            width: 100px;
        }
    }
    th {
        border: 1px solid #000;
        padding: 10px;
        text-align: center;
    }
    td:nth-child(3) {
        text-align: left;
    }
    td {
        border: 1px solid #000;
        padding: 10px;
        text-align: center;
    }
`;