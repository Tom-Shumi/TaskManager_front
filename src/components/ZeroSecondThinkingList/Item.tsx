import React, { useState} from 'react';
import styles from 'styles/ZeroSecondThinkingItem.module.css';
import Content from 'components/ZeroSecondThinkingList/Content';


const Item: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [theme, setTheme] = useState<string>("なぜ0秒思考を毎日やるのか？Edit");

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
      <div className={styles.doneDate}>[2021-11-03]</div>
      <div className={styles.theme} >
        テーマ：
        {isEdit && <><input type="text" value={theme} onChange={handleChangeThemeText()} onClick={stopPropagation} className={styles.themeText} />
                    　<i onClick={updateTheme} className="fa fa-edit faa-wrench animated-hover" />
                    　<i onClick={editTheme} className="fa fa-times faa-wrench animated-hover" /></>}
        {isEdit || <label className="cursorPointer" onClick={editTheme}>なぜ0秒思考を毎日やるのか？</label>}
      </div>
      <hr />
      {isOpen &&
        <>
          <Content content="・突発的な思考力をつけたいから" />
          <Content content="　[なぜ？]短い思考時間で成果を出したいから" />
          <Content content="　　[なぜ？]頭が良い人だと思われるため" />
          <Content content="　　　[なぜ？]周りから高い評価を得るため" />
          <Content content="・自己肯定感を高めるため" />
          <Content content="・突発的な思考力をつけたいから" />
        </>
      }

    </div>
  )
}

export default Item;
