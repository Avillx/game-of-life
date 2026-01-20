import { Vector } from "./vector.js"
import { COUNT_OF_COLUMNS, COUNT_OF_ROWS } from "./defines.js"

export class GameManager {
    _field
    _appDelegate
    _aliveCellProjections

    constructor(appDelegate) {

        this._appDelegate = appDelegate
    }

    getField() {

        return this._field
    }

    getAliveCellProjections() {

        return this._aliveCellProjections
    }

    init() {

        this._aliveCellProjections = new Vector(0)
        this._field = new Vector(COUNT_OF_ROWS)

        for (let rowIdx = 0; rowIdx < this._field.size(); rowIdx++) {

            this._field.set(rowIdx, new Vector(COUNT_OF_COLUMNS))
            const row = this._field.at(rowIdx)
            for (let colIdx = 0; colIdx < row.size(); colIdx++) {

                const cell = new Cell()
                cell.init(rowIdx, colIdx)
                row.set(colIdx, cell)
            }
        }

    }

    setAsset(config) {

        for (let i = 0; i < config.size(); i++) {

            const projection = config.at(i)
            this._turnCell(projection.row, projection.col)
        }
    }

    update() {

        for (let rowIdx = 0; rowIdx < this._field.size(); rowIdx++) {

            const row = this._field.at(rowIdx)
            for (let colIdx = 0; colIdx < row.size(); colIdx++) {

                const cell = row.at(colIdx)

                const neighboors = new Vector(8)

                neighboors.set(0, this._field.at(rowIdx + 1)?.at(colIdx - 1))
                neighboors.set(1, this._field.at(rowIdx + 1)?.at(colIdx))
                neighboors.set(2, this._field.at(rowIdx + 1)?.at(colIdx + 1))
                neighboors.set(3, this._field.at(rowIdx)?.at(colIdx - 1))
                neighboors.set(4, this._field.at(rowIdx)?.at(colIdx + 1))
                neighboors.set(5, this._field.at(rowIdx - 1)?.at(colIdx - 1))
                neighboors.set(6, this._field.at(rowIdx - 1)?.at(colIdx))
                neighboors.set(7, this._field.at(rowIdx - 1)?.at(colIdx + 1))

                if (this._IsTurning(cell, neighboors)) {

                    this._turnCell(rowIdx, colIdx)
                }
            }
        }
    }

    onCellClick(rowIdx, colIdx) {

        this._turnCell(rowIdx, colIdx)
    }

    _turnCell(rowIdx, colIdx) {

        const cell = this._field.at(rowIdx).at(colIdx)
        cell.toggleState()

        if (cell.getState()) {

            this._aliveCellProjections.push(cell.getProjection())
        } else {

            this._aliveCellProjections.remove(cell.getProjection())
        }
    }

    _IsTurning(cell, neighboors) {

        let liveNeighboorsCount = 0
        for (let idx = 0; idx < neighboors.size(); idx++) {

            if (neighboors.at(idx) !== null
                && neighboors.at(idx) !== undefined
                && neighboors.at(idx).getState()) {

                liveNeighboorsCount++
            }
        }

        if ((!cell.getState() && liveNeighboorsCount === 3)
            || (cell.getState() && (liveNeighboorsCount > 3 || liveNeighboorsCount < 2))) {

            return true
        }

        return false
    }

    release() {

        this._aliveCellProjections.release()
        this._aliveCellProjections = null

        this._field.release()
        this._field = null
    }
}

class Cell {

    constructor() {

        this._projection = null
        this._state = null
    }

    init(rowIdx, colIdx) {

        this._projection = { row: rowIdx, col: colIdx }
        this._state = false
    }

    getProjection() {

        return this._projection
    }

    setState(value) {
        this._state = value
    }

    toggleState() {

        this._state = !this._state
    }

    getState() {

        return this._state
    }

    release() {

        this._projection = null
        this._state = null
    }

    _state
    _projection
}