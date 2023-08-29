document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#data-table tbody");
    const searchInput = document.querySelector("#search");

    // Fetch JSON data from the file
    fetch("data.json")
        .then(response => response.json())
        .then(jsonData => {
            // Initialize table with all data
            displayData(jsonData);

            // Search functionality
            searchInput.addEventListener("input", function () {
                const searchTerm = searchInput.value.trim().toLowerCase();
                const filteredData = jsonData.filter(item =>
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.country.toLowerCase().includes(searchTerm) ||
                    item.address.toLowerCase().includes(searchTerm)
                );
                displayData(filteredData);
            });
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
        });

    // Display data in the table
    function displayData(data) {
        tableBody.innerHTML = ""; // Clear existing rows
        data.forEach(function (item) {
            const row = tableBody.insertRow();

            const nameCell = row.insertCell();
            nameCell.textContent = item.name;

            const countryCell = row.insertCell();
            const countryLink = document.createElement("a");
            countryLink.textContent = item.country;
            countryLink.href = item.url; // Use the URL from the JSON
            countryLink.target = "_blank"; // Open in new tab
            countryCell.appendChild(countryLink);

            const addressCell = row.insertCell();
            const maskedAddress = document.createElement("span");
            maskedAddress.textContent = "Copy Address";
            maskedAddress.style.cursor = "pointer"; // Change cursor to pointer
            maskedAddress.dataset.address = item.address; // Store actual address
            maskedAddress.addEventListener("click", function () {
                // Copy actual address to clipboard
                const tempTextarea = document.createElement("textarea");
                tempTextarea.value = this.dataset.address;
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                document.execCommand("copy");
                document.body.removeChild(tempTextarea);
            });
            addressCell.appendChild(maskedAddress);
        });
    }
});
