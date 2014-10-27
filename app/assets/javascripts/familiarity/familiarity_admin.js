jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) {
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};
var familiarityEditorialSet = {};
function findOrBuildPopup(selection_path, inner_text) {
    if (typeof(inner_text) == 'undefined') {
        inner_text = "";
    }
    var _div = familiarityEditorialSet[selection_path];
    if (_div == null) {
        var _div = $('<div class="familiarityPopUpEdit" style="z-index: 20;position: absolute;left: 0;top: 0;display: none"><textarea placeholder="Short sweet tutorial goes in here."></textarea><br/><a>Close</a></div>');

        //Adding 'Close' handler
        _div.children('a').click(function () {
            $(this).parents('div.familiarityPopUpEdit').hide();
        });
        //Populating textarea
        _div.children('textarea').val(inner_text);

        familiarityEditorialSet[selection_path] = _div;

        _div.appendTo($('body'));
    }
    $.each(familiarityEditorialSet, function (k, v) {
        v.hide();
    });

    return _div;
}
function startFamiliarizing() {
//    $('body *').hover(function (e) {
    $('.familiarityTag').bind("mouseenter.myFamiliarity",function (e) {
        var _this = $(this);
        var currentSelectionPath = _this.getPath();
        console.log(currentSelectionPath);
        _this.addClass('familiar-selector');
        _this.parents().removeClass('familiar-selector');

        e.stopImmediatePropagation();
    }).bind("mouseleave.myFamiliarity",function (e) {
            var _this = $(this);
            var currentSelectionPath = _this.getPath();
            _this.removeClass('familiar-selector');

            e.stopImmediatePropagation();
        }).bind("click.myFamiliarity", function (e) {
            var _this = $(this);
            var currentSelectionPath = _this.getPath();

            var _left_position = _this.position().left;
            var _top_position = _this.position().top + _this.height();

            var _div = findOrBuildPopup(currentSelectionPath).css({left: _left_position, top: _top_position}).show();

            console.log(_this);
            e.preventDefault();
            e.stopPropagation();
        });
}
function stopFamiliarizing() {
    $('.familiarityTag').unbind('.myFamiliarity');
}
function saveToBackEnd() {
    var _result_hash = {}
    $.each(familiarityEditorialSet, function (k, v) {
        if (v.children('textarea').val().trim().length > 0) {
            _result_hash[k] = v.children('textarea').val();
        }
    })
    console.log(_result_hash);
    jQuery.post('/familiarity/familiarities/save', {from_page: $(location).attr('pathname'), 'familiarity_hash': _result_hash});
}
function familiaritySwitch(familiarity_switch) {
    if (familiarity_switch == "Off") {
        stopFamiliarizing();
        $('.familiarityPopUpEdit').hide();
        if (confirm("Do you want to save the collected familiarity data?")) {
            saveToBackEnd();
        }
    }
    $.each($('body *:not(.familiaritySwitch, .familiarityPopUpEdit)'), function (i, e) {
        if (familiarity_switch == "On") {
            if ($(e).parents('.familiarityPopUpEdit').length <= 0) {
                $(e).addClass('familiarityTag');
            }
        } else {
            $(e).removeClass('familiarityTag');
        }
    });
    if (familiarity_switch == "On") {
        startFamiliarizing();
        $.get("/familiarity/familiarities.json", function (data) {
            familiarity_hash = data[$(location).attr('pathname')]
            if (familiarity_hash == null) {
                familiarity_hash = {}
            }
            $.each(familiarity_hash, function (k, v) {
                findOrBuildPopup(k, v);
            });
        });
    }
}

function familiaritySwitchBoard() {
    var familiaritySwitched = 'On';
    var _div = $('<div class="familiaritySwitch"></div>');
    _div.text('Switch ' + familiaritySwitched + ' familiarity!');
    _div.click(function () {
        familiaritySwitch(familiaritySwitched);
        familiaritySwitched = (familiaritySwitched == "On") ? "Off" : "On";
        $(this).text('Switch ' + familiaritySwitched + ' familiarity!');
    });
    _div.appendTo($('body'));
}
$(document).on("page:change", familiaritySwitchBoard);
