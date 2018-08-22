$(function(){
	$.get('./songs.json').then(function(response){
		console.log(response)
	}, function(){
		alert('failed!...')
	})
})