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


}

// Listen for file input change
const fileInput = document.getElementById('csv-file');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csv = e.target.result;
            processCSV(csv);
        };
        reader.readAsText(file);
    }
});
