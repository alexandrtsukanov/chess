import { Cell } from "../cell";
import { Colors } from "../colors";
import { Figure, FigureNames } from "../figure";
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell)

        this.name = FigureNames.PAWN;
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        const direction = this.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection = this.color === Colors.BLACK ? 2 : -2;

        if (
            (target.y === this.cell.y + direction || (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
            target.x === this.cell.x &&
            this.cell.board.getCell(target.x, target.y).isEmpty()
        ) {
            return true;
        }

        if (
            target.y === this.cell.y + direction &&
            (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
            this.cell.isEnemy(target)
        ) {
            return true;
        }

        return false;
    }

    moveFigure(): void {
        this.isFirstStep = false;
    }
}
