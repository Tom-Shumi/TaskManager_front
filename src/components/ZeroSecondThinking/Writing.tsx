import {Button, Form} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingWriting.module.css';
import {ZeroSecondThinkingWriting} from 'components/type/ZeroSecondThinkingWriting';
import {useRecoilState} from "recoil";
import {isRunningState} from "components/ZeroSecondThinking/TimerAtom";


interface WritingProps {
  content: ZeroSecondThinkingWriting;
  index: number;
  addContent: any;
  addWhy: any;
  handleChangeContent: any;
  handleChangeWhy: (contentIndex: number, whyIndex: number, value: any) => void;
}

const Writing: React.FC<WritingProps> = (props) => {

  const [isRunning, _] = useRecoilState(isRunningState);

  const handleChangeContent = () => (e: any) => {
    props.handleChangeContent(props.index, e.target.value);
  }

  const handleChangeWhy = (whyIndex: number) => {

    console.log(whyIndex)

    return (e: any) => props.handleChangeWhy(props.index, whyIndex, e.target.value);
  }

  return (
    <>
      <div className={styles.contentDiv} key={`writing${props.index}`}>
        <div className={styles.textDiv} key={`content${props.index}`}>
          <Form.Control className={styles.textContent} type="text" onChange={handleChangeContent()} value={props.content.content} disabled={!isRunning}/>
          <Button variant="danger" className="buttonSm marginSide10" onClick={ () => props.addContent(props.index)} disabled={!isRunning}>＋</Button>
        </div>
        {
          props.content.why.map((why, whyIndex) => (
            <div className={styles.textDiv} key={`whyC${props.index}W${whyIndex}`}>
              　　[なぜ？]　<Form.Control className={styles.textContent} type="text" onChange={handleChangeWhy(whyIndex)} value={why} disabled={!isRunning}/>
              <Button variant="danger" className="buttonSm marginSide10" onClick={ () => props.addWhy(props.index)} disabled={!isRunning} >＋</Button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Writing;
