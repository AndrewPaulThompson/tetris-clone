import p5 from 'p5'
import GameManager from './GameManager'
import { ROWS, COLUMNS, CELL_SIZE } from './Constants'

const sketch = (s) => {
    let manager

    s.setup = () => {
        s.createCanvas(COLUMNS*CELL_SIZE, ROWS*CELL_SIZE)
        manager = new GameManager(s)
    }

    s.draw = () => {
        manager.handleTick()
    }

    s.keyPressed = (e) => {
        e.preventDefault()
        manager.handlePress()
    }
}

const sketchInstance = new p5(sketch)