$(function() {
	$.get('/samples/stock/demo/styled-scrollbar/data.csv', function(csv, state, xhr) {

		// inconsistency
		if (typeof csv != 'string') {
			csv = xhr.responseText;
		}

		// parse the CSV data
		var data = [], header, comment = /^#/, x;

		$.each(csv.split('\n'), function(i, line){
		    if (!comment.test(line)) {
		        if (!header) {
		            header = line;
		        }
		        else {
		            var point = line.split(';'),
						date = point[0].split('-');

					if (point.length > 1) {
		                x = Date.UTC(date[2], date[1] - 1, date[0]);

			            data.push([
							x, // time
							parseFloat(point[4]) // close
						]);
		            }
		        }
		    }
		});
		
		// Create the chart
		window.chart = new Highcharts.StockChart({
		    chart: {
		        renderTo: 'container'
		    },

		    rangeSelector: {
		        selected: 1
		    },

		    title: {
		        text: 'USD to EUR exchange rate'
		    },

		    xAxis: {
		        maxZoom: 14 * 24 * 3600000 // fourteen days
		    },

		    yAxis: {
		        title: {
		            text: 'Exchange rate'
		        }
		    },

		    scrollbar: {
				barBackgroundColor: 'gray',
				barBorderRadius: 7,
				barBorderWidth: 0,
				buttonBackgroundColor: 'gray',
				buttonBorderWidth: 0,
				buttonBorderRadius: 7,
				trackBackgroundColor: 'none',
				trackBorderWidth: 1,
				trackBorderRadius: 8,
				trackBorderColor: '#CCC'
		    },

		    series: [{
		        name: 'USD to EUR',
		        data: data
		    }]
		});
	});
});