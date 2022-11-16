import { Viewer } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function ViewerPage({value}) {
    
    // value 값이 들어오면 Viewer 컴포넌트 렌더링
    // 이거 하지 않으면 렌더링 되지 않던데 왜 그런지 모르겠음
    if(!value) return <div>아무것도 입력되지 않았습니다.</div>;

    return (
        <Viewer initialValue={value} />
    );
}