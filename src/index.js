'use strict'
import { AppDelegate } from "./appDelegate.js"

document.addEventListener('DOMContentLoaded', () => {
    AppDelegate.getInstace().init()

    AppDelegate.getInstace().run()
})

document.addEventListener('beforeunload', () => {

    AppDelegate.getInstace().release()
    instance = null
})

