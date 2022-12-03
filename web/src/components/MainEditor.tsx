import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/mode-c_cpp"
import "./MainEditor.css";

type MainEditorProps = {
  horizontalRatio: number;
  code: string;
  setCode: (text: string)=>void;
};

const MainEditor: React.FC<MainEditorProps> = ({ horizontalRatio, code, setCode }) => {
  return (
    <AceEditor
      height={horizontalRatio.toString() + "px"}
      mode="c_cpp"
      width="100%"
      value={code}
      onChange={setCode}
      showPrintMargin={false}
      theme="monokai"
    ></AceEditor>
  );
};

export default MainEditor;
