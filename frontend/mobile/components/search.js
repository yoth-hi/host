import { Element, r } from "../Element.js";
import Auto from "./search.autoComplete.js";
class Logo extends Element {
    #_isInputTouched;
    constructor({ _scope }) {
        super([
            {
                _tag: "app-button-icon",
                _className: "back-button",
                _props: {
                    _icon: "search",
                    _click() {
                        _scope._isOpendedSearchBar = false;
                    }
                }
            },
            {
                _tag: "form",
                _className: "input-content",
                _childs: [
                    {
                        _tag: "input",
                        _ref: "$input",
                        _attrs: {
                            id: "search",
                            autocapitalize: "none",
                            autocomplete: "off",
                            autocorrect: "off",
                            name: "search_query",
                            tabindex: "0",
                            type: "text",
                            spellcheck: "false"
                        }
                    },
                    {
                        _tag: "div",
                        _attrs: {
                            hidden: "{{_isClearButtonVisible}}"
                        },
                        _childs: ["$$"],
                        _ref: "_clearButton"
                    }
                ],
                _attrs: {
                    "aria-label": "{{label}}"
                }
            }
        ]);
        this._searchInput = this._getRef("$input")[1];
        this._on(this.hostElement, "focus", this._focus);
        this._on(this.hostElement, "click", this._click);
        this._on(this._searchInput, "input", this._input);
        this._on(this._getRef("_clearButton")[1], "click", this._clearSearch);
        this._isClearButtonVisible = false;
        this._boxAuto = new Auto(this);
    }
    _focus() {
        this._searchInput?.focus();
    }
    _input(v) {
        this._hasInput = this._isClearButtonVisible = !!this._searchInput?.value;
        this._boxAuto._searchBy(this._searchInput?.value)
    }
    _click(a) {
        this._isInputTouched ||
            a.target !== this._searchInput ||
            (this._isInputTouched = !0);
    }
    set _isClearButtonVisible(T) {
        T = !T ? "-" : void 0;
        this._update({ _isClearButtonVisible: T });
        this._boxAuto?._searchBy(this._searchInput?.value)
    }
    set _isInputTouched(T) {
        this.#_isInputTouched = T;
    }
    get _isInputTouched() {
        return this.#_isInputTouched;
    }
    _clearSearch(a) {
        a.preventDefault();
        this._searchInput.value = "";
        this._hasInput = this._isClearButtonVisible = !1;
        this._focus();
    }
}
r(Logo, "app-searchbar");
