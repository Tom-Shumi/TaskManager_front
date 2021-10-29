import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from 'styles/TaskComment.module.css';
import { TaskComment as TaskCommentClass } from 'components/type/TaskComment';
import {Form} from 'react-bootstrap';
import Router from 'next/router';
import {getApiClient} from 'components/util/AuthenticationUtil';
import * as Util from 'components/util/Util';

interface TaskCommentProps {
    taskComment: TaskCommentClass;
    setInitDispFlg: Dispatch<SetStateAction<boolean>>;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {
    const [updateFlg, setUpdateFlg] = useState<boolean>(false);
    const [inputComment, setInputComment] = useState<string>(props.taskComment.comment);

    // cookieを使用するaxios生成
    let client = getApiClient();

    const handleChangeInputComment = () => {
        return (e: any) => setInputComment(e.target.value);
    }

    const cancelTaskCommentEdit = () => {
        setUpdateFlg(false);
    }

    const deleteTaskComment = () => {
        if(confirm("Do you want to delete it?")){
            client.delete(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK_COMMENT)}/${props.taskComment.taskId}/${props.taskComment.id}`)
            .then( _ => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/');
            })
        }
    }

    const updateTaskComment = () => {
        if (updateFlg) {
            let params = {
                comment: inputComment
            }
            let jsonParams = JSON.stringify(params);

            client.put(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK_COMMENT)}/${props.taskComment.taskId}/${props.taskComment.id}`
                , jsonParams
                , {headers: {'content-type': 'application/json'}})
            .then( _ => {
                props.setInitDispFlg(true);
                setUpdateFlg(false);
            }).catch(() => {
                Router.push('/');
            })
        } else {
            setUpdateFlg(true);
        }
    }

    let comment = [];
    if (updateFlg) {
        comment.push(<div className={styles.taskCommentCancelIcon}　key={"commentCancel" + props.taskComment.id}><i onClick={cancelTaskCommentEdit} className="fa fa-times faa-wrench animated-hover" /></div>);
        comment.push(<Form.Control as="textarea" rows={2} cols={40} value={inputComment} onChange={handleChangeInputComment()} key={"comment" + props.taskComment.id} />);
    } else {
        comment.push(props.taskComment.comment);
    }

    return (
        <div className={styles.taskComment}>
            <div>
                {comment}
                <div className={styles.taskCommentIcons}>
                    <div className={styles.taskCommentIcon}><i onClick={updateTaskComment} className="fa fa-edit faa-wrench animated-hover" /></div>
                    <div className={styles.taskCommentIcon}><i onClick={deleteTaskComment} className="fa fa-trash faa-wrench animated-hover" /></div>
                </div>
            </div>
        </div>
    )
}

export default TaskComment;
