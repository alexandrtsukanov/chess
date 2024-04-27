import React, { Dispatch, FC, Fragment, SetStateAction, useCallback, useEffect } from 'react';
import { Board } from '../../models/board';
import CellComponent from '../cell/cell';
import { Cell } from '../../models/cell';
import { Colors } from '../../models/colors';
import { getOppositeColor } from '../../utils/colors';

interface Props {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: Dispatch<SetStateAction<null | Cell>>;
    setBoard: Dispatch<SetStateAction<Board>>;
    currentColor: Colors | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<Props> = ({
    board,
    selectedCell,
    setSelectedCell,
    setBoard,
    currentColor,
    swapPlayer,
}) => {
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    };

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    const checkIsDefeat = () => {
        if (currentColor) {
            const color = getOppositeColor(currentColor);
            board.checkIsDefeat(color);
        }
    };

    const click =  useCallback((cell: Cell) => {
        if (selectedCell && selectedCell.figure?.canMove(cell)) {
            board.resetIsKingUnderAttack();
            selectedCell.moveFigure(cell);

            if (cell.figure?.canAttackKing()) {
                board.setIsKingUnderAttack();
            }

            checkIsDefeat();
            updateBoard();
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (!!cell.figure && cell.figure?.color === currentColor) {
                setSelectedCell(cell);
            }
        }
    }, [selectedCell, board, currentColor, checkIsDefeat, updateBoard, swapPlayer]);

    return (
        <div>
            <h3>Current player: {currentColor ?? ''}</h3>

            <div className="board">
                {board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map(cell => (
                            <CellComponent
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                click={click}
                                key={cell.id}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default BoardComponent;