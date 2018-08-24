$(function(){
	$.get('./songs.json').then(function(response){
		let items = response;
		console.log(items)
		items.forEach((e, i)=>{
			let $li = $(`
				<li class="hot-music-li">
					<a id="hot-music-item" href="./song.html?id=${e.id}">
						<div class="rank">${i+1}</div>
						<div class="hot-music-info">
							<h3>${e.name}</h3>
						    <p>${e.singer}-${e.albumn}</p>
					        <svg class="icon play-circled" aria-hidden="true">
			                  <use xlink:href="#icon-play-circle-big"></use>
				            </svg>
						</div>
			        </a>
		        </li>
			`)
			$('#songList').append($li)
			console.log(111)
		})
		let $blankLi = $('<li class="blankLi"></li>')
		$('#songList').append($blankLi)
	},()=>{alert('failed...')})
})