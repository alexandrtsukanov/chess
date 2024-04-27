import { Cell } from "./cell";
import { Colors } from "./colors";
import { Figure } from "./figure";
import { Bishop } from "./figures/bishop";
import { King } from "./figures/king";
import { Knight } from "./figures/knight";
import { Pawn } from "./figures/pawn";
import { Queen } from "./figures/queen";
import { Rook } from "./figures/rook";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    isKingUnderAttack: boolean = false;
    isDefeat: boolean = false;

    public initCells() {
        for (let i = 0; i < 8; i += 1) {
            const row: Cell[] = [];

            for (let j = 0; j < 8; j += 1) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, j, i, Colors.WHITE, null));
                } else {
                    row.push(new Cell(this, j, i, Colors.BLACK, null));
                }
            }

            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();

        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.isKingUnderAttack = this.isKingUnderAttack;

        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i += 1) {
            const row = this.cells[i];

            for (let j = 0; j < row.length; j += 1) {
                const target = row[j];

                target.setAvailavble(selectedCell);
            }
        }
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x];
    }

    public getFigures(color: Colors) {
        const cells: Figure[] = [];

        for (let i = 0; i < this.cells.length; i += 1) {
            const row = this.cells[i];

            for (let j = 0; j < row.length; j += 1) {
                const cell = row[j];

                if (cell.figure && cell.figure.color === color) {
                    cells.push(cell.figure);
                }
            }            
        }

        return cells;
    }

    public setIsKingUnderAttack() {
        this.isKingUnderAttack = true;
    }

    public resetIsKingUnderAttack() {
        this.isKingUnderAttack = false;
    }

    public checkIsDefeat(color: Colors | null) {
        if (!color) {
            return false;
        }

        if (!this.isKingUnderAttack) {
            return false;
        }

        const figures = this.getFigures(color);

        for (let i = 0; i < figures.length; i += 1) {
            const figure = figures[i];

            for (let j = 0; j < this.cells.length; j += 1) {
                const row = this.cells[j];
    
                for (let k = 0; k < row.length; k += 1) {
                    const target = row[k];
    
                    if (figure.canMove(target)) {
                        return false;
                    }
                }
            }
        }
        
        this.isDefeat = true;
        return true;
    }

    private addPawns() {
        for (let i = 0; i < 8; i += 1) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(4, 0));
        new Queen(Colors.WHITE, this.getCell(4, 7));
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(3, 0));
        new King(Colors.WHITE, this.getCell(3, 7));
    }

    public addFigures() {
        this.addPawns();
        this.addRooks();
        this.addKnights();
        this.addBishops();
        this.addQueens();
        this.addKings();
    }
}