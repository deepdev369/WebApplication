const stockInput = document.getElementById('stockInput');
const suggestions = document.getElementById('suggestions');
const searchButton = document.getElementById('searchButton');
const warning = document.getElementById('warning');

const stocks = [
    "ADANIENT", "ADANIGREEN", "ADANIPORTS", "ASIANPAINT", "AXISBANK", "BAJAJ-AUTO", "BAJFINANCE", 
    "BAJAJFINSV", "BHARTIARTL", "BPCL", "BRITANNIA", "CIPLA", "COALINDIA", "DIVISLAB", "DRREDDY", 
    "EICHERMOT", "GRASIM", "HCLTECH", "HDFC", "HDFCBANK", "HDFCLIFE", "HEROMOTOCO", "HINDALCO", 
    "HINDUNILVR", "ICICIBANK", "INDUSINDBK", "INFY", "ITC", "JSWSTEEL", "KOTAKBANK", "LT", "M&M", 
    "MARUTI", "NESTLEIND", "NTPC", "ONGC", "POWERGRID", "RELIANCE", "SBILIFE", "SBIN", "SUNPHARMA", 
    "TATACONSUM", "TATAMOTORS", "TATASTEEL", "TCS", "TECHM", "TITAN", "ULTRACEMCO", "UPL", "WIPRO"
  ];
  

stockInput.addEventListener('input', () => {
    const inputText = stockInput.value.toUpperCase();
    suggestions.innerHTML = '';
    warning.innerHTML = '';
    const filteredStocks = stocks.filter(stock => stock.startsWith(inputText));

    if (inputText.length > 0 && filteredStocks.length > 0) {
        suggestions.style.display = 'block';
        filteredStocks.forEach(stock => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = stock;
            div.addEventListener('click', () => {
                stockInput.value = stock;
                suggestions.style.display = 'none';
            });
            suggestions.appendChild(div);
        });
    } else {
        suggestions.style.display = 'none';
    }
});

searchButton.addEventListener('click', () => {
    const selectedStock = stockInput.value.toUpperCase();
    if (!stocks.includes(selectedStock)) {
        warning.textContent = 'Please select a valid stock from the suggestions.';
        predictionDisplay.innerHTML = ''; // Clear previous prediction
    } else {
        warning.innerHTML = ''; // Clear warning
        // Make API call with the selected stock
        fetch(`https://20.197.44.10/predict?stock=${selectedStock}`)
            .then(response => response.json())
            .then(data => {
                console.log("panna kopee");
                // Display the prediction result
                // predictionDisplay.innerHTML = `Prediction: ${data.stock_prediction}`;
                alert(data.stock_name);
            })
            .catch(error => {
                console.error('Error fetching prediction:', error);
                predictionDisplay.innerHTML = 'Error fetching prediction.';
            });
    }
});