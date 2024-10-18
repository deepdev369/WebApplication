document.getElementById("submit-btn").addEventListener("click", function() {
    const topics = document.getElementById("topics").value;

    if (!topics) {
        alert("Please enter some topics.");
        return;
    }

    // Call the Flask API
    fetch(`https://20.197.44.10/analyze?topics=${encodeURIComponent(topics)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Display the results
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h2>Analysis Results</h2>
                <p><strong>Positive Headlines:</strong> ${data.positive}</p>
                <p><strong>Negative Headlines:</strong> ${data.negative}</p>
                <p><strong>Total Headlines Analyzed:</strong> ${data.total_headlines}</p>
                <p><strong>Positive:Negative Ratio :</strong>  ${data.positive/data.negative}</p>
            `;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
});
