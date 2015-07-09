var autoSaveCache       = {}
    ,autoSave           = {};


var submit = function() {
    var route = ''
}

$("#canvas").on('keydown, keyup', function() {
    var content = marked($(this).val());
    $('#canvas-output').html(content)
});
//
// $('#my-form').submit(function(e){
//     e.preventDefault();
//     $('#my-form').children()[0].each(function(el, i) {
//         console.log(el)
//         console.log(i)
//     });
// });

$('.toggle-view').click(function(){
    var active      = $('.tab.active')
    ,inactive       = $('.tab:not(.active)');

    active.fadeOut('fast', function(){
        active.removeClass('active');
        inactive.fadeIn('fast');
        inactive.addClass('active');
    });

    return false;
});
