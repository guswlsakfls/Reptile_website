import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import TextEditor from "./TextEditor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { postFreeBoard } from "../../Components/Container/getApi";
import moment from "moment";
import 'moment/locale/ko';
import ViewerPage from "./ViewerPage";

export default function AddForm ({ addTodo }) {
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
        text: '',
    }]);
    const input = useRef(null);
    
    useEffect(() => {
        input.current.focus();
    }, []);

    useEffect(() => {
        setData({
            type: '공지',
            title: title,
            nickName: '운영자',
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            view: 0,
            like: 0,
            text: text,
        });
    }, [title, text]);

    const onChangeInput = (e) => {
        setTitle(e.target.value);
    };
    
    // 제출 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // 뭔 차이지..
        console.log(data);

        postFreeBoard(data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
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
                        <input type="text" placeholder="제목을 입력해주세요." ref={input} value={title} onChange={onChangeInput} />
                        <br></br>
                        <br></br>
                        <TextEditor setText={setText}></TextEditor>
                        <br></br>
                        <div>
                            <Button type="submit">작성완료</Button>
                        </div>
                    </form>
                </Container>
            </Body>
        </>
    );
};

const Button = styled.button`
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 3px;
    color: #000;
    text-decoration: none;
    &:hover {
        background-color: #000;
        color: #fff;
        cursor: pointer;
    }
`;