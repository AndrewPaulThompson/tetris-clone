import Shape from './shape'
import { J_COLOUR } from './../constants'

class J extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = J_COLOUR
    }

    create() {
        this.points = [
            [null,null,J_COLOUR],
            [J_COLOUR,J_COLOUR,J_COLOUR],
            [null,null,null]
        ]
    }
}

export default J