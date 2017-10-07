function getOptimizedTrip() {
	var startLocation = $("#start").val();
	var destinationLocation = $("#finish").val();
	var rangeDate = $("#date");
	var rangeStart = $("#startTimeRange").val();
	var rangeEnd = $("#endTimeRange").val();
	//2017-10-07T13:51:25.586Z
	var startDate = rangeDate + "T" + range
	$.get(
		'http://kenthackapi.azurewebsites.net/api/Direction', 
		{
			'startingAddress': startLocation,
			'destinationAddress': destinationLocation,
			'startDate': rangeStart,
			'endDate': rangeEnd,
			'timeEnum': 0
		},
		function(returnedData) {
			console.log(returnedData);
		},
		'json'
	)
}

$("#submit").click(function() {
	getOptimizedTrip();
});