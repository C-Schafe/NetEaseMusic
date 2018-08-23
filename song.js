$(function(){
	let songid = parseInt(location.search.match(/\bid=([^&]*)/)[1])

	$.get('./songs.json').then(function(response){
		//获取歌曲id
		let songs = response
		let songurl = response.filter(e=>e.id === songid)[0]
		let {url} = songurl
		console.log(songs)
		console.log('下面是songurl')
		console.log(songurl)
		//创建播放封面和背景
		let $img = $(`<img class="cover" src="${songurl.coverimg}">`)
		$('.disc').append($img)
		$('.page').css('background',`transparent url(${songurl.backgroundimg}) no-repeat
	center center`)
		//创建播放的音乐
		let audio = document.createElement('audio');
		audio.src = url
		audio.oncanplay = function(){
			//$('.icon-wraper').removeClass('pausing')
			//$('.icon-wraper').removeClass('playing')
			// audio.play()
			$('.light, .cover').css('animation-play-state','paused')
			setTimeout(function(){
			 	$('.disc-container').addClass('playing')
			 	$('.icon-wraper').addClass('pausing')
		    },0)
		}

		$('.icon-pause').on('click', function(){
			console.log('暂停被点了')
			audio.pause()
			$('.light, .cover').css('animation-play-state','paused')
			$('.icon-wraper').removeClass('playing')
			$('.icon-wraper').addClass('pausing')
			//$('.disc-container').removeClass('playing')
			// setTimeout(function(){
			// 	$('.light, .cover').css('animation-play-state','paused')
			// },0)
			
		})
		$('.icon-play').on('click', function(){
			console.log('播放被点了')
			audio.play()
			$('.light, .cover').css('animation-play-state','running')	
			$('.icon-wraper').removeClass('pausing')
			$('.icon-wraper').addClass('playing')
			//$('.disc-container').addClass('playing')
			
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
