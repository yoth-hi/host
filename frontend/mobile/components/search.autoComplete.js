import { Dom, r } from "../Element.js";
let element;
export default class {
  _beforeText = void 0;
  constructor(){
    this._element = element ??= new Box
  }
  _show(){
    this._element._show()
    document.body.appendChild(this._element.element)
  }
  _hide(){
    this._element._hide()
    try {
      document.body.removeChild(this._element.element)
    } catch (e) {}
  }
  _searchBy(text=""){
    if(this._beforeText!==text){
      this._element._load(text.split(" ").map((text)=>({ text })))
      this._beforeText = text
    }
  }
}

class Box extends Dom {
  _items = []
    constructor() {
        super({
            _tag: "div",
            _className: "box-auto-complete"
        });
        
    }
    _load(data){
      for (;this._items.length > data.length; ) {
        this._items.pop().element.remove()
      }
      for (;this._items.length < data.length; ) {
        const element = new BoxItem()
        this._items.push(element);
        this.element.appendChild(element.element)
      }
      for (let i = 0; i < data.length; i++) {
        this._items[i]._updateData(data[i])
        
      }
    }
}
class BoxItem extends Dom {
    constructor() {
        super({
            _tag: "div",
            _className: "bac-item",
            _childs: [
                {
                    _tag: "div",
                    _className: "bac-item-lf"
                },
                {
                    _tag: "div",
                    _className: "bac-item-text",
                    _childs:["{{text}}"]
                },
                {
                    _tag: "div",
                    _className: "bac-item-rt"
                }
            ]
        });
    }
    _updateData({ text }){
      this._update({ text })
    }
}
