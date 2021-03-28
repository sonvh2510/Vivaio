import { getSvg, dropdownToggle, Tab } from './utils';
const ajaxContactForm = () => {
	$('.js-form').each(function () {
		const _form = $(this);
		const _button = _form.find('.js-btn-submit');
		_button.on('click', function (e) {
			e.preventDefault();
			const url = _button.attr('data-url') || _button.attr('action');
			const method =
				_button.attr('data-method') || _button.attr('method');
			const formData = new FormData();
			_form.find('.form__group [name]').each(function (el) {
				const _input = $(this);
				const name = _input.attr('name');
				const val = _input.val();
				formData.append(name, val);
			});
			if (_form.valid()) {
				$.ajax({
					url: url,
					type: method,
					data: formData,
					processData: false,
					contentType: false,
					beforeSend: function () {
						_button.attr('disabled', 'disabled');
					},
					success: function (res) {
						if (res.Code == 200) {
							alert(`${res.Message}`);
							window.location.reload();
						} else {
							alert(res.Message);
						}
					},
				});
			}
		});
	});
};

const switchLanguage = () => {
	const currentLanguage =
		document.querySelector('html').getAttribute('lang') || 'vi';
	const activeHtml = document.querySelector('.header__language-active');
	const curLang = document.querySelector(
		`.language .item[data-language="${currentLanguage}"]`,
	);
	if (activeHtml && curLang) {
		activeHtml.innerHTML = curLang.innerHTML;
		$(activeHtml).find('.text').addClass('mx-1');
		$(activeHtml).append('<span class="fal fa-chevron-down"></span>');

		$('.language .item').on('click', function (e) {
			e.preventDefault();
			const language = $(this).attr('data-language');

			var originalUrl = window.location;
			window.location =
				'/_common-settings/ChangeCulture?culture=' +
				language +
				'&url=' +
				originalUrl;
		});
	}
};

const addClassBody = () => {
	const className = $('#page-verify').attr('data-class');
	$('body').addClass(className);
	$('body').attr('id', className);
};

const moveSomething2Somewhere = () => {
	if (window.innerWidth < 1025) {
		const extraMenu = $('.header__main-menu .header__helper-extra-menu');
		const mainMenuWrapper = extraMenu.siblings('.d-flex');
		const items = extraMenu.find('li');
		items.appendTo(mainMenuWrapper);
	}
};

const activeMegaMenuOnMobile = () => {
	$('body').on('click', '.has-mega>a', function (e) {
		e.preventDefault();
		$(this).addClass('active');
		$(this).siblings('.mega__wrap').addClass('active');
	});
	$('body').on('click', '.mega__back-link', function (e) {
		e.preventDefault();
		$(this).parents('.mega__wrap').removeClass('active');
	});
};

const eventsFilter = () => {
	const eventHeader = $('.about-event-header p');
	const events = $('.events-group .event');
	const total = events.length;
	const text = eventHeader
		.text()
		.split(' ')
		.filter((i) => isNaN(i));
	const string = [total, ...text];
	eventHeader.html(`${string.join(' ')}`);
	const dateFilterInput = document.querySelector('.js-event-date-picker');
	if (dateFilterInput) {
		const datepicker = new Litepicker({
			element: dateFilterInput,
			format: 'DD/MM/YYYY',
			startDate: new Date().getTime(),
			onSelect: function (date) {
				let totalReCalculate = 0;
				const dateSelected = new Date(date).getTime();
				events.each(function (index) {
					const _this = $(this);
					const dateString = _this.find('.time').html();
					const dateEvent = new Date(dateString).getTime();
					if (dateEvent < dateSelected) {
						_this.hide();
					} else {
						_this.show();
						totalReCalculate += 1;
					}
				});
				eventHeader.html(`${totalReCalculate} ${text}`);
			},
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	moveSomething2Somewhere();
	addClassBody();
	getSvg();
	dropdownToggle();
	activeMegaMenuOnMobile();
	ajaxContactForm();
	switchLanguage();
	if (document.querySelectorAll('.page-banner-1 .swiper-slide').length > 1) {
		const bannerSlider = new Swiper('.page-banner-1 .swiper-container', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			autoplay: {
				disableOnInteraction: false,
				delay: 4000,
			},
			pagination: {
				el: '.page-banner-1 .swiper-pagination-custom',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
		});
	}
	eventsFilter();
	const megaNewsSlide = new Swiper(
		'.header__1 .mega__newsSlide .swiper-container',
		{
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			spaceBetween: 30,
			autoplay: {
				disableOnInteraction: false,
				delay: 4000,
			},
			navigation: {
				nextEl: '.header__1 .mega__newsSlide .swiper-next',
			},
			pagination: {
				el: '.header__1 .mega__newsSlide .swiper-pagination',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
		},
	);
	const partnershipSlider = new Swiper(
		'.partners__section-1 .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: '.partners__section-1 .swiper-pagination-custom',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
			breakpoints: {
				768: {
					slidesPerview: 2,
				},
				1025: {
					slidesPerView: 3,
				},
			},
		},
	);
	const pciSlider = new Swiper('.partners__section-3 .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: '.partners__section-3 .swiper-pagination-custom',
			clickable: true,
			type: 'bullets',
			dynamicMainBullets: true,
		},
		navigation: {
			nextEl: '.partners__section-3 .swiper-next',
			prevEl: '.partners__section-3 .swiper-prev',
		},
		breakpoints: {
			768: {
				slidesPerview: 2,
			},
			1025: {
				slidesPerView: 4,
			},
		},
	});

	const footerHelpSlider = new Swiper('.footer__help .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 30,
		pagination: {
			el: '.footer__help .swiper-pagination-custom',
			clickable: true,
			type: 'bullets',
			dynamicMainBullets: true,
		},
		breakpoints: {
			1025: {
				slidesPerView: 3,
				spaceBetween: 50,
			},
		},
	});

	const index2Slider = new Swiper('.indexSection--2 .swiper-container', {
		slidesPerView: 1.1,
		spaceBetween: 10,
		pagination: {
			el: '.indexSection--2 .swiper-container .swiper-pagination-custom',
			clickable: true,
			type: 'bullets',
			dynamicMainBullets: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2.1,
			},
			768: {
				slidesPerView: 3.1,
				spaceBetween: 15,
			},
			1025: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});

	const productCategoriesSlider = new Swiper(
		'.productCategories__slider .swiper-container',
		{
			slidesPerView: 2,
			loop: true,
			observeParents: true,
			observer: true,
			spaceBetween: 10,
			navigation: {
				prevEl: '.productCategories__slider .swiper-prev--custom',
				nextEl: '.productCategories__slider .swiper-next--custom',
			},
			pagination: {
				el: '.productCategories__slider .swiper-pagination-custom',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
		},
	);

	const solution6Slider = new Swiper(
		'.solution-1--6__slider .swiper-container',
		{
			slidesPerView: 2,
			spaceBetween: 20,
			navigation: {
				prevEl: '.solution-1--6__slider .swiper-prev--custom',
				nextEl: '.solution-1--6__slider .swiper-next--custom',
			},
			pagination: {
				el: '.solution-1--6__slider .swiper-pagination-custom',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				1025: {
					slidesPerView: 5,
				},
			},
		},
	);

	const solution3_2Slider = new Swiper(
		'.solution-3--2__slider .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			navigation: {
				prevEl: '.solution-3--2__slider .swiper-prev--custom',
				nextEl: '.solution-3--2__slider .swiper-next--custom',
			},
			pagination: {
				el: '.solution-3--2__slider .swiper-pagination-custom',
				clickable: true,
				type: 'bullets',
				dynamicMainBullets: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
			},
		},
	);

	const supportResultTechnicalSlider = new Swiper(
		'.block__result--slider .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			// pagination: {
			// 	el: '.solution-3--2__slider .swiper-pagination-custom',
			// 	clickable: true,
			// 	type: 'bullets',
			// 	dynamicMainBullets: true,
			// },
			centeredSlides: true,
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
			},
		},
	);
	const productDetailCategoriesSlider = new Swiper(
		'.banner__img.banner__img--showSlider  .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			// pagination: {
			// 	el: '.solution-3--2__slider .swiper-pagination-custom',
			// 	clickable: true,
			// 	type: 'bullets',
			// 	dynamicMainBullets: true,
			// },
			autoplay: {
				disableOnInteraction: false,
				delay: 4000,
			},
			loop: true,
		},
	);

	const productDetailPopupThumb = new Swiper(
		'.indexBannerPopup .gallery-thumbs',
		{
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
		},
	);
	const productDetailPopupTop = new Swiper('.indexBannerPopup .gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.indexBannerPopup .swiper-next',
			prevEl: '.indexBannerPopup .swiper-prev',
		},
		observer: true,
		observeParents: true,
		thumbs: {
			swiper: productDetailPopupThumb,
		},
		allowTouchMove: false,
	});

	const contactTab = new Tab('.tab-container');

	if (document.querySelector('.date-picker')) {
		const datepicker = new Litepicker({
			element: document.querySelector('.date-picker'),
			format: 'DD/MM/YYYY',
			startDate: new Date().getTime(),
		});
	}
	// Toggle Filter in Product page
	$('.productList__filterIcon').on('click', function () {
		$('.productList__filter').addClass('is-expanded');
	});
	$('.productList__filterClose').on('click', function () {
		$('.productList__filter').removeClass('is-expanded');
	});
	// Support Result Help
	$('.dropdown__heading').on('click', function () {
		$(this).toggleClass('hide');
		$(this).siblings().toggle();
	});
	// Header Search Toggle
	$('.header__1 .header__search .text').on('click', function () {
		$('header .header__search').addClass('active');
		$('header .header__backdrop').show();
	});
	$(
		'.header__1 .header__search .search-input-close, header .header__backdrop',
	).on('click', function () {
		$('header .header__search').removeClass('active');
		$('header .header__backdrop').hide();
	});
	// Header Main Toggle
	$('.header__1 .header__main-menu .toggle-mobile-btn').on(
		'click',
		function () {
			$(this).siblings().toggleClass('show');
			$(this).toggleClass('active');
			$('.header__main-menu .active').each(function () {
				$(this).removeClass('active');
			});
		},
	);
	$('.header__1 .header__main-menu .toggle__menu-wrap>ul>li.has__mega>a').on(
		'click',
		function (e) {
			e.preventDefault();
			$(this).siblings().addClass('show');
		},
	);
	$('.header__1 .mega__wrap>.container>.mega__back-link').on(
		'click',
		function () {
			$(this).parents('.mega__wrap').removeClass('show');
		},
	);
	$('.mega__listProductWrapper>.mega__back-link').on('click', function () {
		$(this).parents('.mega__product').hide();
		$(this).parents('.mega__listProduct').hide();
	});

	// Header 2 search toggle
	$('.header__2 .header__search button').on('click', function () {
		if (!$(this).siblings().val()) {
			$(this).parent().toggleClass('active');
		} else {
			console.log('event');
		}
	});
	$('.header__2 .header__btn').on('click', function () {
		if ($(this).siblings('.header__main').is(':hidden')) {
			$(this).siblings('.header__main').slideDown();
		} else {
			$(this).siblings('.header__main').slideUp();
		}
	});

	$('.indexSection .indexSectionZoom').on('mousemove', (e) => {
		let zoomer = e.currentTarget;
		let offsetX;
		let offsetY;
		e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
		e.offsetY ? (offsetY = e.offsetY) : (offsetY = e.touches[0].pageX);
		let x = (offsetX / zoomer.offsetWidth) * 100;
		let y = (offsetY / zoomer.offsetHeight) * 100;
		zoomer.style.backgroundPosition = x + '% ' + y + '%';
	});

	$('.banner__img--showSlider, .banner__content-detail .btn').on(
		'click',
		(e) => {
			e.preventDefault();
			$('.indexBanner').addClass('d-none');
			$('.indexBannerPopup').removeClass('d-none');
		},
	);
	$('.closePopup ').on('click', () => {
		$('.indexBanner').removeClass('d-none');
		$('.indexBannerPopup').addClass('d-none');
	});

	$('#result-help-and-download-page .form__search button').on(
		'click',
		function (e) {
			e.preventDefault();
			var value = $(this)
				.siblings()
				.find('input')
				.val()
				.trim()
				.toLowerCase();
			// if(value){
			$(this)
				.parents('.tab-content')
				.find('.dropdown__label')
				.each(function (e) {
					// console.log($(this).html().toLowerCase().indexOf(value) > -1 ? `show ${e}` : `hide ${e}`)
					$(this).html().toLowerCase().indexOf(value) > -1
						? $(this).show()
						: $(this).hide();
				});
			// }
		},
	);
	// Scroll Sticky
	if ($('#blog-page .blog__newsletter').length) {
		var blogNewsLetterOffset = $('#blog-page .blog__newsletter').offset()
			.top;
	}

	// add mega-menu attribute
	if (document.querySelector('.header__1')) {
		document
			.querySelectorAll('.mega__extra-menu li a')
			.forEach(function (e, i) {
				e.setAttribute('mega-target', 'mega-' + (i + 1));
			});
		document
			.querySelectorAll('.mega__listProduct')
			.forEach(function (e, i) {
				e.setAttribute('mega-menu', 'mega-' + (i + 1));
			});
		document.querySelectorAll('.mega__wrap').forEach(function (e, i) {
			e.classList.add('mega__' + (i + 1));
		});
	}

	if (window.innerWidth > 1025) {
		$('[mega-target]').each(function () {
			const target = $(this).attr('mega-target');
			const menuWrapper = $(`[mega-menu="${target}"]`);
			const _this = $(this);
			_this.on('mouseenter', function (e) {
				e.preventDefault();
				$(`[mega-target]`).each(function (index) {
					$(this).removeClass('active');
				});
				_this.addClass('active');
				$(`[mega-menu]`).each(function (index) {
					$(this).hide();
				});
				menuWrapper.show();
			});
			menuWrapper.on('mouseleave', function (e) {
				e.preventDefault();
				menuWrapper.hide();
			});
		});
		$('.has-mega .container').on('mouseleave', function (e) {
			e.preventDefault();
			$(`[mega-menu]`).each(function () {
				$(this).hide();
			});
			$(`[mega-target]`).each(function (index) {
				$(this).removeClass('active');
			});
		});
	} else {
		const allMenuProductWrapper = $('.mega__product');
		$('[mega-target]').each(function (index) {
			const target = $(this).attr('mega-target');
			const menuWrapper = $(`[mega-menu="${target}"]`);
			const _this = $(this);
			_this.on('click', function (e) {
				e.preventDefault();
				menuWrapper.show();
				allMenuProductWrapper.show();
			});
		});
	}
	function scrollStiky() {
		var scroll = $(window).scrollTop();
		if (scroll > blogNewsLetterOffset) {
			$('#blog-page .blog__newsletter').css({
				position: 'fixed',
				top: '78px',
				left: 0,
				width: '100%',
			});
		} else {
			$('#blog-page .blog__newsletter').css({
				position: 'static',
			});
		}
	}
	$(window).on('scroll', function () {
		if ($('#blog-page').length) {
			scrollStiky();
		}
	});
	$(document).on('ready', function () {
		if ($('#blog-page').length) {
			scrollStiky();
		}
	});
	$('.productSubCategories .productList__sort select').on('change', function (
		e,
	) {
		e.preventDefault();
		var value = $(this).val();
		// if(value){
		$.ajax({
			url: `?storage=${value}`,
			// data: { isajax: true },
			success: function (data) {
				console.log('sucess');
			},
		});
		// }
	});

	// filter product by categories
	if (document.querySelector('.main-category')) {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '/content/resources/js/filter.js';
		script.async = true;
		script.dataset.cfasync = false;
		document.body.appendChild(script);
		script.addEventListener('load', () => {
			$('.main-category').trigger('change');
		});
	}

	// filter FAQ
	if (
		document.querySelector('#page-verify').getAttribute('data-class') ==
		'result-help-and-download-page'
	) {
		document.querySelectorAll('.tab-content').forEach(function (eTab, i) {
			$(eTab)
				.find('.section__dropdown')
				.each(function () {
					$(eTab)
						.find('select')
						.append(
							'<option>' +
								$(this).find('.dropdown__heading').text() +
								'</option>',
						);
				});
		});

		$('.section__form select').on('change', function () {
			const value = $(this).val();
			$(this)
				.parents('.row')
				.find('.section__dropdown')
				.each(function () {
					if (value == $(this).find('.dropdown__heading').text()) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});
		});

		let filterTimerout;
		$('.tab-content .form__search input').on('keyup', function (e) {
			if (filterTimerout) {
				clearTimeout(filterTimerout);
			}
			filterTimerout = setTimeout(() => {
				const valueLowercase = e.currentTarget.value.toLowerCase();
				$(this)
					.parents('.row')
					.find('.section__dropdown')
					.each(function () {
						const text = $(this)
							.find('.dropdown__heading')
							.text()
							.toLowerCase();
						if (text.includes(valueLowercase)) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
			}, 400);
		});
	}
});
