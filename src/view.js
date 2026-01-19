
export class View {
    _ctx2d
    _rectSize
    _field

    constructor() {

        this._ctx2d = null
        this._rectSize = null
        this._field = null
    }

    init(ctx2d, field, initialRectSize) {
        this._field = field

        this._rectSize = {

            height: initialRectSize.rectHeight,
            width: initialRectSize.rectWidth
        }

        this._ctx2d = ctx2d
    }

    setRectSize(rectSize) {

        this._rectSize = {

            height: rectSize.rectHeight,
            width: rectSize.rectWidth
        }
    }

    render() {

        for (let rowIdx = 0; rowIdx < this._field.size(); rowIdx++) {

            const row = this._field.at(rowIdx)
            for (let colIdx = 0; colIdx < row.size(); colIdx++) {

                const cell = row.at(colIdx)

                this._ctx2d.fillStyle = cell.getState() ? "black" : "white"

                const posX = this._rectSize.width * rowIdx
                const posY = this._rectSize.height * colIdx
                const posXend = posX + this._rectSize.width
                const posYend = posY + this._rectSize.height

                this._ctx2d.fillRect(posX, posY, posXend, posYend);
            }
        }
    }

    release() {

        this._rectSize = null
        this._field = null
        this._ctx2d = null
    }

}