import { COLUMNS, SPACE_KEY, UP_KEY, LEFT_KEY, RIGHT_KEY, DOWN_KEY, C_KEY } from './Constants'

class KeyboardManager {
    constructor(sketch) {
        this.sketch = sketch
        this.buffer = 0
        this.TIME = 150
    }

    update(delta) {
        this.buffer += delta
    }

    resetBuffer() {
        this.buffer = 0
    }

    handleHold(grid, shape) {
        if (this.buffer < this.TIME || shape.isHeld()) return

        let bounds
        if (this.sketch.keyIsDown(LEFT_KEY)) {
            shape.moveLeft()
            bounds = shape.getBounds()
            if (bounds.left < 0 || !grid.canPlace(shape)) shape.moveRight()
            this.resetBuffer()
        }

        if (this.sketch.keyIsDown(RIGHT_KEY)) {
            shape.moveRight()
            bounds = shape.getBounds()
            if (bounds.right > COLUMNS - 1 || !grid.canPlace(shape)) shape.moveLeft()
            this.resetBuffer()
        }

        if (this.sketch.keyIsDown(DOWN_KEY)) {
            shape.moveDown()
            if (!grid.canPlace(shape)) {
                shape.moveUp()
            }
            this.resetBuffer()
        }
    }

    handlePress(grid, shape) {
        if (shape.isHeld()) return

        switch (this.sketch.keyCode) {
            case UP_KEY:
                let oldPos = shape.points
                shape.rotate()
                if (!grid.canPlace(shape)) {
                    shape.points = oldPos
                }
                break
            case SPACE_KEY:
                shape.y = shape.dropPoint
                shape.held = true
            case C_KEY:

                break
            default:
                break
        }
    }
}

export default KeyboardManager