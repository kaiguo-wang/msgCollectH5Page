import Vue from 'vue';
// import Vconsole from 'vconsole';
import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.config.productionTip = false;

// new Vconsole();
(function() {
  let isPageHide = false;
  window.addEventListener('pageshow', () => {
    if (isPageHide) {
      window.location.reload();
    }
  });
  window.addEventListener('pagehide', () => {
    isPageHide = true;
  });
}());
FastClick.prototype.focus = function (targetElement) {
	let length;
	if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
		length = targetElement.value.length;
		targetElement.focus();
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};