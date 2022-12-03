import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/theme-monokai";

type OutputBoxProps = {
  verticalRatio: number;
  horizontalRatio: number;
  code: string;
  setCode: (text: string) => void;
};

const OutputBox: React.FC<OutputBoxProps> = ({verticalRatio,horizontalRatio,code,setCode}) => {
  return (
    <AceEditor
      className="output_editor"
      theme="monokai"
      width={verticalRatio.toString() + "%"}
      height={horizontalRatio.toString() + "px"}
      showPrintMargin={false}
      value={code}
      onChange={setCode}
      highlightActiveLine={false}
      readOnly={true}
      showGutter={false}
    ></AceEditor>
  );
};

export default OutputBox;
