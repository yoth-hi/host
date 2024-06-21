import { Element, register, html, renderSlot } from "../components/Dom.js";

class SearchBox extends Element {
    constructor() {
        super();
        this.icon = "Search";
        this.placeholder = "Search";
        this.isClearButtonVisible = false;
    }
    static properties = {
        isClearButtonVisible: { type: Boolean },
        isInputTouched: { type: Boolean },
        searchInput: { type: HTMLElement },
        hasInput: { type: Boolean },
        icon: { type: String },
        placeholder: { type: String }
    };
    render() {
        return html`
            <form id="search-form" action="/results">
                <div id="container" 
                  class="${this.hasFocus ? "focused" : ""}"
                  @click="${this.onClick}">
                    <app-icon
                        id="search-icon"
                        icon="${this.icon}"
                        @mousedown="${this.focusInput}"
                    ></app-icon>
                    <div id="input"></div>
                    <div
                        @click="${this.clearSearch}"
                        id="search-clear-button"
                        ?hidden="${!this.isClearButtonVisible}"
                    >
                        df
                    </div>
                </div>
                <slot name="search-container"></slot>
            </form>
            <button id="search-icon-legacy" aria-label="${this.placeholder}">
                <app-icon icon="${this.icon}"></app-icon>
                <tp-yt-paper-tooltip prefix=""
                    >${this.placeholder}</tp-yt-paper-tooltip
                >
            </button>
        `;
    }
    firstUpdated() {
        this.hasAttribute("role") || this.setAttribute("role", "search");
        renderSlot(this, "search-input", "input");
        const input = this.querySelector("input");
        this.searchInput = input;
        this.searchInput.addEventListener("keyup",this.onInputChange.bind(this));
        this.searchInput.addEventListener("focus",this.onInputFocus.bind(this));
        this.searchInput.addEventListener("blur",this.onInputBlur.bind(this));
        input.removeAttribute("hidden");
    }
    onClick(event) {
        this.isInputTouched ||
            event.target !== this.searchInput ||
            (this.isInputTouched = !0);
    }
    focusInput(a) {
        null == a || a.preventDefault();
        this.searchInput.focus();
    }
    onInputChange() {
        this.searchInput &&
            ((this.isClearButtonVisible = "" !== this.searchInput.value),
            (this.hasInput = "" !== this.searchInput.value));
    }
    clearSearch(a) {
        a.preventDefault();
        this.searchInput.value = "";
        this.hasInput = this.isClearButtonVisible = !1;
        this.focusInput();
    }
    onInputFocus() {
        this.hasFocus = true;
    }
    onInputBlur() {
        this.hasFocus = false;
    }
    _onChengePlaceholder(placeholder){
      this.searchInput.placeholder = placeholder
    }
    static get observers() {
        return ["_onChengePlaceholder(placeholder)"];
    }
}
register(SearchBox, "app-searchbox");
// Q("container", SearchBox.prototype, "container");
// Q("search", SearchBox.prototype, "searchInput");
