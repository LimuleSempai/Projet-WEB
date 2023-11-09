fetch('../Dataset_iris.csv')
	.then(response => response.text())
	.then(data => {
		const rows = data.split('\n').slice(1); // Skip the header row
    	const dataset = rows.map(row => {
			const [sepal_length, sepal_width, petal_length, petal_width, variety] = row.split(',');
			return {
				sepal_length: parseFloat(sepal_length),
				sepal_width: parseFloat(sepal_width),
				petal_length: parseFloat(petal_length),
				petal_width: parseFloat(petal_width),
				variety: variety,
			};
		});
		displayColumnNamesAndDataShape(dataset);
		calculateColumnStatistics(dataset);
	})
	.catch(error => console.error('Error:', error));

    // Function to calculate column names, data shape, and display the dataset table
function displayColumnNamesAndDataShape(data) {
    const columnNames = Object.keys(data[0]);
    const numRows = data.length;
    const numColumns = columnNames.length;
    
        // Update column names in the HTML
    const columnNamesList = document.getElementById('column-names-list');
    columnNamesList.innerHTML = columnNames.map(name => `<li>${name}</li>`).join('');
    
        // Update data shape in the HTML
    document.getElementById('num-rows').textContent = numRows;
    document.getElementById('num-columns').textContent = numColumns;
    
        // Display the first 10 rows of the dataset in a table
    const tableHeaders = document.getElementById('table-headers');
    const tableBody = document.getElementById('table-body');
    
        // Clear any previous data
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';
    
        // Create table headers
    tableHeaders.innerHTML = columnNames.map(name => `<th>${name}</th>`).join('');
    
        // Create table rows with the first 10 rows of data
    for (let i = 0; i < Math.min(10, numRows); i++) {
        const row = document.createElement('tr');
        columnNames.forEach(name => {
            const cell = document.createElement('td');
            cell.textContent = data[i][name];
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    }
}
    
function calculateColumnStatistics(data) {
    const columnNames = Object.keys(data[0]);
    const columnStatsList = document.getElementById('column-stats-list');
    columnStatsList.innerHTML = '';
    
    columnNames.forEach(columnName => {
        const columnData = data.map(item => item[columnName]);
        const mean = columnData.reduce((acc, val) => acc + val, 0) / columnData.length;
        const stdDev = Math.sqrt(columnData.reduce((acc, val) => acc + (val - mean) ** 2, 0) / columnData.length);
    
            // Create a list item to display the statistics
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${columnName}:</strong> Mean: ${mean.toFixed(2)}, Std Dev: ${stdDev.toFixed(2)}`;
        columnStatsList.appendChild(listItem);        
        if (isNaN(mean) || isNaN(stdDev)) {
            const uniqueValues = getUniqueValues(columnData);
            listItem.innerHTML += `<br> Unique Values: ${uniqueValues.length}`;
            listItem.innerHTML += `<br> Values: ${uniqueValues.join(', ')}`;
        } else {
            listItem.innerHTML += ` Mean: ${mean.toFixed(2)}, Std Dev: ${stdDev.toFixed(2)}`;
        }
        columnStatsList.appendChild(listItem);
    });
}
    
    // Function to calculate the mean
function calculateMean(data) {
    if (data.length === 0) return NaN;
    return data.reduce((acc, val) => acc + val, 0) / data.length;
}
    
    // Function to calculate the standard deviation
function calculateStandardDeviation(data) {
    if (data.length === 0) return NaN;
    const mean = calculateMean(data);
    return Math.sqrt(data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / data.length);
}
    
    // Function to get unique values in an array
function getUniqueValues(array) {
    return Array.from(new Set(array));
}
