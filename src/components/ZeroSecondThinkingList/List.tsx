import Item from 'components/ZeroSecondThinkingList/Item';
import styles from 'styles/ZeroSecondThinkingList.module.css';

const List: React.FC = () => {

  const loadNext = () => {
    alert("TODO");
}

  return (
    <>
      <Item />
      <div className={styles.nextLoadIcon} onClick={loadNext}><i className="fa fa-arrow-circle-down faa-wrench animated-hover" /></div>
    </>
  )
}

export default List;
