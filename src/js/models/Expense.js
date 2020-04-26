import Item from "./Item";

export default class Expense extends Item {
    constructor(description, value, currency, id) {
        super(description, value, currency, id);
        this.type = "expense";
    }
}