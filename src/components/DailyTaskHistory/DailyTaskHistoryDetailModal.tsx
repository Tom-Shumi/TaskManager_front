import React, { Dispatch, SetStateAction} from 'react';
import {Modal, Button,} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { DailyTaskHistory } from '../common/interface';
import DailyTaskHistoryDetailItem from './DailyTaskHistoryDetailItem';


interface DailyTaskHistoryDetailModalProps {
    dailyTaskHistoryList: DailyTaskHistory[];
    doneDate: Date;
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskHistoryDetailModal: React.FC<DailyTaskHistoryDetailModalProps> = (props) => {

    return (
        <Modal show={true} onHide={props.close} key='DailyTaskHistoryDetailModal'>
            <Modal.Header closeButton>
                <Modal.Title>Detail History</Modal.Title>
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
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DailyTaskHistoryDetailModal;
