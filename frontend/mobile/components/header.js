import { Element, r } from "../Element.js";
class Header extends Element {
    constructor() {
        super([
            {
                _tag: "div",
                _className: "background",
            },
            {
                _tag: "div",
                _className: "contenter",
                _childs: [
                    {
                        _tag: "div",
                        _className: "start",
                        _attrs: {
                          
                        },
                        _childs:[{
                          _tag:"app-logo",
                          _attrs:{
                            "data-type":"TEXT_LOGO"
                          },
                          _props:{
                            _isLink: true
                          }
                        }]
                    },
                    {
                        _tag: "div",
                        _className: "end",
                        _attrs: {}
                    }
                ]
            }
        ]);
    }
}
r(Header, "app-header");
