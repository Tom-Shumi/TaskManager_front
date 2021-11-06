import { ZeroSecondThinkingContent } from 'components/type/ZeroSecondThinkingContent';
import * as ZeroSecondThinkingContentUtil from 'components/type/ZeroSecondThinkingContent';

export class ZeroSecondThinking {
  id: number;
  theme: string;
  doneDate: string;
  contentList: ZeroSecondThinkingContent[];

  constructor(id: number, theme: string, doneDate: string, contentList: ZeroSecondThinkingContent[]) {
    this.id = id;
    this.theme = theme;
    this.doneDate = doneDate;
    this.contentList = contentList;
  }
}

export const of = (responseData: any): ZeroSecondThinking => {
  return new ZeroSecondThinking(responseData["id"], responseData["theme"],
  responseData["doneDate"], convertContentList(responseData["contentList"]));
}

const convertContentList = (responseData: any[]): ZeroSecondThinkingContent[] => {
  let length: number = responseData.length;
  let zeroSecondThinkingContentList :ZeroSecondThinkingContent[] = [];

  for (let i = 0 ; i < length ; i++) {
    zeroSecondThinkingContentList.push(ZeroSecondThinkingContentUtil.of(responseData[i]));
  }

  return zeroSecondThinkingContentList;
}
