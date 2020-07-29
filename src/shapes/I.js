import Shape from './Shape'
import { I_COLOUR } from './../Constants'

class I extends Shape {
    constructor(sketch) {
        super(sketch)
        this.points = {}
        this.create()
        this.color = I_COLOUR
    }

    create() {
        this.points = [
            [null,null,null,null],
            [I_COLOUR,I_COLOUR,I_COLOUR,I_COLOUR],
            [null,null,null,null],
            [null,null,null,null],
        ]
    }
}

export default I