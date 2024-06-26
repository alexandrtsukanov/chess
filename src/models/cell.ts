import { Board } from "./board";
import { Colors } from "./colors";
import { Figure, FigureNames } from "./figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    kingUnderAttack: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;

        this.available = false;
        this.kingUnderAttack = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure?.color;
        }

        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y += 1) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell) {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x += 1) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell) {
        const absX = Math.abs(this.x - target.x);
        const absY = Math.abs(this.y - target.y);

        if (absX !== absY) {
            return false;
        }

        const dx = this.x < target.x ? 1 : -1;
        const dy = this.y < target.y ? 1 : -1;

        for (let i = 1; i < absY; i += 1) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    setAvailavble(sourceCell: Cell | null) {
        this.available = 
            !!sourceCell?.figure?.canMove(this) && 
            this.figure?.name !== FigureNames.KING &&
            sourceCell?.figure.isSafeMove(this);
    }

    addLostFigure(figure: Figure) {
        if (figure.color === Colors.BLACK) {
            this.board.lostBlackFigures.push(figure);
        } else {
            this.board.lostWhiteFigures.push(figure);
        }
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure.canMove(target)) {
            this.board.resetIsKingUnderAttack();
            this.figure.moveFigure();

            if (!!target.figure) {
                this.addLostFigure(target.figure);
            }

            target.setFigure(this.figure);
            this.figure = null;

            if (target.figure?.canAttackKing()) {
                this.board.setIsKingUnderAttack();
            } 
        }
    }
}