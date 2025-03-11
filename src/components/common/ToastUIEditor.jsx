import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useRef, useState, useEffect } from "react";

const ToastUIEditor = ({ initialValue = "", onSaveDescription }) => {
  const [initialValueState, setInitialValueState] = useState(initialValue);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().focus();
      if (initialValue === "") {
        editorRef.current.getInstance().reset();
      } else {
        editorRef.current.getInstance().setMarkdown(initialValue);
        setInitialValueState(initialValue);
      }
    }
  }, [initialValue]);

  const handleEditorChange = () => {
    const description = editorRef.current.getInstance().getMarkdown();
    onSaveDescription(description);
  };

  return (
    <Editor
      placeholder="내용을 입력해주세요."
      previewStyle="vertical"
      height="300px"
      initialEditType="wysiwyg"
      initialValue={initialValueState}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "image", "link"],
        ["code", "codeblock"],
      ]}
      ref={editorRef}
      useCommandShortcut={true}
      onChange={handleEditorChange}
    />
  );
};

export default ToastUIEditor;
