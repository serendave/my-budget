import { elements } from "./base";

export const displayBudget = (totalUAH, totalEuros, totalDollars) => {
    elements.totalUAHValue.innerHTML = format(totalUAH) + " UAH";
    elements.totalEurosValue.innerHTML = format(totalEuros) + " &euro;";
    elements.totalDollarsValue.innerHTML = format(totalDollars) + " &dollar;";
};

export const displayTotalSum = (total, type) => {
    let strType = "";

    elements.totalUAHBtn.classList.remove(elements.activeTotalBtn);
    elements.totalEuroBtn.classList.remove(elements.activeTotalBtn);
    elements.totalDollarBtn.classList.remove(elements.activeTotalBtn);

    if (type == "uah") {
        strType = " UAH";
        elements.totalUAHBtn.classList.add(elements.activeTotalBtn);
    }
    else if (type == "euro") {
        strType = " &euro;"
        elements.totalEuroBtn.classList.add(elements.activeTotalBtn);
    } 
    else if (type == "dollar") {
        strType = " &dollar;"
        elements.totalDollarBtn.classList.add(elements.activeTotalBtn);
    } 

    elements.totalSum.innerHTML = format(total);
    elements.totalSumCurrency.innerHTML = strType;
};

const format = (value) => {
    value = value.toFixed(2).toString();

    let [int, dec] = value.split(".");
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + "," +
            int.substr(int.length - 3, 3);
    }

    return int + "." + dec;
}