import React, { useEffect, useState } from "react";
import './App.css';
import Display from './components/Display';
import Buttons from './components/Buttons'
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
 
function App() {
  const [time, setTime] = useState({h:0, m:0, s:0})
  let newS = time.s;
  let newM = time.m;
  let newH = time.h;
  const [clickTime, setClickTime] = useState(0);
  const [isRunning, setIsRunning] = useState(0);

  const timer$ = interval(100);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    timer$
      .pipe(
        takeUntil(unsubscribe$)
      )
      .subscribe(() => {
        if (isRunning === 1) {
          if(newM===59 && newS===59) {
            newH+=1;
            newS=-1;
            newM=0;
          }
          if(newS===59) {
            newS=-1;
            newM+=1;
          }
          newS++;
          return setTime({h:newH, m:newM, s:newS});
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [isRunning]);

  const wait = () => {
    if(clickTime === 0) {
      setClickTime(new Date().getTime());
    }
    else
      if((new Date().getTime() - clickTime) < 300) {
        setIsRunning(0);
      }
    else {
      setClickTime(new Date().getTime());
      }
    }
 
  const start = () => {
    setIsRunning(1);
  };
 
  const stop = () => {
    setIsRunning(0);
    setTime({h:0, m:0, s:0});
  };

  const reset = () => {
    setIsRunning(0);
    setTime({h:0, m:0, s:0});
    start();
  }

  return (
    <div>
      <p className='timerHeader'> TIMER </p>
      <div className='display'><Display time={time}/></div>
      <div className='buttons'><Buttons time={time} start={start} isRunning={isRunning} stop={stop} reset={reset} wait={wait} /></div>
    </div>
  );
}

export default App;