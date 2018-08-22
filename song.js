$(function(){
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
		console.log(array)
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

	let audio = document.createElement('audio');
	audio.src = 'http://pdt2hibqh.bkt.clouddn.com/chengdu.m4a'
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
