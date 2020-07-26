import Shape from './shape'
import { O_COLOUR } from './../constants'

class O extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = O_COLOUR
    }

    create() {
        this.points = [
            [O_COLOUR,O_COLOUR],
            [O_COLOUR,O_COLOUR]
        ]
    }
}

export default O