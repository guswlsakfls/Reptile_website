import { useRef, useState } from "react";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import TextEditor from "./TextEditor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { postFreeBoard } from "../../Components/Container/getApi";
import moment from "moment";
import 'moment/locale/ko';
import { Button } from "./Board.element";
import { useNavigate } from "react-router-dom";
import { putFreeBoard } from "../../Components/Container/getApi";
import { useSearchParams } from "react-router-dom";

export default function Write () {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([{
        id: '',
        type: '',
        title: '',
        nickName: '',
        date: '',
        view: '',
        like: '',
        text: ''
    }]);
    const input = useRef(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const table = searchParams.get("table") || null;
    const page = parseInt(searchParams.get("page")) || 1;
    const no = parseInt(searchParams.get("no")) || null;

    const onChangeInput = (e) => {
        setTitle(e.target.value);
    };
    
    // 제출 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // 뭔 차이지.. -> 새로고침이 안 되는듯, 근데 어디는 써야 하고 어디는 안써야하는지?
        let boardData = {
            type: '공지',
            title: title,
            nickName: '운영자',
            date: data.date,
            view: 0,
            like: 0,
            text: text,
        }

        if (!no) {
            boardData = {
                ...boardData,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        }

        if (no) {
            putFreeBoard(table, page, no, boardData)
            .then(res => {
                console.log(res);
                navigate(`/board/view?table=${table}&page=${page}&no=${no}`);
            })
            .catch(err => console.log(err));
        }
        else {
            postFreeBoard(boardData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
            navigate(`/board/list?table=${table}`);
        }
    }
    
    const backToPage = () => {
        if (no) {
            navigate(`/board/view?table=${table}&page=${page}&no=${no}`);
        }
        else {
            navigate(`/board/list?table=${table}`);
        }
    }

    return (
        <>
            <Body>
                <Container>
                    <br></br>
                    <h1>
                        카페 글쓰기
                    </h1>
                    <hr></hr>
                    <br></br>
                    <Navbar />
                    <form onSubmit={handleSubmit}>
                        <h3>제목</h3>
                        <input
                            type="text" 
                            placeholder="제목을 입력해주세요." 
                            ref={input} 
                            value={title} 
                            onChange={onChangeInput}
                        />
                        <br></br>
                        <br></br>
                        <TextEditor 
                            setText={setText} 
                            setTitle={setTitle} // useMemo로 리렌더링 해결해야 할 듯 
                            setData={setData} 
                            table={table}
                            page={page}
                            no={no} >
                        </TextEditor>
                        <br></br>
                        <div>
                            <Button type="submit">작성완료</Button>
                            <Button type="button" onClick={backToPage}>되돌아가기</Button>
                        </div>
                    </form>
                </Container>
            </Body>
        </>
    );
};