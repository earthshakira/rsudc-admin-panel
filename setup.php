<?php
require_once("connection.php");

$sql=array("
  CREATE TABLE IF NOT EXISTS  activefrontcarousel  (
     ID  int(11) NOT NULL,
     Image  varchar(800) NOT NULL,
     Title  varchar(500) DEFAULT NULL,
     Caption  varchar(1000) DEFAULT NULL
  ) ENGINE=\"InnoDB\" DEFAULT CHARSET=\"latin1\";","

  CREATE TABLE IF NOT EXISTS alumni(
     id  int(11) NOT NULL,
     image varchar(1500) NOT NULL,
     name varchar(250) NOT NULL,
     contact varchar(250) NOT NULL,
     designation  varchar(250) NOT NULL,
     quote varchar(10000) NOT NULL,
     year  varchar(25) NOT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=8 DEFAULT CHARSET=\"utf8\";","

  CREATE TABLE IF NOT EXISTS  facultyinfo  (
     id int(11) NOT NULL,
     image varchar(1500) NOT NULL,
     name varchar(250) NOT NULL,
     designation  varchar(250) NOT NULL,
     description  varchar(10000) NOT NULL,
     type  enum( 'core' , 'visiting' ) NOT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=7 DEFAULT CHARSET=\"utf8\";","


  CREATE TABLE IF NOT EXISTS  frontcarouselgallery  (
     ID  int(11) NOT NULL,
     Image  varchar(800) NOT NULL,
     Title  varchar(500) DEFAULT NULL,
     Caption  varchar(1000) DEFAULT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=10 DEFAULT CHARSET=\"latin1\";","



  CREATE TABLE IF NOT EXISTS  imagegallery  (
     id  int(11) NOT NULL,
     name  varchar(500) NOT NULL,
     thumbnail  varchar(1500) DEFAULT NULL,
     count  int(11) DEFAULT  0 ,
     visible  tinyint(1) NOT NULL DEFAULT  1
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=43 DEFAULT CHARSET=\"latin1\";","


  CREATE TABLE IF NOT EXISTS  imagegalleryimages  (
     id  int(11) NOT NULL,
     path  varchar(1500) NOT NULL,
     title  varchar(900) NOT NULL,
     caption  varchar(1500) NOT NULL,
     galleryid  int(11) DEFAULT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=115 DEFAULT CHARSET=\"latin1\";","

  CREATE TABLE IF NOT EXISTS  ntsfacultyinfo  (
     id  int(11) NOT NULL,
     name  varchar(150) NOT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=124 DEFAULT CHARSET=\"latin1\";","

  CREATE TABLE IF NOT EXISTS  rsudcdev  (
     id  int(11) NOT NULL,
     image  varchar(1500) NOT NULL,
     name  varchar(250) NOT NULL,
     description  varchar(10000) NOT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=5 DEFAULT CHARSET=\"utf8\";","

  CREATE TABLE IF NOT EXISTS  rsudcteam  (
     id  int(11) NOT NULL,
     image  varchar(1500) NOT NULL,
     name  varchar(250) NOT NULL,
     designation  varchar(250) NOT NULL,
     description  varchar(10000) NOT NULL
  ) ENGINE=\"InnoDB\" AUTO_INCREMENT=20 DEFAULT CHARSET=\"utf8\";","


  CREATE TABLE IF NOT EXISTS  studentswork  (
     id  int(11) NOT NULL,
     file  varchar(1500) NOT NULL,
     title  varchar(1000) NOT NULL,
     year  int(11) NOT NULL,
     sem  int(11) NOT NULL
  ) ENGINE=\"InnoDB\" DEFAULT CHARSET=\"utf8\";","

  ALTER TABLE  activefrontcarousel
    ADD PRIMARY KEY ( ID );","

  ALTER TABLE  alumni
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  facultyinfo
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  frontcarouselgallery
    ADD PRIMARY KEY ( ID );","

  ALTER TABLE  imagegallery
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  imagegalleryimages
    ADD PRIMARY KEY ( id ),
    ADD KEY  galleryid  ( galleryid ),
    ADD KEY  galleryid_2  ( galleryid );","

  ALTER TABLE  ntsfacultyinfo
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  rsudcdev
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  rsudcteam
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  studentswork
    ADD PRIMARY KEY ( id );","

  ALTER TABLE  activefrontcarousel
    MODIFY  ID  int(11) NOT NULL AUTO_INCREMENT;","

  ALTER TABLE  alumni
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  facultyinfo
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  frontcarouselgallery
    MODIFY  ID  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  imagegallery
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  imagegalleryimages
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  ntsfacultyinfo
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  rsudcdev
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  rsudcteam
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;","

  ALTER TABLE  studentswork
    MODIFY  id  int(11) NOT NULL AUTO_INCREMENT;","

  ALTER TABLE  imagegalleryimages ADD CONSTRAINT  garelyimagerelation  FOREIGN KEY ( galleryid ) REFERENCES  imagegallery  ( id ) ON DELETE CASCADE ON UPDATE CASCADE;");

foreach ($sql as $sq) {
  if ($conn->query($sq) === TRUE) {
      echo "Setup done<br>";
  } else {
      echo "error:".$conn->error;
  }
}

  mkdir("../data");
  mkdir("../data/facultyinfo");
  mkdir("../data/rsudcteam");
  mkdir("../data/rsudcdev");
  mkdir("../data/studentswork");
  mkdir("../data/frontcarousel");
  mkdir("../data/studentgallery");
  mkdir("../data/alumni");
  mkdir("../images");
  mkdir("../images/thumb");
  mkdir("../images/medium");
  mkdir("../images/full");

 ?>
