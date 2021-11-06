export class ZeroSecondThinkingContent {
  id: number;
  themeId: number;
  content: string;

  constructor(id: number, themeId: number, content: string) {
    this.id = id;
    this.themeId = themeId;
    this.content = content;
  }
}

export const of = (responseData: any): ZeroSecondThinkingContent => {
  return new ZeroSecondThinkingContent(responseData["id"], responseData["themeId"], responseData["content"]);
}
