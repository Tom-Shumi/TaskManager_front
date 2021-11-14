import { useTimer } from "react-timer-hook";
import styles from 'styles/ZeroSecondThinkingTimer.module.css';
import {Button} from 'react-bootstrap';
import { useRecoilState } from "recoil";
import {isRunningState, isFinishedState} from "components/ZeroSecondThinking/TimerAtom";

interface TimerProps {
  timerSecond: number;
}

const Timer: React.FC<TimerProps> = (props) => {
  const [, setIsRunning] = useRecoilState(isRunningState);
  const [, setIsFinished] = useRecoilState(isFinishedState);

  const {
    seconds,
    start,
    pause,
    restart,
    isRunning
  } = useTimer({
    expiryTimestamp: getTime(props.timerSecond),
    onExpire: () => {
      alert("Time Up")
      setIsFinished(true);
    },
    autoStart: false
  });

  setIsRunning(isRunning);

  return (
    <div className={styles.timerDiv}>
      <div className={styles.timerNumber}>
        <span>{seconds == 0 ? 60 : seconds}</span>
      </div>
      <Button variant="info" className="buttonSm marginSide10" onClick={start}>Start</Button>
      <Button variant="warning" className="buttonSm marginSide10" onClick={pause}>Stop</Button>
      <Button variant="outline-info" className="buttonSm marginSide10" onClick={() => {restart(getTime(props.timerSecond))}}>Restart</Button>

    </div>
  );
}

const getTime = (second: number) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + second);
  return time;
}

export default Timer;
