import "./watch.js";
import { Element, register, html, renderSlot, Resize } from "../components/Dom.js";
class PageManager extends Element {
    constructor() {
        super();
        this.pageNameToElement_ = new Map();
        this.pageId = "watch";
        this._resize = new Resize(this, this.onResizeElement)
    }
    static properties = {
        data: { type: Object },
        isRowMode: { type: Boolean },
    };
    render() {
        return html`<div id="column">
          <div class="primary">
            <div id="player">xd
            </div>
            <div class="box-information">
              <h1 id="watch-title-container">
                <span id="watch-title">ydudueud</span>
              </h1>
              <div class="center">
                <div>
                  <app-owner-card></app-owner-card>
                </div>
              </div>
              <div>
                <div id="description">
                  <div>yyeyeyeyeueueyyryrudyryryeyetfgdddfwgettttwtw</div>
                </div>
              </div>
            </div>
            <div id="content-row"></div>
            comment
          </div>
          <div id="secondary">hshd</div>
        </div>`;
    }
    static get observers() {
        return ["_onChengeData(data)"];
    }
    _onChengeData(data) {
      
    }
    onResizeElement(){
      const column = this.$$("#column");
      const contentRow = this.$$("#content-row");
      const secondary = this.$$("#secondary");
      const { offsetWidth } = column;
      if(this.isRowMode && offsetWidth > 1000){
        column.appendChild(secondary)
        this.isRowMode = false
      } else if(!this.isRowMode && offsetWidth < 1000){
        this.isRowMode = true
        contentRow.appendChild(secondary)
      }
    }
}

register(PageManager, "app-watch");
