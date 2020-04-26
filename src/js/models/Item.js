export default class Item {
    constructor(description, value, currency, id) {
        this.description = description;
        this.value = value;
        this.currency = currency;
        this.id = id;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeValue(newValue) {
        this.value = newValue;
    }

    changeCurrency(newCurrency, currenciesRate) {
        if (this.currency = newCurrency) return;
        const error = "You have entered wrong currency";

        switch(this.currency) {
            case "uah":
                if (newCurrency == "dollar") {
                    this.currency = "dollar";
                    changeValue(this.value / currenciesRate.uahPerDollar);
                } else if (newCurrency == "euro") {
                    this.currency = "euro";
                    changeValue(this.value / currenciesRate.uahPerEuro);
                } else return error;
                break;
            case "euro":
                if (newCurrency == "dollar") {
                    this.currency = "dollar";
                    changeValue(this.value * currenciesRate.dollarPerEuro);
                } else if (newCurrency == "uah") {
                    this.currency = "uah";
                    changeValue(this.value * currenciesRate.uahPerEuro);
                } else return error;
                break;
            case "dollar":
                if (newCurrency == "euro") {
                    this.currency = "euro";
                    changeValue(this.value / currenciesRate.dollarPerEuro);
                } else if (newCurrency == "uah") {
                    this.currency = "uah";
                    this.changeValue(this.value * currenciesRate.uahPerDollar);
                } else return error;
                break;
            default: 
                return;
        }
    }
}