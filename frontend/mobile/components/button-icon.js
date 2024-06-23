import { Element, r } from "../Element.js";
class Logo extends Element {
    constructor({ _icon, _click }) {
        super([
            {
                _tag: "button",
                _ref: "_button",
                _childs: ["%%"],
                _attrs: {
                    "aria-label": "{{label}}"
                }
            }
        ]);
        this._on(this._getRef("_button")[1], "click", event => {
            _click(event, this);
        });
    }
}
r(Logo, "app-button-icon");
