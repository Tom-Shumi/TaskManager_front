import {Modal, Button, Form as FormBootstrap, Row, Col} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingForm.module.css';

interface FormProps {
}

const Form: React.FC<FormProps> = (props) => {


  return (
    <>
      <div className={styles.formDiv}>
        <FormBootstrap>
          <Row>
            <div className={styles.themeDiv}>
              テーマ：<FormBootstrap.Control className={styles.textTheme} type="text" />
            </div>
            <div className={styles.contentDiv}>
              <div className={styles.textDiv}>
                <FormBootstrap.Control className={styles.textContent} type="text" />
                <Button variant="danger" className="buttonSm marginSide10">＋</Button>
              </div>
              <div className={styles.textDiv}>
                　　[なぜ？]　<FormBootstrap.Control className={styles.textContent} type="text" />
                <Button variant="danger" className="buttonSm marginSide10">＋</Button>
              </div>
              <div className={styles.textDiv}>
                　　[なぜ？]　<FormBootstrap.Control className={styles.textContent} type="text" />
                <Button variant="danger" className="buttonSm marginSide10">＋</Button>
              </div>
            </div>
          </Row>
        </FormBootstrap>
      </div>
    </>
  );
}

export default Form;
