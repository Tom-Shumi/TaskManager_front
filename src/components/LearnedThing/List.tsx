import { LearningInfo } from 'components/generated/graphql';
import Item from 'components/LearnedThing/Item'

interface ListProps {
  learningList: LearningInfo[]
}

const List: React.FC<ListProps> = (props) => {

  return (
    <>
      {
        props.learningList.map((learningInfo) => (
          <Item learningInfo={learningInfo} key={"learningInfo" + learningInfo.id}/>
        ))
      }
    </>
  )
}

export default List;
