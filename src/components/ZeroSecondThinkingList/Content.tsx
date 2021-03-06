import {useState} from 'react';
import styles from 'styles/ZeroSecondThinkingContent.module.css';
import {Constants} from 'components/Constants';
import { ZeroSecondThinkingContent } from 'components/type/ZeroSecondThinkingContent';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import * as Util from 'components/util/Util';
import {useRecoilState} from "recoil";
import {initDispFlgState} from "components/ZeroSecondThinkingList/Atom";


interface ContentProps {
  content: ZeroSecondThinkingContent;
}

const Content: React.FC<ContentProps> = (props) => {

  const contentAry = props.content.content.split(Constants.WHY_JOIN);
  let prev;
  let body;

  let isWhyText = false;

  if (contentAry.length == 1) {
    prev = "・";
    body = contentAry[0].slice(1);
  } else {
    prev = contentAry[0] + Constants.WHY_JOIN;
    body = contentAry[1];
    isWhyText = true;
  }

  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [content, setContent] = useState<string>(body);
  const [, setInitDispFlg] = useRecoilState(initDispFlgState);

  // cookieを使用するaxios生成
  let client = getApiClient();

  const handleChangeContentText = () => (e: any) => setContent(e.target.value);

  const editContent = (e: any) => {
    setIsEdit((isEdit) => !isEdit);
    e.stopPropagation();
  }

  const updateContent = (e: any) => {
    let params = {
      updateText: content,
      isWhyText: isWhyText
    }
    let jsonParams = JSON.stringify(params);

    client.post(`${Util.env(process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING)}/${props.content.themeId}/${props.content.id}`, jsonParams)
    .then( () => {
      setIsEdit((isEdit) => !isEdit);
      setInitDispFlg(true);
    }).catch(() => {
        Router.push('/');
    })

    e.stopPropagation();
  }

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  }

  return (
    <>
      {isEdit && <div className={styles.content}>
                    {prev}<input type="text" value={content} onChange={handleChangeContentText()} onClick={stopPropagation} className={styles.contentText} />
                    　<i onClick={updateContent} className="fa fa-edit faa-wrench animated-hover" />
                    　<i onClick={editContent} className="fa fa-times faa-wrench animated-hover" /></div>}
      {isEdit || <div className={styles.content} onClick={editContent}>{prev + body}</div>}
    </>
  )
}

export default Content;
