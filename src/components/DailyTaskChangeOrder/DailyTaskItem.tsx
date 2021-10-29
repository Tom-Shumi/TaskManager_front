import { useRef } from 'react';
import {DailyTask} from 'components/type/DailyTask';
import { Dispatch, SetStateAction} from 'react';
import styles from 'styles/DailyTaskItem.module.css';
import {Row, Col} from 'react-bootstrap';
import * as NumberUtil from 'components/util/NumberUtil';
import { useDrag, useDrop } from 'react-dnd';
import {Constants} from 'components/Constants';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';


interface DailyTaskItemProps {
  dailyTask: DailyTask;
  setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
  order: number;
}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {

  // cookieを使用するaxios生成
  let client = getApiClient();

  const [_, drag] = useDrag(() => ({
    type: Constants.DailyItemTypes.DAILY_TASK_ITEM,
    item: { id: props.dailyTask.id,
            doneFlg: props.dailyTask.doneFlg(),
            deleteFlg: props.dailyTask.deleteFlg },
    collect: monitor => ({
        isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{isOver}, drop] = useDrop({
    accept: Constants.DailyItemTypes.DAILY_TASK_ITEM,
    drop: (dragItem: any) => {

        if (dragItem.deleteFlg == 0 && props.dailyTask.deleteFlg == 0
            && !dragItem.doneFlg && !props.dailyTask.doneFlg()) {
            updatDailyTaskDispOrder(dragItem.id, props.order);
        }
    },
    collect: monitor => ({
        isOver: !!monitor.isOver()
    })
  })

  const updatDailyTaskDispOrder = (id: number, newDispOrder: number) => {
    var params = {
        id: id,
        newDispOrder: newDispOrder
    }
    var jsonParams = JSON.stringify(params);

    client.put(`${process.env.NEXT_PUBLIC_API_SERVER}${process.env.NEXT_PUBLIC_API_DAILY_TASK}/dispOrder?id=${id}&newDispOrder=${newDispOrder}`
        , jsonParams
        , {headers: {'content-type': 'application/json'}}
    ).then( _ => {
        props.setInitDispFlg(true);
    }).catch(() => {
        Router.push('/');
    })
  }

  const ref = useRef(null);
  drag(drop(ref));

  const quota = NumberUtil.convertHourMinute(props.dailyTask.quota);
  let taskStatusColor = isOver ? "isOverDailyTask" : "white";
  return (
      <>
        <div ref={ref} className={styles.dailyTaskItem + " " + taskStatusColor}>
            <div className={styles.title}>
                {props.dailyTask.title}
            </div>
            <Row className={styles.row}>
                <Col md={2} className={styles.label}>Quota: {quota}</Col>
            </Row>
        </div>
      </>
  )
}

export default DailyTaskItem;
