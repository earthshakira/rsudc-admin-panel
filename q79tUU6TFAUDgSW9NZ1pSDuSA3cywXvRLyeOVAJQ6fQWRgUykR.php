<?php
session_start();
if(!isset($_SESSION["user"]))
{
header( "Location:./login-f.html" );
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Rachana Sansad|Institute Of Urban and Regional Planning</title>
<meta name="description" content="Home Page For Rachana Sansad Group Of Institutes,Admissions,News And Events,services,Job Openings,etc" />
<meta charset="utf-8" />
<link href="./dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"></link>
<link href="./dist/css/font-awesome.min.css" rel="stylesheet" type="text/css"></link>
<link href="./dist/css/custom.css" rel="stylesheet" type="text/css" ></link>
</head>
<body>

  <div id="ajaxloader">
    <img src="./def/ajaxloader.gif" />
  </div>
  <div class='sidebar'>
    <div class="header">
    <img src="./def/header_logo.gif" />
    </div>
    <div class='sidebar-btn' data-value='frontpagecarousel'><p>Front Page Carousel <i class="glyphicon glyphicon-sound-stereo"></i></p></div>

    <div class='sidebar-btn' data-value='facultyinfo'><p>People <i class="glyphicon glyphicon-blackboard"></i></p></div>

    <div class='sidebar-btn' data-value='studentswork'><p>Students Work <i class="glyphicon glyphicon-folder-close"></i></p></div>

    <div class='sidebar-btn' data-value='rsudc'><p>RSUDC <i class="glyphicon glyphicon-grain"></i></p></div>

    <div class='sidebar-btn' data-value='alumni'><p>Alumni <i class="glyphicon glyphicon-education"></i></p></div>

    <div class='sidebar-btn' data-value='studentgallery'><p>Student Gallery <i class="glyphicon glyphicon-picture"></i></p></div>

  </div>
  <div class='sidebar-mobile'>
    <div class="header">
    </div>
    <div class="mobilemenubtn">
      <hr><hr><hr>
    </div>
    <div id="mobileprimarydropdown" style="display:none" >
      <div class='sidebar-btn' data-value='frontpagecarousel'><p>Front Page Carousel</p></div>
      <div class='sidebar-btn' data-value='facultyinfo'><p>People</p></div>
      <div class='sidebar-btn' data-value='studentswork'><p>Students Work</p></div>
      <div class='sidebar-btn' data-value='rsudc'><p>RSUDC</p></div>
      <div class='sidebar-btn' data-value='alumni'><p>Alumni</p></div>
      <div class='sidebar-btn' data-value='studentgallery'><p>Student Gallery</p></div>
    </div>
  </div>
  <div id='playground'>
    <div class='frontcarouseldragdropupload'>
      <h1>Drop Files Anywhere on the workspace</h1>
    </div>
    <div id='home' class="playpage">
      <div class="container-fluid">
      <div class="jumbotron">
        <h1>homepage</h1>
        <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing
          responsive, mobile-first projects on the web.</p>
      </div>
    </div>
    </div>
    <div id='frontpagecarousel' class="playpage">
      <div id="frontcarouselmodal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Edit Image Data</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <img class="modal-thumbnail img-responsive" id="carouselmodalthumbnail" src="" />
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id='modalnewimagetitle' placeholder="Title (Optional)"/>
                  <br>
                  <textarea class="form-control" id="modalnewimagecaption" placeholder="Caption (Optional)"></textarea>
                  <br>
                  <input class="btn btn-primary" id="modalfileuploader" type="file" id="newimage"/>
                  <div id="carousalmodalprogress">
                  </div>
                  <div id="carousalmodalwarnings"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="carouselmodalsubmit" class="btn btn-success">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Upload Image</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class="info-box-content">
          <div class="container-fluid">
            <input type="text" class="form-control" id='newimagetitle' placeholder="Title (Optional)"/>
            <br>
            <textarea class="form-control" id="newimagecaption" placeholder="Caption (Optional)"></textarea>
            <input class="btn btn-primary" type="file" id="newimage" multiple/>
            <input type="submit" id="frontcarouselimgupload" class='btn btn-primary' value="Upload" />
            <div id="upload-meta">
              <div id="upload-warnings"></div>
            </div>
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Active Carousel</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div id="carouselactivegallery">
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Carousel Gallery</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div id="carouselgallery">
          </div>
        </div>
      </div>
    </div>
    <div id='facultyinfo' class="playpage">
      <div id="facultyinfomodal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Person Data</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <div id="facultyinfomodaluploader" class="beforeupload">
                    <img class="modal-thumbnail" id="facultyinfomodalthumbnail" src="./def/people-placeholder.png" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id='facultyinfomodalname' placeholder="Name"/>
                  <br>
                  <input type="text" class="form-control" id='facultyinfomodaldesignation' placeholder="Designation"/>
                  <br>
                  <textarea  maxlength="10000" class="form-control" id="facultyinfomodaldescription" placeholder="Description"></textarea>
                  <br>
                  <div class="input-group">
                    <div class="radio">
                      <label class="radio-inline"><input type="radio" name="facutlytyperadio" data-value="core">Core Faculty</label>
                      <label class="radio-inline"><input type="radio" name="facutlytyperadio" data-value="visiting">Visiting Faculty</label>
                    </div>
                  </div>
                  <br>
                  <input class="btn btn-primary" style="width:100%;text-align:left" id="facultyinfomodalfileuploader" type="file"/>
                  <div id="facultyinfomodalprogress">
                  </div>
                  <div id="facultyinfomodalwarnings"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="facultyinfomodalsubmit" class="btn btn-success">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">People Dashboard</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div class="peopleGrid peopleGridDefault" onclick="$('#facultyinfomodal').modal()">
            <i class="fa fa-plus-circle"></i>
          </div>
          <div id="peoplegallery">

          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Person Data</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div id="peopledisplayer" class="container-fluid">
            <div class="row">
              <div class="col-sm-6 image"></div>
              <div class="col-sm-6 info"></div>
            </div>
          </div>
          <div id="newfacultyinfoprogress">
          </div>
          <div id="newfacultyinfowarnings"></div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Non-Teaching Staff</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-11"><input type="text" class="form-control" id="ntsfacultyinfo" placeholder="Enter Name of Non Teaching Staff"></div>
              <div class="col-xs-1"><button class="btn btn-primary" id="ntsfacultyinfoadder">Add</button></div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <div id="ntspeopledisplayer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id='studentswork' class="playpage">
      <div class="container-fluid">
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Project Upload</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class="info-box-content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <input style="margin-top:25px;" type="text" class="form-control" id='studentworktitle' placeholder="Title (Optional)"/>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label for="sel1">Year:</label>
                    <select class="form-control" id="studentworkyearselect">
                    </select>
                    <script>
                      var x=document.getElementById("studentworkyearselect");
                      var t=Number((new Date()).getFullYear());
                      t=t+2;
                      for(var i=0;i<15;i++)
                      x.innerHTML+="<option>"+t--+"</option>";
                    </script>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label for="sel1">Semester:</label>
                    <select class="form-control" id="studentworksemselect">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </div>
              <label>Select Document(PDF):</label>
              <input class="btn btn-primary file-label" type="file" id="studentworkfile"  multiple/>
              <input type="submit" id="studentworkupload" class='btn btn-primary' value="Upload" />
              <div id="studentworkupload-meta"></div>
              <div id="studentworkupload-warnings"></div>
            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Project Dashboard</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div class="studentprojectselector">
            </div>
            <div id="studentprojects">
            </div>
          </div>
        </div>
      </div>
      </div>
      <div id='rsudc' class="playpage">
      <div class="container-fluid">
        <div id="rsudcteammodal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add Team Member</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="rsudcteammodaluploader" class="beforeupload">
                      <img class="modal-thumbnail" id="rsudcteammodalthumbnail" src="./def/people-placeholder.png" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id='rsudcteammodalname' placeholder="Name"/>
                    <br>
                    <input type="text" class="form-control" id='rsudcteammodaldesignation' placeholder="Designation"/>
                    <br>
                    <textarea  maxlength="10000" class="form-control" id="rsudcteammodaldescription" placeholder="Description"></textarea>
                    <br>
                    <input class="btn btn-primary" style="width:100%;text-align:left" id="rsudcteammodalfileuploader" type="file"/>
                    <div id="rsudcteammodalprogress">
                    </div>
                    <div id="rsudcteammodalwarnings"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="rsudcteammodalsubmit" class="btn btn-success">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        <div id="rsudcdevmodal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add New Development Cell Activity</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="rsudcdevmodaluploader" class="beforeupload">
                      <img class="modal-thumbnail" id="rsudcdevmodalthumbnail" src="./def/picture-placeholder.png" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id='rsudcdevmodalname' placeholder="Name"/>
                    <br>
                    <textarea  maxlength="10000" class="form-control" id="rsudcdevmodaldescription" placeholder="Description"></textarea>
                    <br>
                    <input class="btn btn-primary" style="width:100%;text-align:left" id="rsudcdevmodalfileuploader" type="file"/>
                    <div id="rsudcdevmodalprogress">
                    </div>
                    <div id="rsudcdevmodalwarnings"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="rsudcdevmodalsubmit" class="btn btn-success">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Team Dashboard</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div class="teamGrid teamGridDefault" onclick="$('#rsudcteammodal').modal()">
              <i class="fa fa-plus-circle"></i>
            </div>
            <div id="rsudcteamgallery">

            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Person Data</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div id="rsudcteamdisplayer" class="container-fluid">
              <div class="row">
                <div class="col-sm-6 image"></div>
                <div class="col-sm-6 info"></div>
              </div>
            </div>
            <div id="newrsudcteamprogress">
            </div>
            <div id="newrsudcteamwarnings"></div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Develepment Cell Activities</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div class="developmentcellGrid developmentcellGridDefault" onclick="$('#rsudcdevmodal').modal()">
              <i class="fa fa-plus-circle"></i>
            </div>
            <div id="rsudcdevgallery">

            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Activity Data</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div id="rsudcdevdisplayer" class="container-fluid">
              <div class="row">
                <div class="col-sm-6 image"></div>
                <div class="col-sm-6 info"></div>
              </div>
            </div>
            <div id="newrsudcdevprogress">
            </div>
            <div id="newrsudcdevwarnings"></div>
          </div>
        </div>
      </div>
    </div>
    <div id='alumni' class="playpage">
      <div class="container-fluid">
        <div id="alumnimodal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add Team Member</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="alumnimodaluploader" class="beforeupload">
                      <img class="modal-thumbnail" id="alumnimodalthumbnail" src="./def/people-placeholder.png" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id='alumnimodalname' placeholder="Name"/>
                    <br>
                    <select class="form-control" id="alumniyearselect">
                    </select>
                    <script>
                      var x=document.getElementById("alumniyearselect");
                      var t=Number((new Date()).getFullYear());
                      for(var i=0;i<15;i++)
                      x.innerHTML+="<option>"+t+" - "+((t--)+2)+"</option>";
                    </script>
                    <br>
                    <input type="text" class="form-control" id='alumnimodalcontact' placeholder="Contact"/>
                    <br>
                    <input type="text" class="form-control" id='alumnimodaldesignation' placeholder="Designation"/>
                    <br>
                    <textarea  maxlength="10000" class="form-control" id="alumnimodaldescription" placeholder="Few Words.."></textarea>
                    <br>
                    <input class="btn btn-primary" style="width:100%;text-align:left" id="alumnimodalfileuploader" type="file"/>
                    <div id="alumnimodalprogress">
                    </div>
                    <div id="alumnimodalwarnings"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="alumnimodalsubmit" class="btn btn-success">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Team Dashboard</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div class="alumniGrid alumniGridDefault" onclick="$('#alumnimodal').modal()">
              <i class="fa fa-plus-circle"></i>
            </div>
            <div id="alumnigallery">

            </div>
          </div>
        </div>
        <div class='info-box'>
          <div class='info-box-head row'>
            <div class="col-sm-11 col-xs-10">
              <h4 class="info-box-title">Person Data</h4>
            </div>
            <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
          </div>
          <div class='info-box-content'>
            <div id="alumnidisplayer" class="container-fluid">
              <div class="row">
                <div class="col-sm-6 image"></div>
                <div class="col-sm-6 info"></div>
              </div>
            </div>
            <div id="newalumniprogress">
            </div>
            <div id="newalumniwarnings"></div>
          </div>
        </div>
      </div>
    </div>
  <div id='studentgallery' class="playpage">
    <div id="studentgallerydeleteconfirm" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Delete Confirmation</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-3 text-center">
                <i class="fa fa-exclamation-triangle" style="font-size:50px;color:#e74c3c"></i>
              </div>
              <div class="col-xs-8">
                <h4 class="text-danger">Are you sure you want to Delete the Entire Gallery(cannot be undone)</h4>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button id="studentgallerydeleterbutton" type="button" class="btn btn-danger">Confirm</button>
            <button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>
          </div>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Create Image Gallery</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div class="row">
            <div class="col-xs-10"><input type="text" id="createstudentgalleryname" class="form-control" placeholder="Enter a Name for your gallery" /></div>
            <div class="col-xs-1"><button class="btn btn-primary" id="createstudentgallerysubmit">Create</button></div>
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Image Galleries</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <h4 class="text-info instructions"> To add images to the galleries simply drag and drop images on the gallery icon or click on the icons to view the gallery</h4>
          <div id="studentgalleryupload-meta">
            <div id="studentgalleryupload-warnings"></div>
          </div>
          <div id="studentgallerygrid">
          </div>
        </div>
      </div>
      <div class='info-box'>
        <div class='info-box-head row'>
          <div class="col-sm-11 col-xs-10">
            <h4 class="info-box-title">Gallery Information</h4>
          </div>
          <div class="col-sm-1 col-xs-2 info-box-minimise" data-visible="true"><i class="glyphicon glyphicon-minus"></i></div>
        </div>
        <div class='info-box-content'>
          <div id="imagegalleryinfo">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <script src="./dist/js/jquery-2.1.4.min.js"></script>
  <script src="./dist/js/jquery.nicescroll.js"></script>
  <script src="./dist/js/bootstrap.min.js"></script>
  <script src="./dist/js/dynamiccarousel.js"></script>
  <script src="./dist/js/infobox.js"></script>
  <script src="./dist/js/custom.js"></script>
  <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
</body>
</html>
