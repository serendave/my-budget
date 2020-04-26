import { elements } from "./base";

const getItem = (type, id) => {
    return document.querySelector(`#${type}-${id}`);
};

export const getItemEditedInput = (type, id) => {
    return {
        description: document.querySelector(`#${type}-${id} ${elements.itemEditName}`).value,
        value: +document.querySelector(`#${type}-${id} ${elements.itemEditValue}`).value,
        currency: document.querySelector(`#${type}-${id} ${elements.itemEditCurrency}`).value
    };
};

export const deleteItem = (type, id) => {
    const item = getItem(type, id);
    const itemsList = item.parentElement;

    itemsList.removeChild(item);
};

export const editItem = (type, id, editedInput) => {
    const item = getItem(type, id);
    let currency;
    switch (editedInput.currency) {
        case "uah":
            currency = "UAH";
            break;
        case "euro":
            currency = "&euro;"
            break;
        case "dollar":
            currency = "&dollar;"
            break;
        default:
            break;
    }

    item.querySelector(elements.itemName).innerHTML = editedInput.description;
    item.querySelector(elements.itemValue).innerHTML = editedInput.value + " " + currency;
}