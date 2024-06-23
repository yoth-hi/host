import { Element, r } from "../Element.js";
class Logo extends Element {
    constructor({_isLink}) {
        super([
            {
                _tag: _isLink ? "a" : "div",
                _childs: ["{{logo}}"],
                _attrs:{
                  href:"{{link}}"
                }
            }
        ]);
        this._loadLogo()
    }
    _loadLogo(){
      let logo;
      const src = /*data.events.src*/ null;
      if(src){
        logo = {
          _tag:"img",
          _attrs:{
            src
          }
        }
      } else {
        logo = {
          _tag:"span",
          _childs:["Yoth"]
        }
      }
      this._update({ logo })
    }
}
r(Logo, "app-logo");
