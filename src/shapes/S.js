import Shape from './Shape'
import { S_COLOUR } from './../Constants'

class S extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = S_COLOUR
    }

    create() {
        this.points = [
            [null,S_COLOUR,S_COLOUR],
            [S_COLOUR,S_COLOUR,null],
            [null,null,null]
        ]
    }
}

export default S