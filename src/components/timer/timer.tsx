import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../../models/colors';

interface Props {
    currentColor: Colors | null;
    restart: () => void;
}

const Timer: FC<Props> = ({currentColor, restart}) => {
    const [blackTime, setBlackTime] = useState(3000);
    const [whiteTime, setWhiteTime] = useState(3000);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentColor])

    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const callback = () => currentColor === Colors.BLACK ? decrementBlackTimer() : decrementWhiteTimer();
        timer.current = setInterval(callback, 1000);
    };

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    };

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    };

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        restart();
    }

    return (
        <div>
            <button onClick={handleRestart}>
                Restart game
            </button>

            <h2>Black: {blackTime}</h2>
            <h2>White: {whiteTime}</h2>
        </div>
    )
}

export default Timer;