import Item from "./Item";

export default class Income extends Item {
    constructor(description, value, currency, id) {
        super(description, value, currency, id);
        this.type = "income";
    }
}