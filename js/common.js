(function(){
	$.fn.exists = function () {
		return this.length !== 0;
	};

	window.ac = {};

	var classNames = {
		displayNone: '_display_none',
		acLang: 'ac-lang',
		acOpen: 'ac-open',
		acHide: 'ac-hide',
		acSentAppBtn: 'ac-sent-app-btn',
		acInputBlock: 'ac-input-block',

		acMobileMenu: 'ac-mobile-menu',
		acShowMenu: 'ac-show-menu',
		acCloseMenu: 'ac-close-menu',

		acIphone: 'ac-iphone',

		acAppleBtn: 'ac-apple-btn',
		acGoogleBtn: 'ac-google-btn',
		acNoUrl: 'ac-no-url'
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

	var $acLangButton,
		$acSentAppBtn,
		$acInputBlock,
		$acAppleBtn,
		$acGoogleBtn,
		$acMobileMenu,
		$acCloseMenu,
		$acIphone,
		$body,
		$html;

	$(function(){
		$acLangButton = $(selectors.acLang).find('div');
		$acSentAppBtn = $(selectors.acSentAppBtn);
		$acInputBlock = $(selectors.acInputBlock);
		$acAppleBtn = $(selectors.acAppleBtn);
		$acMobileMenu = $(selectors.acMobileMenu);
		$acCloseMenu = $(selectors.acCloseMenu);
		$acIphone = $(selectors.acIphone);
		$body = $('body');
		$html = $('html');

		$acLangButton.on('click', function(){
			var $this = $(this);
			$this.closest(selectors.acLang).toggleClass(classNames.acOpen);
		});

		$acSentAppBtn.on('click', function() {
			$(this).addClass(classNames.acHide);
			$acInputBlock.removeClass(classNames.acHide);
		});

		if ($html.hasClass('android')) {
			$acAppleBtn.addClass(classNames.acNoUrl);
			showWindowSend();
		}

		if ($html.hasClass('ios')) {
			$acGoogleBtn.addClass(classNames.acNoUrl);
			showWindowSend();
		}

		$acMobileMenu.on('click', function(){
			$body.toggleClass(classNames.acShowMenu);
		});

		$acCloseMenu.on('click', function(){
			$body.toggleClass(classNames.acShowMenu);
		});
		setNameLanguages();
	});

	$(window).on('resize', setNameLanguages);

	var setNameLanguages = function() {
		var $dataSelectLang = $('[data-select-lang="true"]'),
			$documentWidth = $(document).width(),
			readParameter;
		if ($documentWidth <= 960) {
			readParameter = 'full-text';
		} else {
			readParameter = 'short-text';
		}
		$dataSelectLang.each(function(){
			var $this = $(this);
			$this.text($this.data(readParameter));
		})
	};

	var showWindowSend = function() {
		$(selectors.acNoUrl).on('click', function(e){
			var elem = e.target || e.srcElement;
			e.preventDefault();
			alert('No URL');
			return false;
		});
	};
})();