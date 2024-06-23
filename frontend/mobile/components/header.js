import { Element, r } from "../Element.js";
class Header extends Element {
    constructor() {
        let _click, __this;
        super([
            {
                _tag: "div",
                _className: "background"
            },
            {
                _tag: "div",
                _className: "contenter",
                _attrs: {
                    search: "{{search}}"
                },
                _childs: [
                    {
                        _tag: "div",
                        _className: "start",
                        _attrs: {},
                        _childs: [
                            {
                                _tag: "app-logo",
                                _className: "main-logo",
                                _attrs: {
                                    "data-type": "TEXT_LOGO"
                                },
                                _props: {
                                    _isLink: true
                                },
                                _ref: "$logo"
                            }
                        ]
                    },
                    {
                        _tag: "app-searchbar",
                        _props: {
                            get _scope() {
                                return __this;
                            }
                        }
                    },
                    {
                        _tag: "div",
                        _className: "end",
                        _attrs: {},
                        _childs: [
                            {
                                _tag: "app-button-icon",
                                _props: {
                                    _icon: "search",
                                    _click() {
                                        _click(...arguments);
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]);
        _click = () => {
            this._isOpendedSearchBar = true;
        };
        const [scope, element] = this._getRef("$logo");
        this._logo = scope;
        this._logo$ = element;
        __this = this;
    }
    set _data(data) {
        debugger;
    }
    set _isOpendedSearchBar(v) {
        const search = v ? "-" : undefined;
        this._update({ search });
    }
}
r(Header, "app-header");
