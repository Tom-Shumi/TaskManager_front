import {useState} from 'react';
import {Button, Form as FormBootstrap, Row} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingForm.module.css';
import { ZeroSecondThinkingWriting } from 'components/type/ZeroSecondThinkingWriting';
import Writing from 'components/ZeroSecondThinking/Writing';

interface FormProps {
}

const Form: React.FC<FormProps> = (props) => {
  const [content, setContent] = useState<ZeroSecondThinkingWriting[]>([new ZeroSecondThinkingWriting("", [])]);

  const addContent = () => {
    // TODO
  }

  const addWhy = () => {
    // TODO
  }


  return (
    <>
      <div className={styles.formDiv}>
        <FormBootstrap>
          <Row>
            <div className={styles.themeDiv}>
              テーマ：<FormBootstrap.Control className={styles.textTheme} type="text" />
            </div>
            {
              content.map(content => (
                <Writing content={content} />
              ))
            }
          </Row>
        </FormBootstrap>
      </div>
    </>
  );
}

export default Form;
