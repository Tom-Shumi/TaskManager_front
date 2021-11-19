import {useState} from 'react';
import {Button, Form as FormBootstrap, Row} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingForm.module.css';
import { ZeroSecondThinkingWriting } from 'components/type/ZeroSecondThinkingWriting';
import Writing from 'components/ZeroSecondThinking/Writing';
import {useRecoilState} from "recoil";
import {isFinishedState} from "components/ZeroSecondThinking/TimerAtom";

const Form: React.FC = () => {
  const [theme, setTheme] = useState<string>("");
  const [content, setContent] = useState<ZeroSecondThinkingWriting[]>([new ZeroSecondThinkingWriting("", [])]);
  const [isFinished, _] = useRecoilState(isFinishedState);

  const addContent = (index: number) => {
    content[index].why.push("");
    setContent([...content, new ZeroSecondThinkingWriting("", [])]);
  }

  const addWhy = (index: number) => {
    content[index].why.push("");
    setContent([...content]);
  }

  const handleChangeTheme = () => (e: any) => setTheme(e.target.value);

  const handleChangeContent = (contentIndex: number, value: any) => {
    content[contentIndex].content = value;
    setContent([...content]);
  }

  const handleChangeWhy = (contentIndex: number, whyIndex: number, value: any) => {
    content[contentIndex].why[whyIndex] = value;
    setContent([...content]);
  }

  return (
    <>
      <div className={styles.formDiv}>
        <FormBootstrap>
          <Row>
            <div className={styles.themeDiv}>
              テーマ：<FormBootstrap.Control value={theme} onChange={handleChangeTheme()} className={styles.textTheme} type="text" />
            </div>
            {
              content.map((content, index) => (
                <Writing content={content} index={index} addContent={addContent} addWhy={addWhy}
                  handleChangeContent={handleChangeContent} handleChangeWhy={handleChangeWhy} key={`writing${index}`}/>
              ))
            }
          </Row>
        </FormBootstrap>
      </div>
      {isFinished && <Button variant="primary" className="buttonLg" >登録</Button>}
    </>
  );
}

export default Form;
