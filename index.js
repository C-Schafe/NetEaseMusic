$(function(){
	$.get('./songs.json').then(function(response){
		console.log(response)
		console.log('23')
		let items = response;
		items.forEach((e)=>{
			console.log('1111')
			console.log(e)
			let $li = $(`
				<li>
					<a href="./song.html?id=${e.id}">
						<h3>${e.name}</h3>
					    <p>${e.singer}-${e.albumn}</p>
				        <a href="#">
					        <svg class="icon play-circled" aria-hidden="true">
			                  <use xlink:href="#icon-play-circle-big"></use>
				            </svg>
			            </a>
			        </a>
		        </li>
			`)
			$('#latestSongs').append($li)
		})
		$('.loading').remove()
	}, function(){
		alert('failed!...')
	})
})


