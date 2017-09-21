/*
Notify
------
por: Diego Marques

Exemplo de utilização:
var teste1 = new notify({
	msg: 'Loren ipsum sit dolor omet 1',
	time: 3000
});
teste1.open();

var teste2 = new notify({
	msg: 'Loren ipsum sit dolor omet 2',
	time: 4000
});
teste2.open();
*/
function notify(options) {
	
	var self = this;

	options = jQuery.extend({
		type: 'success', // <string 'info' | 'error' | 'alert' | 'success' | custom>
		icon: null, // <string FontAwesome Icon Name>
		msg: null, // <string> | <dom object>
		time: 5000, // <int milliseconds>
		closeButton: true, // <bool>
		audio: true, // <bool>
		afterOpen: null, // <function>
		afterClose: null // <function>
	}, options);

	if(options.audio)
		var audio = new Audio('/wp-content/themes/gecko-child/media/notify.mp3');

	if(!options.icon) {
		switch(options.type) {
			case 'info': options.icon = 'info'; break;
			case 'error': options.icon = 'ban'; break;
			case 'alert': options.icon = 'exclamation'; break;
			case 'success': options.icon = 'check'; break;
		}
	}

	// Check if the base container exists
	if(jQuery('#notify').length == 0) {
		var $notify = jQuery('<div id="notify"></div>');
		jQuery('body').append($notify);
	} else {
		var $notify = jQuery('#notify');
	}

	// Create the default html
	this.$ = jQuery(
		'<div class="notify notify-' + options.type + '">' +
			(options.closeButton ? '<a class="notify-close" href="javascript:void(0);" title="Fechar"><i class="fa fa-close"></i></a>' : '') +
			(options.icon ? '<span class="notify-icon"><i class="fa fa-' + options.icon + '"></i></span>' : '') +
			(options.msg ? '<div class="notify-msg"></div>' : '') +
		'</div>'
	);

	// Append the message
	if(options.msg)
		this.$.find('.notify-msg').append(options.msg);

	// Open the notification
	this.open = function() {
		this.$.addClass('notify-show');

		if(options.audio)
			audio.play();

		if(typeof options.afterOpen == 'function')
			options.afterOpen();

		return self;
	}
	
	// Close the notification
	this.close = function() {
		self.$.addClass('notify-closing');
		setTimeout(function() {
			self.$.remove();

			if(typeof options.afterClose == 'function')
				options.afterClose();
		}, 350);
	}

	// Append notification to body
	this.$.appendTo($notify);

	// Events
	this.$.on('click', self.close);

	// Timeout
	if(options.time) {
		setTimeout(self.close, options.time);
	}

}

var teste1 = new notify({
	msg: 'Loren ipsum sit dolor omet 1',
	time: 3000
});
teste1.open();

var teste2 = new notify({
	msg: 'Loren ipsum sit dolor omet 2',
	time: 4000
});
teste2.open();
