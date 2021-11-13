import {useState} from 'react';
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
}

const Writing: React.FC<WritingProps> = (props) => {

  const [isRunning, _] = useRecoilState(isRunningState);

  return (
    <>
      <div className={styles.contentDiv}>
        <div className={styles.textDiv}>
          <Form.Control className={styles.textContent} type="text" value={props.content.content} disabled={!isRunning} />
          <Button variant="danger" className="buttonSm marginSide10" onClick={ () => props.addContent(props.index)} disabled={!isRunning}>＋</Button>
        </div>
        {
          props.content.why.map(why => (
            <div className={styles.textDiv}>
              　　[なぜ？]　<Form.Control className={styles.textContent} type="text" value={why} disabled={!isRunning} />
              <Button variant="danger" className="buttonSm marginSide10" onClick={ () => props.addWhy(props.index)} disabled={!isRunning} >＋</Button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Writing;
