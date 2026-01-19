import { GameManager } from "./gameManager.js"
import { View } from "./view.js"
import { COUNT_OF_COLUMNS, COUNT_OF_ROWS } from "./defines.js"

let instance

export class AppDelegate {
    _resizeObserver
    _canvas
    _gameManager
    _view

    constructor() {
        this._resizeObserver = null
        this._canvas = null
        this._gameManager = new GameManager()
        this._view = new View()

    }

    static getInstace() {
        if (instance) return instance

        instance = new AppDelegate()
        return instance
    }

    get2dContext() {

        return this._canvas.getContext("2d");
    }

    init() {

        this._initCanvas()
        this._initResizeManager()
        this._gameManager.init()
        this._view.init(this.get2dContext(), this._gameManager.getField(), { rectHeight: null, rectWidth: null })
    }

    run() {
        const loop = () => {

            this._gameManager.update()
            this._view.render()

            requestAnimationFrame(loop)
        }
        loop()
    }

    release() {

        this._resizeObserver = null
        this._canvas = null
    }

    _onResize() {
        const canvasRect = this._canvas.getBoundingClientRect()

        this._canvas.height = canvasRect.height
        this._canvas.width = canvasRect.width
        this._view.setRectSize({

            rectHeight: canvasRect.height / COUNT_OF_COLUMNS,
            rectWidth: canvasRect.width / COUNT_OF_ROWS
        })

    }

    _initCanvas() {

        this._canvas = document.getElementById("canvas__main")
    }

    _initResizeManager() {

        this._resizeObserver = new ResizeObserver(() => {

            console.log("resized")
            this._onResize()
        })

        this._resizeObserver.observe(this._canvas)
    }
}