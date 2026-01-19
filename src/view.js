import { CELLS_COLOR } from "./defines.js"
export class View {
    _ctx2d
    _rectSize
    _field
    _canvasSize

    constructor() {

        this._ctx2d = null
        this._rectSize = null
        this._field = null
        this._canvasSize = null
    }

    init(ctx2d, field, initialRectSize, canvasSize) {

        this._field = field
        this._canvasSize = canvasSize
        this._rectSize = {

            height: initialRectSize.rectHeight,
            width: initialRectSize.rectWidth
        }

        this._ctx2d = ctx2d
    }

    setCanvasSize(canvasSize) {
        this._canvasSize = canvasSize
    }

    setRectSize(rectSize) {

        this._rectSize = {

            height: rectSize.rectHeight,
            width: rectSize.rectWidth
        }
    }

    canvasPointToCellIdx(xPos, yPos) {

        const rowIdx = Math.floor(xPos / this._rectSize.width)
        const colIdx = Math.floor(yPos / this._rectSize.height)

        return { rowIdx: rowIdx, colIdx: colIdx }
    }

    render() {

        this._ctx2d.reset()

        for (let rowIdx = 0; rowIdx < this._field.size(); rowIdx++) {

            const row = this._field.at(rowIdx)
            for (let colIdx = 0; colIdx < row.size(); colIdx++) {

                const cell = row.at(colIdx)

                if (cell.getState()) {
                    const posX = this._rectSize.width * rowIdx
                    const posY = this._rectSize.height * colIdx

                    this._ctx2d.roundRect(posX + 2, posY + 2, this._rectSize.width - 4, this._rectSize.height - 4, 5);
                    this._ctx2d.fillStyle = CELLS_COLOR;
                    this._ctx2d.fill();
                }
            }
        }
    }

    release() {

        this._rectSize = null
        this._field = null
        this._ctx2d = null
        this._canvasSize = null
    }

}