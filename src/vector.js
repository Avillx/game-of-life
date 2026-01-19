export class Vector {

    constructor() {

        this._size = initalCopacity ? initalCopacity : 0
        this._elements = new Array(this._size)
    }

    pushBack(element) {

        this._elements = [element, ...this._elements]
        this._size = this._elements.length
    }

    push(element) {

        this._elements.push(element)
        this._size = this._elements.length
    }

    at(idx) {
        if (idx > this._size || idx < 0) return null
        return this._elements[idx]
    }

    set(idx, element) {

        this._elements[idx] = element
    }

    idxOf(element) {

        this._elements.find(element)
    }

    size() {
        return this._size
    }

    remove(element) {

        const idx = this._elements.findIndex(element)
        this._elements.splice(idx, 1)
    }

    removeAt(idx) {

        this._elements.splice(idx, 1)
    }

    _elements = []
    _size
}