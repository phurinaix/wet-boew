/*
 * @title Tabbed Interface
 * @overview Dynamically stacks multiple sections of content, transforming them into a tabbed interface
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
 (function( $, window, vapour ) {
 "use strict";

 /*
  * Variable and function definitions.
  * These are global to the plugin - meaning that they will be initialized once per page,
  * not once per instance of plugin on the page. So, this is a good place to define
  * variables that are common to all instances of the plugin on a page.
  */
 var selector = ".wb-tabs",
	$document = vapour.doc,
	i18n, i18nText,
	controls = selector + " [role=tablist] a",

	/*
	 * @method onTimerPoke
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onTimerPoke = function( $elm ) {
		var dataDelay = $elm.data( "delay" ),
			setting, delay;

		if ( !dataDelay ) {
			$elm.trigger( "init.wb-carousel" );
			return false;
		}

		// State playing
		if ( !$elm.hasClass( "playing" ) ) {
			return false;
		}

		// Add settings and counter
		setting = parseFloat( dataDelay );
		delay = parseFloat( $elm.data( "ctime" ) ) + 0.5;

		// Check if we need
		if ( setting < delay ) {
			$elm.trigger( "shift.wb-carousel" );
			delay = 0;
		}
		$elm.data( "ctime", delay );
	},

	/*
	 * @method createControls
	 * @param {jQuery DOM element} $tablist The plugin element
	 */
	createControls = function( $tablist ) {
		var $sldr = $tablist.parents( selector ),
			prevText = i18nText.prev,
			nextText = i18nText.next,
			spaceText = i18nText.space,
			isPlaying = $sldr.hasClass( "playing" ),
			state = isPlaying ? i18nText.pause : i18nText.play,
			hidden = isPlaying ? i18nText.rotStop : i18nText.rotStart,
			glyphiconStart = "<span class='glyphicon glyphicon-",
			wbInvStart = "<span class='wb-inv'>",
			tabsToggleStart = "<li class='tabs-toggle ",
			btnMiddle = "' href='javascript:;' role='button' title='",
			btnEnd = "</span></a></li> ",
			iconState = glyphiconStart + ( isPlaying ? "pause" : "play" ) + "'></span>",
			controls = tabsToggleStart + "prv'><a class='prv" + btnMiddle +
				prevText + "'>" + glyphiconStart + "chevron-left'></span>" +
				wbInvStart + prevText + btnEnd + tabsToggleStart +
				"plypause'><a class='plypause" + btnMiddle + state + "'>" +
				iconState + "<i>" + state + "</i>" + wbInvStart + spaceText +
				i18nText.hyphen + spaceText + hidden + "</span></a></li> " +
				tabsToggleStart + "nxt'><a class='nxt" + btnMiddle + nextText +
				"'>" + glyphiconStart + "chevron-right'></span>" + wbInvStart +
				nextText + btnEnd;

		$tablist.append( controls );
		$sldr.addClass( "inited" );
	},

	/*
	 * @method drizzleAria
	 * @param {2 jQuery DOM element} $tabs for the tabpanel grouping, and $tablist for the pointers to the groupings
	 */
	drizzleAria = function( $tabs, $tabslist ) {

		// lets process the elements for aria
		var tabscounter = $tabs.length - 1,
			$listitems = $tabslist.children(),
			listcounter = $listitems.length - 1,
			$item;


		for ( tabscounter; tabscounter !== -1; tabscounter -= 1 ) {
			$item = $tabs.eq( tabscounter );
			$item.attr({
				tabindex: "-1",
				"aria-hidden": "true",
				"aria-expanded": "false",
				"aria-labelledby": $item.attr( "id" ) + "-lnk"
			});
		}

		for ( listcounter; listcounter !== -1; listcounter -= 1 ) {
			$item = $listitems.eq( listcounter ).find( "a" );
			$item.attr({
				tabindex: "0",
				"aria-selected": "false",
				"aria-controls": $item.attr( "href" ).replace( "#", "" ) + "-lnk",
			});
			$item.parent().attr( "role", "presentation" );
		}

		 $tabslist.attr( "aria-live", "off" );
	},

	/*
	 * @method onInit
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onInit = function( $elm ) {
		var interval = 6,
			$tabs = $elm.find( "[role=tabpanel]" ),
			$tablist = $elm.find( "[role=tablist]" );

		// Only initialize the i18nText once
		if ( !i18nText ) {
			i18n = window.i18n;
			i18nText = {
				prev: i18n( "prv" ),
				next: i18n( "nxt" ),
				play: i18n( "play" ),
				rotStart: i18n( "tab-rot" ).on,
				rotStop: i18n( "tab-rot" ).off,
				space: i18n( "space" ),
				hyphen: i18n( "hyphen" ),
				pause: i18n( "pause" )
			};
		}

		if ( $elm.hasClass( "slow" ) ) {
			interval = 9;
		} else if ( $elm.hasClass( "fast" ) ) {
			interval = 3;
		}

		$tabs.filter( ":not(.in)" )
			.addClass( "out" );
		$elm.data({
			"delay": interval,
			"ctime": 0
		});

		drizzleAria( $tabs, $tablist );
		createControls( $tablist );

		$elm.data({
			"tabs": $tabs,
			"tablist": $tablist
		});
	},

	/*
	 * @method onShift
	 * @param {jQuery DOM element} $sldr The plugin element
	 * @param {jQuery DOM element} $elm The selected link from the tablist
	 */
	onPick = function( $sldr, $elm ) {
		var $items = $sldr.data( "tabs" ),
			$controls =  $sldr.data( "tablist" );

		$items.filter( ".in" )
			.removeClass( "in" )
			.addClass( "out" )
			.attr({
				"aria-hidden": "true",
				"aria-expanded": "false"
			});

		$items.filter( "[aria-labelledby=" + $elm.attr( "aria-controls" ) + "]" )
			.removeClass( "out" )
			.addClass( "in" )
			.attr({
				"aria-hidden": "false",
				"aria-expanded": "true"
			});

		$controls.find( ".active" )
			.removeClass( "active" )
			.attr( "aria-selected", "false" )
			.end()
				.find( $elm )
					.parent()
						.addClass( "active" )
						.attr( "aria-selected", "true" );
	},

	/*
	 * @method onShift
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onShift = function( $elm, event ) {
		var $items = $elm.data( "tabs" ),
			$controls = $elm.data( "tablist" ),
			len = $items.length,
			current = $elm.find( ".in" ).prevAll( "[role=tabpanel]" ).length,
			shiftto = event.shiftto ? event.shiftto : 1,
			next = current > len ? 0 : current + shiftto,
			$next;

		next = ( next > len - 1 ) ? 0 : ( next < 0 ) ? len - 1 : next;

		$next = $items.eq( next );

		$items.eq( current )
			.removeClass( "in" )
			.addClass( "out" )
			.attr({
				"aria-hidden": "true",
				"aria-expanded": "false"
			});
		$next.removeClass( "out" )
			.addClass( "in" )
			.attr({
				"aria-hidden": "false",
				"aria-expanded": "true"
			});
		$controls.find( ".active" )
			.removeClass( "active" )
			.attr( "aria-selected", "false" )
			.end()
				.find( "[href=#" + $next.attr( "id" ) + "]" )
					.parent()
						.addClass( "active" )
						.attr( "aria-selected", "true" );
	},

	/*
	 * @method onShift
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {integer} shifto The item to shift to
	 */
	onCycle = function( $elm, shifto ) {
		$elm.trigger({
			type: "shift.wb-carousel",
			shiftto: shifto
		});
	};

 // Bind the init event of the plugin
 $document.on( "timerpoke.wb init.wb-carousel shift.wb-carousel", selector, function( event ) {
	var eventType = event.type,

		// "this" is cached for all events to utilize
		$elm = $( this );

	switch ( eventType ) {
	case "timerpoke":
		onTimerPoke( $elm );
		break;

	/*
	 * Init
	 */
	case "init":
		onInit( $elm );
		break;

	/*
	 * Change Slides
	 */
	case "shift":
		onShift( $elm, event );
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
 });

 /*
  * Next / Prev
  */
 $document.on( "click", controls, function( event ) {
	event.preventDefault();
	var $elm = $( this ),
		$text, $inv,
		rotStopText = i18nText.rotStop,
		playText = i18nText.play,
		$sldr = $elm.parents( ".wb-tabs" ),
		action = $elm.hasClass( "prv" ) ? "prv" :
					$elm.hasClass( "nxt" ) ? "nxt" :
					$elm.attr( "href" ).indexOf( "#" ) > -1 ? "select" : "0";

	switch ( action ) {
	case "prv":
		onCycle( $elm, -1 );
		break;
	case "nxt":
		onCycle( $elm, 1 );
		break;
	case "select":
		onPick( $sldr, $elm );
		break;
	default:
		$text = $elm.find( "i" );
		$inv = $elm.find( ".wb-inv" );
		$elm.find( ".glyphicon" ).toggleClass( "glyphicon-play glyphicon-pause" );
		$text.text(
			$text.text() === playText ? i18nText.pause : playText
		);
		$inv.text(
			$inv.text() === rotStopText ? i18nText.rotStart : rotStopText
		);
		$sldr.toggleClass( "playing" );
	}
	$sldr.attr( "data-ctime", 0 );

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
 });

 // Add the timer poke to initialize the plugin
 window._timer.add( ".wb-tabs" );

 })( jQuery, window, vapour );
