import { Cell } from "../cell";
import { Colors } from "../colors";
import { Figure, FigureNames } from "../figure";
import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)

        this.name = FigureNames.KNIGHT;
        this.logo = this.color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        const absX = Math.abs(this.cell.x - target.x);
        const absY = Math.abs(this.cell.y - target.y);

       return (absX === 1 && absY === 2) || (absX === 2 && absY === 1);
    }
}