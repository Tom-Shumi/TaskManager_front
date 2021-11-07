import { useTimer } from "react-timer-hook";
import styles from 'styles/ZeroSecondThinkingTimer.module.css';
import {Button} from 'react-bootstrap';

interface TimerProps {
  timerSecond: number;
}

const Timer: React.FC<TimerProps> = (props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + props.timerSecond);

  const {
    seconds,
    start,
    pause,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => alert("onExpire called"),
    autoStart: false
  });

  return (
    <div className={styles.timerDiv}>
      <div className={styles.timerNumber}>
        <span>{seconds == 0 ? 60 : seconds}</span>
      </div>
      <Button variant="info" className="buttonSm marginSide10" onClick={start}>Start</Button>
      <Button variant="warning" className="buttonSm marginSide10" onClick={pause}>Stop</Button>
    </div>
  );
}

export default Timer;
