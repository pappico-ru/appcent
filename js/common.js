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
		acInputBlock: 'ac-input-block'
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
		$acInputBlock;

	$(function(){
		$acLangButton = $(selectors.acLang).find('div');
		$acSentAppBtn = $(selectors.acSentAppBtn);
		$acInputBlock = $(selectors.acInputBlock);

		$acLangButton.on('click', function(){
			var $this = $(this);
			$this.closest(selectors.acLang).toggleClass(classNames.acOpen);
		});

		$acSentAppBtn.on('click', function() {
			$(this).addClass(classNames.acHide);
			$acInputBlock.removeClass(classNames.acHide);
		});
	});
})();