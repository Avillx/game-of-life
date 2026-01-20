import { CELLS_COLOR } from "./defines.js"
export class View {
    _ctx2d
    _rectSize
    _activeCellProjections
    _canvasSize

    constructor() {

        this._ctx2d = null
        this._rectSize = null
        this._field = null
        this._activeCellProjections = null
    }

    init(ctx2d, activeCellProjections, initialRectSize, canvasSize) {

        this._activeCellProjections = activeCellProjections
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
        this._ctx2d.fillStyle = CELLS_COLOR;
        this._ctx2d.beginPath();

        for (let i = 0; i < this._activeCellProjections.size(); i++) {

            const cellProjection = this._activeCellProjections.at(i)

            const posX = this._rectSize.width * cellProjection.row
            const posY = this._rectSize.height * cellProjection.col

            this._ctx2d.rect(posX + 2, posY + 2, this._rectSize.width - 4, this._rectSize.height - 4, 5);
        }

        this._ctx2d.fill();
    }

    release() {

        this._rectSize = null
        this._activeCellProjections = null
        this._ctx2d = null
        this._canvasSize = null
    }

}