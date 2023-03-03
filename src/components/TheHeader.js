import { Component} from "../core/core"

export default class TheHeader extends Component {
    constructor() {
        super({
            tagName: 'header'
        });

    }
    render() {
        this.el.innerHTML = `
        <a href="#/">Main</a>
        <a href="#/about">About</a>
        `
    }

}
