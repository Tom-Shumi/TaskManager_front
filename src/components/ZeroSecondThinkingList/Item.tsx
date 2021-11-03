import React, { useState} from 'react';
import styles from 'styles/ZeroSecondThinkingItem.module.css';
import Content from 'components/ZeroSecondThinkingList/Content';


const Item: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const openContent = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={styles.item} onClick={openContent}>
      <div className={styles.doneDate}>[2021-11-03]</div>
      <div className={styles.theme}>テーマ：なぜ0秒思考を毎日やるのか？</div>
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
