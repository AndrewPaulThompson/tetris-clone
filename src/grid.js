import { ROWS, COLUMNS, CELL_SIZE, GHOST_COLOUR } from './Constants'

class Grid {
    constructor(sketch) {
        this.sketch = sketch
        this.lines = 0
        this.grid = Array(ROWS).fill(null).map(x => Array(COLUMNS).fill(null))
        this.ghost = Array(ROWS).fill(null).map(x => Array(COLUMNS).fill(null))
    }

    draw() {
        this.sketch.background(220)
        this.sketch.strokeWeight(0.5)
        this.sketch.noFill()

        // Grid
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let colour = this.grid[i][j] !== null ? this.grid[i][j] : '#dcdcdc'
                this.sketch.fill(colour)
                this.sketch.square(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE)
            }
        }
    }

    drawFall(shape) {
        this.ghost = Array(ROWS).fill(null).map(x => Array(COLUMNS).fill(null))
        let shapeY = shape.y
        do {
            shape.moveDown()
            if (!this.canPlace(shape)) {
                shape.moveUp()
                shape.dropPoint = shape.y
                break
            }
        } while (this.canPlace(shape))

        for (let i = 0; i < shape.points.length; i++) {
            for (let j = 0; j < shape.points[i].length; j++) {
                if (shape.points[i][j] != null) {
                    let gridX = shape.x + j
                    let gridY = shape.y + i

                    // Add them to the grid
                    this.ghost[gridY][gridX] = GHOST_COLOUR
                }
            }
        }

        this.sketch.strokeWeight(0.5)
        this.sketch.noFill()

        // Grid
        for (let i = 0; i < this.ghost.length; i++) {
            for (let j = 0; j < this.ghost[i].length; j++) {
                if (this.ghost[i][j] !== null) {
                    this.sketch.fill(this.ghost[i][j])
                    this.sketch.square(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE)
                }
            }
        }

        shape.y = shapeY
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
                this.lines++
                document.getElementById('pos').innerHTML = `lines cleared: ${this.lines}`
            }
        }
    }
}

export default Grid