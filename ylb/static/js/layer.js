(function(window, undefined, $){
	//第一次常识：使用jq获取元素
	//第一版没有参数
	
	var layer = {};

	layer.win = $(window);
	layer.body = $('body');

	//alert系统弹框
	function alertFun(arg) {
		var that = this,
			config = $.extend({
				title : '信息',
				content : '内容展示',
				type : 2 ,
				conType : 'text',
				width : 260,
				height : null,
				link : 'javascript:void(0);',
				target : '_self',
				btn : ['确定','取消'],
				right : function(){
					that.hide();
				},
				cancel : null
			}, arg);

		if(config.type == 2){
			that.base({
				title : config.title,
				content : config.content,
				width : config.width,
				height : config.height,
				btn : Object.prototype.toString.call(config.cancel) === '[object Function]' ? '<a href="'+ config.link +'" class="layer-btn-hint layer-btn-right" target="'+ config.target +'">'+ config.btn[0] +'</a><a href="javascript:void(0);" class="layer-btn-hint layer-btn-cancel">'+ config.btn[1] +'</a>' : '<a href="'+ config.link +'" class="layer-btn-hint layer-btn-right" target="'+ config.target +'">'+ config.btn[0] +'</a>',
				style : config.style|| 'god-ag-right'
			});
		}else if(config.type == 3){
			that.base({
				title : config.title,
				content : '<input type="'+ config.conType +'" class="layer-prompt">',
				width : config.width,
				height : config.height,
				btn : Object.prototype.toString.call(config.cancel) === '[object Function]' ? '<a href="'+ config.link +'" class="layer-btn-hint layer-btn-right" target="'+ config.target +'">'+ config.btn[0] +'</a><a href="javascript:void(0);" class="layer-btn-hint layer-btn-cancel">'+ config.btn[1] +'</a>' : '<a href="'+ config.link +'" class="layer-btn-hint layer-btn-right" target="'+ config.target +'">'+ config.btn[0] +'</a>',
				style : config.style || 'god-ag-right'
			});
		}else if(config.type == 4){
			that.base({
				title : config.title,
				content : config.content,
				width : config.width,
				height : config.height,
				style : config.style
			});
		}else{
			that.base({
				title : config.title,
				content : config.content,
				width : config.width,
				height : config.height,
				btn : '<a href="javascript:void(0);" class="layer-btn-hint layer-btn-cancel">'+ config.btn[0] +'</a>',
				style : config.style || 'god-ag-right'
			});
		}
		//事件- -
		$('.layer-close').click(function() {
			that.hide();
			return false;
		});
		$('.layer-btn-cancel').click(function() {
			that.hide();
			return false;
		});
		$('.layer-btn-right').click(function(){
			var value = '';
			if(config.type == 3){
				value = that.content.find('.layer-prompt').val();
			}
			if(typeof config.right(value, that.content, that) !== 'undefined') return false;
			that.hide();
		});

		that.moveEle = $('<div></div>');
		//托转
		$('.layer-title').mousedown(function(ev) {
			ev.preventDefault();
			var x = ev.pageX,
				y = ev.pageY,
				width = that.hint.width(),
				height = that.hint.height(),
				nowX,nowY,pageX, pageY;

			that.moveEle.css('width', width).css('height', height).css('border', '3px solid #666').css('backgroundColor','rgba(255,255,255,.4)').css('zIndex',699999999).css('position','absolute').css('left',that.hint.offset().left).css('top', that.hint.offset().top);

			layer.body.append(that.moveEle);

			nowX = x - that.hint.offset().left;
			nowY = y - that.hint.offset().top;

			$(document).mousemove(function(ev){
				var x = ev.pageX,
					y = ev.pageY;

				that.pageX = x - nowX,
				that.pageY = y - nowY;

				if(that.pageX < 0){
					that.pageX = 0;
				}else if(x + (width - nowX) >= layer.win.width()){
					that.pageX = layer.win.width() - width;
				}
				if(that.pageY < 0){
					that.pageY = 0;
				}else if(y + (height - nowY) >= layer.win.height()){
					that.pageY = layer.win.height() - height;
				}
				that.moveEle.css('left', that.pageX).css('top', that.pageY);
			});
		});
		
		$(document).mouseup(function(ev) {
			ev.preventDefault();
			that.moveEle.remove();

			that.hint.css('left', that.pageX).css('top', that.pageY);

			$(document).unbind('mousemove');
		});
	}
	/*function alertFun(arg) {
		var that = this,
			config = $.extend({
				title : '信息',
				content : '做自己的弹框',
				type : 2 ,
				conType : 'text',
				btn : ['<a href="javascript:void(0);" class="layer-btn-hint layer-btn-right" target="_self">确定</a>','<a href="javascript:void(0);" class="layer-btn-hint layer-btn-cancel">取消</a>'],
				right : function(){
					that.hide();
				},
				cancel : null
			}, arg);

		if(config.type == 2){
			that.base({
				title : config.title,
				content : config.content,
				btn : Object.prototype.toString.call(config.cancel) === '[object Function]' ? config.btn[0] + config.btn[1] : config.btn[0],
				style : 'god-ag-right'
			});
		}else if(config.type == 3){
			that.base({
				title : config.title,
				content : '<input type="'+ config.conType +'" class="layer-prompt">',
				btn : Object.prototype.toString.call(config.cancel) === '[object Function]' ?config.btn[0] + config.btn[1] : config.btn[0],
				style : 'god-ag-right'
			});
		}else{
			that.base({
				title : config.title,
				content : config.content,
				btn : config.btn[0],
				style : 'god-ag-center'
			});
		}
		//事件- -
		$('.layer-close').click(function() {
			that.hide();
			return false;
		});
		$('.layer-btn-cancel').click(function() {
			that.hide();
			return false;
		});
		$('.layer-btn-right').click(function(){
			var value = '';
			if(config.type == 3){
				value = that.content.find('.layer-prompt').val();
			}
			if(typeof config.right(value, that.content, that) !== 'undefined') return false;
			that.hide();
		});
	}*/
	alertFun.prototype.base = function(arg) {
		var that = this,
			shade = $('<div class="layer-shade"></div>'),
			btn = null;

		if(arg.btn){
			btn =  $('<div class="layer-btn-wrap '+ arg.style +'">'+ arg.btn +'</div>');
		}

		that.container = $('<div class="layer-container"></div>');
		that.hint = $('<div class="layer-hint"></div>');
		that.title = $('<strong class="layer-title">'+ arg.title +'</strong>');
		that.content = $('<div class="layer-content">'+ arg.content +'</div>');

		if(arg.width) that.hint.width(arg.width);
		if(arg.height) that.hint.height(arg.height);

		that.hint.append(that.title);
		that.hint.append(that.content);
		that.hint.append($('<a href="javascript:void(0);" class="layer-close">关闭</span>'));
		that.hint.append(btn);

		that.container.append(that.hint);
		that.container.append(shade);

		layer.body.append(that.container);
		that.position('center');
	}
	alertFun.prototype.position = function(direction) {
		//位置
		var left = 0,
			top = 0,
			that = this;

		if(direction === 'center'){
			left = layer.win.width() / 2 - that.hint.width() / 2;
			top = layer.win.height() / 2 - that.hint.height() / 2;
		}
		that.hint.css('left',left).css('top', top);
	}
	alertFun.prototype.hide = function() {
		this.container.remove();
	}
	//提示框
	function tipsFun(arg){
		var that = this,
			config = $.extend({
				content : 'hi, 这是一个小的tips',
				direction : 'center',
				auto : true,
				more : false,
				delay : 1000
			}, arg);

		if(!config.more){
			console.log(1);
			$('.layer-tips').each(function(index, ele) {
				$(ele).remove();
			});
		}

		that.base(config);
		//创建自动因此
		that.timer = null;
		that.autoHide(config);

		if(!config.arg){
			return that;
		}
	}
	tipsFun.prototype.autoHide = function(arg) {
		var that = this;

		if(!arg.auto){
			clearTimeout(that.this);
		}else{
			//3秒自动影藏
			that.timer = setTimeout(function() {
				that.container.remove();
			}, arg.delay);

			$(document).keydown(function(ev) {
				if(ev.keyCode == 18){
					clearTimeout(that.timer);
				}
			});
			$(document).keyup(function(ev) {
				if(ev.keyCode == 18){
					that.timer = setTimeout(function() {
						that.hide();
					}, arg.delay);
				}
			});
		}
	}
	tipsFun.prototype.hide = function(delay) {
		var that = this,
			timer = false;

		that.container.mouseleave(function() {
			that.container.remove();
		});

		that.container.mouseenter(function() {
			timer = true;
		});
		setTimeout(function() {
			if(!timer) that.container.remove();
		}, delay);
	}
	tipsFun.prototype.base = function(arg) {
		var that = this;

		that.container = $('<div class="layer-tips"></div>');
		that.point = $('<i class="layer-tips-point layer-tips-point-'+ arg.direction +'"></i>');
		that.content = $('<div class="layer-tips-content">'+ arg.content +'</div>');
		that.shade = $('')

		if(arg.target) that.container.append(that.point);
		that.container.append(that.content);

		layer.body.append(that.container);

		that.position(arg.direction, arg.target);
	}
	tipsFun.prototype.position = function(direction, target) {
		//元素环绕
		var that = this,
			lWidth = that.container.outerWidth(),
			lHeight =  that.container.outerHeight(),
			winWidth = layer.win.width(),
			winHeight = layer.win.height();

		if(target){
			//得到标签的left，top;
			var offsetLeft = target.offset().left,
				offsetTop = target.offset().top,
				width = target.outerWidth(),
				
				height = target.outerHeight();

			if(direction === 'left'){
				that.container.css('left', offsetLeft - lWidth - 12);
				that.container.css('top', offsetTop);
			}else if(direction === 'right'){
				that.container.css('left', offsetLeft + width + 12);
				that.container.css('top', offsetTop);
			}else if(direction === 'top'){
				that.container.css('left', offsetLeft);
				that.container.css('top', offsetTop - lHeight - 12);
			}else if(direction === 'bottom'){
				that.container.css('left', offsetLeft);
				that.container.css('top', offsetTop + height + 12);
			}else{
				that.container.css('left', winWidth / 2 - lWidth / 2);
				that.container.css('top', winHeight / 2 - lHeight / 2);
			}
		}else{
			//非元素环绕
			
			if(direction === 'top'){
				that.container.css('top', winHeight / 12);
				that.container.css('left', winWidth / 2 - lWidth / 2);
			}else if(direction === 'bottom'){
				that.container.css('bottom', winHeight / 12);
				that.container.css('left', winWidth / 2 - lWidth / 2);
			}else{
				that.container.css('left', winWidth / 2 - lWidth / 2);
				that.container.css('top', winHeight / 2 - lHeight / 2);
			}
		}
	}
	//加载层
	function loadingFun(arg) {
		var that = this,
			config = $.extend({
				content : '<img src="../static/images/load.gif" >'
			},arg);

		that.base(config);

		var winWidth = layer.win.width(),
			winHeight = layer.win.height(),
			width = that.wrap.outerWidth(),
			height = that.wrap.outerHeight();

		that.wrap.css('left', winWidth / 2 - width / 2);
		that.wrap.css('top', winHeight / 2 - height / 2);
		return that;
	}
	loadingFun.prototype.base = function(arg) {
		var that = this,
			innerShade = $('<div class="layer-loading-shade"></div>'),
			shade = $('<div class="layer-shade"></div>');

		that.container = $('<div class="layer-loading"></div>');
		that.content = $('<div class="layer-loading-content">'+ arg.content +'</div>');
		that.wrap = $('<div class="layer-loading-wrap"></div>'),

		that.wrap.append(innerShade);
		that.wrap.append(that.content);
		that.container.append(that.wrap);
		that.container.append(shade);
		layer.body.append(that.container);
	}
	loadingFun.prototype.hide = function() {
		var that = this;

		that.container.remove();
	}

	layer.alert = function(arg) {
		return new alertFun(arg);
	};

	layer.tips = function(arg) {
		return new tipsFun(arg);
	};

	layer.loading = function(arg) {
		return new loadingFun(arg);
	}
	window.layer = layer;
})(window, undefined, jQuery);