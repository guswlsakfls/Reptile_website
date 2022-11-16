import { useRef, useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

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
    const { id } = useParams();

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
        e.preventDefault(); // 뭔 차이지.. -> 새로고침이 안 되는듯, 근데 어디는 써야 하고 어디는 안써야하는지?

        if (id) {
            putFreeBoard(id, data)
            .then(res => {
                console.log(res);
                navigate('/board');
            })
            .catch(err => console.log(err));
        }
        else {
            postFreeBoard(data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
            navigate('/board');
        }
    }
    
    const backToPage = () => {
        navigate(-1);
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
                            setTitle={setTitle} 
                            setData={setData} 
                            id={id}>
                        </TextEditor>
                        <br></br>
                        <div>
                            <Button type="submit">작성완료</Button>
                            <Button onClick={backToPage}>되돌아가기</Button>
                        </div>
                    </form>
                </Container>
            </Body>
        </>
    );
};