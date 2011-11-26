#jQuery Multiselect Plugin

This is a jquery plugin which makes multi select input fields more usable.

Inspired by [this plugin](http://quasipartikel.at/multiselect) I have written an own version.

Just embed [jquery](http://www.jquery.org), this plugin and the CSS stylesheet and apply to the SELECTs you want to enhance. Of course you are encouraged to adjust the stylesheet to suit your needs.

### Options

~~~javascript
$('select.multi').multiselect({
		animation_speed' 	: 200,
		'selected_heading' 	: 'Selected Options',
		'available_heading'	: 'Available Options',
		'select_all' 		: 'select all',
		'unselect_all'		: 'unselect all',
		'sorted'			: true
});
~~~

<dl>
<dt>animation_speed</dt>
<dd>0 = no animation</dd>
<dt>selected_heading, available_heading</dt>
<dd>Heading texts, pass `false` for no headings
<dt>select_add, unselect_all</dt>
<dd>Text for "select all" / "unselect all" links; Pass false for no linke</dd>
<dt>sorted</dt>
<dd>If set to true, the options are sorted alphabetically</dd>
</dl>

