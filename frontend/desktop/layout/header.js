import { register, Element, html, renderSlot } from "../components/Dom.js";
class Header extends Element {
    render() {
        return html`
            <div id="background"></div>
            <div id="container">
                <div class="start">Tt</div>
                <div class="center">
                    <app-searchbox>
                      <div slot="search-input" id="search-input"></div>
                    </app-searchbox>
                </div>
                <div class="end">Tdt</div>
            </div>
        `;
    }
    firstUpdated() {
        renderSlot(this, "search-input");
    }
}
register(Header, "app-masthead");
