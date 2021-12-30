import { LearningInfo } from 'components/generated/graphql';
import styles from 'styles/LearnedThing.module.css';
import Router from 'next/router';
import * as graphql from 'components/generated/graphql';

interface ItemProps {
  learningInfo: LearningInfo
}

const Item: React.FC<ItemProps> = (props) => {

  const deleteLearningInfo = (e: any) => {
    if(confirm("Do you want to delete it?")){
      const { error } = graphql.useDeleteLearningMutation({ variables: { id: Number(props.learningInfo.id) } });
      if (error) Router.push('/');
    }
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.header}>[{props.learningInfo.createDate}] {props.learningInfo.categoryName}</div>
        <p className={styles.icon}><i  onClick={deleteLearningInfo} className="fa fa-trash faa-wrench animated-hover" /></p>
        <div className={styles.content} >
          {props.learningInfo.content}
          　<i className="fa fa-edit faa-wrench animated-hover cursorPointer" />
        </div>
        {(props.learningInfo.referenceUrl == null) ||
          <div className={styles.referenceUrl} >
            URL: <a href={props.learningInfo.referenceUrl || ""} target="_blank" rel="noopener noreferrer">{props.learningInfo.referenceUrl}</a>
            　<i className="fa fa-edit faa-wrench animated-hover cursorPointer" />
          </div>
        }
      </div>
    </>
  )
}

export default Item;
