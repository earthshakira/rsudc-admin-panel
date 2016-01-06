var progressid=0;
var warningtext=0;
var maxfilesize=524288000;
var mbsize=maxfilesize/1024/1024;
var uploaddebug=false;
var loaderdisplay=0;
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
    else{
      $("#upload-warnings").html("<p class='text-danger'><i class='glyphicon glyphicon-warning-sign'></i>"+file[i].name+" exceeds max upload size of "+mbsize+"MB<p>");
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
  var d1=document.getElementById(div1);
  var d2=document.getElementById(div2);
  if(d1.offsetHeight<window.innerHeight)offsetTop=window.innerHeight;
  else offsetTop=d1.offsetHeight;
      $("#"+wrapper).css("overflow-y","hidden");
      d2.style.top=offsetTop+"px";
      $("#"+div2).css("display","block");
      $("#"+div1).animate({top:"-"+offsetTop+'px'},time,function(){
        $("#"+div1).css("display","none");
      });
      $("#"+div2).animate({top:'20px'},time,function(){
        $("#"+div1).css("display","none");
        $("#"+wrapper).css("overflow-y","auto");
      });
}
$(document).ready(function(){
  var active="facultyinfo";
  $("#"+active).slideDown();
  viewCarouselActive();
  viewGallery();
  viewntsPeople();
  viewStudentGallery();
  viewStudentGalleryImages();
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
    $("#mobileprimarydropdown").slideUp("fast");
    $(".mobilemenubtn").attr("data-view","close");
  });

  addliveimgupdate("modalfileuploader","carouselmodalthumbnail");
  $(".sidebar-btn").click(function(){
    var next=$(this).attr("data-value");
      if(active==next)return;
      pageslider(active,next,"playground",1000);
      active=next;
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
//Drag and Drop controllers
addliveimgupdate("facultyinfomodalfileuploader","facultyinfomodalthumbnail");

var dropzone=document.getElementById('facultyinfomodaluploader');
dropzone.ondrop=function(e){
  e.preventDefault();
      // var file=e.dataTransfer.files;
      // if(file[i].size<maxfilesize&&file[i].type.indexOf("image")>=0){
      // var formdata=new FormData();
      // formdata.append("file",file[i]);
      // formdata.append("path","../data/frontcarousel/");
      // addprogressbar("#upload-meta",file[i].name,"progressbar"+progressid,true);
      // fileupload(formdata,"progressbar"+progressid++,"upload_to_gallery.php","upload-warnings","viewGallery",null);
  //   }
  //   else if(file[i].size>=maxfilesize){
  //
  //   }else if(file[i].type.indexOf("image")<0){
  //
  //   }
  // }
}
dropzone.ondragover=function(){
  $('.frontcarouseldragdropupload').css("display","block");
  return false;
}
dropzone.ondragleave=function(){
  $('.frontcarouseldragdropupload').css("display","none");
  return false;
}
});
