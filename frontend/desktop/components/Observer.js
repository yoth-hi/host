const config = { attributes: true, childList: true, subtree: true };
export const Observer = class {
    constructor(target, callback) {
        this._target = target;
        this.callback = callback;
        this.connect();
    }
    connect() {
        this._observer = new MutationObserver(this.callback);
        const qu = this._target.querySelectorAll("slot");

        for (let i = 0; i < qu.length; i++) {
            const h = qu[i];

            this._observer.observe(h, config);
            const assignedNodes = h.assign();
            console.log(
                "Slot content changed. Current assigned nodes:",
                assignedNodes
            );

            // Example: React to changes in assigned nodes
        }
        this._observer.observe(this._target, config);
    }
    disconnect() {
        this._observer?.disconnect();
    }
};
