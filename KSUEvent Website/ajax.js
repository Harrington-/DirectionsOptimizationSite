function getOptimizedTrip() {
	var startLocation = $("#start").val();
	var destinationLocation = $("#finish").val();
	var rangeStart = $("#rangeStart").val();
	var rangeEnd = $("#rangeEnd").val();
	
	$.post(
		'website', 
		{
