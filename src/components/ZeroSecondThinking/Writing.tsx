import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingWriting.module.css';
import { ZeroSecondThinkingWriting } from 'components/type/ZeroSecondThinkingWriting';


interface WritingProps {
  content: ZeroSecondThinkingWriting;
}

const Writing: React.FC<WritingProps> = (props) => {


  return (
    <>
      <div className={styles.contentDiv}>
        <div className={styles.textDiv}>
          <Form.Control className={styles.textContent} type="text" value={props.content.content} />
          <Button variant="danger" className="buttonSm marginSide10">＋</Button>
        </div>
        {
          props.content.why.map(why => (
            <div className={styles.textDiv}>
              　　[なぜ？]　<Form.Control className={styles.textContent} type="text" value={why} />
              <Button variant="danger" className="buttonSm marginSide10">＋</Button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Writing;
