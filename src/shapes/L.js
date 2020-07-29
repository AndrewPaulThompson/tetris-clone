import Shape from './Shape'
import { L_COLOUR } from './../Constants'

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