import Item from 'components/ZeroSecondThinkingList/Item';
import {ZeroSecondThinking} from 'components/type/ZeroSecondThinking';

interface ListProps {
  zeroSecondThinkingList: ZeroSecondThinking[];
}

const List: React.FC<ListProps> = (props) => {

  return (
    <>
      {
        props.zeroSecondThinkingList.map((zeroSecondThinking) => (
          <Item zeroSecondThinking={zeroSecondThinking} key={"zeroSecondThinking" + zeroSecondThinking.id}/>
        ))
      }
    </>
  )
}

export default List;
