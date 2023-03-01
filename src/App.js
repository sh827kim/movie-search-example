import {Component} from "./core/core"

export default class App extends Component {
    constructor() {
        super({
            state: {
                inputText: ''
            }
        });
    }
    render() {
        this.el.classList.add('search')
        this.el.innerHTML = `
        <input/>
        <button>Click!</button>
        `
        const inpulEL = this.el.querySelector('input')
        inpulEL.addEventListener('input', () => {
            this.state.inputText = inpulEL.value
        })

        const buttonEl = this.el.querySelector('button')
        buttonEl.addEventListener('click', () => {
            console.log(this.state.inputText)
        })
    }
}
