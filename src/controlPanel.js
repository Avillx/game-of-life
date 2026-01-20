import { SPEED_CHANGE_STEP } from "./defines.js"

export class ControlPanel {
    constructor() {

        this._delegate = null

        this._speedIncreaseButton = null
        this._speedDecreaseButton = null
        this._speedValueSpan = null

        this._increaseListener = null
        this._decreaseListener = null
    }

    init(delegate) {
        this._delegate = delegate

        this._speedIncreaseButton = document.getElementById("time-controller__speed-plus")
        this._increaseSpeed = this._increaseSpeed.bind(this)
        this._speedIncreaseButton.addEventListener('click', this._increaseSpeed)

        this._speedDecreaseButton = document.getElementById("time-controller__speed-minus")
        this._pauseListener = this._decreaseSpeed.bind(this)
        this._speedDecreaseButton.addEventListener('click', this._pauseListener)

        this._speedValueSpan = document.getElementById("time-controller__speed-span")
    }

    _increaseSpeed() {

        const speed = this._delegate.getSpeed()
        this._delegate.setSpeed(speed + SPEED_CHANGE_STEP)
        this._displaySpeed()
    }

    _decreaseSpeed() {

        const speed = this._delegate.getSpeed()
        this._delegate.setSpeed(speed - SPEED_CHANGE_STEP)
        this._displaySpeed()
    }

    _displaySpeed() {

        this._speedValueSpan.textContent = `Speed: ${this._delegate.getSpeed()}`
    }

    release() {
        this._delegate = null




        this._speedIncreaseButton.removeEventListener('click', this._increaseListener)
        this._speedIncreaseButton = null
        this._increaseListener = null

        this._speedDecreaseButton.removeEventListener('click', this._decreaseListene)
        this._speedDecreaseButton = null
        this._decreaseListener = null

        this._speedValueSpan = null
    }

    _delegate

    _speedIncreaseButton
    _speedDecreaseButton
    _speedValueSpan

    _increaseListener
    _decreaseListener
}