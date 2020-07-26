import Shape from './shape'
import { Z_COLOUR } from './../constants'

class Z extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = Z_COLOUR
    }

    create() {
        this.points = [
            [Z_COLOUR,Z_COLOUR,null],
            [null,Z_COLOUR,Z_COLOUR],
            [null,null,null]
        ]
    }
}

export default Z