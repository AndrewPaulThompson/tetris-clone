import Shape from './shape'
import { L_COLOUR } from './../constants'

class L extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = L_COLOUR
    }

    create() {
        this.points = [
            [L_COLOUR,null,null],
            [L_COLOUR,L_COLOUR,L_COLOUR],
            [null,null,null]
        ]
    }
}

export default L