import {Modal, Button, Form as FormBootstrap, Row, Col} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingForm.module.css';

interface FormProps {
}

const Form: React.FC<FormProps> = (props) => {


  return (
    <>
      <FormBootstrap>
        <Row>
          <div className={styles.themeDiv}>
            テーマ：<FormBootstrap.Control className={styles.textTheme} type="text" />
          </div>
          <div className={styles.textDiv}>
            <FormBootstrap.Control className={styles.textTheme} type="text" />
          </div>
        </Row>
      </FormBootstrap>
    </>
  );
}

export default Form;
