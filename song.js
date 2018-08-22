$(function(){
	let songid = parseInt(location.search.match(/\bid=([^&]*)/)[1])

	$.get('./songs.json').then(function(response){

		let songurl = response.filter(e=>e.id === songid)[0]

		let {url} = songurl
		//创建播放的音乐
		let audio = document.createElement('audio');
		audio.src = url
		audio.oncanplay = function(){
			audio.play()
			setTimeout(function(){
				$('.disc-container').addClass('playing')
				$('.icon-wraper').addClass('playing')
			},0)
		}

		$('.icon-pause').on('click', function(){
			//console.log('暂停被点了')
			audio.pause()
			$('.icon-wraper').removeClass('playing')
			$('.icon-wraper').addClass('pausing')
			//$('.disc-container').removeClass('playing')
			$('.light, .cover').css('animation-play-state', 'paused')
		})
		$('.icon-play').on('click', function(){
			//console.log('播放被点了')
			audio.play()
			$('.icon-wraper').removeClass('pausing')
			$('.icon-wraper').addClass('playing')
			//$('.disc-container').addClass('playing')
			$('.light, .cover').css('animation-play-state', 'running')
		})

	})

	$.get('./lyric.json').then(function(object){
		let {lyric} = object
		//console.log(lyric)
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.+)$/
		array = array.map(function(string){
			let matches = string.match(regex)
			//console.log(matches)
			if(matches){
				return {time: matches[1], words: matches[2]}
			}
		})
		
		let $lyrics = $('.lyrics')
		array.map(function(object){
			if(object){
				//console.log(object)
				let $p = $('</p>')
				$p.attr('data-time', object.time).text(object.words)
				$p.appendTo($lyrics.children('.lines'))
			}
		})

	})

	
})	
