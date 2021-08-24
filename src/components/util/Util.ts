import useMedia from 'use-media';

export const judgePcScreen = () => {
  return useMedia({minWidth: '400px'});
}

export const judgeSpScreen = () => {
  return useMedia({maxWidth: '400px'});
}
