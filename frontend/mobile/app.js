import"./styles.css"
import { Element, r } from "./Element.js";
import "./components/index.js";
const header = document.querySelector("app-header") || { _tag: "app-header" };
class Root extends Element {
    constructor() {
        super([header]);
    }
}

r(Root, "yo-app");