import { elements } from "./views/base";
import { getCurrencies } from "./config";
import Income from "./models/Income";
import Expense from "./models/Expense";
import Totals from "./models/Totals";
import * as addItemView from "./views/addItemView";
import * as deleteEditItemView from "./views/deleteEditItemView";
import * as budgetView from "./views/budgetView";

/** Global state of the app
 * - Totals: { 
 * - UAH, Euros, Dollars,
 * - Incomes array,
 * - Expenses array },
 * - currentCurrency,
 * - currenciesRate
 */
const state = {};
initialization();

/**
 * ADD ITEM
 */
const addItem = (type) => {
    let newItemID;

    // 1. Get the input
    const input = (type == "income")? 
        addItemView.getInput(elements.incomes) : 
        addItemView.getInput(elements.expenses);

    // 2. Add the item either to incomes or to expenses
    if (type == "income") {
        newItemID = state.Totals.getNewIncomeId();
        state.Totals.addItem(new Income(
            input.description,
            input.value,
            input.currency,
            newItemID
        ));
    } else if (type == "expense") {
        newItemID = state.Totals.getNewExpenseId();
        state.Totals.addItem(new Expense(
            input.description,
            input.value,
            input.currency,
            newItemID
        ));
    } else return "Incorrect type";

    // 3. Add the item to the UI
    addItemView.addItem({
        description: input.description,
        value: input.value,
        currency: input.currency,
        id: newItemID,
        type
    });

    // 4. Clear the fields
    addItemView.clearFields(type);

    // 5. Update budget
    updateBugdet();
};

/**
 * DELETE ITEM
 */
const deleteItem = (type, id) => {
    // 1. Delete the item from the model
    state.Totals.deleteItem(type, id);

    // 2. Delete the item from the UI
    deleteEditItemView.deleteItem(type, id);

    // 3. Update budget
    updateBugdet();
}

/**
 * EDIT ITEM
 */
const editItem = (type, id) => {
    // 1. Get the edited input
    const input = deleteEditItemView.getItemEditedInput(type, id);

    // 2. Update the item in the model
    state.Totals.editItem(type, id, {
        description: input.description,
        value: input.value,
        currency: input.currency
    });

    // 3. Update the item in the UI
    deleteEditItemView.editItem(type, id, {
        description: input.description,
        value: input.value,
        currency: input.currency
    });

    // 4. Update budget
    updateBugdet();
}




/**
 * OTHER FUNCTIONS
 */
function updateBugdet() {
    // 1. Update budget in model
    state.Totals.updateBugdet();

    // 2. Display updated budget in the UI 
    budgetView.displayBudget(
        state.Totals.totalUAH, 
        state.Totals.totalEuros, 
        state.Totals.totalDollars
    );

    // 3. Refresh total sum
    refreshTotal();
}

function refreshTotal() {
    const currency = state.currentCurrency;
    const total = state.Totals.calculateTotalSum(currency, state.currenciesRate);

    budgetView.displayTotalSum(total, currency);
}

function changeCurrency(newCurrency) {
    state.currentCurrency = newCurrency;
    refreshTotal();
};

async function initialization() {
    state.Totals = new Totals();
    budgetView.displayBudget(
        state.Totals.totalUAH,
        state.Totals.totalEuros,
        state.Totals.totalDollars
    );

    state.currenciesRate = await getCurrencies();

    state.currentCurrency = "uah";
    refreshTotal();
}

// SETUP EVENT LISTENERS
elements.addValuesBtn.forEach(elem => {
    elem.addEventListener("click", e => {
        let title = e.target.parentElement.parentElement;
        title.querySelector(".title__add").classList.toggle("title__add--visible");
    });
});

[elements.addIncomeBtn, elements.addExpenseBtn].forEach(addBtn => {
    if (addBtn.classList.value.indexOf("income") != -1) {
        addBtn.addEventListener("click", () => {
            addItem("income");
        })
    }
    else if (addBtn.classList.value.indexOf("expense") != -1) {
        addBtn.addEventListener("click", () => {
            addItem("expense");
        })
    }
});

elements.changeCurrencyBtns.addEventListener("click", e => {
    if (e.target.classList.value.indexOf("euro") != -1)
        changeCurrency("euro");
    else if (e.target.classList.value.indexOf("dollar") != -1)
        changeCurrency("dollar");
    else if (e.target.classList.value.indexOf("uah") != - 1)
        changeCurrency("uah");
});

let finishEditHasEventListener = false;

[elements.incomesList, elements.expensesList].forEach(itemsList => {
    document.querySelector(itemsList).addEventListener("click", e => {
        const editBtn = e.target.closest(".btn--edit");
        const deleteBtn = e.target.closest(".btn--delete");

        if (deleteBtn) {
            const itemID = deleteBtn.parentElement.parentElement.id;
            const [type, id] = itemID.split("-");
            deleteItem(type, +id);
        } else if (editBtn) {
            const item = editBtn.parentElement.parentElement;
            item.classList.toggle("item--editing");
            if (!finishEditHasEventListener) {
                item.querySelector(elements.itemEditFinishBtn).addEventListener("click", function(e) {
                    const itemID = editBtn.parentElement.parentElement.id;
                    const [type, id] = itemID.split("-");
                    editItem(type, +id);
                    item.classList.remove("item--editing");
                });
            }
        }
    });
});