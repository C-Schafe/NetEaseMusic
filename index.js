$(function(){
	$.get('./songs.json').then(function(response){
		$('.tabContents>li').eq(0).addClass('active')
		let items = response;
		items.forEach((e)=>{
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
		$('.latestMusic>.loading, .tabContents>.loading').remove()
		//$('.tabContents>.tab1').remove()

	},()=>{alert('failed...')})

    //tab切换功能
	$('.siteNav').on('click', '.tabItems>li', function(e){
		let $target = $(e.currentTarget)
		let liIndex = $target.index()
		console.log(liIndex)
		$target.addClass('active').siblings().removeClass('active')
		$target.trigger('onChange', liIndex)
		$('.tabContents>li').eq(liIndex).addClass('active').siblings().removeClass('active')
	})

	$('.siteNav').on('onChange', function(e, liIndex){
	    let $li = $('.tabContents>li').eq(liIndex)
	    if($li.attr('contentLoaded') === 'yes'){return}
		if( liIndex === 1 ){
			$.get('./hotsongs.json').then(function(response){
				$li.attr('contentLoaded', 'yes')
				let today = new Date()
				let day = today.getDate()
				let month = today.getMonth() + 1
				$('.hot-music-date').text(`更新日期：${pad(month)}月${day}日`)

				$('.tab2>.loading').remove()
			}, ()=>{alert('failed...')}).then(function(){
				$.get('./songs.json').then(function(response){
					let items = response;
					items.forEach((e, i)=>{
						let $li = $(`
							<li class="hot-music-li">
								<a id="hot-music-item" href="./song.html?id=${e.id}">
									<div class="rank">${pad(i+1)}</div>
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
						$('#tab2List').append($li)
					})
				},()=>{alert('failed...')})
			})
		}
		if( liIndex === 2 ){
			console.log('search')
			$('.tab3>.loading').remove()
		}
	})

	function pad(number){
		return number >= 10 ? number + '' : '0' + number
	}
})


