function jsDialog(args){
	// building dialog id
	if (jsDialog.count) {
		jsDialog.count++;
	} else {
		jsDialog.count = 1;
	}
	// getting args
	args = args || {};
	// getting dialog title
	var title = args['title'] || '';
	// getting dialog style
	var theme = args['theme'] || 'default';
	// getting width of dialog
	var width = args['width'] || '800px';
	// getting height of dialog
	var height = false;
	if (args['height']) {
		height = args['height'];
	}
	// getting shadow close option
	var shadow_close = false;
	if (typeof args['shadow_close'] != 'undefined') {
		shadow_close = args['shadow_close'];
	}
	// getting events
	var onclose = args['onclose'] || null;
	var onload  = args['onload']  || null;
	
	// disabling scrollin on document body
	document.body.style.overflow = 'hidden';
	
	// building elements
	this.elements = {
		shadow:     document.createElement('div'),
		container:  document.createElement('div'),
		title_bar:  document.createElement('div'),
		title_text: document.createElement('span'),
		close:      document.createElement('a')
	};
	if (typeof args['url'] != 'undefined') {
		this.elements['content'] = document.createElement('iframe');
		this.elements['content'].setAttribute('src', args['url']);
		if (onload) {
			this.elements['content'].onload = onload;
		}
	} else {
		this.elements['content'] = document.createElement('div');
	}
	
	// applying any custom style
	var dialog = this;
	if (typeof args['style'] != 'undefined') {
		Object.keys(this.elements).forEach(function(element){
			if (typeof args['style'][element] != 'undefined') {
				Object.keys(args['style'][element]).forEach(function(style){
					dialog.elements[element].style[style] = args['style'][element][style];
				});
			}
		});
	}
	
	// building close function
	this.close = function(e) {
		// checking if the correct element has been clicked
		if (!e
			|| e.target == dialog.elements.close
			|| e.target == dialog.elements.shadow
			&& shadow_close
		) {
			// removing dialog
			dialog.elements.shadow.parentNode.removeChild(
				dialog.elements.shadow
			);
			// decrementing dialog counter
			jsDialog.count--;
			// if jsDialog counter is 0 enable body scrolling
			document.body.style.overflow = 'auto';
			// invoking onClose event
			if (onclose) {
				onclose(e);
			}
		}
	};
	
	// building dialog shadow
	var shadow = this.elements.shadow;
	shadow.id = 'jsDialog_shadow_'+jsDialog.count;
	shadow.className = 'jsDialog_shadow-'+theme;
	shadow.onclick = this.close;
	document.body.appendChild(shadow);
	
	// building dialog container
	var container = this.elements.container;
	container.id = 'jsDialog_container_'+jsDialog.count;
	container.className = 'jsDialog_container-'+theme;
	shadow.appendChild(container);
	
	// building dialog title bar
	var title_bar = this.elements.title_bar;
	title_bar.id = 'jsDialog_titlebar_'+jsDialog.count;
	title_bar.className = 'jsDialog_titlebar-'+theme;
	container.appendChild(title_bar);
	
	// building dialog title text
	var title_text = this.elements.title_text;
	title_text.id = 'jsDialog_titletext_'+jsDialog.count;
	title_text.className = 'jsDialog_titletext-'+theme;
	title_text.innerHTML = title;
	title_bar.appendChild(title_text);

	// building close button for dialog
	var close = this.elements.close;
	close.id = 'jsDialog_close_'+jsDialog.count;
	close.className = 'jsDialog_close-'+theme;
	title_bar.appendChild(close);

	// building content
	var content = this.elements.content;
	content.id = 'jsDialog_content_'+jsDialog.count;
	content.className = 'jsDialog_content-'+theme;
	// setting content of dialog
	if (typeof args['content'] == 'object') {
		content.appendChild(args['content']);
	} else if (typeof args['content'] == 'string') {
		content.innerHTML = args['content'];
	} else {
		content.innerHTML = 'No Content.';
	}
	// setting hight of content if specified
	if (height !== false) {
		content.style.height = height;
	}
	content.style.width = width;
	
	container.appendChild(content);
}