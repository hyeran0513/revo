import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const ToastUIEditor = ({ initialValue = "", onSaveDescription }) => {
  const [initialValueState, setInitialValueState] = useState(initialValue);
  const editorRef = useRef(null);
  const { state } = useTheme();
  const [editorKey, setEditorKey] = useState("editor-light");

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

  useEffect(() => {
    setEditorKey(`editor-${state.isDarkMode ? "dark" : "light"}`);
  }, [state.isDarkMode]);

  const handleEditorChange = () => {
    const description = editorRef.current.getInstance().getMarkdown();
    onSaveDescription(description);
  };

  return (
    <Editor
      key={editorKey}
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
      theme={state.isDarkMode ? "dark" : "light"}
      ref={editorRef}
      useCommandShortcut={true}
      onChange={handleEditorChange}
    />
  );
};

export default ToastUIEditor;
