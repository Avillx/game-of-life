export class Vector {

    constructor(initalCopacity) {

        this._size = initalCopacity ? initalCopacity : 0
        this._elements = new Array(this._size)
    }

    pushBack(element) {

        this._elements = [element, ...this._elements]
        this._size++
    }

    push(element) {

        this._elements.push(element)
        this._size++
    }

    at(idx) {
        if (idx > this._size || idx < 0) return null
        return this._elements[idx]
    }

    set(idx, element) {

        this._elements[idx] = element
    }

    idxOf(element) {

        this._elements.indexOf(element)
    }

    size() {

        return this._size
    }

    remove(element) {

        const idx = this._elements.indexOf(element)
        this._elements.splice(idx, 1)
        this._size--
    }

    idxOfEqual(val) {

        return this._elements.indexOf(this._elements.filter(el => el == val)[0])
    }

    removeAt(idx) {

        if (idx > this._size || idx < 0) return

        this._elements.splice(idx)
        this._size--
    }

    release() {

        for (let i = 0; i < this._size; i++) {
            if (typeof this._elements[i]['relese'] === 'function') {

                this._elements[i].release()
            }

            this._elements[i] = null
        }
        this._elements = null
        this._size = null
    }

    _elements = []
    _size
}