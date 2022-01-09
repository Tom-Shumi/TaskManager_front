import {useState} from 'react';
import { LearningInfo } from 'components/generated/graphql';
import styles from 'styles/LearnedThing.module.css';
import Router from 'next/router';
import * as graphql from 'components/generated/graphql';
import { categoryListState, learningListState } from 'components/LearnedThing/Atom';
import { useRecoilState } from 'recoil';

interface ItemProps {
  learningInfo: LearningInfo
}

const Item: React.FC<ItemProps> = (props) => {
  const [isEditContent, setIsEditContent] = useState<Boolean>(false);
  const [isEditReferenceUrl, setIsEditReferenceUrl] = useState<Boolean>(false);
  const [isEditCategory, setIsEditCategory] = useState<Boolean>(false);
  const [input, setInput] = useState({content: props.learningInfo.content || '',
                                      referenceUrl: props.learningInfo.referenceUrl || '',
                                      categoryId: props.learningInfo.categoryId || ''});
  const [categoryList, _] = useRecoilState(categoryListState);
  const [learningList, setLearningList] = useRecoilState(learningListState);
  const  [deleteLearning, { error: deleteLearningError }] = graphql.useDeleteLearningMutation();
  const  [updateLearning, { error: updateLearningError }] = graphql.useUpdateLearningMutation();
  if (deleteLearningError || updateLearningError) Router.push('/');

  const editContent = (e: any) => {
    setIsEditContent((isEditContent) => !isEditContent);
    e.stopPropagation();
  }

  const editReferenceUrl = (e: any) => {
    setIsEditReferenceUrl((isEditReferenceUrl) => !isEditReferenceUrl);
    e.stopPropagation();
  }

  const editCategory = (e: any) => {
    setIsEditCategory((isEditCategory) => !isEditCategory);
    e.stopPropagation();
  }

  const handleChange = (inputName: string) => (e: { target: { value: any; }; }) => {
    setInput({...input, [inputName] : e.target.value});
  };

  const updateLearningInfo = (updateName: string, updateValue: string) => {
    const learningInfo = {
      id: Number(props.learningInfo.id),
      content: props.learningInfo.content,
      categoryId: props.learningInfo.categoryId,
      referenceUrl: props.learningInfo.referenceUrl
    }
    const params = {
      ...learningInfo,
      [updateName] :updateValue
    }

    updateLearning({ variables:  {...params}})

    const category = categoryList.find(c => c.id == params.categoryId);
    const learning = {...params, categoryName: category.name}
    const updateList = learningList.map((obj) => Object.assign({},obj));
    const index = updateList.findIndex(l => l.id == learning.id);
    updateList[index] = learning;

    setLearningList(updateList)

    setIsEditContent(false);
    setIsEditReferenceUrl(false);
    setIsEditCategory(false);
  }

  const deleteLearningInfo = () => {
    if(confirm("Do you want to delete it?")){
      deleteLearning({ variables: { id: Number(props.learningInfo.id) }, refetchQueries: ['listLearningInfo'] })
    }
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.header}>[{props.learningInfo.createDate}]　
        {isEditCategory &&
          <>
            <select value={input.categoryId} onChange={handleChange('categoryId')}>
              {categoryList.map(category => (
                <option key={`category${category.id}`} value={category.id || ""}>{category.name}</option>
              ))}
            </select>
            　<i onClick={() => updateLearningInfo('categoryId', String(input.categoryId))} className="fa fa-edit faa-wrench animated-hover cursorPointer" />
            　<i onClick={editCategory} className="fa fa-times faa-wrench animated-hover cursorPointer" />
          </>
        }
        {isEditCategory ||
          <>
            {props.learningInfo.categoryName}
            　<i onClick={editCategory} className="fa fa-edit faa-wrench animated-hover cursorPointer" />
          </>}
        </div>
        <div className={styles.icon}><i  onClick={deleteLearningInfo} className="fa fa-trash faa-wrench animated-hover" /></div>
        <div className={styles.content} >
          {isEditContent && <><input type="text" value={input.content} onChange={handleChange('content')} className={styles.contentText} />
                    　<i onClick={() => updateLearningInfo('content', input.content)} className="fa fa-edit faa-wrench animated-hover cursorPointer" />
                    　<i onClick={editContent} className="fa fa-times faa-wrench animated-hover cursorPointer" /></>}
          {isEditContent ||
            <>
              {props.learningInfo.content}
              　<i onClick={editContent} className="fa fa-edit faa-wrench animated-hover cursorPointer" />
            </>
          }
          </div>
          { isEditReferenceUrl && <div className={styles.referenceUrl} >
              URL: <input type="text" value={input.referenceUrl} onChange={handleChange('referenceUrl')} className={styles.referenceUrlText} />
              　<i onClick={() => updateLearningInfo('referenceUrl', input.referenceUrl)} className="fa fa-edit faa-wrench animated-hover cursorPointer" />
              　<i onClick={editReferenceUrl} className="fa fa-times faa-wrench animated-hover cursorPointer" />
              </div>
          }
          { isEditReferenceUrl || <div className={styles.referenceUrl} >
              URL: { props.learningInfo.referenceUrl == "" || <a href={props.learningInfo.referenceUrl || ""} target="_blank" rel="noopener noreferrer">{props.learningInfo.referenceUrl}</a> }
              { props.learningInfo.referenceUrl == "" && <>未登録</>}
              　<i onClick={editReferenceUrl } className="fa fa-edit faa-wrench animated-hover cursorPointer" />
              </div>
          }
      </div>
    </>
  )
}

export default Item;
