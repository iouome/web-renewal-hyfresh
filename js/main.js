$(function(){

	/* ���κ��־��� */
    window.mySwipe = $('#mySwipe').Swipe({
		auto: 3000, //��ʰ� 3�� �������� �̵�
		continuous: true, //�ݺ�����
		callback: function(index){ //�Լ��� ������ ������ �� �Լ� ���� /�ڵ����� ���ϴ� �ε���
			$('.touch_bullet .active')
				.attr('src',$('.touch_bullet .active').attr('src').replace('on.png','off.png'))
				.removeClass('active');
			//img/visual_bullet_on.png, img/visual_bullet_off.png
			$('.touch_bullet img').eq(index)
				.attr('src',$('.touch_bullet img').eq(index).attr('src').replace('off.png','on.png'))
				.addClass('active');
		}
	}).data('Swipe');
    
	/* ���־� ����, ���� ��ư */
	$('.touch_left_btn a').on('click',function(){
		mySwipe.prev();
		return false;
	});
	$('.touch_right_btn a').on('click',function(){
		mySwipe.next();
		return false;
	});
	
	/* �� �޴� */
	$('#best_goods').each(function(){
		var bestG = $(this);
		var anchors = bestG.find('ul li a'); //6���� �� �� �ϳ�
		var panel = bestG.find('div.panel');
		var lastAnchor;
		var lastPanel;
		
		lastAnchor = anchors.filter('.tabOn');
		lastPanel = $(lastAnchor.attr('href'));
		
		panel.hide();
		lastPanel.show();
		
		anchors.click(function(event){
			event.preventDefault(); //jQuery�� ��Ʈ���ϱ� ����
			
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
	
	
	
	/* �Ѹ� ��ư ��� */
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
		//���� �ð��� ���� �Ŀ� �� �ȿ� �ִ� ������ �ѹ� ����
	}
	var auto1 = setTimeout(autoPlay,3000);
	
	$('.playBtn').on('click',function(){
		clearTimeout(auto1); //���߰� �����ؾ� �Ȼ�����(setTimeout���� ������ �Լ��� ���)
		auto1 = setTimeout(autoPlay,3000);
		$('img',this).attr('src',$('img',this).attr('src').replace('off.gif','on.gif'));
		$('.stopBtn img').attr('src',$('.stopBtn img').attr('src').replace('on.gif','off.gif'));
		return false;
	});
	$('.stopBtn').on('click',function(){
		clearTimeout(auto1); //���߰� �����ؾ� �Ȼ�����
		$('img',this).attr('src',$('img',this).attr('src').replace('off.gif','on.gif'));
		$('.playBtn img').attr('src',$('.playBtn img').attr('src').replace('on.gif','off.gif'));
		return false;
	});
	

	/* �ع��� �����̴� */
	var mySlider=$('#best_bg ul').bxSlider({
		mode:'horizontal', //����������� �̵�
		speed:300, //�̵��ӵ�
		pager:false, //����¡ ǥ�ø� ����(���� �Ǵ� ����)
		moveSlides:1, //�̵� �����̵� ����
		slideWidth:235, //�Ѱ� �����̵� ��(width)
		minSlides:4, //�ּ� ���� �����̵� ��
		maxSlides:4, //�ִ� ���� �����̵� ��
		slideMargin:15, //�����̵� ���� ����
		auto: true, //�ڵ� �����̵� ����
		autoHover: true, //���콺 ������ �ڵ� ����
		controls:false //���� ���� ��ư ����(�Ʒ� �Լ��� ���� �ڵ��� ����)
	});
	
	$('.prev_btn').on('click',function(){
		mySlider.goToPrevSlide(); //goToPrevSlide()�÷����� �޼���
		return false;
	});
	$('.next_btn').on('click',function(){
		mySlider.goToNextSlide();
		return false;
	});
	
	/* �˾����� */
	if($.cookie('pop')!='no') $('#pop_wrap').show();
	
	$('#pop_wrap').css('cursor','move').draggable();
	
	$('#pop_wrap area:eq(0)').on('click',function(){
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	$('#pop_wrap area:eq(1)').on('click',function(){
		$.cookie('pop','no',{expires:1}); //�Ϸ絿�� cookie�� no�� ����
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	
	/* �̺�Ʈ�����̵��� */
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
		current = i; //�������� ����
	}
	
	$('#event_wrap').on({
		mouseover:function(){
			clearInterval(setIntervalId);
		},mouseout:function(){
			timer();
		}
	});
	
	/* ������ �����̵� */
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









