import "./watch.js";
import { Element, register, html, renderSlot } from "../components/Dom.js";
class PageManager extends Element {
    constructor() {
        super();
        this.pageNameToElement_ = new Map();
        this.pageId = "watch";
    }
    static properties = {
        pageId: { type: Boolean },
    };
    render() {
        return html`<div id="container"></div>`;
    }
    static get observers() {
        return ["_onChengePage(pageId)"];
    }
    _onChengePage(newPageId) {
      if("watch" === newPageId){
        this.startLoadingWatch_()
      }
    }
    getCurrentPage_() {
        return this.currentPage;
    }
    getCurrentData_() {
        return this.data;
    }
    isOnWatch() {
        return !!this.currentPage && "app-watch" === this.currentPage.is;
    }
    startLoadingWatch_(){
      this.renderPageLoadingState_("watch")
    }
    renderPageLoadingState_(name){
      const element = preparePage(this, name)
      if(this.currentPage===element){
        this.currentPage?.removeAttribute("hidden");
      } else {
        this.currentPage?.setAttribute("hidden","");
        this.currentPage = element;
      }
      this.appendPage_(element)
    }
    appendPage_(node){
      this.querySelector("#container").appendChild(node)
    }
}

register(PageManager, "page-manager");
function preparePage(pageManager, name) {
    let element = pageManager.pageNameToElement_.get(name);
    if (!element) {
      let nodeName = "div";
      switch (name) {
        case 'watch':
          nodeName = "app-watch";
          break;
      }
      element = document.createElement(nodeName) 
      pageManager.pageNameToElement_.set(name, element)
    }
    return element
}
