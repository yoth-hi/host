import { Element, r } from "../Element.js";
class Logo extends Element {
    constructor({ _scope }) {
        super([
            {
                _tag: "app-button-icon",
                _props: {
                    _icon: "search",
                    _click() {
                        _scope._isOpendedSearchBar= false;
                    }
                }
            },
            {
                _tag: "form",
                _childs: [
                    {
                        _tag: "input",
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
                    }
                ],
                _attrs: {
                    "aria-label": "{{label}}"
                }
            }
        ]);
        /*  this._on(this._getRef("_button")[1], "click", event => {
             _click(event, this);
        });*/
    }
}
r(Logo, "app-searchbar");
