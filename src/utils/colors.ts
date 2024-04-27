import { Colors } from "../models/colors";

export function getOppositeColor(color: Colors) {
    if (color === Colors.BLACK) {
        return Colors.WHITE;
    } else {
        return Colors.BLACK;
    }
}