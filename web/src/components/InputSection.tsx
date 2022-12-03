import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/theme-monokai";

type InputBoxProps = {
  verticalRatio: number;
  horizontalRatio: number;
  code: string;
  setCode: (text: string) => void;
};

const InputBox: React.FC<InputBoxProps> = ({verticalRatio,horizontalRatio,code,setCode}) => {
  return (
    <>
      <AceEditor
        className="input_editor"
        theme="monokai"
        value={code}
        onChange={setCode}
        width={(100 - verticalRatio).toString() + "%"}
        height={horizontalRatio.toString() + "px"}
        showPrintMargin={false}
        highlightActiveLine={false}
      ></AceEditor>
    </>
  );
};

export default InputBox;
