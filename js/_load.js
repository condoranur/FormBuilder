/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function check_var (element) {
    if (
            element === ""          ||
            element === 0           ||
            element === "0"         ||
            element === null        ||
            element === "NULL"      ||
            element === undefined   ||
            element === false
        ) {
        return true;
    }
    if (typeof(element) === 'object') {
        var i = 0;
        for (key in element) {
            i++;
        }
        if (i === 0) { return true; }
    }
    return false;
}
function builder_set_settings(div_name,defEl){
    var label=defEl.childNodes[0];
    var htmOb =defEl;
    var options = {
        insert:'insert',
        insertClass:'insert',
        objects:[
            {type:'cssvalue',typeClass:'cssvalue',html:'<input  class="cssvalue" type="text" '},
            {type:'eventsvalue',typeClass:'eventsvalue',html:'<input class="eventsvalue" type="text"'},
            {type:'namevalue',typeClass:'namevalue',html:'<input class="namevalue" type="text" '},
            {type:'valvalue',typeClass:'valvalue',html:'<input class="valvalue" type="text" '},
            {type:'labelvalue',typeClass:'labelvalue',html:'<input class="labelvalue" type="text" ',val:label},
            {type:'idvalue',typeClass:'idvalue',html:'<input class="namevalue" type="text" '}
            ]
    }
    
    function get_html (options){
        var total_htm=options.objects.length;
        var i=0;
        var htm='';
        var htmlstr='';
        for (i=0;i<=total_htm-1;i++){
           htmlstr=''; 
           htmlstr=options.objects[i].html;
           if  (!check_var(options.objects[i].val)){
               
               htmlstr=htmlstr+'value="'+options.objects[i].val+'"';
           }
           htmlstr=htmlstr+'/>';
           htm=htm+'<div class="'+options.objects[i].typeClass
               +'"> '+htmlstr
               +'<a href="#" class="'
               +options.objects[i].typeClass+'">'
               +options.objects[i].type+'</a></div>'; 
           htmlstr='';
        }
        return htm;
    }
    $(div_name).append(get_html(options));
}

function build_inteface(div_name){
    
    var options = {
        insert:'insert',
        insertClass:'insert',
        objects:[
            {type:'text',typeClass:'sample',html:'<input  class="el" type="text" />'},
            {type:'checbox',typeClass:'sample multi',html:'<input class="el" type="checkbox" />'},
            {type:'radio',typeClass:'sample multi',html:'<input class="el" type="radio" />'},
            {type:'textarea',typeClass:'sample multi',html:'<textarea class="el"></textarea>'}
            ]
    }
    
    function get_html (options){
        var total_htm=options.objects.length;
        var i=0;
        var htm='';
        for (i=0;i<=total_htm-1;i++){
           htm=htm+'<div class="'+options.objects[i].typeClass
               +'"> '+options.objects[i].html
               +'<a href="#" class="'+options.insertClass+'">'+options.insert+'</a></div>'; 
        }
        return htm;
    }
    $(div_name).append(get_html(options));
}

$(document).ready(function(){
     //$.noConflict();
    
    $('label').click(function (){
        alert("Handler for .click() called.");
        alert ('click'+this);
    });
    $('p.tm').click(function (){
        alert("Handler for .click() called.");
        alert ('click'+this);
    });
        var empty = true;
        $('div.ctrlHolder').click(function(){
            var templ=this ;
            alert(templ);
				});//	$('.ctrlHolder').click
        $('.addAction').click(function() {
          var template = $(this).attr("id").replace(/^add/, '#template');
          //alert(template);
          if(empty) {
            $('#previewFormHolder fieldset').html($(template).html());
            $("#codePreview").val($("#previewFormHolder").html());
            empty = false;
          } else {
            $('#previewFormHolder fieldset').append($(template).html());
            $("#codePreview").val($("#previewFormHolder").html());
          }
        });// $('.addAction').click

        $('#viewToggle').click(function() {
          $("#codeFormHolder").toggle();
          $("#previewFormHolder").toggle();
          if( $(this).html() == "grab the code") {
            $(this).html("back to preview");
            $("#codePreview").val($("#previewFormHolder").html());
          } else if($(this).html() == "back to preview") {
            $(this).html("grab the code");
            $("#previewFormHolder").html($("#codePreview").val());
          }
        });// $('#viewToggle').click
        
        $("#showDefault, #showInline").click(function() {
          $("#showDefault, #showInline").each(function() {$(this).toggleClass("active");});
          
          if ($(this).attr('id') == "showInline") {
            $(".uniForm fieldset").addClass("inlineLabels");
          } else {
            $(".uniForm fieldset").removeClass("inlineLabels");
          }
          
          $("#codePreview").val($("#previewFormHolder").html());
          return false;
        });//$("#showDefault, #showInline").click
        
        
        
$('.insert').click(function() {
        el = $(this).siblings('.el').clone();
        tag = $(this).siblings('.el').get(0).nodeName.toLowerCase();
        var i = 0,
            num = 1,
            group;
        if ( $(this).parent().hasClass('multi') ) {
            num = prompt( 'how many?', 1);
            group = prompt( 'Group name' );
            group = '<label class="group">'+group+'</label>';
        }
        
        $('#canvas').append('<p class="tm"></p>');
        $('p.tm').prepend( group );
        while (i < num) {
            label = prompt('label');
            if (label == '' || label == null ) {
                $('p.tm').remove();
                break;
            }
            el.appendTo('p.tm').wrap('<label>'+label+'</label>');
            el = el.clone();
            i++;
        }
        //alert( tag );
        //$('p.tm').removeClass('tm');
    });
    $('#save').click( function() {
        $('#output').html( $('#canvas').html() ).show();
        return false;
    });
    
    $('#canvas p').live('click', function() {
       alert(this);
       builder_set_settings('#settings',this);
    });
    //$('#canvas').sortable();
      });
      
      
 