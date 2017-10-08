
var globalVar;
function getOptimizedTrip() {
	
	
	var startLocation = $("#start").val();
	var destinationLocation = $("#finish").val();
	var rangeDate = $("#date").val();
	var rangeStart = $("#startTimeRange").val();
	var rangeEnd = $("#endTimeRange").val();
	
	var startDate = rangeDate + " " + rangeStart;
	var endDate = rangeDate + " " + rangeEnd;
	
	
	firstTime = moment(startDate, "MM/DD/YYYY h:mmA");
	lastTime = moment(endDate, "MM/DD/YYYY h:mmA");
	
	var options = {
		theme:"sk-cube-grid",
		message:'Ending world hunger... Please wait...',
		backgroundColor:"#1847B1",
		textColor:"white"
	};

	HoldOn.open(options);
	$.getJSON({
		'url': 'https://kenthackapi.azurewebsites.net/api/Direction', 
		'data': {
			'startingAddress': startLocation,
			'destinationAddress': destinationLocation,
			'startDate': firstTime.format("MM/DD/YYYY HH:mm Z"),
			'endDate': lastTime.format("MM/DD/YYYY HH:mm Z"),
			'timeEnum': 1
		},
		'success': function(returnedData) {
			console.log(returnedData);
			HoldOn.close();
			$("#besttraveltime").text("Below you can find the best travel times between " + $("#startTimeRange").val() + " and " + $("#endTimeRange").val());
			$(".newEntry").remove();
			
			returnedData.sort(function(a, b) {
				
			});
			$.each(returnedData, function(k, v) {
				
				var durationValues = v['duration'].split(':');
				var hours = parseInt(durationValues[0]);
				var minutes = parseInt(durationValues[1]);
				
				var titleText = ""
				if(hours == 1)
					titleText += "1 Hour";
				else if(hours > 0)
					titleText += hours.toString() + " Hours";
				
				if(hours > 0 && minutes > 0)
					titleText += " and ";
				
				if(minutes == 1)
					titleText += "1 Minute!";
				else if(minutes > 0)
					titleText += minutes.toString() + " Minutes!";
				
				var date = moment.utc(v['departureTime'], 'YYYY-MM-DDTHH:mm:ss');
				//2017-10-11T05:07:30
				
				$("#directions-results").append("<h4 class=\"newEntry\"><strong>" + titleText + "</strong> via " + v['summary'] + " at " + date.local().format("h:mmA") + "</h4>");
				
			});
			$("#directions-results").show("slow");
			$('html, body').animate({
				scrollTop: $("#directions-results").offset().top
			}, 2000)
		},
		'error': function() {
			HoldOn.close();
			//Tell user not to be an idiot
			$.notify({
				title: '<strong>Listen! Listen!</strong>',
				message: 'You gotta type shit in before you optimize your trip!'
			},{
				type: 'danger'
			});
		},
		'dataType': "json",
		'headers': "Access-Control-Allow-Origin: *"
	})
}

$("#submit").click(function() {
	$("#directions-results").hide("slow");
	getOptimizedTrip();
});

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

function timeToDate(time) {
	var formatted = time
	var amOrPm = 1;
	if(time.includes("am"))
		amOrPm = 0;
	formatted = formatted.replace("am", "");
	formatted = formatted.replace("pm", "");
	
	components = formatted.split(":");
	
	someDate = new Date();
	someDate.setHours(parseInt(components[0]) + amOrPm*12);
	someDate.setMinutes(components[1]);
	console.log(components);
	console.log(time)
	console.log(someDate);
	return someDate;
}