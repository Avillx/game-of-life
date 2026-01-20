import { GameManager } from "./gameManager.js"
import { View } from "./view.js"
import { ControlPanel } from "./controlPanel.js"
import { PRELOAD_FIGURE, COUNT_OF_COLUMNS, COUNT_OF_ROWS, MAX_SPEED, DEFAULT_SPEED } from "./defines.js"
import { Vector } from "./vector.js"

let instance

export class AppDelegate {

    constructor() {

        this._max_speed = MAX_SPEED
        this._isUpdating = false
        this._resizeObserver = null
        this._canvas = null
        this._gameManager = new GameManager()
        this._view = new View()
        this._clickEventListener = null
        this._speed = null
        this._controlPanel = new ControlPanel()
    }

    static getInstace() {

        if (instance) return instance

        instance = new AppDelegate()
        return instance
    }

    run() {

        this._isUpdating = true
        let lastTime = performance.now();
        let timeToTick = this._speed

        const loop = () => {
            const currentTime = performance.now();
            const delta = currentTime - lastTime

            if (this._isUpdating && timeToTick <= 0) {

                this._gameManager.update()
                timeToTick = this._max_speed - this._speed
            }

            timeToTick -= delta
            lastTime = performance.now()

            this._view.render()

            requestAnimationFrame(loop)
        }

        loop()

    }

    release() {

        this._resizeObserver.unobserve(this._canvas)
        this._resizeObserver = null

        this._canvas = null
        document.removeEventListener('pointerup', this._clickEventListener)
        this._clickEventListener = null

        this._gameManager.release()
        this._gameManager = null

        this._view.release()
        this._view = null

        this._controlPanel.release()
        this._controlPanel = null

        this._speed = null
        this._isUpdating = null
    }

    isUpdating() {

        return this._isUpdating
    }

    setUpdating(value) {

        this._isUpdating = value
    }

    getSpeed() {

        return this._speed
    }

    setSpeed(value) {

        if (value < 0 || value > this._max_speed) return
        this._speed = value

        this._isUpdating = this._speed > 0 ? true : false
    }

    _onClick(event) {

        const canvasRect = this._canvas.getBoundingClientRect()

        const canvasXPoint = event.pageX - canvasRect.left
        const canvasYPoint = event.pageY - canvasRect.top

        if (canvasXPoint < 0 || canvasYPoint < 0) return

        const idxs = this._view.canvasPointToCellIdx(canvasXPoint, canvasYPoint)

        if ((COUNT_OF_COLUMNS <= idxs.colIdx || idxs.rowIdx < 0) ||
            (COUNT_OF_ROWS <= idxs.rowIdx || idxs.rowIdx < 0))
            return

        this._gameManager.onCellClick(idxs.rowIdx, idxs.colIdx)
    }

    _onResize() {
        const canvasRect = this._canvas.getBoundingClientRect()

        this._canvas.height = canvasRect.height
        this._canvas.width = canvasRect.width
        this._view.setRectSize({

            rectHeight: canvasRect.height / COUNT_OF_COLUMNS,
            rectWidth: canvasRect.width / COUNT_OF_ROWS
        })

        this._view.setCanvasSize({
            height: canvasRect.height,
            width: canvasRect.width
        })

    }

    init() {

        this._initCanvas()
        this._gameManager.init()

        this.setSpeed(DEFAULT_SPEED)

        if (PRELOAD_FIGURE) {

            const initFigure = Vector.fromArray(PRELOAD_FIGURE)
            this._gameManager.setAsset(initFigure)
        }


        this._view.init(

            this._canvas.getContext("2d"),
            this._gameManager.getAliveCellProjections(),
            { rectHeight: null, rectWidth: null }
        )

        this._initClickEvent()
        this._initResizeManager()
        this._controlPanel.init(this)
    }

    _initClickEvent() {

        this._clickEventListener = this._onClick.bind(this)
        document.addEventListener('pointerup', this._clickEventListener)
    }

    _initCanvas() {

        this._canvas = document.getElementById("canvas__main")
    }

    _initResizeManager() {

        this._resizeObserver = new ResizeObserver(() => {
            this._onResize()
        })

        this._resizeObserver.observe(this._canvas)
        this._onResize()
    }

    _resizeObserver
    _controlPanel
    _canvas
    _gameManager
    _view
    _clickEventListener
    _speed
    _max_speed
}