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
	//切换li并渲染页面
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
	
    let timer = undefined
    let $resultLis = $('.search-result>li')
	$('#search').on('input', function(e){
		$(this).addClass('active')
		clearSearchResult()
		//$('.searched>p').remove()
		$('.search-advise').remove()
        $('.searched>.loading').addClass('active')
		console.log($resultLis.eq(0))
		$resultLis.eq(1).addClass('active').siblings().removeClass('active')

		let value = $(e.currentTarget).val().trim()
		$('.search-result>.searchFor').text(`搜索"${value}"`)
	    console.log(value,'(搜索值)')
	    if( value === ''){return}

	    if(timer){clearTimeout(timer)}
        timer = setTimeout(()=>{
        	search(value).then((result)=>{
        		timer = undefined
		    	if(result.length !== 0 ){
		    		let $advise = $(`
			    			<div class="search-advise">
								<svg class="icon search" aria-hidden="true">
								    <use xlink:href="#icon-search"></use>
								</svg>
								<p>${result[0].name}</p>
							</div>
		    			`)
		    		$('.search-result').append($advise)
		    		//$('.search-result>.searched>h3').text(result.map(r=>r.name).join(','))
		    		console.log('放到h3了')
		    	}else{
		    		return
		    		//$('.search-result').text('没有结果')
		    	}
		    }).then(()=>{searchBaseonAdvise()})
        },500)
	})
	

	$('.searchFor').on('click', function(){
		let keywords = $('#search').val()
		$('.search-advise').remove()
		$resultLis.eq(2).addClass('active').siblings().removeClass('active')
		search(keywords).then(function(result){
			if(result.length !== 0 ){
	    		let $result = $(`
		    			<p class="best">最佳匹配</p>
						<div>
							<a href="./song.html?id=${result[0].id}">
								<h3>${result[0].name}</h3>
							    <p>${result[0].singer}-${result[0].albumn}</p>
						        <a href="#">
							        <svg class="icon play-circled" aria-hidden="true">
					                  <use xlink:href="#icon-play-circle-big"></use>
						            </svg>
					            </a>
					        </a>
				        </div>
	    			`)
	    		//$('.loading').remove()
	    		$('.searched>.loading').removeClass('active')
	    		$('.searched').append($result)
	    		//$('.search-result>.searched>h3').text(result.map(r=>r.name).join(','))
	    		console.log('放到h3了')
	    	}else{
	    		$('.loading').remove()
	    		let $p = $('<p class="no-result">暂时没有结果</p>')
	    		$('.searched').append($p)
	    	}
		})
	})
	//搜索关键字的歌曲
	function searchBaseonAdvise(){
		$('.search-advise').on('click', function(){
			let keywords = $('#search').val()
			$('.search-advise').remove()
			$resultLis.eq(2).addClass('active').siblings().removeClass('active')
			search(keywords).then(function(result){
				if(result.length !== 0 ){
		    		let $result = $(`
			    			<p class="best">最佳匹配</p>
							<div>
								<a href="./song.html?id=${result[0].id}">
									<h3>${result[0].name}</h3>
								    <p>${result[0].singer}-${result[0].albumn}</p>
							        <a href="#">
								        <svg class="icon play-circled" aria-hidden="true">
						                  <use xlink:href="#icon-play-circle-big"></use>
							            </svg>
						            </a>
						        </a>
					        </div>
		    			`)
		    		//$('.loading').remove()
		    		$('.searched>.loading').removeClass('active')
		    		$('.searched').append($result)
		    		//$('.search-result>.searched>h3').text(result.map(r=>r.name).join(','))
		    		console.log('放到h3了')
		    	}else{
		    		$('.loading').remove()
		    		let $p = $('<p class="no-result">暂时没有结果</p>')
		    		$('.searched').append($p)
		    	}
			})
		})
	}
	
	

	//按x删除搜索关键字并返回默认搜索界面
	$('.iconDeleteitem').on('click', function(){

		console.log('删除关键词')
		clearSearchResult()
		$('.searched>.loading').addClass('active')
		$('.searched>p').remove()
		$('#search').val('').removeClass('active')
		$resultLis.eq(0).addClass('active').siblings().removeClass('active')
	})

	function search(keyword){
		return new Promise((resolve, reject)=>{
			let database = [
			        {"id":1, "name":"成都", "singer":"赵雷","albumn":"成都"},
			        {"id":2, "name":"猜不透", "albumn":"猜不透（Cover.丁当）", "singer":"菌菌酱"},
			        {"id":3, "name":"空空如也","albumn":"空空如也","singer":"任然"},
			        {"id":4, "name":"远走高飞","albumn":"Hello 1","singer":"金志文/徐佳莹"},
			        {"id":5, "name":"钟无艳","albumn":"3/8","singer":"谢安琪"},
			        {"id":6, "name":"说散就散","albumn":"说散就散","singer":"袁娅维"},
			        {"id":7, "name":"千千阙歌","albumn":"千千阙歌","singer":"陈慧娴"},
			        {"id":8, "name":"蜚蜚","albumn":"All The Best 纪念全集","singer":"陈僖仪"},
			        {"id":9, "name":"失恋阵线联盟","albumn":"失恋阵线联盟","singer":"草蜢"},
			        {"id":10, "name":"小小的太阳","albumn":"月亮 太阳","singer":"张宇"}
				]
			let result = database.filter((item)=>{
	            return item.name.indexOf(keyword) >= 0
			})
			setTimeout(()=>{
				resolve(result)
			}, (Math.random() * 200 + 1000))	
		})
	}

	window.search = search

	function pad(number){
		return number >= 10 ? number + '' : '0' + number
	}
	function clearSearchResult(){
		$('.searched>.best, .searched>div').remove()
	}
})


