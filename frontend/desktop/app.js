import "./layout/index.js";
import "./pages/index.js";
import { register, Element, html, css, renderSlot } from "./components/Dom.js";

import { stote } from "../player/src/utils/utils.js";
import { ROOR_ELEMENT_ID } from "./components/keys.js";
class App extends Element {
    constructor() {
        super();
        this.mastheadHeight = 56;
        stote.set(ROOR_ELEMENT_ID, this);
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
    static properties = {
        noMarginTop: { type: Boolean, reflect: true },
        hiddenHeader: { type: Boolean, reflect: true },
    };
    isAppDarkTheme() {
        return document.documentElement.hasAttribute("dark");
    }
    hiddenMastHeader_(is, isFull){
      this.hiddenHeader = is;
      this.noMarginTop = !!isFull
    }
}
setTimeout(function() {register(App, "yo-app");}, 0);
