import { Cell } from "../cell";
import { Colors } from "../colors";
import { Figure, FigureNames } from "../figure";
import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)

        this.name = FigureNames.QUEEN;
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        if (this.cell.isEmptyVertical(target)) {
            return true;
        }

        if (this.cell.isEmptyHorizontal(target)) {
            return true;
        }

        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }

        return false;
    }
}