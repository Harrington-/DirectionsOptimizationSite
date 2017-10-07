

function getOptimizedTrip() {
	var startLocation = $("#start").val();
	var destinationLocation = $("#finish").val();
	var rangeDate = $("#date").val();
	var rangeStart = $("#startTimeRange").val();
	var rangeEnd = $("#endTimeRange").val();
	
	var startDate = rangeDate + " " + rangeStart;
	var endDate = rangeDate + " " + rangeEnd;
	
	console.log(startDate);
	
	$.getJSON({
		'url': 'http://kenthackapi.azurewebsites.net/api/Direction', 
		'data': {
			'startingAddress': startLocation,
			'destinationAddress': destinationLocation,
			'startDate': startDate,
			'endDate': endDate,
			'timeEnum': 0
		},
		'success': function(returnedData) {
			console.log(returnedData);
		},
		'dataType': "json",
		'headers': "Access-Control-Allow-Origin: *"
	})
}

$("#submit").click(function() {
	getOptimizedTrip();
});