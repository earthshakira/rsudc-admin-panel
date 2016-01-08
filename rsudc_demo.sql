-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2016 at 10:19 AM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rsudc_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `activefrontcarousel`
--

CREATE TABLE IF NOT EXISTS `activefrontcarousel` (
  `ID` int(11) NOT NULL,
  `Image` varchar(800) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Caption` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

CREATE TABLE IF NOT EXISTS `alumni` (
  `id` int(11) NOT NULL,
  `image` varchar(1500) NOT NULL,
  `name` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `designation` varchar(250) NOT NULL,
  `quote` varchar(10000) NOT NULL,
  `year` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`id`, `image`, `name`, `contact`, `designation`, `quote`, `year`) VALUES
(1, '../data/alumniQzSDAD5bpR7WaczCc9wrlEz7WbORQHQppHKYr78gks5vSFcqsd.jpg', 'asdfasdf', 'asdfasdf', ' asdfasdf', 'asdfasdfasdfasdf', '2016 - 2018'),
(2, '../data/alumni/irBM3YeVMJctAWlo2k1af63KOYNBPb5ISqhw3Wd2XreHF8buNK.jpg', 'asdfasdf', 'asdfasdf', ' asdfasdf', 'asdfasdfasdfasdf', '2016 - 2018'),
(3, '../data/alumni/4mpWYdOx5yNNwAdGS3oEe9cGbBXfPDwiMXek5NVhnSXEKoaoL5.jpg', 'afasdf', 'asdfasdf', ' asdfasd', 'fasdfasdf', '2016 - 2018'),
(4, '../data/alumni/TYxbZmFmN1eSaWQrpAAgpT34unk5uY11Mad5aUw01G10btiNYI.jpg', 'asdfsd', 'asdfasd', ' asdfasd', 'fasdfasdf', '2016 - 2018'),
(5, '../data/alumni/sSBtosxJ5IbYQ7EqxExNvMViAtpF8b56YUyks5UzrHJyfd7uKC.jpg', 'sdgsdfg', 'sdfgsdf', ' gsdfg', 'sdfgsdfg', '2016 - 2018');

-- --------------------------------------------------------

--
-- Table structure for table `facultyinfo`
--

CREATE TABLE IF NOT EXISTS `facultyinfo` (
  `id` int(11) NOT NULL,
  `image` varchar(1500) NOT NULL,
  `name` varchar(250) NOT NULL,
  `designation` varchar(250) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `type` enum('core','visiting') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `frontcarouselgallery`
--

CREATE TABLE IF NOT EXISTS `frontcarouselgallery` (
  `ID` int(11) NOT NULL,
  `Image` varchar(800) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Caption` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `frontcarouselgallery`
--

INSERT INTO `frontcarouselgallery` (`ID`, `Image`, `Title`, `Caption`) VALUES
(1, '../data/frontcarousel/JqAzF7FxnBpYZ5EQ3kICHvsgvmdfy5QxtrGCjCzrHkRtJOnIYM.jpg', 'sfgsdfg', ' sdfgsdfg'),
(2, '../data/frontcarousel/uAxr250wlGufglzk9wlZQdpWFRQpurg6ErKfZNTzQ0Nh4135Zj.jpg', NULL, NULL),
(3, '../data/frontcarousel/sCho59oYiEcqEO1ehRIlKwCea0zR72VIHPvLv6GsD5hLFuEbIw.jpg', NULL, NULL),
(4, '../data/frontcarousel/AEibzE02cXqksbgoNpJ4cfzH8LY8zzFIYLTijWlc3aeha4jT7I.jpg', NULL, NULL),
(5, '../data/frontcarousel/9BGj3oWYO6LAfGLSHC030Q6QxR8s7CIB5BVwiLmV6A61k1Lyky.jpg', NULL, NULL),
(6, '../data/frontcarousel/KetRtqR7lSY4VjbalWjo9uIctbfzUJdYwmvnVMqfddQyYn6Liv.jpg', NULL, NULL),
(7, '../data/frontcarousel/avjTpsqMY8YhrdhSVWcx015IMFMoQCB3h5qDHNACbWVZkgMceY.jpg', NULL, NULL),
(8, '../data/frontcarousel/pznhg7aZsCtnfWh4ko38UQLbJDSh0An3s4HAhVQsetgMuAV8OA.jpg', NULL, NULL),
(9, '../data/frontcarousel/EEmUADHSl8j9eBjV70iWlNloKY31FZw3WPkbWVADuhT8VmjT67.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `imagegallery`
--

CREATE TABLE IF NOT EXISTS `imagegallery` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `thumbnail` varchar(1500) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `imagegallery`
--

INSERT INTO `imagegallery` (`id`, `name`, `thumbnail`, `count`, `visible`) VALUES
(35, 'MY Gallery', NULL, 0, 1),
(36, 'wooow', NULL, 0, 1),
(37, 'hello', NULL, 0, 1),
(38, 'asdfasdf', NULL, 0, 1),
(39, 'asdf ', NULL, 0, 1),
(40, 'asdf', NULL, 0, 1),
(41, 'asdf', NULL, 0, 1),
(42, 'asdf', NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `imagegalleryimages`
--

CREATE TABLE IF NOT EXISTS `imagegalleryimages` (
  `id` int(11) NOT NULL,
  `path` varchar(1500) NOT NULL,
  `title` varchar(900) NOT NULL,
  `caption` varchar(1500) NOT NULL,
  `galleryid` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `imagegalleryimages`
--

INSERT INTO `imagegalleryimages` (`id`, `path`, `title`, `caption`, `galleryid`) VALUES
(89, '../data/studentgallery/VXVFapX53Kqg16w434YPCI0oFEl6HXbNFffP1CM2LDtMlpySJx.jpg', '', '', 42),
(90, '../data/studentgallery/KGp7g2kIOiXsEhhVsmKcsnlToEx6s2honT4Tn3QabR5kZ9LXwh.jpg', '', '', 42),
(91, '../data/studentgallery/la15OxbUB9eBICTuB2nrfZpN5zco8nuyPvsa8xRxyATw1eht1z.jpg', '', '', 42),
(92, '../data/studentgallery/gdvbw7Yci0najdbdLCmVpxnoqOcdyOjt0mFLvNJbgZul0fpjXr.jpg', '', '', 42),
(93, '../data/studentgallery/36cUcfREo84V0eUYQwXugtkJ72CnJHUEYpOiaEowapg2j7w4sL.jpg', '', '', 42),
(94, '../data/studentgallery/KkVO32zf0VJvIbhANzwWigjyQ10Sw2rSV1X28dokLl7cUAWD8H.jpg', '', '', 42),
(95, '../data/studentgallery/e6zTPzNS4vTSNSsBm9BhBiUDSMsSZzSIk9eoJt7Cv0DAxJn397.jpg', '', '', 42),
(96, '../data/studentgallery/rdb7pOZdo1qnYBO3fLZfOdkoKbEtFnjYE29PiQvxH3d3snEQE1.jpg', '', '', 42),
(97, '../data/studentgallery/rGPU4zPufzGxtKDSGImRmy6luSAFvM1EoP7FD86xbiHDvo8LA2.jpg', '', '', 42),
(98, '../data/studentgallery/Fc76frDNx6LofxY0BAgcjB46ApnhamERfjRoABt0m3thi2ijDo.jpg', '', '', 40),
(99, '../data/studentgallery/Rj82Ba8eUgbu65m02Bgu3gYcZ37OdqKzxmuakkpRqi8laJJQoA.jpg', '', '', 40),
(100, '../data/studentgallery/6jSjP5lN2rtCXeeliN44gYZoB6qqv2mJH7fqqc55mBkPLbWdki.jpg', '', '', 40),
(101, '../data/studentgallery/3YxgKSNz7DeyvKUpKarTdnVbJkW1EuzDNQrIxQDvHtJIDcQzbY.jpg', '', '', 40),
(102, '../data/studentgallery/UVUoDkv02TBsbR5JGVggDjZ4CKCzJsZLz8s7e1PAiOuESLghxy.jpg', '', '', 40),
(103, '../data/studentgallery/WG4rRvQ31mEyUlINt4M8cB2o3xdUuZxyuxIFwhX4yO072d4FY6.jpg', '', '', 41),
(104, '../data/studentgallery/O4smrfc0f6XZjQAidbqm4mjbs5Bety8sIwflhbMQLh5rf015k5.jpg', '', '', 41),
(105, '../data/studentgallery/Th5JAX9GqCB9fc0Qpbv0JyEkALy1OMNQK4uZeBeaCS5CJOG3WU.jpg', '', '', 41),
(106, '../data/studentgallery/5G48UftXeWZkEuYJh6f8Gxb0XXAjI8Qw3fMBx2J1hIxKS0zgq6.jpg', '', '', 41),
(107, '../data/studentgallery/DwvL70cbPF858ZoGRVyIlXIns3uoxGXZpNHSqTPhrUVUNl6Zj8.jpg', '', '', 41),
(108, '../data/studentgallery/WfmMwTLetESYQJyXgR7EPfq16CPzcb8eHGJtIjriPNB88m4YdI.jpg', '', '', 41),
(109, '../data/studentgallery/bhc5N1DbeFEflbPYu3gAudyOHaMRYSxrDMWNwTyD1EubV1l8Cu.jpg', '', '', 41),
(110, '../data/studentgallery/TujHqjETS6dqKXf8Ztrm3L1XXoIg7sJ8xzNSFN7nuLqXtyVtzK.jpg', '', '', 41),
(111, '../data/studentgallery/uWpr1A46cHBNRgCdmIczx3VCKJVxOIM45tzrpZTl8IQ06C1aEc.jpg', '', '', 41),
(112, '../data/studentgallery/cKU1EHa5OeeDf3ra3oDDQYauIZTJeb7OvLIH8s1SctSijxDqyR.jpg', '', '', 41),
(113, '../data/studentgallery/yMGhWy06DDsSHeUAK3GHQkEbCL8w9BYE1xx4lOEKH7E8cHocpf.jpg', '', '', 41),
(114, '../data/studentgallery/R2NyB5va1ay2j6VLeg3qXsWDf33shUkwOkhT2bQbGNvtY2dnCe.jpg', '', '', 41);

-- --------------------------------------------------------

--
-- Table structure for table `ntsfacultyinfo`
--

CREATE TABLE IF NOT EXISTS `ntsfacultyinfo` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ntsfacultyinfo`
--

INSERT INTO `ntsfacultyinfo` (`id`, `name`) VALUES
(1, 'asdfasdfasdf'),
(2, 'asdfasdfasdfadsf'),
(3, 'asdfasdf'),
(4, 'sdfadsfasdfasdf'),
(5, 'sdfadsfasdfasdf'),
(6, 'asdfasdf'),
(7, 'asdfasdf'),
(8, 'as'),
(9, 'as'),
(10, 'df'),
(11, 'df'),
(12, 'asdf'),
(13, 'asdf'),
(14, 'asd'),
(15, 'asd'),
(16, 'f'),
(17, 'f'),
(18, 'asdf'),
(19, 'asdf'),
(20, 'as'),
(21, 'as'),
(22, 'df'),
(23, 'df'),
(24, 'asd'),
(25, 'asd'),
(26, 'f'),
(27, 'f'),
(28, 'asd'),
(29, 'asd'),
(30, 'f'),
(31, 'f'),
(32, 'asd'),
(33, 'asd'),
(34, 'a'),
(35, 'a'),
(36, 'sdf'),
(37, 'sdf'),
(38, 'a'),
(39, 'a'),
(40, 'df'),
(41, 'df'),
(42, 'as'),
(43, 'as'),
(44, 'df'),
(45, 'df'),
(46, 'asd'),
(47, 'asd'),
(48, 'fa'),
(49, 'fa'),
(50, 'df'),
(51, 'df'),
(52, 'as'),
(53, 'as'),
(54, 'f'),
(55, 'f'),
(56, 'asd'),
(57, 'asd'),
(58, 'f'),
(59, 'f'),
(60, 'asd'),
(61, 'asd'),
(62, 'a'),
(63, 'a'),
(64, 'f'),
(65, 'f'),
(66, 'as'),
(67, 'as'),
(68, 'f'),
(69, 'f'),
(70, 'asd'),
(71, 'asd'),
(72, 'fa'),
(73, 'fa'),
(74, 'df'),
(75, 'df'),
(76, 'a'),
(77, 'a'),
(78, 'sdf'),
(79, 'sdf'),
(80, 'asd'),
(81, 'asd'),
(82, 'fa'),
(83, 'fa'),
(84, 'sdf'),
(85, 'sdf'),
(86, 'asd'),
(87, 'asd'),
(88, 'f'),
(89, 'f'),
(90, 'asdf'),
(91, 'asdf'),
(92, 'as'),
(93, 'as'),
(94, 'df'),
(95, 'df'),
(96, 'asdf'),
(97, 'asdf'),
(98, 'as'),
(99, 'as'),
(100, 'df'),
(101, 'sdfgsdfgsdfgdsfgdfgsdfgdsfgsdfg'),
(102, 'asd'),
(103, 'asd'),
(104, 'f'),
(105, 'f'),
(106, 'sdf'),
(107, 'sdf'),
(108, 'as'),
(109, 'as'),
(110, 'df'),
(111, 'df'),
(112, 'asd'),
(113, 'asd'),
(114, 'asdf'),
(115, 'asdf'),
(116, 'asd'),
(117, 'asd'),
(118, 'f'),
(119, 'f'),
(120, 'asd'),
(121, 'asd'),
(122, 'fa'),
(123, 'fa');

-- --------------------------------------------------------

--
-- Table structure for table `rsudcdev`
--

CREATE TABLE IF NOT EXISTS `rsudcdev` (
  `id` int(11) NOT NULL,
  `image` varchar(1500) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(10000) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rsudcteam`
--

CREATE TABLE IF NOT EXISTS `rsudcteam` (
  `id` int(11) NOT NULL,
  `image` varchar(1500) NOT NULL,
  `name` varchar(250) NOT NULL,
  `designation` varchar(250) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `type` enum('core','visiting') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `studentswork`
--

CREATE TABLE IF NOT EXISTS `studentswork` (
  `id` int(11) NOT NULL,
  `file` varchar(1500) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `year` int(11) NOT NULL,
  `sem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activefrontcarousel`
--
ALTER TABLE `activefrontcarousel`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facultyinfo`
--
ALTER TABLE `facultyinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frontcarouselgallery`
--
ALTER TABLE `frontcarouselgallery`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `imagegallery`
--
ALTER TABLE `imagegallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagegalleryimages`
--
ALTER TABLE `imagegalleryimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galleryid` (`galleryid`),
  ADD KEY `galleryid_2` (`galleryid`);

--
-- Indexes for table `ntsfacultyinfo`
--
ALTER TABLE `ntsfacultyinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rsudcdev`
--
ALTER TABLE `rsudcdev`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rsudcteam`
--
ALTER TABLE `rsudcteam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentswork`
--
ALTER TABLE `studentswork`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activefrontcarousel`
--
ALTER TABLE `activefrontcarousel`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `facultyinfo`
--
ALTER TABLE `facultyinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `frontcarouselgallery`
--
ALTER TABLE `frontcarouselgallery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `imagegallery`
--
ALTER TABLE `imagegallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `imagegalleryimages`
--
ALTER TABLE `imagegalleryimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=115;
--
-- AUTO_INCREMENT for table `ntsfacultyinfo`
--
ALTER TABLE `ntsfacultyinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT for table `rsudcdev`
--
ALTER TABLE `rsudcdev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `rsudcteam`
--
ALTER TABLE `rsudcteam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `studentswork`
--
ALTER TABLE `studentswork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
