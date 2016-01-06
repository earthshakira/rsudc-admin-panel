-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jan 07, 2016 at 01:51 AM
-- Server version: 5.1.68-community
-- PHP Version: 5.4.16

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rsudc_demo`
--
CREATE DATABASE `rsudc_demo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `rsudc_demo`;

-- --------------------------------------------------------

--
-- Table structure for table `activefrontcarousel`
--

CREATE TABLE IF NOT EXISTS `activefrontcarousel` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Image` varchar(800) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Caption` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `activefrontcarousel`
--

INSERT INTO `activefrontcarousel` (`ID`, `Image`, `Title`, `Caption`) VALUES
(28, '../data/frontcarousel/we8GJLsYmneqlEapaGvLO3WOJSIqTJwVMJBbmrEv5YULVU5imm.jpg', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `frontcarouselgallery`
--

CREATE TABLE IF NOT EXISTS `frontcarouselgallery` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Image` varchar(800) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Caption` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `frontcarouselgallery`
--

INSERT INTO `frontcarouselgallery` (`ID`, `Image`, `Title`, `Caption`) VALUES
(27, '../data/frontcarousel/llwTtuNJNzdZ2UdLpmMCEhmFXuXw4m0ecIvr3UUcRLa8kEMjHp.jpg', NULL, NULL),
(29, '../data/frontcarousel/OVAJQ6fQWRgUykRMG4KOLc9ONjMadtSG1j8JFUM87QwgQeBVPE.jpg', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `imagegallery`
--

CREATE TABLE IF NOT EXISTS `imagegallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `thumbnail` varchar(1500) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `imagegallery`
--

INSERT INTO `imagegallery` (`id`, `name`, `thumbnail`, `count`, `visible`) VALUES
(29, 'mishra', '../data/studentgallery/U4SMLCFuX7YSKrMzPTyDplgGe8nMv5SyXzc5MqlXJYLhZ5qDj5.jpg', 0, 1),
(30, 'Suraj', NULL, 0, 0),
(31, 'Suraj', '../data/studentgallery/UA2oEPrqbSuUBW2QtJpGWttoyTxrqbuN86DVOPQO07rVQ9hdTG.jpg', 0, 1),
(32, 'Mhatre', '../data/studentgallery/oaHjEuz1vCW1DThpi9yLbKebvwhg1Oa6UtSiVQRVfL5BCz2og8.png', 0, 1),
(33, 'kushal', '../data/studentgallery/WVADuhT8VmjT67sDn1rAz4Or2GHsCSGjF5Sf0jQZZZGJt60dM8.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `imagegalleryimages`
--

CREATE TABLE IF NOT EXISTS `imagegalleryimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(1500) NOT NULL,
  `title` varchar(900) NOT NULL,
  `caption` varchar(1500) NOT NULL,
  `galleryid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `galleryid` (`galleryid`),
  KEY `galleryid_2` (`galleryid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=89 ;

--
-- Dumping data for table `imagegalleryimages`
--

INSERT INTO `imagegalleryimages` (`id`, `path`, `title`, `caption`, `galleryid`) VALUES
(55, '../data/studentgallery/U4SMLCFuX7YSKrMzPTyDplgGe8nMv5SyXzc5MqlXJYLhZ5qDj5.jpg', 'My love', ':*', 29),
(56, '../data/studentgallery/qqv2mJH7fqqc55mBkPLbWdkioniLFSmXdPKG0ObjvVTGHLz83p.jpg', '', '', 29),
(57, '../data/studentgallery/swwugaA3cWdJ0aSBSHwfxSDNeycNE3En1eZ73qF7YuEXvLpKS6.jpg', '', '', 29),
(58, '../data/studentgallery/V4MOE2rMzdBk8Isjk8J3ByDqWzUKPhKRchT8xExoN0qZuqLLxw.jpg', '', '', 29),
(59, '../data/studentgallery/g3qmaI8xa56bu0lQSPhEvnVb81HwXBChGr7xzobTjOhs7wmNJT.jpg', '', '', 29),
(60, '../data/studentgallery/hWEmUZltnEfmN8cZKayQkX8S8ejzgdUTiBhilDgLY2dLj0YgWg.jpg', '', '', 29),
(61, '../data/studentgallery/V1lKUIHrOZ0NzpZbG6Qr6DkUj6Cqg7skqL4uMD9dMPWnpV9j81.jpg', '', '', 29),
(62, '../data/studentgallery/0RUJdne8ZG2O49OTFBwVunD2Ll7OcOsl2FAdYd0xfkGTyl4n85.jpg', '', '', 29),
(63, '../data/studentgallery/O8SPTlrF6ncqsOSroLHATOmcq376X5FEW0dHnowzIlL7VsFHtP.jpg', '', '', 29),
(64, '../data/studentgallery/8AGUmCrFH47HE1WQ94CrGjmlclUUcftWCDLPXA0naHVXI4Iozi.jpg', '', '', 29),
(65, '../data/studentgallery/t8k3SNXd7ulUTAXfrVKNtRbGccftlkpg84DEgLnJZgC70UPRxx.jpg', '', '', 29),
(66, '../data/studentgallery/ZBiwxovFsQTke4EmODx6FDJpLGZBARvx6LZyLtHuyCjIVf42RZ.png', '', '', 29),
(67, '../data/studentgallery/82dsmKBa9QcuGbZ3I6rVrsvIAAFvnjSUw0DZfvSmf957MNeQxL.jpg', '', '', 29),
(68, '../data/studentgallery/MDKUI68AtjUC3SMmUTZE1WeQQ7KMl0fN0JWKNRyXavji7eV54a.jpg', '', '', 29),
(69, '../data/studentgallery/npksoRQONwZUsnmvGS2Nl0DvMefQPvsyQjlQECxpCU6vz7EPQJ.jpg', '', '', 29),
(70, '../data/studentgallery/Ca2S6UtuA9lyPd7c0XL0RIK3Al2YWb7O74WcPmYejSdthZ52Wx.jpg', '', '', 29),
(71, '../data/studentgallery/RJW3K7V3YVYwm6G9h79azWXiz3dK6pvfyuW1Jf5L093IcbrzFO.png', '', '', 29),
(72, '../data/studentgallery/wSgi3vT5oktZ94jupWgyMGGEkupJF6LiTJChA5jbRoGXhm44Ye.jpg', '', '', 29),
(73, '../data/studentgallery/Av1QbZKLQ4PE1QulIUramlUZWLB9WfKuio4lviMzwyAuOfJYmY.jpg', '', '', 29),
(74, '../data/studentgallery/DoxYiWyoNp8LYJSNbpRJfoIgw9vCQFPwzoMcxjYl5Stc34StOm.jpg', 'Honda', 'Civic', 29),
(75, '../data/studentgallery/juvHMGZZiDZQcNDrm9vx59HkgMNxcvUnKiBAfB0nzpHr1bL2tT.jpg', '', '', 29),
(76, '../data/studentgallery/gBjIwyixySDbVkH6K5ihCTO9BY3Jj2nsQiDiNtaKeMOKMXULwd.png', '', '', 29),
(77, '../data/studentgallery/UmVNDQFeelT5jzXRWKHvKBsuOl5NIGVRzROGXA6JY3DXd1KQMG.jpg', '', '', 32),
(78, '../data/studentgallery/kAf0jrhdunDrs7C7jR6eDlpfwLp9zSpnTRiV2sng9SwkMQ3C3z.jpg', '', '', 32),
(79, '../data/studentgallery/P6yNcemHZZ52xPO1IJ9lRaafN6usS0aaWQQ7m5zwWHY53972wp.jpg', '', '', 32),
(80, '../data/studentgallery/NRf0U8duGAHPdpxY5l6opCc3LVdrgvXvt3MJvPx5Wvz1TjIwWZ.jpg', '', '', 32),
(81, '../data/studentgallery/hlgMAWKvwAPAoMAe5sEbV76EKHvlUG0ve39P5g3wjhilfzZuJ6.jpg', '', '', 32),
(82, '../data/studentgallery/qpZ6WAIeN1keYiysVwBICicnxGyhDjoLofVGL6TmfXuFMprVPy.jpg', 'yoyoy', 'fgfhgfhgh', 32),
(83, '../data/studentgallery/oaHjEuz1vCW1DThpi9yLbKebvwhg1Oa6UtSiVQRVfL5BCz2og8.png', '', '', 32),
(84, '../data/studentgallery/N3gnitjUdm6i3OQlLqgqOizma1tvjGdIcSujiIx9AM3zw9hq6r.png', '', '', 32),
(88, '../data/studentgallery/UA2oEPrqbSuUBW2QtJpGWttoyTxrqbuN86DVOPQO07rVQ9hdTG.jpg', 'my life', 'wooow', 31);

-- --------------------------------------------------------

--
-- Table structure for table `ntsfacultyinfo`
--

CREATE TABLE IF NOT EXISTS `ntsfacultyinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `ntsfacultyinfo`
--

INSERT INTO `ntsfacultyinfo` (`id`, `name`) VALUES
(8, 'Mr Pan Singh Tomar'),
(9, 'Mr Pan Singh Tomar'),
(10, 'hello'),
(11, 'hello');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imagegalleryimages`
--
ALTER TABLE `imagegalleryimages`
  ADD CONSTRAINT `Foreign Key` FOREIGN KEY (`galleryid`) REFERENCES `imagegallery` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
