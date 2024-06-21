import "./watch.js";
import { Element, register, html, renderSlot, Resize } from "../components/Dom.js";
const getPlayer = function(){
  return new Promise((resolve, reject) => {
    const element = document.querySelector("body>#player")
    resolve(element)
  });
}
import{ getEventNameFullScreenChange, getFullScreenElement}from"../../player/src/utils/utils.js"
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
        isFullscreen: { type: Boolean },
        isTopPlayer: { type: Boolean },
    };
    render() {
        return html`
        <div id="player-band"
         ?hidden="${!this.isTopPlayer}"
        ></div>
        <div id="column">
          <div class="primary">
            <div id="player-contenter">
              <div id="player"></div>
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
        return [
          "_onChengeData(data)",
          "updatePositionPlayer(isFullscreen,isThander)"
        ];
    }
    _getPlayer(){
      return this._player || getPlayer().then((a)=>{
        const controller = void 0
        return this._player = [this._playerElement = a, controller]
      })
    }
    firstUpdated(){
      this.listen(document.body, getEventNameFullScreenChange(document.body), "_onFullScreenUpdate")
      this._getPlayer()
      this.updatePositionPlayer()
      this.asyncStart()
    }
    async asyncStart(){
      const [ element, controller ] = await this._getPlayer()
      const player = this.querySelector("#player")
      player.appendChild(element)
    }
    async updatePositionPlayer(){
      const playerContent = this.querySelector("#player-contenter")
      const playerHead = this.querySelector("#player-band")
      const player = this.querySelector("#player")
      const [ element, controller ] = await this._getPlayer()
      if(this.isTopPlayer = (this.isFullscreen || this.isThander)){
        playerHead.appendChild(player)
      } else {
        playerContent.appendChild(player)
        
      }
    }
    _onFullScreenUpdate(){
      const element = getFullScreenElement();
      this.isFullscreen = !!element
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
