'use strict';

// Adapted from https://github.com/jquery/jquery/blob/master/src/core/ready.js#L70
function onPageLoad (callback) {
	var completed = function () {
		document.removeEventListener('DOMContentLoaded', completed, false);
		window.removeEventListener('load', completed, false);
		callback();
	}

	if (document.readyState === 'complete')
		setTimeout(completed, 1);
	else {
		document.addEventListener('DOMContentLoaded', completed, false);
		window.addEventListener('load', completed, false);
	}
}

var $top = document.getElementById('top');
var $nav = document.getElementsByTagName('nav')[0];
var $lightrows = document.getElementsByClassName('light');

function resize () {
	$top.style.height = window.innerHeight + 'px';
	parallax();
}

var navAttached = true;
function stickynav () {
	if (navAttached && window.scrollY > window.innerHeight - 58) {
		$nav.className = 'detached';
		navAttached = false;
	}
	else if (!navAttached && window.scrollY <= window.innerHeight - 58) {
		$nav.className = '';
		navAttached = true;
	}
}

var pax_t = 0;
function parallax () {
	// limit to approx. 30 FPS
	pax_t;
	var new_pax_t = +new Date;
	if (new_pax_t - pax_t < 30) return;
	pax_t = new_pax_t;

	var s = Math.floor(window.scrollY / 4);
	var ss = -s + 'px';
	var ss_neg = s + 'px';
	document.body.style.backgroundPositionY = ss;
	$nav.style.backgroundPositionY = ss;
	for (var i = 0, len = $lightrows.length; i < len; i++) {
		$lightrows[i].style.backgroundPositionY = ss_neg;
	}
}

onPageLoad(resize);
onPageLoad(stickynav);
window.onresize = resize;
window.onscroll = function () { stickynav(); parallax(); };