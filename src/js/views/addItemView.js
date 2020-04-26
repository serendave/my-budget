import { elements } from "./base";

export const getInput = (inputType) => {
    return {
        description: document.querySelector(inputType + " " + elements.inputName).value,
        value: +document.querySelector(inputType + " " + elements.inputValue).value,
        currency: document.querySelector(inputType + " " + elements.inputCurrency).value,
    };
}

export const clearFields = (type) => {
    type = (type == "income")? elements.incomes : elements.expenses;

    document.querySelector(type + " " + elements.inputName).value = "";
    document.querySelector(type + " " + elements.inputValue).value = "";
    document.querySelector(type + " " + elements.inputCurrency).value = "uah";
}

export const addItem = (item) => {
    const itemsList = (item.type == "income")? 
        document.querySelector(elements.incomesList) : 
        document.querySelector(elements.expensesList);

    let currency;
    switch (item.currency) {
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

    const htmlText = `
        <div class="item item--${item.type}" id="${item.type}-${item.id}">
            <div class="item__name">${item.description}</div>
                <div class="item__value">${item.value} ${currency}</div>
                <div class="item__edit-form">
                    <input type="text" name="description" class="item__edit-name" placeholder="Description">
                    <input type="number" name="value" class="item__edit-value" placeholder="Value">
                    <select class="item__edit-currency">
                        <option value="uah">UAH</option>
                        <option value="euro">&euro;</option>
                        <option value="dollar">&dollar;</option>
                    </select>
                    <button class="btn btn--middle btn-finish item__edit-finish">
                        <i class="icon ion-ios-checkmark-circle-outline"></i>
                    </button>
                </div>
                <div class="item__edit">
                    <button class="btn btn--small btn--edit">
                        <i class="icon ion-md-create"></i>
                    </button> 
                </div>
                <div class="item__delete">
                    <button class="btn btn--small btn--delete">
                        <i class="icon ion-md-close"></i>
                    </button>
                </div> 
        </div>
    `;

    itemsList.insertAdjacentHTML("beforeend", htmlText);
}