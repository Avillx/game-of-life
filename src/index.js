'use strict'

let instance

document.addEventListener('DOMContentLoaded', () => {
    GameOfLife.getInstace().init()

    GameOfLife.getInstace().run()
})

document.addEventListener('beforeunload', () => {

    GameOfLife.getInstace().release()
    instance = null
})

class GameOfLife {
    _resizeObserver
    _canvas
    _sizes

    constructor() {
        this._resizeObserver = null
        this._canvas = null
        this._sizes = {
            rectHeight: 0,
            rectWidth: 0,
            hElementsCount: 30,
            vElementsCount: 30,
        }
    }

    static getInstace() {
        if (instance) return instance

        instance = new GameOfLife()
        return instance
    }

    init() {

        this._initCanvas()
        this._initResizeManager()
    }

    run() {
        const loop = () => {

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

