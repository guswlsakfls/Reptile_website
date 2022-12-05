import { useRef, useState } from "react";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import TextEditor from "./TextEditor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { postBoard, putBoard } from "../../Components/Container/getBoardApi";
import moment from "moment";
import 'moment/locale/ko';
import { Button } from "./Board.element";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Write () {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([{
        id: '',
        type: '',
        title: '',
        nickname: '',
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

        if (title === '') {
            alert('제목을 입력해주세요.');
            return;
        }
        else if (text === '') {
            alert('내용을 입력해주세요.');
            return;
        }

        let boardData = {
            type: '공지',
            title: title,
            nickname: '운영자',
            date: data.date,
            view: 0,
            hit: 0,
            text: text,
        }

        if (!no) {
            boardData = {
                ...boardData,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        }

        if (no) {
            putBoard(table, page, no, boardData)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
            navigate(`/board/view?table=${table}&page=${page}&no=${no}`);
        }
        else {
            postBoard(table, boardData)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
            navigate(`/board/list?table=${table}`);
        }
    }
    
    const backToPage = () => {
        if (no) {
            navigate(`/board/view?table=${table}&page=${page}&no=${no}`);
        }
        else {
            navigate(`/board/list?table=${table}&page=${page}`);
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
                    <div>
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
                            <Button type="button" onClick={handleSubmit}>작성완료</Button>
                            <Button type="button" onClick={backToPage}>되돌아가기</Button>
                        </div>
                    </div>
                </Container>
            </Body>
        </>
    );
};