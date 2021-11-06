import {useState} from 'react';
import styles from 'styles/ZeroSecondThinkingItem.module.css';
import Content from 'components/ZeroSecondThinkingList/Content';
import {ZeroSecondThinking} from 'components/type/ZeroSecondThinking';

interface ItemProps {
  zeroSecondThinking: ZeroSecondThinking;
}

const Item: React.FC<ItemProps> = (props) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [theme, setTheme] = useState<string>(props.zeroSecondThinking.theme);

  const openContent = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  const editTheme = (e: any) => {
    setIsEdit((isEdit) => !isEdit);
    e.stopPropagation();
  }

  const handleChangeThemeText = () => (e: any) => setTheme(e.target.value);

  const updateTheme = (e: any) => {
    alert(theme);
    e.stopPropagation();
  }

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  }

  return (
    <div className={styles.item} onClick={openContent}>
      <div className={styles.doneDate}>[{props.zeroSecondThinking.doneDate}]</div>
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
