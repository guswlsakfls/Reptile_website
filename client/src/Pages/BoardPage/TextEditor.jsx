import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { getViewBoard } from "../../Components/Container/getApi";

export default function TextEditor({setText, setTitle, setData, table, page, no}) {
  const editorRef = useRef(null);

  const onChange = () => {
      const data = editorRef.current.getInstance().getHTML()
      setText(data);
  }

  useEffect(() => {
    if (no) {
      getViewBoard(table, page, no)
      .then(res => {
        setData(res);
        setTitle(res.title);
        setText(res.text);
        editorRef.current.getInstance().setHTML(res.text);
      })
      .catch(err => console.log(err));
    }
  }, []);

  return (
    <>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="500px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code']
        ]}
        hideModeSwitch={true} // 모드 탭 숨기기
        useCommandShortcut={false} // 단축키 사용
        language="ko-KR" // 한국어 설정
        ref={editorRef}
        onChange={onChange}
        plugins={[colorSyntax]}
      ></Editor>
    </>
  );
}