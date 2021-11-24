import {useState} from 'react';
import styles from 'styles/ZeroSecondThinkingItem.module.css';
import Content from 'components/ZeroSecondThinkingList/Content';
import {ZeroSecondThinking} from 'components/type/ZeroSecondThinking';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import * as Util from 'components/util/Util';
import {useRecoilState} from "recoil";
import {initDispFlgState} from "components/ZeroSecondThinkingList/Atom";

interface ItemProps {
  zeroSecondThinking: ZeroSecondThinking;
}

const Item: React.FC<ItemProps> = (props) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [theme, setTheme] = useState<string>(props.zeroSecondThinking.theme);
  const [, setInitDispFlg] = useRecoilState(initDispFlgState);

  // cookieを使用するaxios生成
  let client = getApiClient();

  const openContent = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  const editTheme = (e: any) => {
    setIsEdit((isEdit) => !isEdit);
    e.stopPropagation();
  }

  const handleChangeThemeText = () => (e: any) => setTheme(e.target.value);

  const updateTheme = (e: any) => {
    let params = {
      updateText: theme
    }
    let jsonParams = JSON.stringify(params);

    client.post(`${Util.env(process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING)}/${props.zeroSecondThinking.id}`, jsonParams)
    .then( () => {
      setIsEdit((isEdit) => !isEdit);
      setInitDispFlg(true);
    }).catch(() => {
        Router.push('/');
    })

    e.stopPropagation();
  }

  const deleteTheme = (e: any) => {
    if(confirm("Do you want to delete it?")){
      client.delete(`${Util.env(process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING)}/${props.zeroSecondThinking.id}`)
      .then( () => {
        setInitDispFlg(true);
      }).catch(() => {
          Router.push('/');
      })
    }
    e.stopPropagation();
  }

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  }

  return (
    <div className={styles.item} onClick={openContent}>
      <div className={styles.doneDate}>[{props.zeroSecondThinking.doneDate}]</div>
      <p className={styles.icon}><i onClick={deleteTheme} className="fa fa-trash faa-wrench animated-hover" /></p>
      <div className={styles.theme} >
        テーマ：
        {isEdit && <><input type="text" value={theme} onChange={handleChangeThemeText()} onClick={stopPropagation} className={styles.themeText} />
                    　<i onClick={updateTheme} className="fa fa-edit faa-wrench animated-hover" />
                    　<i onClick={editTheme} className="fa fa-times faa-wrench animated-hover" /></>}
        {isEdit || <label className="cursorPointer" onClick={editTheme}>{props.zeroSecondThinking.theme}</label>}
      </div>
      <hr />
      {isOpen &&
        <>
          {
            props.zeroSecondThinking.contentList.map((content) => (
              <Content content={content} key={"zeroSecondThinkingContent" + content.id}/>
            ))
          }
        </>
      }

    </div>
  )
}

export default Item;
