import axios from "axios";

const key = "44ba7104aa50ae794b60dcd4e722ab66";
// let dollarPerEuroRes, uahPerEuroRes, uahPerDollarRes;

export async function getCurrencies() {
    try {
        const result = await axios(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,UAH`);
        return {
            dollarPerEuro: parseFloat((result.data.rates.USD).toFixed(2)),
            uahPerEuro: parseFloat((result.data.rates.UAH).toFixed(2)),
            uahPerDollar: parseFloat((result.data.rates.UAH / result.data.rates.USD).toFixed(2))
        };
    } catch (error) {
        alert("Something went wrong with API: \n" + error);
    }
}