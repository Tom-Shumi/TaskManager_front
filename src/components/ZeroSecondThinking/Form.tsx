import {useState} from 'react';
import {Button, Form as FormBootstrap, Row} from 'react-bootstrap';
import styles from 'styles/ZeroSecondThinkingForm.module.css';
import { ZeroSecondThinkingWriting } from 'components/type/ZeroSecondThinkingWriting';
import Writing from 'components/ZeroSecondThinking/Writing';
import {useRecoilState} from "recoil";
import {isFinishedState, isRunningState} from "components/ZeroSecondThinking/TimerAtom";
import {Constants} from 'components/Constants';
import Router from 'next/router';
import * as Util from 'components/util/Util';
import {getApiClient} from 'components/util/AuthenticationUtil';

const Form: React.FC = () => {
  const [theme, setTheme] = useState<string>("");
  const [content, setContent] = useState<ZeroSecondThinkingWriting[]>([new ZeroSecondThinkingWriting("", [])]);
  const [isFinished,] = useRecoilState(isFinishedState);
  const [isRunning,] = useRecoilState(isRunningState);

  // cookieを使用するaxios生成
  let client = getApiClient();

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

  // 登録
  const register = (): void => {
    if (theme == "") {
      alert("Please enter a theme.")
      return;
    }

    let jsonParams = getJsonParams();

    client.post(Util.env(process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING), jsonParams
    ).then( () => {
      setContent([new ZeroSecondThinkingWriting("", [])]);
      setTheme("");
    }).catch(() => {
      Router.push('/');
    })
  }

  // リクエスト用json取得
  const getJsonParams = () => {
    let params = {
      theme: theme,
      contentList: createContentList()
    }
    return JSON.stringify(params);
  }

  const createContentList = () => {
    let contentList :String[] = [];

    for (let i = 0 ; i < content.length ; i++) {
      contentList.push(`・${content[i].content}`);

      for(let j = 0 ; j < content[i].why.length; j++) {
        contentList.push(`　　${Constants.WHY_JOIN}${content[i].why[j]}`);
      }
    }

    return contentList;
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
      {isRunning || isFinished &&
        <Button variant="primary" className="buttonLg" onClick={register}>登録</Button>}
    </>
  );
}

export default Form;
