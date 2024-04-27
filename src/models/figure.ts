import { Colors } from "./colors";
import logo from '../assets/black-king.png';
import { Cell } from "./cell";
import { Board } from "./board";
import { getOppositeColor } from "../utils/colors";

export enum FigureNames {
    FIGURE = 'Figure',
    PAWN = 'Pawn',
    ROOK = 'Rook',
    KNIGHT = 'Knight',
    BISHOP = 'Bishop',
    QUEEN = 'Queen',
    KING = 'King',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;

        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    private getBoard(): Board {
        return this.cell.board;
    }

    public canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }
        
        return true;
    }

    public moveFigure() {
        // pass
    }

    public canAttackKing(): boolean {
        const board = this.getBoard();

        for (let i = 0; i < board.cells.length; i += 1) {
            const row = board.cells[i];

            for (let j = 0; j < row.length; j += 1) {
                const target = row[j];

                if (this.canMove(target) && target.figure?.name === FigureNames.KING) {
                    return true;
                }
            }
        }
        
        return false;
    }

    public isSafeMove(target: Cell): boolean {
        const board = this.getBoard();

        if (!board.isKingUnderAttack) {
            return true;
        }
        
        const tmpTargetFigure = target.figure;
        target.figure = this;

        const oppositeColor = getOppositeColor(this.color);
        const enemyFigures = board.getFigures(oppositeColor);

        for (let i = 0; i < enemyFigures.length; i += 1) {
            const enemyFigure = enemyFigures[i];

            if (enemyFigure.canAttackKing()) {
                target.figure = tmpTargetFigure;
                return false;
            }
        }

        target.figure = tmpTargetFigure;
        return true;
    }
}