import { ROWS, COLUMNS, CELL_SIZE, SPACE_KEY, UP_KEY, LEFT_KEY, RIGHT_KEY, DOWN_KEY, C_KEY } from './constants'

class Grid {
    constructor(sketch) {
        this.sketch = sketch
        this.grid = Array(ROWS).fill(null).map(x => Array(COLUMNS).fill(null))
    }

    draw() {
        this.sketch.background(220);
        this.sketch.strokeWeight(0.5)
        this.sketch.noFill()

        // Grid
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let colour = this.grid[i][j] !== null ? this.grid[i][j] : '#dcdcdc'
                this.sketch.fill(colour)
                this.sketch.square(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE);
            }
        }
    }

    canPlace(shape) {
        // Get all of the points of the shape that have a value
        for (let i = 0; i < shape.points.length; i++) {
            for (let j = 0; j < shape.points[i].length; j++) {
                if (shape.points[i][j] != null) {
                    let gridX = shape.x + j
                    let gridY = shape.y + i

                    // If the Y position of the shape on the grid is more than the height of the grid
                    // we're at the bottom of the grid
                    if (gridY >= ROWS || this.grid[gridY][gridX] != null) {
                        return false
                    }
                }
            }
        }
        return true
    }

    add(shape) {
        // Get all of the points of the shape that have a value
        for (let i = 0; i < shape.points.length; i++) {
            for (let j = 0; j < shape.points[i].length; j++) {
                if (shape.points[i][j] != null) {
                    let gridX = shape.x + j
                    let gridY = shape.y + i

                    // Add them to the grid
                    this.grid[gridY][gridX] = shape.color
                }
            }
        }
    }

    checkLines() {
        for (let i = 0; i < this.grid.length; i++) {
            if (!this.grid[i].includes(null)) {
                this.grid.splice(i, 1)
                this.grid.unshift(Array(COLUMNS).fill(null))
            }
        }
    }

    handlePress(keyCode, shape) {
        let bounds
        switch (keyCode) {
            case UP_KEY:
                let oldPos = shape.points
                shape.rotate()
                if (!this.canPlace(shape)) {
                    shape.points = oldPos
                }
                break;
            case LEFT_KEY:
                shape.moveLeft()
                bounds = shape.getBounds()
                if (bounds.left < 0 || !this.canPlace(shape)) shape.moveRight()
                break;
            case RIGHT_KEY:
                shape.moveRight()
                bounds = shape.getBounds()
                if (bounds.right > COLUMNS - 1 || !this.canPlace(shape)) shape.moveLeft()
                break;
            case DOWN_KEY:
                shape.moveDown()
                if (!this.canPlace(shape)) {
                    shape.moveUp()
                }
                break;
            case SPACE_KEY:

                break;
            case C_KEY:

                break;
            default:
                break;
        }
    }
}

export default Grid