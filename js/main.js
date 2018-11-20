$(function(){

	/* 메인비주얼배너 */
    window.mySwipe = $('#mySwipe').Swipe({
		auto: 3000, //배너가 3초 간격으로 이동
		continuous: true, //반복설정
		callback: function(index){ //함수를 실행한 다음에 할 함수 설정 /자동으로 변하는 인덱스
			$('.touch_bullet .active')
				.attr('src',$('.touch_bullet .active').attr('src').replace('on.png','off.png'))
				.removeClass('active');
			//img/visual_bullet_on.png, img/visual_bullet_off.png
			$('.touch_bullet img').eq(index)
				.attr('src',$('.touch_bullet img').eq(index).attr('src').replace('off.png','on.png'))
				.addClass('active');
		}
	}).data('Swipe');
    
	/* 비주얼 이전, 다음 버튼 */
	$('.touch_left_btn a').on('click',function(){
		mySwipe.prev();
		return false;
	});
	$('.touch_right_btn a').on('click',function(){
		mySwipe.next();
		return false;
	});
	
	/* 탭 메뉴 */
	$('#best_goods').each(function(){
		var bestG = $(this);
		var anchors = bestG.find('ul li a'); //6개의 탭 중 하나
		var panel = bestG.find('div.panel');
		var lastAnchor;
		var lastPanel;
		
		lastAnchor = anchors.filter('.tabOn');
		lastPanel = $(lastAnchor.attr('href'));
		
		panel.hide();
		lastPanel.show();
		
		anchors.click(function(event){
			event.preventDefault(); //jQuery로 컨트롤하기 위해
			
			var currentAnchor = $(this);
			var currentPanel = $(currentAnchor.attr('href'));
			
			lastAnchor.removeClass('tabOn');
			currentAnchor.addClass('tabOn');
			
			lastPanel.hide();
			currentPanel.show();
			
			lastAnchor = currentAnchor;
			lastPanel = currentPanel;
		});
	});
	
	
	
	/* 롤링 버튼 배너 */
	$('#roll_banner_wrap dd').not(':first').hide();
	var onBtn = $('#roll_banner_wrap dt a:first');
	
	$('#roll_banner_wrap dt a').on('click',function(){
		$('#roll_banner_wrap dd:visible').hide();
		$('img',onBtn).attr('src',$('img',onBtn).attr('src').replace('over.png','out.png'));
		//$(this).find('img') = $('img',this)
		var num = $('#roll_banner_wrap dt a').index(this);
		$('#roll_banner_wrap dd').eq(num).show();
		$('img',this).attr('src',$('img',this).attr('src').replace('out.png','over.png'));
		onBtn = $(this);
		return false;
	});
	
	var btnNum = 0;
	function autoPlay(){
		btnNum++;
		if(btnNum>=7) btnNum=0;
		$('#roll_banner_wrap dt a').eq(btnNum).trigger('click');
		auto1 = setTimeout(autoPlay,3000);	
		//일정 시간이 지난 후에 그 안에 있는 내용을 한번 실행
	}
	var auto1 = setTimeout(autoPlay,3000);
	
	$('.playBtn').on('click',function(){
		clearTimeout(auto1); //멈추고 시작해야 안빨라짐(setTimeout에서 실행한 함수를 취소)
		auto1 = setTimeout(autoPlay,3000);
		$('img',this).attr('src',$('img',this).attr('src').replace('off.gif','on.gif'));
		$('.stopBtn img').attr('src',$('.stopBtn img').attr('src').replace('on.gif','off.gif'));
		return false;
	});
	$('.stopBtn').on('click',function(){
		clearTimeout(auto1); //멈추고 시작해야 안빨라짐
		$('img',this).attr('src',$('img',this).attr('src').replace('off.gif','on.gif'));
		$('.playBtn img').attr('src',$('.playBtn img').attr('src').replace('on.gif','off.gif'));
		return false;
	});
	

	/* 밑반찬 슬라이더 */
	var mySlider=$('#best_bg ul').bxSlider({
		mode:'horizontal', //수평방향으로 이동
		speed:300, //이동속도
		pager:false, //페이징 표시를 제어(숨김 또는 노출)
		moveSlides:1, //이동 슬라이드 갯수
		slideWidth:235, //한개 슬라이드 폭(width)
		minSlides:4, //최소 노출 슬라이드 수
		maxSlides:4, //최대 노출 슬라이드 수
		slideMargin:15, //슬라이드 간의 간격
		auto: true, //자동 슬라이드 여부
		autoHover: true, //마우스 오버시 자동 정지
		controls:false //이전 다음 버튼 숨김(아래 함수로 따로 코딩할 것임)
	});
	
	$('.prev_btn').on('click',function(){
		mySlider.goToPrevSlide(); //goToPrevSlide()플러그인 메서드
		return false;
	});
	$('.next_btn').on('click',function(){
		mySlider.goToNextSlide();
		return false;
	});
	
	/* 팝업연동 */
	if($.cookie('pop')!='no') $('#pop_wrap').show();
	
	$('#pop_wrap').css('cursor','move').draggable();
	
	$('#pop_wrap area:eq(0)').on('click',function(){
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	$('#pop_wrap area:eq(1)').on('click',function(){
		$.cookie('pop','no',{expires:1}); //하루동안 cookie로 no를 저장
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	
	/* 이벤트슬라이드배너 */
	var visual = $('#brandVisual > ul > li');
	var button = $('#buttonList li');
	var current = 0;
	var setIntervalId;
	button.on({
		click:function(){
			var tg = $(this);
			var i = tg.index();
			if(current === tg.index()){return;}
			button.removeClass('on');
			tg.addClass('on');
			move(i);
			return false;
		}
		
	});
	timer();
	function timer(){
		setIntervalId = setInterval(function(){
			var n = current + 1;
			if(n==visual.size()) n=0;
			button.eq(n).trigger('click');
		},2000);
	}
	
	function move(i){
		var currentEI = visual.eq(current);
		var nextEI = visual.eq(i);
		currentEI.css({left:0}).stop().animate({left: '-100%'});
		nextEI.css({left:'100%'}).stop().animate({left: 0});
		current = i; //다음실행 위해
	}
	
	$('#event_wrap').on({
		mouseover:function(){
			clearInterval(setIntervalId);
		},mouseout:function(){
			timer();
		}
	});
	
	/* 레시피 슬라이드 */
	function moveSlider(index){
		var willMoveLeft = -(index * 785);
		$('.slider_panel').animate({left:willMoveLeft},'slow');
		
		$('.control_button[data-index='+index+']').addClass('active');
		$('.control_button[data-index!='+index+']').removeClass('active');
		$('.slider_text[data-index='+index+']').show().animate({left:0},'slow');
		$('.slider_text[data-index!='+index+']').hide('slow',function(){
			$(this).css('left',-100)
		});
	} /* moveSlider(index) */
	
	$('.slider_text').css('left',-100).each(function(index){
		$(this).attr('data-index',index);
	});
	$('.control_button').each(function(index){
		$(this).attr('data-index',index);
	}).click(function(){
		var index = $(this).attr('data-index');
		moveSlider(index);
	});
	
	var randomNumber = Math.round(Math.random()*4);
	moveSlider(randomNumber);
	
	
});









