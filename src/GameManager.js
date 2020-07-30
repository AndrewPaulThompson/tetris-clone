import I from './shapes/I'
import L from './shapes/L'
import J from './shapes/J'
import S from './shapes/S'
import Z from './shapes/Z'
import O from './shapes/O'
import T from './shapes/T'
import Grid from './Grid'
import KeyboardManager from './KeyboardManager'

class GameManager {
    constructor(sketch) {
        this.sketch = sketch
        this.grid = new Grid()
        this.keyboardManager = new KeyboardManager(sketch)
        this.currentShape = this.createShape()
        this.heldShape = null
        this.prevTime = 0
    }

    handleTick() {
        const time = this.sketch.millis()
        const delta = time - this.prevTime
        this.prevTime = time
        this.currentShape.update(delta)
        
        this.grid.draw(this.sketch)
        this.grid.drawFall(this.sketch, this.currentShape)

        if (this.currentShape.canFall()) {
            this.currentShape.moveDown()
            this.currentShape.resetBuffer()

            if (!this.grid.canPlace(this.currentShape)) {
                this.currentShape.moveUp()
                this.grid.add(this.currentShape)
                this.currentShape = this.createShape()
            }

            this.grid.checkLines()
        }

        this.keyboardManager.update(delta)
        this.keyboardManager.handleHold(this.grid, this.currentShape)

        this.currentShape.draw(this.sketch)
    }

    handlePress() {
        this.keyboardManager.handlePress(this.grid, this.currentShape)
    }

    createShape() {
        const num = Math.floor(Math.random() * Math.floor(7))
    
        switch (num) {
            case 0:
                return new I()
            case 1:
                return new L()
            case 2:
                return new J()
            case 3:
                return new S()
            case 4:
                return new Z()
            case 5:
                return new O()
            case 6:
                return new T()
            default:
                return new I()
        }
    }
}

export default GameManager