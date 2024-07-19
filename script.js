const apiKey = '8580b4311051b6ddada873cb';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

const currencyitem_one = document.getElementById('currency-one');
const currencyitem_two = document.getElementById('currency-two');
const amount_one = document.getElementById('one');
const amount_two = document.getElementById('two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculation() {
    const currency_one = currencyitem_one.value;
    const currency_two = currencyitem_two.value;

    fetch(`${apiUrl}/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rateValue = data.conversion_rates[currency_two];
            rate.innerText = `1 ${currency_one} = ${rateValue.toFixed(2)} ${currency_two}`;
            amount_two.value = (amount_one.value * rateValue).toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            rate.innerText = 'Error fetching exchange rate';
        });
}

currencyitem_one.addEventListener('change', calculation);
currencyitem_two.addEventListener('change', calculation);
amount_one.addEventListener('input', calculation);
amount_two.addEventListener('input', calculation);

swap.addEventListener('click', function () {
    const temp = currencyitem_one.value;
    currencyitem_one.value = currencyitem_two.value;
    currencyitem_two.value = temp;
    calculation();
});

calculation();  // Initial calculation on page load
