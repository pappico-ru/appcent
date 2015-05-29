(function () {
	$.fn.exists = function () {
		return this.length !== 0;
	};

	window.ac = {};

	var classNames = {
		hide: 'hide',
		acLang: 'ac-lang',
		acOpen: 'ac-open',
		acSentAppBtn: 'ac-sent-app-btn',
		acPhoneInputBtn: 'ac-phone-input-btn',
		acInputBlock: 'ac-input-block',
		acSendMessageContainer: 'ac-send-message-container',

		acPhoneInputBlock: 'ac-phone-input-block',

		acMobileMenu: 'ac-mobile-menu',
		acShowMenu: 'ac-show-menu',
		acCloseMenu: 'ac-close-menu',

		acIphone: 'ac-iphone',

		acAppleBtn: 'ac-apple-btn',
		acAndroidBtn: 'ac-android-btn',
		acNoUrl: 'ac-no-url',

		acSecond: 'ac-second',
		acSendAgain: 'ac-send-again',
		acClock: 'ac-clock',

		acNoScroll: 'ac-no-scroll',

		acVideoContainer: 'ac-video-container',
		acVideo: 'ac-video'
	};

	var ids = {};

	var buildSelectors = function (selectors, source, characterToPrependWith) {
		$.each(source, function (propertyName, value) {
			selectors[propertyName] = characterToPrependWith + value;
		});
	};

	ac.buildSelectors = function (classNames, ids) {
		var selectors = {};
		if (classNames) {
			buildSelectors(selectors, classNames, ".");
		}
		if (ids) {
			buildSelectors(selectors, ids, "#");
		}
		return selectors;
	};

	var selectors = ac.buildSelectors(classNames, ids);

	var $acLang = $(selectors.acLang),
		$acSentAppBtn = $(selectors.acSentAppBtn),
		$acPhoneInputBtn = $(selectors.acPhoneInputBtn),
		$acSendMessageContainer = $(selectors.acSendMessageContainer),
		$acInputBlock = $(selectors.acInputBlock),
		$acAppleBtn = $(selectors.acAppleBtn),
		$acAndroidBtn = $(selectors.acAndroidBtn),
		$acPhoneInputBlock = $(selectors.acPhoneInputBlock),
		$acMobileMenu = $(selectors.acMobileMenu),
		$acCloseMenu = $(selectors.acCloseMenu),
		$acIphone = $(selectors.acIphone),
		$acSecond = $(selectors.acSecond),
		$acSendAgain = $(selectors.acSendAgain),
		$acClock = $(selectors.acClock),
		$acVideo = $(selectors.acVideo),
		$body = $('body'),
		$html = $('html'),
		$acPopupBox = $('.ac-popup-box'),
		$acPopupClose = $('.ac-popup-close'),
		defaultTime = 16,
		second;

	$(function () {
		$acLang.on('click', function () {
			$(this).toggleClass('ac-dropdown-show')
		});

		$acMobileMenu.on('click', function () {
			$body.addClass('ac-show-menu');
		});
		$acCloseMenu.on('click', function () {
			$body.removeClass('ac-show-menu');
		});

		if ($html.hasClass('android')) {
			$acAppleBtn.addClass(classNames.acNoUrl);
			showWindowSend();
		}

		if ($html.hasClass('ios')) {
			$acAndroidBtn.addClass(classNames.acNoUrl);
			showWindowSend();
		}

		$acPopupClose.on('click', function () {
			$acPopupBox.addClass('hide');
			noScrollBody();
		});

		$acSentAppBtn.on('click', function(){
			$(this).addClass('ac-hide');
			$acPhoneInputBlock.removeClass('ac-hide');
		});

		$acPhoneInputBtn.on('click', function(){
			$acPhoneInputBlock.addClass('ac-hide');
			$acSendMessageContainer.removeClass('ac-hide');
			second = defaultTime;
			$acClock.removeClass('hide');
			$acSendAgain.addClass('hide');
			setTimeout(startTimer, 1000);
		});

		showWindowSend();
		videoResize();
		setNameLanguages();
	});

	var startTimer = function() {
		second--;
		$acSecond.text('0:' + (second > 9 ? second : '0' + second));
		if (second === 0) {
			second = defaultTime;
			$acSecond.text('0:' + second);
			$acClock.addClass('hide');
			$acSendAgain.removeClass('hide');
			setTimeout(function(){}, 1000);
		} else{
			setTimeout(startTimer, 1000);
		}
	};

	var showWindowSend = function() {
		$(selectors.acNoUrl).on('click', function(e){
			var elem = e.target || e.srcElement;
			e.preventDefault();
			$acPopupBox.removeClass('hide');
			return false;
		});
	};

	var videoResize = function() {
		var documentSize = {
			height: $(document).height(),
			width: $(document).height() / 0.5278
		};
		$acVideo.css({height: documentSize.height, width: documentSize.width});
	};

	var setNameLanguages = function() {
		var $dataSelectLang = $('[data-select-lang="true"]'),
			$documentWidth = $(document).width(),
			readParameter;
		if ($documentWidth <= 910) {
			readParameter = 'full-text';
		} else {
			readParameter = 'short-text';
		}
		$dataSelectLang.each(function(){
			var $this = $(this);
			$this.text($this.data(readParameter));
		})
	};

	$(window).on('resize', function(){
		videoResize();
		setNameLanguages();
	});
})();
