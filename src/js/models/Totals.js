export default class Totals {
    constructor() {
        this.totalUAH = 0;
        this.totalDollars = 0;
        this.totalEuros = 0;

        this.incomes = [];
        this.expenses = [];
    }

    addItem(item) {
        if (item.type == "income") this.incomes.push(item);
        else if (item.type == "expense") this.expenses.push(item);
    }

    deleteItem(type, id) {
        if (type == "income") {
            this.incomes.splice(
                this.incomes.findIndex(item => item.id == id), 1);
        } else if (type == "expense") {
            this.expenses.splice(
                this.expenses.findIndex(item => item.id == id), 1);
        }
    }

    editItem(type, id, editedItem) {
        let index;
        if (type == "income") {
            index = this.incomes.findIndex(item => item.id == id);
            this.incomes[index].description = editedItem.description;
            this.incomes[index].value = editedItem.value;
            this.incomes[index].currency = editedItem.currency;
        } else if (type == "expense") {
            index = this.expenses.findIndex(item => item.id == id);
            this.expenses[index].description = editedItem.description;
            this.expenses[index].value = editedItem.value;
            this.expenses[index].currency = editedItem.currency;
        }
    }

    getNewIncomeId() { return this.incomes.length; }
    getNewExpenseId() { return this.expenses.length; }

    updateBugdet() {
        this.totalUAH = 0;
        this.totalDollars = 0;
        this.totalEuros = 0;

        this.incomes.forEach(income => {
            if (income.currency == "uah")
                this.totalUAH += income.value;
            else if (income.currency == "euro")
                this.totalEuros += income.value;
            else if (income.currency == "dollar")
                this.totalDollars += income.value; 
        });

        this.expenses.forEach(expense => {
            if (expense.currency == "uah")
                this.totalUAH -= expense.value;
            else if (expense.currency == "euro")
                this.totalEuros -= expense.value;
            else if (expense.currency == "dollar")
                this.totalDollars -= expense.value;     
        });
    }

    calculateTotalSum(type, currenciesRate) {
        let value = 0;

        if (type == "uah") {
            value = this.totalUAH + this.totalDollars * currenciesRate.uahPerDollar 
                + this.totalEuros * currenciesRate.uahPerEuro
        } else if (type == "dollar") {
            value = this.totalDollars + this.totalUAH / currenciesRate.uahPerDollar
                + this.totalEuros * currenciesRate.dollarPerEuro;
        } else if (type == "euro") {
            value = this.totalEuros + this.totalUAH / currenciesRate.uahPerEuro
                + this.totalDollars / currenciesRate.dollarPerEuro;
        }

        return value;
    }
}