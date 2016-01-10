var progressid=0;
var warningtext=0;
var maxfilesize=524288000;
var mbsize=maxfilesize/1024/1024;
var uploaddebug=false;
var loaderdisplay=0;
var sliderBusy=0;
$( document ).ajaxStart(function(){
  if(!loaderdisplay)$("#ajaxloader").css("display","block");
    loaderdisplay++;
});
$( document ).ajaxStop(function(){
  $('[data-toggle="tooltip"]').tooltip({container: "body"});
  loaderdisplay--;
  console.log("req received");
  if(!loaderdisplay)$("#ajaxloader").css("display","none");
});
function urlfriendly(x){
  while(x.indexOf(" ")>-1)
  {
    x=x.replace(" ","%20");
  }
  return x;
}
function fileupload(formdata,barid,phpname,warnings,successfunction,args){
  var ajax = new XMLHttpRequest();
  	ajax.upload.addEventListener("progress", function(event){
      var percent = (event.loaded / event.total) * 100;
      $("#"+barid).children(".progress").children(".progress-bar").css("width",Math.round(percent)+"%");
    }, false);
  	ajax.addEventListener("load",function(event){
      if(uploaddebug)alert(event.target.responseText);
      var x=JSON.parse(event.target.responseText);
      if(x.status)
      {$("#"+barid).children(".label").children("span").append("<i class='glyphicon glyphicon-ok'></i>");
      $("#"+barid).children(".label").children("span").css("color","#2ecc71");
      setTimeout(function(){
        $("#"+barid).css("opacity",0);
      },100);
      setTimeout(function(){
        $("#"+barid).slideUp("slow");
        window[successfunction](args);
      },100);
    }else {
      $("#"+barid).css("opacity",0);
      $("#"+warnings).html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+x.message+"<p>");
      $("#"+barid).slideUp("slow");
    }
    }, false);
  	ajax.addEventListener("error",function(event){
      $("#"+barid).css("opacity",0);
      $("#"+warnings).html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+formdata.get("file1").name+" upload error<p>");
      $("#"+barid).slideUp("slow");
    }, false);
  	ajax.addEventListener("abort",function(event){
      $("#"+barid).css("opacity",0);
      $("#"+warnings).html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+formdata.get("file1").name+" upload aborted<p>");
      $("#"+barid).slideUp("slow");
    }, false);
  	ajax.open("POST", phpname);
  	ajax.send(formdata);
}

function formupload(formdata,phpname,successfunction,args){
    var ajax = new XMLHttpRequest();

    ajax.addEventListener("load",function(event){
      //alert(event.target.responseText);
      var x=JSON.parse(event.target.responseText);
      if(x.status)
      {
      window[successfunction](args);
    }else{
        alert("failure");
    }
    }, false);
    ajax.open("POST", phpname);
    ajax.send(formdata);
}

$("#frontcarouselimgupload").on("click",function(){
  $("#upload-warnings").html("");
  var file=$("#newimage").prop('files');
  var title=$("#newimagetitle").val();
  var caption=$("#newimagecaption").val();
  $("#newimagecaption").val("");
  $("#newimagetitle").val("");
  for(var i=0;i<file.length;i++){
    //alert(file[i].type);
    if(file[i].size<maxfilesize&&file[i].type.indexOf("image")>-1){
      var formdata=new FormData();
      if(title)formdata.append("title",title);
      if(caption)formdata.append("caption",caption);
      formdata.append("file",file[i]);
      formdata.append("path","../data/frontcarousel/");
      addprogressbar("#upload-meta",file[i].name,"progressbar"+progressid,true);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_gallery.php","upload-warnings","viewGallery",null);
    }
    else if(file[i].size<maxfilesize){
      $("#upload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" exceeds max upload size of "+mbsize+"MB<p>");
    }
    else{
      $("#upload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" not an image!!!<p>");
    }
  }
    $("#newimage").val("");
});

function tableprint(heads,width,defs,type,data,slug,extra,classes){
  var htmlString="<div>";
    htmlString+="<table><tr>";
    for(var i=0;i<heads.length;i++){
      htmlString+="<th>"+heads[i]+"</th>";
    }
    htmlString+="</tr>";
    for(var j=0;j<data.length;j++){
      htmlString+="<tr>";
      for(var i=0;i<defs.length;i++){
        htmlString+="<td style=\"width:"+width[i]+"\">";
        if(data[j][defs[i]]||type[i]=="input"||type[i]=="textarea"){
          if(type[i]=="image"){
            htmlString+="<img style=\"width:100%\" src=\""+data[j][defs[i]]+"\" />";
          }else if(type[i]=="text"){
            htmlString+="<p>"+data[j][defs[i]]+"</p>";
          }else if(type[i]=="input"){
            htmlString+="<input id=\""+slug+"input"+data[j]["id"]+"\" DISABLED type=\"text\" value=\""+data[j][defs[i]]+"\"class=\"form-control\" placeholder=\""+defs[i]+"\"></input>";
          }else if(type[i]=="textarea"){
            htmlString+="<textarea id=\""+slug+"text"+data[j]["id"]+"\" DISABLED type=\"text\" class=\"form-control\" placeholder=\""+defs[i]+"\">"+data[j][defs[i]]+"</textarea>";
          }else{
            htmlString+=data[j][defs[i]];
          }
        }else {
          htmlString+="-";
        }
      htmlString+="</td>";
      }
      htmlString+="<td>";

      htmlString+="<div"
      for(var k=0;k<defs.length;k++){
      htmlString+=" data-"+defs[k]+"=\""+data[j][defs[k]]+"\"";
      }
      htmlString+=" id=\""+slug+data[j]["id"]+"\" class=\""+classes+"\">"+extra+"</div>";
      htmlString+="</td>";
      htmlString+="</tr>";
    }
  return htmlString+"</table></div>";
}

function carouselModalCleanup(which){
  if(which=="gallery")viewGallery();
  else viewCarouselActive();
  $("#carousalmodalwarnings").html("");
  $("#carousalmodalprogress").html("");
  $("#modalnewimagetitle").val("");
  $("#modalnewimagecaption").val("");
  $("#modalfileuploader").val("");
  document.getElementById('carousalmodalprogress').innerHTML="";
  $("#frontcarouselmodal").modal('hide');
  //$("#carousalmodalprogress").html("");
}

function viewGallery(){
  $.getJSON( "./get_carousel_gallery.php", function( data ) {
    if(data.length==0){
      $("#carouselgallery").html("");
      return;
    }
     var heads=["Thumbnail","Title","Caption","Actions"];
     var widths=["5%","25%","40%","20%"];
     var defs=["path","title","caption"];
     var type=["image","text","text","controls"];
     var extra="<i class=\"glyphicon glyphicon-plus\"></i><i class=\"glyphicon glyphicon-pencil\"></i><i class=\"glyphicon glyphicon-remove\"></i><div class=\"delete-confirm\" style=\"display:none;\"><div style=\"font-size:8px;\" class=\"btn btn-danger\">Confirm</div><div style=\"font-size:8px;margin-left:10px\" class=\"btn btn-primary\">Cancel</div></div>";
     var htmlString=tableprint(heads,widths,defs,type,data,"gallery",extra,"gallery-controls");
    $("#carouselgallery").html(htmlString);
    $(".gallery-controls .glyphicon-remove").click(function(){
        var id=$(this).parent().attr("id");
        $(this).hide();
        $(this).parent().children('.delete-confirm').slideDown("slow");
    });

    $(".gallery-controls .delete-confirm .btn-primary").click(function(){
      $(this).parent().slideUp("slow");
      $(this).parent().parent().children('.glyphicon-remove').show();
    });
    $("#carouselgallery .gallery-controls .delete-confirm .btn-danger").click(function(){
      var id=$(this).parent().parent().attr("id");
      id=id.substring(7);
      var x=$(this).parent().parent().parent().parent();
      $.getJSON("./carousel_gallery_delete.php?id="+id,function(data){
        if(data.status)
        {
          x.hide(500);
          setTimeout(function(){
            viewGallery();
          },500);
        }
        else{
          x.css("background-color","#e74c3c");
          x.css("opacity","0.4");
        }
      });
    });

    $("#carouselgallery .gallery-controls .glyphicon-pencil").click(function(){
      $("#carouselmodalthumbnail").attr("src",$(this).parent().attr("data-path"));

      if($(this).parent().attr("data-title")!="null")$("#modalnewimagetitle").val($(this).parent().attr("data-title"));
      if($(this).parent().attr("data-caption")!="null")$("#modalnewimagecaption").val($(this).parent().attr("data-caption"));
      var id=$(this).parent().attr("id").substring(7);
      $("#frontcarouselmodal").attr("data-id",id);
      $("#frontcarouselmodal").modal();
      $("#carouselmodalsubmit").click(function(){

          var formdata=new FormData();
          formdata.append("path","../data/frontcarousel/");
          var file=$("#modalfileuploader").prop('files');
          var title=$("#modalnewimagetitle").val();
          var caption=$("#modalnewimagecaption").val();
          var id=$("#frontcarouselmodal").attr("data-id");
          formdata.append("postid",id);
          if(title)formdata.append("title",title);
          if(caption)formdata.append("caption",caption);
          if(file.length){
          formdata.append("file",file[0]);
          addprogressbar("#carousalmodalprogress",file[0].name,"carousalmodalprogressbar",false);
          fileupload(formdata,"carousalmodalprogressbar","edit_carousel_gallery.php","carouselmodalwarnings","carouselModalCleanup","gallery");
          }
          else{
            formupload(formdata,"edit_carousel_gallery.php","carouselModalCleanup","gallery");
          }


      });

    });

    $(".gallery-controls .glyphicon-plus").click(function(){

      var id=$(this).parent().attr("id");
      id=id.substring(7);
      $.getJSON("./carousel_active_make_active.php?id="+id,function(data){
        //alert(JSON.stringify(data));
        if(data.status)
        {
          viewCarouselActive();
          viewGallery();
        }
        else{
          x.css("background-color","#e74c3c");
          x.css("opacity","0.4");
        }
      });
    });
});
}

function viewCarouselActive(){
  $.getJSON( "./get_carousel_active.php", function( data ) {
    if(data.length==0){
      $("#carouselactivegallery").html("");
      return;
    }
     var heads=["Thumbnail","Title","Caption","Actions"];
     var widths=["5%","25%","40%","20%"];
     var defs=["path","title","caption"];
     var type=["image","text","text","controls"];
     var extra="<i class=\"glyphicon glyphicon-minus\"></i><i class=\"glyphicon glyphicon-pencil\"></i><i class=\"glyphicon glyphicon-remove\"></i><div class=\"delete-confirm\" style=\"display:none;\"><div style=\"font-size:8px;\" class=\"btn btn-danger\">Confirm</div><div style=\"font-size:8px;margin-left:10px\" class=\"btn btn-primary\">Cancel</div></div>";
     var htmlString=tableprint(heads,widths,defs,type,data,"gallery",extra,"gallery-controls");
    $("#carouselactivegallery").html(htmlString);
    $(".gallery-controls .glyphicon-remove").click(function(){
        var id=$(this).parent().attr("id");
        $(this).hide();
        $(this).parent().children('.delete-confirm').slideDown("slow");
    });

    $(".gallery-controls .delete-confirm .btn-primary").click(function(){
      $(this).parent().slideUp("slow");
      $(this).parent().parent().children('.glyphicon-remove').show();
    });
    $("#carouselactivegallery .gallery-controls .delete-confirm .btn-danger").click(function(){
      var id=$(this).parent().parent().attr("id");
      id=id.substring(7);
      var x=$(this).parent().parent().parent().parent();
      $.getJSON("./carousel_active_delete.php?id="+id,function(data){
        if(data.status)
        {
          x.hide(500);
          setTimeout(function(){
            viewCarouselActive();
            viewGallery();
          },500);
        }
        else{
          x.css("background-color","#e74c3c");
          x.css("opacity","0.4");
        }
      });
    });

    $("#carouselactivegallery .gallery-controls .glyphicon-pencil").click(function(){
      $("#carouselmodalthumbnail").attr("src",$(this).parent().attr("data-path"));

      if($(this).parent().attr("data-title")!="null")$("#modalnewimagetitle").val($(this).parent().attr("data-title"));
      if($(this).parent().attr("data-caption")!="null")$("#modalnewimagecaption").val($(this).parent().attr("data-caption"));
      var id=$(this).parent().attr("id").substring(7);
      $("#frontcarouselmodal").attr("data-id",id);
      $("#frontcarouselmodal").modal();
      $("#carouselmodalsubmit").click(function(){

          var formdata=new FormData();
          formdata.append("path","../data/frontcarousel/");
          var file=$("#modalfileuploader").prop('files');
          var title=$("#modalnewimagetitle").val();
          var caption=$("#modalnewimagecaption").val();
          var id=$("#frontcarouselmodal").attr("data-id");
          formdata.append("postid",id);
          if(title)formdata.append("title",title);
          if(caption)formdata.append("caption",caption);
          if(file.length){formdata.append("file",file[0]);
          addprogressbar("#carousalmodalprogress",file[0].name,"carousalmodalprogressbar",false);
          fileupload(formdata,"carousalmodalprogressbar","edit_carousel_active.php","carouselmodalwarnings","carouselModalCleanup","active");
          }else{
            formupload(formdata,"edit_carousel_active.php","carouselModalCleanup","active");
          }
      });

    });

    $(".gallery-controls .glyphicon-minus").click(function(){
      var id=$(this).parent().attr("id");
      id=id.substring(7);
      //alert(id);
      $.getJSON("./carousel_gallery_remove_active.php?id="+id,function(data){
        //alert(JSON.stringify(data));
        if(data.status)
        {
          viewCarouselActive();
          viewGallery();
        }
        else{
          x.css("background-color","#e74c3c");
          x.css("opacity","0.4");
        }
      });
    });
});
}

function viewntsPeople(){
  $.getJSON("./getntsfaculty.php",function(data){
    var heads=["Name","Actions"];
    var widths=["80%","20%"];
    var defs=["name"];
    var type=["input","controls"];
    var extra="<i class=\"glyphicon glyphicon-remove\"></i><i class=\"glyphicon glyphicon-pencil\"></i>";
    var htmlString=tableprint(heads,widths,defs,type,data,"ntsfaculty",extra,"ntsfaculty-controls");
   $("#ntspeopledisplayer").html(htmlString);
   $(".ntsfaculty-controls .glyphicon-pencil").click(function(){
     var field=$(this).parent().attr("id");
     field=field.substring(0,10)+"input"+field.substring(10);
     $("#"+field).prop('disabled', false);

     $("#"+field).keyup(function(e){
         var code = e.which; // recommended to use e.which, it's normalized across browsers
         if(code==13){
           e.preventDefault();
           if($(this).val()){
             var x=urlfriendly($(this).val());
             var id=this.id.substring(15);

             $.getJSON("./editntsfaculty.php?id="+id+"&name="+x,function(data){
               if(data.status)
               {
                 viewntsPeople();
                 $("#"+field).prop('disabled', true);
               }
             });
           }
         }
     });

   });

    $(".ntsfaculty-controls .glyphicon-remove").click(function(){
        var id=$(this).parent().attr("id").substring(10);
        var x=$(this).parent();
        //
      $.getJSON("./deletentsfaculty.php?id="+id,function(data){
          x.parent().parent().hide(400);
       });
    });

  });
}

$("#ntsfacultyinfo").keyup(function(e){
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==13){
      e.preventDefault();
      if($("#ntsfacultyinfo").val()){
        var x=urlfriendly($("#ntsfacultyinfo").val());
        $.getJSON("./addntsfaculty.php?name="+x,function(data){
          if(data.status)
          {
            viewntsPeople();
            $("#ntsfacultyinfo").val("");
          }
        });
      }
    }
});
  $("#ntsfacultyinfoadder").click(function(){
      if($("#ntsfacultyinfo").val()){
        var x=urlfriendly($("#ntsfacultyinfo").val());
        $.getJSON("./addntsfaculty.php?name="+x,function(data){
          if(data.status)
          {
            viewntsPeople();
            $("#ntsfacultyinfo").val("");
          }
        });
      }
  });

function viewStudentGalleryImages(x){
  if(x){
    $.getJSON("./getstudentgalleryimages.php?id="+x.substring(15),function(data){
      $("#imagegalleryinfo").html("");
      var gallery=x;
      var gallerytitle=$(gallery).children(".studentgallery-controls").attr("data-name");
      var htmlString="<h4>Title:"+gallerytitle+"</h4>";
        if(data.length){
          var heads=["Thumbnail","Title","Caption","Actions"];
          var widths=["5%","25%","40%","20%"];
          var defs=["path","title","caption"];
          var type=["image","input","textarea","controls"];
          var extra="<i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Make Thumbnail\"  class=\"glyphicon glyphicon-picture\"></i><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"edit fields\"  class=\"glyphicon glyphicon-pencil\"></i><i data-toggle=\"tooltip\" style=\"display:none;\" data-placement=\"bottom\" title=\"Save Fields\"  class=\"glyphicon glyphicon-floppy-disk\"></i><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Delete\"  class=\"glyphicon glyphicon-remove\"></i><div class=\"delete-confirm\" style=\"display:none;\"><div style=\"font-size:8px;\" class=\"btn btn-danger\">Confirm</div><div style=\"font-size:8px;margin-left:10px\" class=\"btn btn-primary\">Cancel</div></div>";
          var htmlString=tableprint(heads,widths,defs,type,data,"imagecontrols",extra,"imagegallery-controls");
          $("#imagegalleryinfo").html($("#imagegalleryinfo").html()+htmlString);
          $(".imagegallery-controls .glyphicon-picture").click(function(){
            var galleryid=x.substring(15);
            var path=$(this).parent().attr("data-path");
            $.getJSON("./addthumbnailstudentgallery.php?id="+galleryid+"&path="+path,function(data){
              viewStudentGallery()
            });
          });

          $(".imagegallery-controls .glyphicon-remove").click(function(){
            if($(this).parent().children(".delete-confirm").css("display")=="block"){
              $(this).parent().children(".delete-confirm").slideUp();
            }
            else{
              $(this).parent().children(".delete-confirm").slideDown();
            }
          });

          $(".imagegallery-controls .delete-confirm .btn-primary").click(function(){
            $(this).parent(".delete-confirm").slideUp();
          });
          $(".imagegallery-controls .delete-confirm .btn-danger").click(function(){
              var id=($(this).parent().parent().attr("id").substring(13));
              var x=$(this).parent().parent().parent().parent();
              $.getJSON("./deletestudentsgalleryimage.php?id="+id,function(data){
                    if(data.status)
                    {
                      x.hide(500);
                      setTimeout(function(){
                        viewStudentGalleryImages("111111111111111"+$("#imagegalleryinfo").attr("data-id"));
                      },500);
                    }
                    else{
                      x.css("background-color","#e74c3c");
                      x.css("opacity","0.4");
                    }
              });
          });
          $(".imagegallery-controls .glyphicon-pencil").click(function(){
            var id=$(this).parent().attr("id").substring(13);
            $(this).css("display","none");
            $(this).parent().children(".glyphicon-floppy-disk").css("display","initial");
            $("#imagecontrolsinput"+id).prop('disabled', false);
            $("#imagecontrolstext"+id).prop('disabled', false);
          });

          $(".imagegallery-controls .glyphicon-floppy-disk").click(function(){
            var id=$(this).parent().attr("id").substring(13);
            $(this).css("display","none");
            $(this).parent().children(".glyphicon-pencil").css("display","initial");
            $("#imagecontrolsinput"+id).attr('disabled', "disabled");
            $("#imagecontrolstext"+id).attr('disabled', "disabled");
            url="./editstudentgalleryimages.php?id="+id;
            if($("#imagecontrolsinput"+id).val()||$("#imagecontrolstext"+id).val())
            {
                if($("#imagecontrolsinput"+id).val())
                  url+="&title="+urlfriendly($("#imagecontrolsinput"+id).val());
                if($("#imagecontrolstext"+id).val())
                  url+="&caption="+urlfriendly($("#imagecontrolstext"+id).val());
                  $.getJSON(url,function(data){
                    if(!data.status){
                      alert("system is malfunctioning|"+data.message);
                    }
                  });
            }
            else{
              return;
            }
          });

        }else {
          $("#imagegalleryinfo").html("No images are present in this gallery please add by dragging images to the gallery icon");
        }
    });
  }
  else {
    $("#imagegalleryinfo").html("<h5 class=\"text-inactive text-center\">Make sure you have selected a gallery</h5>");
  }

  $('[data-toggle="tooltip"]').tooltip({container: "body"});
}
function viewStudentGallery(){
    var htmlString="";
    var phimage="./def/picture-placeholder.png";
    $.getJSON("./getstudentgallery.php",function(data){
      if(data.length)
      {
        var defs=["id","name"];
        for(var i=0;i<data.length;i++)
        {
          if(data[i].thumbnail)
          htmlString+="<div id=\"studentgallery"+data[i].id+"\" class=\"imageGrid\" style=\"background-image:URL('"+data[i].thumbnail+"')\">";
          else
          htmlString+="<div id=\"studentgallery"+data[i].id+"\" class=\"imageGrid\" style=\"background-image:URL('"+phimage+"')\">";
          htmlString+="<img style=\"display:none;margin:0px auto;\" src=\"./def/coffeloader.gif\"/>";
          htmlString+="<div class=\"titleslider bg-primary\">";
          htmlString+="<h5 class=\"\">"+data[i].name+"</h5>";
          htmlString+="</div><div";
          for(var j=0;j<defs.length;j++)
          {
              htmlString+=" data-"+defs[j]+"="+data[i][defs[j]];
          }
          if(Number(data[i].visible))
          htmlString+=" class=\"studentgallery-controls\"><div class=\"file_button_container\"><input type=\"file\" multiple /></div><i style=\"display:none\"  data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Unhide Gallery\" class=\"glyphicon glyphicon-eye-open\"></i><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Hide Gallery\" class=\"glyphicon glyphicon-eye-close\"></i><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Delete Gallery\" class=\"glyphicon glyphicon-trash\"></i></div>";
          else
          htmlString+=" class=\"studentgallery-controls\"><div class=\"file_button_container\"><input type=\"file\" multiple /></div><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Unhide Gallery\" class=\"glyphicon glyphicon-eye-open\"></i><i style=\"display:none\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Hide Gallery\" class=\"glyphicon glyphicon-eye-close\"></i><i data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Delete Gallery\" class=\"glyphicon glyphicon-trash\"></i></div>";
          htmlString+="</div></div>";
        }
        $("#studentgallerygrid").html(htmlString);
      }
      else {
        $("#studentgallerygrid").html("<h4 style=\"color:#CCC\">Make sure you Have created a gallery</h4>");
      }
      $(".studentgallery-controls .file_button_container input").change(function(e){
        var id=$(this).parent().parent().attr("data-id");
        var file=$(this).prop("files");
        for(var i=0;i<file.length;i++){
          if(file[i].size<maxfilesize&&file[i].type.indexOf("image")>=0){
            var formdata=new FormData();
            formdata.append("file",file[i]);
            formdata.append("path","../data/studentgallery/");
            addprogressbar("#studentgalleryupload-meta",file[i].name,"progressbar"+progressid,true);
            fileupload(formdata,"progressbar"+progressid++,"upload_to_studentgallery.php?id="+id,"studentgalleryupload-warnings","viewStudentGalleryImages","#studentgallery"+id);
          }
          else if(file[i].size>=maxfilesize){
            $("#studentgalleryupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" exceeds max upload size of "+mbsize+"MB<p>");
          }else if(file[i].type.indexOf("image")<0){
            $("#studentgalleryupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" is not an Image<p>");
          }
        }
      });
      $(".imageGrid").click(function(){
        $("#imagegalleryinfo").attr("data-id",$(this).attr("id").substring(14));
        viewStudentGalleryImages("#"+$(this).attr("id"));
      });
      for(var i=0;i<data.length;i++)
      {
        var id="studentgallery"+data[i].id;
        var dropzone=document.getElementById(id);
        dropzone.ondrop=function(e){
          e.preventDefault();
          $(this).children(".titleslider").addClass("bg-primary");
          $(this).children(".titleslider").removeClass("bg-success");
          var file=e.dataTransfer.files;
          for(var i=0;i<file.length;i++){
            if(file[i].size<maxfilesize&&file[i].type.indexOf("image")>=0){
              var formdata=new FormData();
              var id=$(this).attr("id").substring(14);
              formdata.append("file",file[i]);
              formdata.append("path","../data/studentgallery/");
              addprogressbar("#studentgalleryupload-meta",file[i].name,"progressbar"+progressid,true);
              fileupload(formdata,"progressbar"+progressid++,"upload_to_studentgallery.php?id="+id,"studentgalleryupload-warnings","viewStudentGalleryImages","#studentgallery"+id);
            }
            else if(file[i].size>=maxfilesize){
              $("#studentgalleryupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" exceeds max upload size of "+mbsize+"MB<p>");
            }else if(file[i].type.indexOf("image")<0){
              $("#studentgalleryupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" is not an Image<p>");
            }
          }
        }

        dropzone.ondragover=function(){
          $(this).children(".titleslider").removeClass("bg-primary");
          $(this).children(".titleslider").addClass("bg-success");
        //  $(this).children("img").css("display","block");
          return false;
        }

        dropzone.ondragleave=function(){
        //  $(this).children("img").css("display","none");
        $(this).children(".titleslider").addClass("bg-primary");
        $(this).children(".titleslider").removeClass("bg-success");
          return false;
        }
      }
      $(".studentgallery-controls .glyphicon-eye-open").click(function(){
        var id=$(this).parent().attr("data-id");
        $.getJSON("./editstudentgallery.php?id="+id+"&visible=1",function(data){

          if(data.status){
            $("#studentgallery"+id).children('.studentgallery-controls').children(".glyphicon-eye-close").css("display","initial");
            $("#studentgallery"+id).children(".studentgallery-controls").children(".glyphicon-eye-open").css("display","none");
          }
        });
      });
      $(".studentgallery-controls .glyphicon-eye-close").click(function(){
        var id=$(this).parent().attr("data-id");
        $.getJSON("./editstudentgallery.php?id="+id+"&visible=0",function(data){

          if(data.status){
            $("#studentgallery"+id).children('.studentgallery-controls').children(".glyphicon-eye-close").css("display","none");
            $("#studentgallery"+id).children(".studentgallery-controls").children(".glyphicon-eye-open").css("display","initial");
          }
        });
      });
      $(".studentgallery-controls .glyphicon-trash").click(function(){
          $("#studentgallerydeleterbutton").attr("data-id",$(this).parent().attr("data-id"));
          $("#studentgallerydeleteconfirm").modal();
      });

    });

    $('[data-toggle="tooltip"]').tooltip({container: "body"});
}
$("#createstudentgallerysubmit").click(function(){
    var name=urlfriendly($("#createstudentgalleryname").val());
    if(!name)return;
    $.getJSON("./addstudentgallery.php?name="+name,function(data){
      if(data.status){
        viewStudentGallery();
        $("#createstudentgalleryname").val("");
      }else {
        $("#createstudentgalleryname").val(data.message);
        $("#createstudentgallerysubmit").removeClass("btn-primary");
        $("#createstudentgallerysubmit").addClass("btn-danger");
        setTimeout(function(){
          $("#createstudentgalleryname").val("");
          $("#createstudentgallerysubmit").addClass("btn-primary");
          $("#createstudentgallerysubmit").removeClass("btn-danger");
        },2000)
      }
    });
});

$("#createstudentgalleryname").keyup(function(e){
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==13){
      //alert("yolo");
      e.preventDefault();
      if($("#createstudentgalleryname").val()){
        var x=urlfriendly($("#createstudentgalleryname").val());
        $.getJSON("./addstudentgallery.php?name="+x,function(data){
          if(data.status)
          {
            viewStudentGallery();
            $("#createstudentgalleryname").val("");
          }
        });
      }
    }
});

function facultyinfodelete(id){
  $.getJSON("./deletefacultyinfo.php?id="+id,function(data){
    //alert(data);
    if(data.status){
    $("#peopledisplayer .image").html("");
    $("#peopledisplayer .info").html("");
    viewFaculty();
    }
  });
}

function facultyinfoupdate(id){
  var formdata=new FormData();
  formdata.append("path","../data/facultyinfo/");
  var file=$("#facultyinfonewimage").prop('files');
  var name=$("#facultyinfonewname").val();
  var desig=$("#facultyinfonewdesig").val();
  var desc=$("#facultyinfonewdesc").val();
  formdata.append("id",id);
  if(name)formdata.append("name",name);
  if(desig)formdata.append("designation",desig);
  if(desc)formdata.append("description",desc);
  if(file.length){
  formdata.append("file",file[0]);
  addprogressbar("#newfacultyinfoprogress",file[0].name,"newfacultyinfoprogressbar",false);
  fileupload(formdata,"newfacultyinfoprogressbar","editfacultyinfo.php","newfacultyinfowarnings","viewFaculty");
  }
  else{
      formupload(formdata,"editfacultyinfo.php","viewFaculty");
    }

}
function facultyinfomodalcleanup(){
  $('#facultyinfomodalname').val("");
  $('#facultyinfomodaldesignation').val("");
  $('#facultyinfomodaldescription').val("");
  $("#facultyinfomodalfileuploader").val("");
  viewFaculty();
  $("#facultyinfomodal").modal("hide");
}

function viewFaculty(){
  $.getJSON("./getfacultyinfo.php",function(data){
    var htmlString="";
    if(data.length){
      var defs=Object.getOwnPropertyNames(data[0]);
      //console.log(defs);
      for(var i=0;i<data.length;i++){
        htmlString+="<div class=\"peopleGrid\"";
        for(var j=0;j<defs.length;j++)
        {
          htmlString+=" data-"+defs[j]+"=\""+data[i][defs[j]]+"\"";
        }
        htmlString+=" style=\"background-image:URL(\'"+data[i].image+"\')\" >";
        htmlString+="<div class=\"wrapper\"><i class=\"glyphicon glyphicon glyphicon-user\"></i></div>";
        htmlString+="<div class=\"titleslider bg-primary\"><h5>"+data[i].name+","+data[i].designation+"</h5></div>";
        htmlString+="</div>";
      }
      $("#peoplegallery").html(htmlString);
      $(".peopleGrid").click(function(){
        if($(this).hasClass("peopleGridDefault"))
        return;
        $("#peopledisplayer").attr("data-id",$(this).attr("data-id"));
        $("#peopledisplayer .image").html("<img class=\"modal-thumbnail\" id=\"facultyinfonewimagedisplayer\" src=\""+$(this).attr("data-image")+"\" /><div class=\"wrapper\"><input id=\"facultyinfonewimage\" type=\"file\" /><i class=\"glyphicon glyphicon-file\"></i></div>");
        var htmlstring="<br><input id=\"facultyinfonewname\" type=\"text\" class=\"form-control\" placeholder=\"Name\" value=\""+$(this).attr("data-name")+"\"/>";
        htmlstring+="<br><input id=\"facultyinfonewdesig\" type=\"text\" class=\"form-control\" placeholder=\"Designation\" value=\""+$(this).attr("data-designation")+"\"/>";
        htmlstring+="<br><textarea id=\"facultyinfonewdesc\" type=\"text\" class=\"form-control\" placeholder=\"Description\" >"+$(this).attr("data-description")+"</textarea>";
        htmlstring+="<br><button type=\"button\" id=\"facultyinfoeditsubmit\" onclick=\"facultyinfoupdate("+$(this).attr("data-id")+")\" class=\"btn btn-success\">Save Changes</button>";
        htmlstring+="<button type=\"button\" id=\"facultyinfodelete\" onclick=\"$('.faculty-delete-confirm').slideDown('fast')\" class=\"btn btn-danger\">Delete</button>";
        htmlstring+="<div class=\"faculty-delete-confirm\" style=\"display:none\">";
        htmlstring+="<button type=\"button\" id=\"facultyinfodeleteconfirm\" onclick=\"facultyinfodelete("+$(this).attr("data-id")+")\" class=\"btn btn-danger\">Confirm</button>";
        htmlstring+="<button type=\"button\" id=\"facultyinfodeletecancel\" class=\"btn btn-primary\" onclick=\"$('.faculty-delete-confirm').slideUp('fast')\">Cancel</button></div>";
        $("#peopledisplayer .info").html(htmlstring);
        addliveimgupdate("facultyinfonewimage","facultyinfonewimagedisplayer");
      });
    }
    else{
        $("#peoplegallery").html("");
    }
  })
}

function viewStudentsWork(filter,value){
  var url="./getstudentswork.php";
  if(filter&&value)url+="?filter="+filter+"&value="+value;
  $.getJSON(url,function(data){
    if(!data.length){
      $("#studentprojects").html("Nothhing to Display");
      return;
    }
    var heads=["Title","Semester","Year","Actions"];
    var widths=["30%","20%","20%","50%"];
    var defs=["title","sem","year"];
    var type=["text","text","text","controls"];
    var extra="<a data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Right Click And click Save Link as... to Download\" class=\"studentworkdownloader\"><i class=\"glyphicon glyphicon-save\"></i></a><i class=\"glyphicon glyphicon-remove\"></i><div data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Upload a new File\" class=\"file_button_container bg-primary\"><input type=\"file\"></div><div class=\"delete-confirm\" style=\"display:none;\"><div style=\"font-size:8px;\" class=\"btn btn-danger\">Confirm</div><div style=\"font-size:8px;margin-left:10px\" class=\"btn btn-primary\">Cancel</div></div>";
    var htmlString=tableprint(heads,widths,defs,type,data,"studentswork",extra,"studentswork-controls");
    $("#studentprojects").html(htmlString);
    for(var i=0;i<data.length;i++)
    {
      $("#studentswork"+data[i].id).children(".studentworkdownloader").attr("href",data[i].file);
    }

    $(".studentswork-controls .glyphicon-remove").click(function(){
      $(this).parent().children(".delete-confirm").slideDown();
    });

    $(".studentswork-controls .delete-confirm .btn-primary").click(function(){
      $(this).parent(".delete-confirm").slideUp();
    });

    $(".studentswork-controls .delete-confirm .btn-danger").click(function(){
        var id=$(this).parent().parent().attr("id").substring(12);
        $.getJSON("./deletestudentswork.php?id="+id,function(data){
            if(data.status)
            {
              viewStudentsWork(filter,value);
            }
            else{
              alert("error");
            }
        });
    });
    $(".studentswork-controls .file_button_container").change(function(e){
      var id=$(this).parent().attr("id").substring(12);
      var project=$(this).children("input").prop("files");
      if(project[0].type.indexOf("pdf")<0)
        {
          $("#studentworkupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Selected file in not PDF</p>");
          return;
        }
        var formdata=new FormData();
        formdata.append("file",project[0]);
        formdata.append("path","../data/studentswork/");
        addprogressbar("#studentworkupload-meta",project[0].name,"progressbar"+progressid,false);
        fileupload(formdata,"progressbar"+progressid++,"replacestudentswork.php?id="+id,"studentworkupload-warnings","viewStudentsWork",null);
        $("#studentworktitle").val("");
        $("#studentworkfile").val("");
    });
  });
}

//student work functions done
//rsudc functions start


function rsudcteamdelete(id){
  $.getJSON("./deletersudcteam.php?id="+id,function(data){
    //alert(data);
    if(data.status){
    $("#rsudcteamdisplayer .image").html("");
    $("#rsudcteamdisplayer .info").html("");
    viewrsudcTeam();
    }
  });
}

function rsudcteamupdate(id){
  var formdata=new FormData();
  formdata.append("path","../data/facultyinfo/");
  var file=$("#rsudcteamnewimage").prop('files');
  var name=$("#rsudcteamnewname").val();
  var desig=$("#rsudcteamnewdesig").val();
  var desc=$("#rsudcteamnewdesc").val();
  formdata.append("id",id);
  if(name)formdata.append("name",name);
  if(desig)formdata.append("designation",desig);
  if(desc)formdata.append("description",desc);
  if(file.length){
  formdata.append("file",file[0]);
  addprogressbar("#rsudcteamprogress",file[0].name,"newfacultyinfoprogressbar",false);
  fileupload(formdata,"newfacultyinfoprogressbar","editrsudcteam.php","rsudcteamwarnings","viewrsudcTeam");
  }
  else{
      formupload(formdata,"editrsudcteam.php","viewrsudcTeam");
    }

}

function viewrsudcTeam(){
  $.getJSON("./getrsudcteam.php",function(data){
    var htmlString="";
    if(data.length){
      var defs=Object.getOwnPropertyNames(data[0]);
      //console.log(defs);
      for(var i=0;i<data.length;i++){
        htmlString+="<div class=\"teamGrid\"";
        for(var j=0;j<defs.length;j++)
        {
          htmlString+=" data-"+defs[j]+"=\""+data[i][defs[j]]+"\"";
        }
        htmlString+=" style=\"background-image:URL(\'"+data[i].image+"\')\" >";
        htmlString+="<div class=\"wrapper\"><i class=\"glyphicon glyphicon glyphicon-user\"></i></div>";
        htmlString+="<div class=\"titleslider bg-primary\"><h5>"+data[i].name+","+data[i].designation+"</h5></div>";
        htmlString+="</div>";
      }
      $("#rsudcteamgallery").html(htmlString);
      $(".teamGrid").click(function(){
        if($(this).hasClass("teamGridDefault"))
        return;
        $("#rsudcteamdisplayer").attr("data-id",$(this).attr("data-id"));
        $("#rsudcteamdisplayer .image").html("<img class=\"modal-thumbnail\" id=\"rsudcteamnewimagedisplayer\" src=\""+$(this).attr("data-image")+"\" /><div class=\"wrapper\"><input id=\"rsudcteamnewimage\" type=\"file\" /><i class=\"glyphicon glyphicon-file\"></i></div>");
        var htmlstring="<br><input id=\"rsudcteamnewname\" type=\"text\" class=\"form-control\" placeholder=\"Name\" value=\""+$(this).attr("data-name")+"\"/>";
        htmlstring+="<br><input id=\"rsudcteamnewdesig\" type=\"text\" class=\"form-control\" placeholder=\"Designation\" value=\""+$(this).attr("data-designation")+"\"/>";
        htmlstring+="<br><textarea id=\"rsudcteamnewdesc\" type=\"text\" class=\"form-control\" placeholder=\"Description\" >"+$(this).attr("data-description")+"</textarea>";
        htmlstring+="<br><button type=\"button\" id=\"rsudcteameditsubmit\" onclick=\"rsudcteamupdate("+$(this).attr("data-id")+")\" class=\"btn btn-success\">Save Changes</button>";
        htmlstring+="<button type=\"button\" id=\"rsudcteamdelete\" onclick=\"$('.rsudcteam-delete-confirm').slideDown('fast')\" class=\"btn btn-danger\">Delete</button>";
        htmlstring+="<div class=\"rsudcteam-delete-confirm\" style=\"display:none\">";
        htmlstring+="<button type=\"button\" id=\"rsudcteamdeleteconfirm\" onclick=\"rsudcteamdelete("+$(this).attr("data-id")+")\" class=\"btn btn-danger\">Confirm</button>";
        htmlstring+="<button type=\"button\" id=\"rsudcteamdeletecancel\" class=\"btn btn-primary\" onclick=\"$('.rsudcteam-delete-confirm').slideUp('fast')\">Cancel</button></div>";
        $("#rsudcteamdisplayer .info").html(htmlstring);
        addliveimgupdate("rsudcteamnewimage","rsudcteamnewimagedisplayer");
      });
    }
    else{
        $("#rsudcteamgallery").html("");
      }
  })
}

function rsudcteammodalcleanup(){
  $('#rsudcteammodalname').val("");
  $('#rsudcteammodaldesignation').val("");
  $('#rsudcteammodaldescription').val("");
  $("#rsudcteammodalfileuploader").val("");
  viewrsudcTeam();
  $("#rsudcteammodal").modal("hide");
}
//rsudc team end

// rsudc dev start


function rsudcdevdelete(id){
  $.getJSON("./deletersudcdev.php?id="+id,function(data){
    //alert(data);
    if(data.status){
    $("#rsudcdevdisplayer .image").html("");
    $("#rsudcdevdisplayer .info").html("");
    viewrsudcdev();
    }
  });
}

function rsudcdevupdate(id){
  var formdata=new FormData();
  formdata.append("path","../data/facultyinfo/");
  var file=$("#rsudcdevnewimage").prop('files');
  var name=$("#rsudcdevnewname").val();
  var desc=$("#rsudcdevnewdesc").val();
  formdata.append("id",id);
  if(name)formdata.append("name",name);
  if(desc)formdata.append("description",desc);
  if(file.length){
  formdata.append("file",file[0]);
  addprogressbar("#rsudcdevprogress",file[0].name,"newfacultyinfoprogressbar",false);
  fileupload(formdata,"newfacultyinfoprogressbar","editrsudcdev.php","rsudcdevwarnings","viewrsudcdev");
  }
  else{
      formupload(formdata,"editrsudcdev.php","viewrsudcdev");
    }

}

function viewrsudcdev(){
  $.getJSON("./getrsudcdev.php",function(data){
    var htmlString="";
    if(data.length){
      var defs=Object.getOwnPropertyNames(data[0]);
      //console.log(defs);
      for(var i=0;i<data.length;i++){
        htmlString+="<div class=\"developmentcellGrid\"";
        for(var j=0;j<defs.length;j++)
        {
          htmlString+=" data-"+defs[j]+"=\""+data[i][defs[j]]+"\"";
        }
        htmlString+=" style=\"background-image:URL(\'"+data[i].image+"\')\" >";
        htmlString+="<div class=\"wrapper\"><i class=\"glyphicon glyphicon glyphicon-user\"></i></div>";
        htmlString+="<div class=\"titleslider bg-primary\"><h5>"+data[i].name+","+data[i].designation+"</h5></div>";
        htmlString+="</div>";
      }
      $("#rsudcdevgallery").html(htmlString);
      $(".developmentcellGrid").click(function(){
        if($(this).hasClass("developmentcellGridDefault"))
        return;
        $("#rsudcdevdisplayer").attr("data-id",$(this).attr("data-id"));
        $("#rsudcdevdisplayer .image").html("<img class=\"modal-thumbnail\" id=\"rsudcdevnewimagedisplayer\" src=\""+$(this).attr("data-image")+"\" /><div class=\"wrapper\"><input id=\"rsudcdevnewimage\" type=\"file\" /><i class=\"glyphicon glyphicon-file\"></i></div>");
        var htmlstring="<br><input id=\"rsudcdevnewname\" type=\"text\" class=\"form-control\" placeholder=\"Name\" value=\""+$(this).attr("data-name")+"\"/>";
        htmlstring+="<br><textarea id=\"rsudcdevnewdesc\" type=\"text\" class=\"form-control\" placeholder=\"Description\" >"+$(this).attr("data-description")+"</textarea>";
        htmlstring+="<br><button type=\"button\" id=\"rsudcdeveditsubmit\" onclick=\"rsudcdevupdate("+$(this).attr("data-id")+")\" class=\"btn btn-success\">Save Changes</button>";
        htmlstring+="<button type=\"button\" id=\"rsudcdevdelete\" onclick=\"$('.rsudcdev-delete-confirm').slideDown('fast')\" class=\"btn btn-danger\">Delete</button>";
        htmlstring+="<div class=\"rsudcdev-delete-confirm\" style=\"display:none\">";
        htmlstring+="<button type=\"button\" id=\"rsudcdevdeleteconfirm\" onclick=\"rsudcdevdelete("+$(this).attr("data-id")+")\" class=\"btn btn-danger\">Confirm</button>";
        htmlstring+="<button type=\"button\" id=\"rsudcdevdeletecancel\" class=\"btn btn-primary\" onclick=\"$('.rsudcdev-delete-confirm').slideUp('fast')\">Cancel</button></div>";
        $("#rsudcdevdisplayer .info").html(htmlstring);
        addliveimgupdate("rsudcdevnewimage","rsudcdevnewimagedisplayer");
      });
    }
    else{
        $("#rsudcdevgallery").html("");
      }
  })
}

function rsudcdevmodalcleanup(){
  $('#rsudcdevmodalname').val("");
  $('#rsudcdevmodaldescription').val("");
  $("#rsudcdevmodalfileuploader").val("");
  viewrsudcdev();
  $("#rsudcdevmodal").modal("hide");
}

//rsudc dev end

//alumni start

function alumnidelete(id){
  $.getJSON("./deletealumni.php?id="+id,function(data){
    //alert(data);
    if(data.status){
    $("#alumnidisplayer .image").html("");
    $("#alumnidisplayer .info").html("");
    viewalumni();
    }
  });
}

function alumniupdate(id){
  var formdata=new FormData();
  formdata.append("path","../data/alumni");
  var file=$("#alumninewimage").prop('files');
  var name=$("#alumninewname").val();
  var desig=$("#alumninewdesig").val();
  var desc=$("#alumninewdesc").val();
  var cont=$("#alumninewcont").val();
  var year=$("#alumninewyearselect").val();
  formdata.append("id",id);
  if(name)formdata.append("name",name);
  if(desig)formdata.append("designation",desig);
  if(desc)formdata.append("description",desc);
  if(year)formdata.append("year",year);
  if(cont)formdata.append("contact",cont);
  if(file.length){
  formdata.append("file",file[0]);
  addprogressbar("#alumniprogress",file[0].name,"newfacultyinfoprogressbar",false);
  fileupload(formdata,"newfacultyinfoprogressbar","editalumni.php","alumniwarnings","viewalumni");
  }
  else{
      formupload(formdata,"editalumni.php","viewalumni");
    }

}

function viewalumni(){
  $.getJSON("./getalumni.php",function(data){
    var htmlString="";
    if(data.length){
      var defs=Object.getOwnPropertyNames(data[0]);
      //console.log(defs);
      for(var i=0;i<data.length;i++){
        htmlString+="<div class=\"alumniGrid\"";
        for(var j=0;j<defs.length;j++)
        {
          htmlString+=" data-"+defs[j]+"=\""+data[i][defs[j]]+"\"";
        }
        htmlString+=" style=\"background-image:URL(\'"+data[i].image+"\')\" >";
        htmlString+="<div class=\"wrapper\"><i class=\"glyphicon glyphicon glyphicon-user\"></i></div>";
        htmlString+="<div class=\"titleslider bg-primary\"><h5>"+data[i].name+","+data[i].designation+"</h5></div>";
        htmlString+="</div>";
      }
      $("#alumnigallery").html(htmlString);
      $(".alumniGrid").click(function(){
        if($(this).hasClass("alumniGridDefault"))
        return;
        $("#alumnidisplayer").attr("data-id",$(this).attr("data-id"));
        $("#alumnidisplayer .image").html("<img class=\"modal-thumbnail\" id=\"alumninewimagedisplayer\" src=\""+$(this).attr("data-image")+"\" /><div class=\"wrapper\"><input id=\"alumninewimage\" type=\"file\" /><i class=\"glyphicon glyphicon-file\"></i></div>");
        var htmlstring="<br><input id=\"alumninewname\" type=\"text\" class=\"form-control\" placeholder=\"Name\" value=\""+$(this).attr("data-name")+"\"/>";
        htmlstring+="<br><input id=\"alumninewcont\" type=\"text\" class=\"form-control\" placeholder=\"Contact\" value=\""+$(this).attr("data-contact")+"\"/>";
        htmlstring+="<br><input id=\"alumninewdesig\" type=\"text\" class=\"form-control\" placeholder=\"Designation\" value=\""+$(this).attr("data-designation")+"\"/>";
        htmlstring+="<br><textarea id=\"alumninewdesc\" type=\"text\" class=\"form-control\" placeholder=\"Description\" >"+$(this).attr("data-quote")+"</textarea>";
        htmlstring+="<br><select class=\"form-control\" id=\"alumninewyearselect\">";
        var t=Number((new Date()).getFullYear());
        for(var i=0;i<15;i++)
        htmlstring+="<option>"+t+" - "+((t--)+2)+"</option>";
        htmlstring+="</select>";
        htmlstring+="<button type=\"button\" id=\"alumnieditsubmit\" onclick=\"alumniupdate("+$(this).attr("data-id")+")\" class=\"btn btn-success\">Save Changes</button>";
        htmlstring+="<button type=\"button\" id=\"alumnidelete\" onclick=\"$('.alumni-delete-confirm').slideDown('fast')\" class=\"btn btn-danger\">Delete</button>";
        htmlstring+="<div class=\"alumni-delete-confirm\" style=\"display:none\">";
        htmlstring+="<button type=\"button\" id=\"alumnideleteconfirm\" onclick=\"alumnidelete("+$(this).attr("data-id")+")\" class=\"btn btn-danger\">Confirm</button>";
        htmlstring+="<button type=\"button\" id=\"alumnideletecancel\" class=\"btn btn-primary\" onclick=\"$('.alumni-delete-confirm').slideUp('fast')\">Cancel</button></div>";
        $("#alumnidisplayer .info").html(htmlstring);
        $("#alumninewyearselect").val($(this).attr("data-year"));
        addliveimgupdate("alumninewimage","alumninewimagedisplayer");
      });
    }
    else{
        $("#alumnigallery").html("");
      }
  })
}

function alumnimodalcleanup(){
  $('#alumnimodalname').val("");
  $('#alumnimodaldesignation').val("");
  $('#alumnimodaldescription').val("");
  $("#alumnimodalfileuploader").val("");
  $('#alumnimodalcontact').val("");
  $('#alumniyearselect').val("");
  viewalumni();
  $("#alumnimodal").modal("hide");
}
//alumni end
//modal file live Update
function addliveimgupdate(uploader,img){  document.getElementById(uploader).onchange = function (evt) {
      var tgt = evt.target || window.event.srcElement;
      var files = tgt.files;
      // FileReader support
      if (FileReader && files && files.length&&(files[0].type.indexOf("image")>-1)) {
          var fr = new FileReader();
          fr.onload = function () {
              document.getElementById(img).src = fr.result;
          }
          fr.readAsDataURL(files[0]);
        }
        else{
          $("#"+uploader).val("");
          document.getElementById(img).src = "../data/defaults/bad_choice.jpg";
        }
    }}
//modalliveupdateclose

function pageslider(div1,div2,wrapper,time){
  if(sliderBusy){
    return false;
  }
  var d1=document.getElementById(div1);
  var d2=document.getElementById(div2);
  if(d1.offsetHeight<window.innerHeight)offsetTop=window.innerHeight;
  else offsetTop=d1.offsetHeight;
      sliderBusy=1;
      $("#"+wrapper).css("overflow-y","hidden");
      d2.style.top=offsetTop+"px";
      $("#"+div2).css("display","block");
      $("#"+div1).animate({top:"-"+offsetTop+'px'},time,function(){
        $("#"+div1).css("display","none");
      });
      $("#"+div2).animate({top:'20px'},time,function(){
        $("#"+div1).css("display","none");
        //$("#"+wrapper).css("overflow-y","auto");
        sliderBusy=0;
      });
      return true;
}


$(document).ready(function(){
  var active="home";
  $("#"+active).slideDown();
  viewCarouselActive();
  viewGallery();
  viewFaculty();
  viewntsPeople();
  viewStudentsWork();
  viewStudentGallery();
  viewStudentGalleryImages();
  viewrsudcTeam();
  viewrsudcdev();
  viewalumni();
  //nicescrolls
  $("#playground").niceScroll();
  $(".info-box-content").niceScroll();
  //nicescrolls end
  $('[data-toggle="tooltip"]').tooltip({container: "body"});
  $("#studentgallerydeleterbutton").click(function(){
    var id=$(this).attr("data-id");
    $.getJSON("./deletestudentgallery.php?id="+id,function(data){
      if(data.status){
        viewStudentGallery();
        viewStudentGalleryImages();
        $(".modal").modal("hide");
      }
      else {
        alert("error:"+data.message)
      }
    })
  });
  $(".mobilemenubtn").click(function(){
    $(".modal").modal("hide");
    if($(this).attr("data-view")=="open")
    {
        $("#mobileprimarydropdown").slideUp("fast");
      $(this).attr("data-view","close");
    }else {
      $(this).attr("data-view","open");
      $("#mobileprimarydropdown").slideDown("fast");
    }
  });

  $("#mobileprimarydropdown .sidebar-btn").click(function(){
    $("#playground").scrollTop(0);
    $("#mobileprimarydropdown").slideUp("fast");
    $(".mobilemenubtn").attr("data-view","close");
  });

  addliveimgupdate("modalfileuploader","carouselmodalthumbnail");


  $(".sidebar-btn").click(function(){
    $("#playground").scrollTop(0);
    var next=$(this).attr("data-value");
      if(active==next||sliderBusy)return;
        pageslider(active,next,"playground",1000)
        active=next;
        $(".sidebar-btn").removeClass("sidebar-active");
        $(this).addClass("sidebar-active");
      if(active=="frontpagecarousel"){
        var dropzone=document.getElementById('playground');
        dropzone.ondrop=function(e){
          e.preventDefault();
          $("#upload-warnings").html("");
          $('.frontcarouseldragdropupload').css("display","none");
          var file=e.dataTransfer.files;
          for(var i=0;i<file.length;i++){
            if(file[i].size<maxfilesize&&file[i].type.indexOf("image")>=0){
              var formdata=new FormData();
              formdata.append("file",file[i]);
              formdata.append("path","../data/frontcarousel/");
              addprogressbar("#upload-meta",file[i].name,"progressbar"+progressid,true);
              fileupload(formdata,"progressbar"+progressid++,"upload_to_gallery.php","upload-warnings","viewGallery",null);
            }
            else if(file[i].size>=maxfilesize){
              $("#upload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" exceeds max upload size of "+mbsize+"MB<p>");
            }else if(file[i].type.indexOf("image")<0){
              $("#upload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" is not an Image<p>");
            }
          }
        }
        dropzone.ondragover=function(){
          $('.frontcarouseldragdropupload').css("display","block");
          return false;
        }
        dropzone.ondragleave=function(){
          $('.frontcarouseldragdropupload').css("display","none");
          return false;
        }
      }
      else{
        var dropzone=document.getElementById('playground');
        dropzone.ondrop=function(e){return false;}
        dropzone.ondragover=function(){return false;}
        dropzone.ondragleave=function(){return false;}
      }
  });
//Drag and Drop controller

$("#facultyinfomodalsubmit").click(function(){
    $("#facultyinfomodalwarnings").html("");
  var name=$('#facultyinfomodalname').val();
  var designation=$('#facultyinfomodaldesignation').val();
  var desc=$('#facultyinfomodaldescription').val();
  var file=$("#facultyinfomodalfileuploader").prop("files");
  var type=$("[name='facutlytyperadio']:checked").attr("data-value");
  if(name&&file.length&&designation&&desc&&type){
    if(file[0].size<maxfilesize&&file[0].type.indexOf("image")>-1){
      var formdata=new FormData();
      formdata.append("name",name);
      formdata.append("designation",designation);
      formdata.append("description",desc);
      formdata.append("type",type);
      formdata.append("file",file[0]);
      formdata.append("path","../data/facultyinfo/");
      addprogressbar("#facultyinfomodalprogress",file[0].name,"progressbar"+progressid,false);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_facultyinfo.php","facultyinfomodalwarnings","facultyinfomodalcleanup",null);

    }
    else if(file[0].size<maxfilesize){
      $("#facultyinfomodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" exceeds max upload size of "+mbsize+"MB<p>");
    }
    else{
      $("#facultyinfomodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" not an image!!!<p>");
    }
  }else {
    $("#facultyinfomodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Please Fill All Data <p>");
  }
})
addliveimgupdate("facultyinfomodalfileuploader","facultyinfomodalthumbnail");

$("#studentworkupload").click(function(){
  var sem=$("#studentworksemselect").val();
  var year=$("#studentworkyearselect").val();
  var title=$("#studentworktitle").val();
  var project=$("#studentworkfile").prop("files");
  //var image=$("#studentworkthumbnail").prop("files");
  if(sem&&year&&title&&project.length){
    $("#studentworkupload-warnings").html("");
    if(project[0].type.indexOf("pdf")<0)
      {
        $("#studentworkupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Selected file in not PDF</p>");
        return;
      }
      var formdata=new FormData();
      formdata.append("title",title);
      formdata.append("sem",sem);
      formdata.append("year",year);
      formdata.append("file",project[0]);
      formdata.append("path","../data/studentswork/");
      addprogressbar("#studentworkupload-meta",project[0].name,"progressbar"+progressid,false);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_studentworks.php","studentworkupload-warnings","viewStudentsWork",null);
      $("#studentworktitle").val("");
      $("#studentworkfile").val("");
  }else{
    $("#studentworkupload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Please Fill All Data </p>");
  }
});

//rsudc teamsubmit click function
$("#rsudcteammodalsubmit").click(function(){
    $("#rsudcteammodalwarnings").html("");
  var name=$('#rsudcteammodalname').val();
  var designation=$('#rsudcteammodaldesignation').val();
  var desc=$('#rsudcteammodaldescription').val();
  var file=$("#rsudcteammodalfileuploader").prop("files");
  if(name&&file.length&&designation&&desc){
    if(file[0].size<maxfilesize&&file[0].type.indexOf("image")>-1){
      var formdata=new FormData();
      formdata.append("name",name);
      formdata.append("designation",designation);
      formdata.append("description",desc);
      formdata.append("file",file[0]);
      formdata.append("path","../data/rsudcteam/");
      addprogressbar("#rsudcteammodalprogress",file[0].name,"progressbar"+progressid,false);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_rsudcteam.php","rsudcteammodalwarnings","rsudcteammodalcleanup",null);
    }
    else if(file[0].size<maxfilesize){
      $("#rsudcteammodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" exceeds max upload size of "+mbsize+"MB<p>");
    }
    else{
      $("#rsudcteammodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" not an image!!!<p>");
    }
  }else {
    $("#rsudcteammodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Please Fill All Data <p>");
  }
})
addliveimgupdate("rsudcteammodalfileuploader","rsudcteammodalthumbnail");

$("#rsudcdevmodalsubmit").click(function(){
    $("#rsudcdevmodalwarnings").html("");
  var name=$('#rsudcdevmodalname').val();
  var desc=$('#rsudcdevmodaldescription').val();
  var file=$("#rsudcdevmodalfileuploader").prop("files");
  if(name&&file.length&&desc){
    if(file[0].size<maxfilesize&&file[0].type.indexOf("image")>-1){
      var formdata=new FormData();
      formdata.append("name",name);
      formdata.append("description",desc);
      formdata.append("file",file[0]);
      formdata.append("path","../data/rsudcdev/");
      addprogressbar("#rsudcdevmodalprogress",file[0].name,"progressbar"+progressid,false);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_rsudcdev.php","rsudcdevmodalwarnings","rsudcdevmodalcleanup",null);
    }
    else if(file[0].size<maxfilesize){
      $("#rsudcdevmodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" exceeds max upload size of "+mbsize+"MB<p>");
    }
    else{
      $("#rsudcdevmodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" not an image!!!<p>");
    }
  }else {
    $("#rsudcdevmodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Please Fill All Data <p>");
  }
})
addliveimgupdate("rsudcdevmodalfileuploader","rsudcdevmodalthumbnail");

$("#alumnimodalsubmit").click(function(){
    $("#alumnimodalwarnings").html("");
  var name=$('#alumnimodalname').val();
  var desc=$('#alumnimodaldescription').val();
  var desg=$('#alumnimodaldesignation').val();
  var cont=$('#alumnimodalcontact').val();
  var year=$('#alumniyearselect').val();
  var file=$("#alumnimodalfileuploader").prop("files");
  if(name&&file.length&&desc&&cont&&desg&&year){
    if(file[0].size<maxfilesize&&file[0].type.indexOf("image")>-1){
      var formdata=new FormData();
      formdata.append("name",name);
      formdata.append("description",desc);
      formdata.append("designation",desg);
      formdata.append("contact",cont);
      formdata.append("year",year);
      formdata.append("file",file[0]);
      formdata.append("path","../data/alumni/");
      addprogressbar("#alumnimodalprogress",file[0].name,"progressbar"+progressid,false);
      fileupload(formdata,"progressbar"+progressid++,"upload_to_alumni.php","alumnimodalwarnings","alumnimodalcleanup",null);
    }
    else if(file[0].size<maxfilesize){
      $("#alumnimodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" exceeds max upload size of "+mbsize+"MB<p>");
    }
    else{
      $("#alumnimodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[0].name+" not an image!!!<p>");
    }
  }else {
    $("#alumnimodalwarnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>Please Fill All Data <p>");
  }
})
addliveimgupdate("alumnimodalfileuploader","alumnimodalthumbnail");
});
