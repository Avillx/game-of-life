'use strict'

let instance

document.addEventListener('DOMContentLoaded', () => {
    GameOfLife.GetInstace().init()

    GameOfLife.GetInstace().run()
})

document.addEventListener('beforeunload', () => {

    GameOfLife.GetInstace().release()
    instance = null
})

class GameOfLife {
    _canvas
    _sizes

    constructor() {
        this._canvas = null
        this._sizes = {
            rectHeight: 0,
            rectWidth: 0,
            hElementsCount: 30,
            vElementsCount: 30,
        }
    }

    static GetInstace() {
        if (instance) return instance

        instance = new GameOfLife()
        return instance
    }

    init() {

        this.initCanvas()
    }

    run() {
        const loop = () => {

        }
        loop()
    }

    onResize() {

        this._resizeNeeded = true
    }

    initCanvas() {

        this._canvas = document.getElementById("canvas__main")
    }



    release() {
        this._canvas = null
    }
}

