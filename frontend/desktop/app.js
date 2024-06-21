import "./layout/index.js";
import "./pages/index.js";
import { register, Element, html, css, renderSlot } from "./components/Dom.js";

class App extends Element {
    constructor() {
        super();
        this.mastheadHeight = 56;
    }
    render() {
        return html`<div>
            <div>
                <div id="masthead-container"></div>
            </div>
            <page-manager></page-manager>
        </div>`;
    }
    firstUpdated() {
        super.firstUpdated();
        renderSlot(this, "header", "masthead-container");
    }
    isTheaterMode() {
        return this.isWatchPage && this.isTheaterModeSession;
    }
}
register(App, "yo-app");