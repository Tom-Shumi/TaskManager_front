import React, { Dispatch, SetStateAction} from 'react';
import {Modal, Button,} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { DailyTaskHistory } from 'components/type/DailyTaskHistory';
import DailyTaskHistoryDetailItem from 'components/DailyTaskHistory/DailyTaskHistoryDetailItem';
import * as DatePickerUtil from 'components/util/DatePickerUtil';


interface DailyTaskHistoryDetailModalProps {
    dailyTaskHistoryList: DailyTaskHistory[];
    doneDate: Date;
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskHistoryDetailModal: React.FC<DailyTaskHistoryDetailModalProps> = (props) => {

    const doneDate = DatePickerUtil.dateStrDelimiterYYYYMMDD(props.doneDate);

    return (
        <Modal show={true} onHide={props.close} key='DailyTaskHistoryDetailModal'>
            <Modal.Header closeButton>
                <Modal.Title>{doneDate}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                props.dailyTaskHistoryList.map((dailyTaskHistory, index)  => (
                    <DailyTaskHistoryDetailItem
                        dailyTaskHistory={dailyTaskHistory}
                        doneDate={props.doneDate}
                        setInitDispFlg={props.setInitDispFlg}
                        close={props.close}
                        key={"DailyTaskHistoryDetailItem" + index} />
                ))
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.close} className="buttonSm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DailyTaskHistoryDetailModal;
