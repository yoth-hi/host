import { GetIcon } from "../components/icon.js";
import { Element, register, html, renderSlot } from "../components/Dom.js";
class SearchBox extends Element {
    constructor() {
        super();
    }
    static properties = {
        icon: { type: String }
    };
    static get observers() {
        return ["_onChengeIcon(icon)"];
    }
    render() {
        return html`<div id="content"></div>`;
    }
    _onChengeIcon(icon) {
        const icon_ = GetIcon(icon) || {};
        const svg = this._createSvgOrJustGet(icon_);
        this.querySelector("#content").appendChild(svg);
    }
    _createSvgOrJustGet({ size = 24, html = "" }) {
      
        if (/\<svg/.test(html)) {
            const g = document.createElement("div");
            g.innerHTML = html;
           this.svgElement = g.firstChild;
        } else {
            this.svgElement =
                this.svgElement ||
                document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgElement.innerHTML += html;
            
        }
        this.svgElement.setAttribute("viewBox",`${size} ${size} 0 0`)
        this.svgElement.setAttribute("width",`${size}`)
        this.svgElement.setAttribute("height",`${size}`)
        this.svgElement.setAttribute("style",`background:#3886`)
        
        // this.svgElement.height = `${size}`
        return this.svgElement;
    }
}
register(SearchBox, "app-icon");
