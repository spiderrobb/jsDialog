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
	var style = args['style'] || 'default';
	// getting width of dialog
	var width = args['width'] || '800px';
	// getting shadow close option
	var shadow_close = false;
	if (typeof args['shadow_close'] != 'undefined') {
		shadow_close = args['shadow_close'];
	}
	// getting on close event
	var onClose = args['onClose'] || null;
	// getting content
	var htmlContent = 'No content';
	if (args['content']) {
		htmlContent = args['content'];
	}
	
	// disabling scrollin on document body
	document.body.style.overflow = 'hidden';
	
	// building elements
	this.elements = {
		shadow:     document.createElement('div'),
		container:  document.createElement('div'),
		title_bar:  document.createElement('div'),
		title_text: document.createElement('span'),
		close:      document.createElement('a'),
		content:    document.createElement('div')
	};
	
	// building close function
	var dialog = this;
	var close_function = function(e) {
		// checking if the correct element has been clicked
		if (e.target == dialog.elements.close
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
			if (dialog.onClose) {
				dialog.onClose(e);
			}
		}
	};
	
	// building dialog shadow
	var shadow = this.elements.shadow;
	shadow.id = 'jsDialog_shadow_'+jsDialog.count;
	shadow.className = 'jsDialog_shadow-'+style;
	shadow.onclick = close_function;
	document.body.appendChild(shadow);
	
	// building dialog container
	var container = this.elements.container;
	container.id = 'jsDialog_container_'+jsDialog.count;
	container.className = 'jsDialog_container-'+style;
	container.style.width = width;
	shadow.appendChild(container);
	
	// building dialog title bar
	var title_bar = this.elements.title_bar;
	title_bar.id = 'jsDialog_titlebar_'+jsDialog.count;
	title_bar.className = 'jsDialog_titlebar-'+style;
	container.appendChild(title_bar);
	
	// building dialog title text
	var title_text = this.elements.title_text;
	title_text.id = 'jsDialog_titletext_'+jsDialog.count;
	title_text.className = 'jsDialog_titletext-'+style;
	title_text.innerHTML = title;
	title_bar.appendChild(title_text);

	// building close button for dialog
	var close = this.elements.close;
	close.id = 'jsDialog_close_'+jsDialog.count;
	close.className = 'jsDialog_close-'+style;
	title_bar.appendChild(close);

	// building content
	var content = this.elements.content;
	content.id = 'jsDialog_content_'+jsDialog.count;
	content.className = 'jsDialog_content-'+style;
	content.innerHTML = htmlContent;
	container.appendChild(content);
}