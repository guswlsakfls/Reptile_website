import { Viewer } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function ViewerPage({value}) {
    return (
            <Viewer initialValue={value} />
    );
}