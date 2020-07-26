import Shape from './shape'
import { T_COLOUR } from './../constants'

class T extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = T_COLOUR
    }

    create() {
        this.points = [
            [T_COLOUR,T_COLOUR,T_COLOUR],
            [null,T_COLOUR,null],
            [null,null,null]
        ]
    }
}

export default T