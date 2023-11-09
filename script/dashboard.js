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
		chart1(dataset);
	})
	.catch(error => console.error('Error:', error));

function chart1(dataset) {
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

    // Calculate statistics for Petal Length by Variety
const statistics = {};

Object.keys(varietyData2).forEach(variety => {
    const lengths = varietyData2[variety].lengths;
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const sortedLengths = lengths.slice().sort((a, b) => a - b);
    const median = (sortedLengths[Math.floor(sortedLengths.length / 2)] + sortedLengths[Math.ceil(sortedLengths.length / 2)]) / 2;
    const stdDev = Math.sqrt(lengths.reduce((s, length) => s + Math.pow(length - mean, 2), 0) / (lengths.length - 1));
    statistics[variety] = { mean, median, stdDev };
});

    // Create an array of labels and data for the statistics
const statsLabels = Object.keys(statistics);
const statsData = statsLabels.map(variety => ({
    variety,
    mean: statistics[variety].mean,
    median: statistics[variety].median,
    stdDev: statistics[variety].stdDev,
}));


    // Create a radar chart for Sepal and Petal Dimensions
const radarData = dataset.map(item => ({
    variety: item.variety,
    sepal_length: item.sepal_length,
    sepal_width: item.sepal_width,
    petal_length: item.petal_length,
    petal_width: item.petal_width,
}));

const varietyBarChartCtx = document.getElementById('variety-bar-chart').getContext('2d');
new Chart(varietyBarChartCtx, {
    type: 'bar',
    data: {
        labels: statsLabels,
        datasets: [
            {
                label: 'Mean',
                data: statsData.map(item => item.mean.toFixed(2)),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Median',
                data: statsData.map(item => item.median.toFixed(2)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Standard Deviation',
                data: statsData.map(item => item.stdDev.toFixed(2)),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
           },
        ],
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Variety',
                },
           },
           y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    },
});

    
const radarLabels = Object.keys(radarData[0]).filter(key => key !== 'variety');

    // Calculate statistics for Radar Chart for Sepal and Petal Dimensions
const radarStatistics = {};

Object.keys(varietyData2).forEach(variety => {
    const dimensions = radarData.filter(item => item.variety === variety);
    const mean = dimensions.reduce((acc, item) => ({
        sepal_length: acc.sepal_length + item.sepal_length,
        sepal_width: acc.sepal_width + item.sepal_width,
        petal_length: acc.petal_length + item.petal_length,
        petal_width: acc.petal_width + item.petal_width,
    }), 
    { sepal_length: 0, sepal_width: 0, petal_length: 0, petal_width: 0 });

    const count = dimensions.length;

    radarStatistics[variety] = {
        mean: {
            sepal_length: mean.sepal_length / count,
            sepal_width: mean.sepal_width / count,
            petal_length: mean.petal_length / count,
            petal_width: mean.petal_width / count,
        },
    };
});

    // Create an array of labels and data for the statistics
const radarStatsLabels = Object.keys(radarStatistics);
const radarStatsData = radarStatsLabels.map(variety => ({
    variety,
    mean: radarStatistics[variety].mean,
}));

const radarChartCtx = document.getElementById('radar-chart').getContext('2d');
new Chart(radarChartCtx, {
    type: 'radar',
    data: {
        labels: radarLabels,
        datasets: radarStatsData.map(item => ({
            label: item.variety,
            data: [
                item.mean.sepal_length.toFixed(2),
                item.mean.sepal_width.toFixed(2),
                item.mean.petal_length.toFixed(2),
                item.mean.petal_width.toFixed(2),
            ],
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
