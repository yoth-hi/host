const JG = new WeakMap();
import { Dom, Element as SimpleDom } from "../player/src/utils/Dom.js";
export const Element = class {
    _childs = [];
    constructor(a) {
        this._childs = a.map(t => {
            const r = t._tag ? new Dom(t) : t.instance;
            return r;
        });
        this._childs.forEach(a => {
            const { element, hostElement } = a;
            this.hostElement.appendChild(element ?? hostElement);
        });
    }
    _update(a) {
        this._childs.forEach(_ => {
            _._update(a);
        });
    }
    _getRef(a) {
        for (let i = 0; i < this._childs.length; i++) {
            const j = this._childs[i]._getRef(a);
          //  j && (t = [...j, this._childs[i], this]);
            if(j&&(j.length > 1)){
            const d = j[1].instance
              var t = [
                j[0],
                j[1],
                d,
                this
              ]
              return t;
              break;
            }
        }
    }
    _on(element, name, call, bind) {
        element.addEventListener(name, event => {
            if (bind) {
                call.apply(bind, [event, element, this]);
            } else {
                call.apply(this, [event, element, this]);
            }
        });
    }
};
export { Dom, SimpleDom };
const elementMap = new Map();
export const r = function (a, b) {
    b ??= a.is;
    b = b.toLowerCase();
    elementMap.set(b, a);
    document.querySelectorAll(b).forEach(element => {
        callFunctionForElement(element);
    });
};
// Mapa de elementos personalizados e suas funções associadas

// Função para chamar a função associada do mapa
function callFunctionForElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (elementMap.has(tagName)) {
        if (element.instance) return;
        const t = class F extends elementMap.get(tagName) {
            get hostElement() {
                return element;
            }
        };
        element.instance = new t(element._props);
        delete element._props;
    }
}

// Verificação inicial para elementos já presentes no DOM
elementMap.forEach((_, tagName) => {
    document.querySelectorAll(tagName).forEach(element => {
        callFunctionForElement(element);
    });
});

// Configuração do MutationObserver para detectar novos elementos
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                if (elementMap.has(tagName)) {
                    callFunctionForElement(node);
                }
                // Caso o novo nó adicionado contenha elementos do mapa dentro dele
                elementMap.forEach((_, innerTagName) => {
                    node.querySelectorAll(innerTagName).forEach(element => {
                        callFunctionForElement(element);
                    });
                });
            }
        });
    });
});

// Iniciar a observação no documento
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
