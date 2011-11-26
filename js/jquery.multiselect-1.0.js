;(function($){
	jQuery.fn.multiselect = function(arg){
		var options = $.extend({}, $.fn.multiselect.defaults, arg);
		var uid = 0;
		
		return this.each(function(){
			var select = $(this);

			uid++;
			var container = $('<div class="multiselect" id="multiselect_' + uid + '"></div>');
			var sel_div = $('<div class="multiselect-selected"></div>');
			var avl_div = $('<div class="multiselect-available"></div>');
			var sel_ul = $('<ul></ul>');
			var avl_ul = $('<ul></ul>');

			sel_div.append(sel_ul);
			avl_div.append(avl_ul);
			container.append(sel_div);
			container.append(avl_div);

			var udata = {
				select : select,
				sel_ul : sel_ul,
				avl_ul : avl_ul,
				options : options
			};

			if (options.selected_heading){
				$("<h4>" + options.selected_heading + "</h4>").insertBefore(sel_ul);
			}
			if (options.available_heading){
				$("<h4>" + options.available_heading + "</h4>").insertBefore(avl_ul);
			}
			if (options.select_all){
				$('<a class="multiselect-select-all-link" href="#">' + options.select_all + '</a>').insertAfter(avl_ul).click(udata, select_all);
			}
			if (options.unselect_all){
				$('<a class="multiselect-unselect-all-link" href="#">' + options.unselect_all + '</a>').insertAfter(sel_ul).click(udata, unselect_all);
			}

			
			select.hide();
			container.insertAfter(select);

			select.children('option').each(function(){
				var text = $(this).text();
				var li_elem = $('<li><a href="#">' + text + '</a></li>');
				li_elem.attr('id', 'multiselect-value_' + $(this).val()).appendTo($(this).attr('selected') ? sel_ul : avl_ul);
				li_elem.click(udata, onclick);
			});

			if (options.sorted){
				sort_list(sel_ul);
				sort_list(avl_ul);
			}
		});
	};

	function onclick(d){
		var options = d.data.options;
		var sel_ul = d.data.sel_ul;
		var avl_ul = d.data.avl_ul;

		var elem_id = $(this).attr('id');
		var value = elem_id.match(/multiselect-value_(.*)/)[1];
		var clone = $(this).clone(true);
		var option = $(this).parents('div.multiselect').prev('select').find("option[value='" + value + "']");

		d.preventDefault();

		$(this).slideUp(options.animation_speed, function(){
			$(this).remove();
		});

		if (option.attr('selected')){
			option.attr('selected', false);
			target = avl_ul;
		}
		else {
			option.attr('selected', true);
			target = sel_ul;
		}

		if (target.children('li#' + elem_id).length == 0){
			if (options.sorted){
				clone.hide();
				insert_sorted(target, clone);
				clone.slideDown(options.animation_speed);
			}
			else {
				clone.hide().appendTo(target).slideDown(options.animation_speed);
			}
		}
		return (false);
	}

	function select_all(d){
		d.preventDefault();
		d.data.select.children('option').each(function(){
			$(this).attr('selected', true);
		});
		d.data.avl_ul.children('li').each(function(){
			if (d.data.options.sorted){
				insert_sorted(d.data.sel_ul, $(this));
			}
			else {
				$(this).appendTo(d.data.sel_ul);
			}
		});
	}

	function unselect_all(d){
		d.preventDefault();
		d.data.select.children('option').each(function(){
			$(this).attr('selected', false);
		});
		d.data.sel_ul.children('li').each(function(){
			if (d.data.options.sorted){
				insert_sorted(d.data.avl_ul, $(this));
			}
			else {
				$(this).appendTo(d.data.avl_ul);
			}
		});
	}

	function insert_sorted(list, el){
		var text = $(el).text();
		//~ console.log('inserting ' + text);
		var flag = false;
		$(list).children('li').each(function(){
			//~ console.log('testing against ' + $(this).text());
			
			if ($(this).text().localeCompare(text) >= 0){
				$(this).before(el);
				flag = true;
				return (false);
			}
		});
		if (!flag){
			el.appendTo(list);
		}
	}

	function swap(el){
		var el2 = el.next();
		var clone1 = el.clone(true);
		var clone2 = el.next().clone(true);
		el.replaceWith(clone2);
		el2.replaceWith(clone1);
	}

	function sort_list(list){
		var n = list.children('li').length;
		var flag;

		do {
			flag = false;
			for (var j = 1; j < n; j++){
				var i = j - 1;
				s1 = list.children('li').eq(i).text();
				s2 = list.children('li').eq(i + 1).text();
				if (s2.localeCompare(s1) < 0){
					swap(list.children('li').eq(i));
					flag = true;
				}
			}
		} while ((flag == true) && (--n > 0));
		return;

		
		var new_list = $('<ul></ul>');
		list.children('li').each(function(){
			insert_sorted(new_list, $(this));
		});
		list.replaceWith(new_list);
		return (new_list);
	}

	$.fn.multiselect.defaults = {
		animation_speed : 150,
		selected_heading : 'Selected Options',
		available_heading : 'Available Options',
		select_all : 'select all',
		unselect_all : 'unselect_all',
		sorted : true
	};
})(jQuery);
	
