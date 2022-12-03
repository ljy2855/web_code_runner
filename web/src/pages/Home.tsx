import { useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import InputBox from "../components/InputSection";
import MainEditor from "../components/MainEditor";
import OutputBox from "../components/OutputSection";
import "./Home.css";
import axios from "axios";

export default function Home() {
  const [isDragging, setDragging] = useState<boolean>(false);
  const [horizontalSize, setHorizontalSize] = useState<number>(200);
  const [verticalRatio, setVerticalRatio] = useState<number>(50);
  const [mainCode, setMainCode] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);
  async function executeAPI() {

     await axios
      .post(
        "http://127.0.0.1:8000/execute",
        {
          code: mainCode,
          lang: "c",
          input_buff: inputCode,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        }
      )
      .then((res) => {
        setOutputCode(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  return (
    <Container>
      <Col>
        <button className="run_button" onClick={executeAPI}> 실행</button>
        <div className="main_editor_section">
          <MainEditor
            horizontalRatio={windowDimensions.height - horizontalSize}
            code={mainCode}
            setCode={setMainCode}
          ></MainEditor>
        </div>

        <div className="io_section">
          <InputBox
            code={inputCode}
            setCode={setInputCode}
            verticalRatio={verticalRatio}
            horizontalRatio={horizontalSize}
          ></InputBox>

          <OutputBox
            code={outputCode}
            setCode={setOutputCode}
            verticalRatio={verticalRatio}
            horizontalRatio={horizontalSize}
          ></OutputBox>
        </div>
      </Col>
    </Container>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}


