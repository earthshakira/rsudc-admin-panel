$(".info-box-minimise").click(function(){
  if($(this).attr("data-visible")=="true"){
    $(this).attr("data-visible","false");
    $(this).parent().parent().children('.info-box-content').slideUp('slow');;
    $(this).html('<i class="glyphicon glyphicon-plus"></i>');
  }else{
    $(this).attr("data-visible","true");
    $(this).html('<i class="glyphicon glyphicon-minus"></i>');
    $(this).parent().parent().children('.info-box-content').slideDown('slow');;
  }
});

function addprogressbar(wrapper,filename,progressid,addition){
  var htmlString='<div class="fileuploadbar" id="'+progressid+'"><div class="label"><span class="text-primary">'+filename+'<span></div><div class="progress"><div class="progress-bar" role="progressbar"></div></div></div>';
  if(addition){
      $(wrapper).html($(wrapper).html()+htmlString);
  }
  else{
    $(wrapper).html(htmlString);
  }

}
