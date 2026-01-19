import { GameManager } from "./gameManager.js"
import { View } from "./view.js"
import { COUNT_OF_COLUMNS, COUNT_OF_ROWS } from "./defines.js"

let instance

export class AppDelegate {
    constructor() {
        this._resizeObserver = null
        this._canvas = null
        this._gameManager = new GameManager()
        this._view = new View()
        this._clickEventListener = null

    }

    static getInstace() {
        if (instance) return instance

        instance = new AppDelegate()
        return instance
    }

    run() {

        let isRun = true

        const updateLoop = () => {

            this._gameManager.update()
        }

        setInterval(updateLoop, 1200)

        const renderLoop = () => {

            this._view.render()
            requestAnimationFrame(renderLoop)
        }

        renderLoop()

    }

    release() {

        this._resizeObserver = null
        this._canvas = null
        document.removeEventListener('pointerup', this._clickEventListener)
        this._clickEventListener = null
    }

    _onClick(event) {

        const canvasRect = this._canvas.getBoundingClientRect()

        const canvasXPoint = event.pageX - canvasRect.left
        const canvasYPoint = event.pageY - canvasRect.top

        if (canvasXPoint < 0 || canvasYPoint < 0) return

        const idxs = this._view.canvasPointToCellIdx(canvasXPoint, canvasYPoint)
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
        this._view.init(this._canvas.getContext("2d"), this._gameManager.getField(), { rectHeight: null, rectWidth: null })
        this._initClickEvent()
        this._initResizeManager()
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
    _canvas
    _gameManager
    _view
    _clickEventListener
}