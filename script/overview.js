
// Function to process the CSV file
function processCSV(csv) {
    const rows = csv.split('\n').slice(1); // Skip the header row
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
	return dataset
}
function chart(dataset) {
    // Extract data for the chart
    const labels = dataset.map(item => item.variety);
    const data = dataset.map(item => ({
        x: item.sepal_length,
        y: item.sepal_width,
        r: item.petal_length * 5, // Adjust the scale as needed
    }));

    // Create a scatter plot using Chart.js
    const ctx = document.getElementById('scatter-chart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sepal Dimensions vs. Variety',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust the color as needed
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Sepal Length',
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Sepal Width',
                    },
                },
            },
        },
    });
    
    // Create a histogram for Sepal Length
	const sepalLengths = dataset.map(item => item.sepal_length);

	const sepalLengthHistogramCtx = document.getElementById('sepal-length-histogram').getContext('2d');
	new Chart(sepalLengthHistogramCtx, {
	    type: 'bar',
	    data: {
		labels: Array.from(new Set(sepalLengths)).map(length => length.toFixed(1)),
		datasets: [{
		    label: 'Sepal Length',
		    data: sepalLengths,
		    backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust the color as needed
		}],
	    },
	    options: {
		scales: {
		    x: {
		        type: 'linear',
		        position: 'bottom',
		        title: {
		            display: true,
		            text: 'Sepal Length',
		        },
		    },
		    y: {
		        beginAtZero: true,
		        title: {
		            display: true,
		            text: 'Frequency',
		        },
		    },
		},
	    },
	});
	
	// Create a pie chart for Variety
	const varietyCounts = dataset.reduce((counts, item) => {
	    counts[item.variety] = (counts[item.variety] || 0) + 1;
	    return counts;
	}, {});

	const varietyLabels = Object.keys(varietyCounts);
	const varietyData = Object.values(varietyCounts);

	const varietyPieCtx = document.getElementById('variety-pie').getContext('2d');
	new Chart(varietyPieCtx, {
	    type: 'pie',
	    data: {
		labels: varietyLabels,
		datasets: [{
		    data: varietyData,
		    backgroundColor: [
		        'rgba(255, 99, 132, 0.5)',
		        'rgba(54, 162, 235, 0.5)',
		        'rgba(255, 206, 86, 0.5)',
		    ],
		}],
	    },
	});
	
	// Create a line chart for Sepal Length over Sepal Width
	const sepalData = dataset.map(item => ({
	    x: item.sepal_length,
	    y: item.sepal_width,
	}));

	const sepalLineCtx = document.getElementById('sepal-line-chart').getContext('2d');
	new Chart(sepalLineCtx, {
	    type: 'line',
	    data: {
		datasets: [{
		    label: 'Sepal Length vs. Sepal Width',
		    data: sepalData,
		    borderColor: 'rgba(75, 192, 192, 1)',
		    borderWidth: 1,
		    fill: false,
		}],
	    },
	    options: {
		scales: {
		    x: {
		        type: 'linear',
		        position: 'bottom',
		        title: {
		            display: true,
		            text: 'Sepal Length',
		        },
		    },
		    y: {
		        type: 'linear',
		        position: 'left',
		        title: {
		            display: true,
		            text: 'Sepal Width',
		        },
		    },
		},
	    },
	});

	// Create a bar chart for Petal Length by Variety
	const varietyData2 = {};
	dataset.forEach(item => {
		if (!varietyData2[item.variety]) {
			varietyData2[item.variety] = { lengths: [], labels: [] };
		}
		varietyData2[item.variety].lengths.push(item.petal_length);
		varietyData2[item.variety].labels.push(`${item.petal_length} cm`);
	});

	const varietyBarChartCtx = document.getElementById('variety-bar-chart').getContext('2d');
	new Chart(varietyBarChartCtx, {
		type: 'bar',
		data: {
			labels: varietyData2['Setosa'].labels, // Assuming 'Setosa' has all variations
			datasets: Object.keys(varietyData2).map(variety => ({
				label: variety,
				data: varietyData2[variety].lengths,
				backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`,
			})),
		},
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: 'Petal Length',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Frequency',
					},
				},
			},
		},
	});

	// Create a radar chart for Sepal and Petal Dimensions
	const radarData = dataset.map(item => ({
		variety: item.variety,
		sepal_length: item.sepal_length,
		sepal_width: item.sepal_width,
		petal_length: item.petal_length,
		petal_width: item.petal_width,
	}));

	const radarLabels = Object.keys(radarData[0]).filter(key => key !== 'variety');

	const radarChartCtx = document.getElementById('radar-chart').getContext('2d');
	new Chart(radarChartCtx, {
		type: 'radar',
		data: {
			labels: radarLabels,
			datasets: radarData.map(item => ({
				label: item.variety,
				data: radarLabels.map(label => item[label]),
				backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`,
			})),
		},
		options: {
			elements: {
				line: {
					borderWidth: 2,
				},
			},
		},
	});
}

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
        columnStatsList.appendChild(listItem);        if (isNaN(mean) || isNaN(stdDev)) {
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

// Listen for file input change
const fileInput = document.getElementById('file-csv');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csv = e.target.result;
            const data = processCSV(csv);
			displayColumnNamesAndDataShape(data);
			calculateColumnStatistics(data)
			chart(data)
        };
        reader.readAsText(file);
    }
});
