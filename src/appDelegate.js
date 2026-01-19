import { GameManager } from "./gameManager.js"

let instance

export class AppDelegate {
    _resizeObserver
    _canvas
    _sizes
    _gameManager

    constructor() {
        this._resizeObserver = null
        this._canvas = null
        this._gameManager = new GameManager()
        this._sizes = {
            rectHeight: 0,
            rectWidth: 0
        }
    }

    static getInstace() {
        if (instance) return instance

        instance = new AppDelegate()
        return instance
    }

    getSizes() {
        return this._sizes
    }

    init() {

        this._initCanvas()
        this._initResizeManager()
    }

    run() {
        const loop = () => {



            requestAnimationFrame(loop())
        }
        loop()
    }

    release() {

        this._resizeObserver = null
        this._canvas = null
    }

    _onResize() {
        const canvasRect = this._canvas.getBoundingClientRect()

        this._sizes.rectHeight = canvasRect.rectHeight / this._sizes.vElementsCount
        this._sizes.rectWidth = canvasRect.rectWidth / this._sizes.hElementsCount
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