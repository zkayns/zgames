class Button {
    constructor(config) {
        this.parent = new jaws.Sprite(config);
        for (let key in this.parent) this[key] = this.parent[key];
    }
    isClicked(x, y) {
        return this.rect().collidePoint(x, y);
    }
}