import p5 from 'p5';
import I from './shapes/I'
import L from './shapes/L'
import J from './shapes/J'
import S from './shapes/S'
import Z from './shapes/Z'
import O from './shapes/O'
import T from './shapes/T'
import Grid from './grid';
import { ROWS, COLUMNS, CELL_SIZE } from './constants'

let current
let prev = 0
let grid

const createShape = (s) => {
    const num = Math.floor(Math.random() * Math.floor(7))

    switch (num) {
        case 0:
            return new I(s)
        case 1:
            return new L(s)
        case 2:
            return new J(s)
        case 3:
            return new S(s)
        case 4:
            return new Z(s)
        case 5:
            return new O(s)
        case 6:
            return new T(s)
        default:
            return new I(s)
    }
}

const sketch = (s) => {
    s.setup = () => {
        s.createCanvas(COLUMNS*CELL_SIZE, ROWS*CELL_SIZE)
        current = createShape(s)
        grid = new Grid(s)
    }

    s.draw = () => {
        let curr = s.millis()
        let delta = curr - prev;
        prev = curr;
        current.update(delta)

        grid.draw()

        if (current.canFall()) {
            current.moveDown()
            current.resetBuffer()

            if (!grid.canPlace(current)) {
                current.moveUp()
                grid.add(current)
                current = createShape(s)
            }

            grid.checkLines()
        }

        current.draw()
    }

    s.keyPressed = (e) => {
        e.preventDefault()
        grid.handlePress(s.keyCode, current)
    }
}

const sketchInstance = new p5(sketch);