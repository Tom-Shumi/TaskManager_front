import useMedia from 'use-media';

export const judgeOnlyPcScreen = () => {
  return useMedia({minWidth: '400px'});
}
