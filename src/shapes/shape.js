class Shape {
    constructor(sketch) {
        this.sketch = sketch
        this.CELL_SIZE = 40
        this.FALL_TIME = 500
        this.buffer = 0
        this.x = 0
        this.y = 0
        this.paused = false
        this.dropPoint
        this.held
    }

    isHeld() {
        return this.held
    }

    resetBuffer() {
        this.buffer = 0
    }
    
    moveUp() {
        this.y--
    }
    
    moveDown() {
        this.y++
    }
    
    moveLeft() {
        this.x--
    }
    
    moveRight() {
        this.x++
    }

    getBounds() {
        let xValues = []
        let yValues = []

        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                if (this.points[i][j] != null) {
                    xValues.push(this.x + j)
                    yValues.push(this.y + i)
                }
            }
        }

        return {
            top: Math.max(...yValues),
            right: Math.max(...xValues),
            bottom: Math.min(...yValues),
            left: Math.min(...xValues),
        }
    }

    draw(sketch) {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                if (this.points[i][j] != null) {
                    sketch.fill(this.points[i][j])
                    sketch.square((this.x + j)*this.CELL_SIZE, (this.y + i)*this.CELL_SIZE, 40)
                }
            }
        }
    }

    update(delta) {
        this.buffer += delta
    }

    canFall() {
        return this.buffer > this.FALL_TIME
    }

    rotate() {
        let newPos = []
        for (let i = 0; i < this.points.length; i++) {
            let newRow = []
            for (let j = this.points.length - 1; j >= 0; j--) {
                newRow.push(this.points[j][i])
            }
            newPos.push(newRow)
        }

        this.points = newPos
    }
}

export default Shape