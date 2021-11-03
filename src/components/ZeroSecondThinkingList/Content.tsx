import styles from 'styles/ZeroSecondThinkingContent.module.css';

interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = (props) => {

  return (
    <>
      <div className={styles.content}>{props.content}</div>
    </>
  )
}

export default Content;
