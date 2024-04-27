import React, { useEffect, useMemo, useState } from 'react';

import './App.css';
import BoardComponent from './components/board/board';
import { Board } from './models/board';
import { Colors } from './models/colors';
import LostFigures from './components/lostFigures/lostFigures';
import Timer from './components/timer/timer';
import { Cell } from './models/cell';
import Info from './components/info/info';

const generateMessage = (color: Colors, options: {
    isDefeat: boolean;
}) => {
    if (options.isDefeat) {
        return 'Game over';
    }
    
    return `${color} king is under attack`;

}

function App() {
    const [board, setBoard] = useState(new Board());
    const [currentColor, setCurrentColor] = useState<Colors | null>(null);
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const showInfo = 
        !!currentColor &&
        (board.isDefeat || board.isKingUnderAttack);

    useEffect(() => {
        restart();
    }, []);

    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setSelectedCell(null);
        setCurrentColor(Colors.WHITE);
    }

    const swapPlayer = () => {
        setCurrentColor(prev => {
            if (!prev) {
                return prev;
            }

            return prev === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
        });
    }

    const info = useMemo(() => {
        if (!currentColor) {
            return null;
        }
        const {isDefeat} = board

        return (
            <h3>{generateMessage(currentColor, {isDefeat})}</h3>
        )
    }, [currentColor, board.isDefeat])

    return (
        <div className="app">
            {showInfo && info}

            <div className="main">
                <Timer currentColor={currentColor} restart={restart}/>

                <BoardComponent
                    board={board}
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    setBoard={setBoard}
                    currentColor={currentColor}
                    swapPlayer={swapPlayer}
                />

                <div>
                    <LostFigures
                        title="Black Figures"
                        figures={board.lostBlackFigures}
                    />

                    <LostFigures
                        title="White Figures"
                        figures={board.lostWhiteFigures}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
