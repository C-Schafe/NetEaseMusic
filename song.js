$(function(){
	let songid = parseInt(location.search.match(/\bid=([^&]*)/)[1])

	$.get('./songs.json').then(function(response){
		//获取歌曲id
		let songs = response
		let songurl = response.filter(e=>e.id === songid)[0]
		let {url, name, lyric, singer} = songurl
		//console.log(songs)
		//console.log('下面是songurl')
		//console.log(songurl)
		//创建播放封面和背景
		let $img = $(`<img class="cover" src="${songurl.coverimg}">`)
		$('.disc').append($img)
		$('.page').css('background',`transparent url(${songurl.backgroundimg}) no-repeat center center`)
		//创建播放的音乐
		initPlayer.call(undefined, url)
		initText.call(undefined, name, lyric, singer)
	})
	
	//初始化播放功能
	function initPlayer(url) {
		let audio = document.createElement('audio');
		audio.src = url
		audio.oncanplay = function(){
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
		})
		$('.icon-play').on('click', function(){
			console.log('播放被点了')
			audio.play()
			$('.light, .cover').css('animation-play-state','running')	
			$('.icon-wraper').removeClass('pausing')
			$('.icon-wraper').addClass('playing')
		})
		//控制歌词的显示
		setInterval(()=>{
			//return
	        let musicCurrentTime = audio.currentTime
	        //console.log(musicCurrentTime)
			let minute = ~~(musicCurrentTime / 60)
			let second = musicCurrentTime - minute * 60
			let time = `${pad(minute)}:${pad(second)}`
			//console.log(minute, second, time)
			let $lines = $('.lines>p')
			//console.log($lines)
			let $showLine
			for(let i = 0; i < $lines.length; i++){
				let currentLineTime = $lines.eq(i).attr('data-time')
				let nextLineTime = $lines.eq(i+1).attr('data-time')
				//console.log(currentLineTime, nextLineTime)
				if( $lines.eq(i+1).length !== 0 && time > currentLineTime && time < nextLineTime){
					$showLine = $lines.eq(i)
					//console.log($showLine)
					break
				}
			}
			if($showLine){
				$showLine.addClass('active').prev().removeClass('active')
				let lineOffset = $showLine.offset().top
				let linesOffset = $('.lines').offset().top
				let lineHeight = $('.lyrics').height()/3
				let moveOffset = lineOffset - linesOffset - lineHeight
				//console.log(moveOffset)
				$('.lines').css('transform', `translateY(-${moveOffset}px)`)
			}
		},300)
	}

	function pad(number){
		return number >= 10 ? number + '' : '0' + number
	}

	function initText(name, lyric, singer){
		//console.log(name, lyric, singer)
		$('.song-name').text(name)
		$('.song-singer').text(singer)
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.+)$/
		array = array.map(function(string){
			let matches = string.match(regex)
			if(matches){
				return {time: matches[1], words: matches[2]}
			}
		})
		let $lyrics = $('.lyrics')
		array.map(function(object){
			if(object){
				let $p = $('</p>')
				$p.attr('data-time', object.time).text(object.words)
				$p.appendTo($lyrics.children('.lines'))
			}
		})

	}

	// $.get('./songs.json').then(function(object){
	// 	let {lyric} = object
		
	// })
})	

/*
###如何让歌词滚动？
1.让谁滚？当然是浏览器，浏览器的滚动手段就是tranlateX
2.滚多少？让那一行的p露出就可以，这里就用p的容器距离
  顶部的距离和当前p的距离相减
3.什么时候滚？也就是说，这一秒该哪一行出现？
* 首先要获取当前音乐播放到了哪一秒？ musicCurrentTime
* 如果musicCurrentTime在某两个标签的内置时间之间，则显示上一个
*/
