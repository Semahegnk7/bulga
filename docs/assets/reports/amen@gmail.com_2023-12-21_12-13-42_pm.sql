-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2023 at 02:16 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jsmisdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `department_id` varchar(255) DEFAULT NULL,
  `publish_date` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail`
--

CREATE TABLE `audit_trail` (
  `id` int(11) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `object_type` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `date_send` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `reply_status` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `comp_email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `updated_date` varchar(255) DEFAULT NULL,
  `upload_date` varchar(255) DEFAULT NULL,
  `uploaded_by` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `goth`
--

CREATE TABLE `goth` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `goth_name` varchar(255) DEFAULT NULL,
  `kebele_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `goth`
--

INSERT INTO `goth` (`id`, `description`, `goth_name`, `kebele_name`) VALUES
(2, 'asfsafd', 'goth2', 'kebel 2'),
(3, 'Chelekileke goth', 'Chelekileke', 'Tulefa 02'),
(7, 'Bole zoth in tulefa 02 kebele', 'Bole', 'Tulefa 02');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(85);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `department_id` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `job_seeker`
--

CREATE TABLE `job_seeker` (
  `id` int(11) NOT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `educational_level` varchar(255) DEFAULT NULL,
  `employed_at` varchar(255) DEFAULT NULL,
  `employed_date` varchar(255) DEFAULT NULL,
  `employee_status` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `graduated_at` varchar(255) DEFAULT NULL,
  `graduated_date` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `termination_date` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `job_seeker_letter` varchar(255) DEFAULT NULL,
  `goth_name` varchar(255) DEFAULT NULL,
  `kebele_name` varchar(255) DEFAULT NULL,
  `trained_at` varchar(255) DEFAULT NULL,
  `trained_date` varchar(255) DEFAULT NULL,
  `skill_covered` varchar(255) DEFAULT NULL,
  `trained_end_date` varchar(255) DEFAULT NULL,
  `employment_type` varchar(255) DEFAULT NULL,
  `house_wife` varchar(255) DEFAULT NULL,
  `is_disabled` varchar(255) DEFAULT NULL,
  `return_from_arab` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_seeker`
--

INSERT INTO `job_seeker` (`id`, `date_of_birth`, `educational_level`, `employed_at`, `employed_date`, `employee_status`, `first_name`, `gender`, `graduated_at`, `graduated_date`, `is_active`, `last_name`, `middle_name`, `password`, `phone`, `termination_date`, `user_name`, `department`, `description`, `job_seeker_letter`, `goth_name`, `kebele_name`, `trained_at`, `trained_date`, `skill_covered`, `trained_end_date`, `employment_type`, `house_wife`, `is_disabled`, `return_from_arab`, `experience`) VALUES
(26, '16', 'diploma', NULL, NULL, 'HIRED', 'nati', 'Female', 'sfj', '2023-11-15T21:00:00.000Z', b'1', 'Abeje', 'chala', '$2a$10$98PdYKUsVTALVSzCFlk08.JkCnMtbZ5JrGGRcITQXQhdxGyFFhvG2', '09257487', NULL, 'kafj', 'jsfj', 'sdfghjk', 'dfghj', 'test got', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, '12', 'sgsg', NULL, NULL, 'Seeker', 'test', 'Male', 'sg', '2001-11-30T21:00:00.000Z', b'1', 'sgs', 'sgsg', '$2a$10$HEnpLW78Ur/lsNN5VIDC9uFmU50jn77b17aSPUmMZtaVcezEhhtW6', 'sgs', NULL, 'sgsg', 'sgs', 'dgsg', 'dgdg', 'new', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, '12', 'dsgsdg', NULL, NULL, 'SEEKER', 'dfgsd', 'Female', 'dgsg', '0122-12-31T21:32:44.000Z', b'0', 'sdgsg', 'sgfs', '$2a$10$zaqt6f994N5OaS0yW.elYO8JK510cZygjwOckL./.8gyOZ1DjwlPe', 'sgsg', NULL, 'sgsg', 'resert', 'dsgsd', '334', 'test got', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, '12', '12', NULL, NULL, 'SEEKER', 'sdfgsdg', 'Male', 'sfsf', '2001-11-30T21:00:00.000Z', b'0', 'sfdfgsg', 'sdfgsdfg', '$2a$10$hnJa/B.gFXjhGYBe29tnm.uOdw6pxdMS4aLQbnxxt7P41LkUpTbAO', 'sdfgs', NULL, 'sfdgsg', 'computer ', '', 'dgdg', 'test got', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(45, '12', '12', 'Sheno', NULL, 'HIRED', 'Amanu', 'Male', 'sfsf', '2001-11-30T21:00:00.000Z', b'1', 'sfdfgsg', 'feleke', '$2a$10$ElbmN0vZH5vDcon0GCqkA.nkNdPzD2klfbrU3JA9p0sxJJddy5qay', 'sdfgs', '2123-05-12', 'sfdgsg', 'computer ', '', 'dgdg', 'test got', 'kebel 2', 'sdfa', '12/12/2021', 'computer', '13/12/2024', 'Contract', NULL, NULL, NULL, NULL),
(47, '21', 'afa', NULL, NULL, 'TRAINED', 'sfdsfd', 'Female', 'dfgdfg', '2001-11-30T21:00:00.000Z', b'1', 'afda', 'safdsa', '$2a$10$8MjTNXxLLdDGdKIl4u6XV.T7ay3LGYJbhsa1dFRrlvniNKtSNzlpC', 'afda', NULL, 'amse@gmail.com', 'dgdsg', 'dfg', 'dfgdsg', 'new', 'kebel 2', 'sfafaf', '1212-02-12', 'dafd', '12121-12-31', NULL, NULL, NULL, NULL, NULL),
(48, '21', 'dgdg', NULL, NULL, 'SEEKER', 'gfsdgf', 'Male', 'dfgsdg', '2001-11-30T21:00:00.000Z', b'0', 'sgsg', 'sgfsg', '$2a$10$M6zSrKSY9P9nvoSWMc1Rw.WkTG5N/204iH/j2E6SqggZxwNtgiAmu', '3435646', NULL, 'amse@gmail.com2', 'dfgds', '', 'dgdg', 'new', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, '24', 'Degree', NULL, NULL, 'HIRED', 'Melkamu', 'Male', 'DB', '2023-12-10T21:00:00.000Z', b'1', 'Sifter', 'Tebeje', '$2a$10$trggG9BR5uiNvQ6qWBYjreLJF6rQ2L2SyFjE4sb6kFVTmvfjHUKGe', '0965874123', NULL, 'melk@gamil.com', 'CS', 'Computer , communication', 'sfsaf', 'test got', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(63, '12', 'afaf', NULL, NULL, 'Seeker', 'sfaf', 'Female', 'sfaf', '2023-12-20T21:00:00.000Z', b'0', 'afa', 'afaf', '$2a$10$dmZUgSGjaHkjg3U1HHk4PeZCHwWIsW5YQFFrf3vTt0Jm9Q5RP44kO', 'afaf', NULL, 'sem@gmail.com', 'afa', '', 'sfsf', 'goth2', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(64, '12', 'afaf', NULL, NULL, 'Seeker', 'rsgf', 'Female', 'afa', '2023-12-29T21:00:00.000Z', b'0', 'sgs', 'sdfgsdg', '$2a$10$TwVViEDeSU33eanPNz3o../02Cvl3ByqwEQd.RzWRPS1bkTaADk42', 'sfsf', NULL, 'sfgsg@gmai.com', 'afa', '', '', 'goth2', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(65, '23', 'sss', NULL, NULL, 'Seeker', 'sss', 'Female', 'sss', '2023-12-21T21:00:00.000Z', b'0', 'sss', 'ssss', '$2a$10$M6y4ks/bMUh066pNJLdZIuZNtz4RfXxoV9kV6kOpq5z.LSq4Li8J.', 'sss', NULL, 'sss@ss', 'sss', 'ss', 'ssss', 'Chelekileke', 'Tulefa 02', NULL, NULL, NULL, NULL, NULL, 'true', 'true', 'true', NULL),
(66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, b'0', NULL, NULL, '$2a$10$bYNxeISZeiVSxk3Tql0jUO./7fgRLidHnptMGhoM6mTUuDMSw3MMa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(67, '23', 'Degree', NULL, NULL, 'SEEKER', 'Amare', 'Female', 'Debre Berhan', '2021-06-08T21:00:00.000Z', b'0', 'Melkamu', 'terefe', '$2a$10$YD/PmGe6QgAI/x/QQvqtjOLdRfkp9L.6VKxYaimUhmtcdjDvXTpRm', 'jsfoiwre', NULL, 'am@gmail.com', 'CS', '', 'no', 'goth2', 'kebel 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(68, '23', 'Illiterate', NULL, NULL, 'SEEKER', 'dfgsfg', 'Female', 'asfdf', '2023-12-21T21:00:00.000Z', b'0', 'akfaf', 'safas', '$2a$10$IItyHHHLiyl2XAz8jTo5RuuyExSGaAiBKmHUmSYKQ2wKSDo7LZSxe', '2938', NULL, 'ada@gmai.com', '', '', 'ada@gmai.com.docx', 'Chelekileke', 'Tulefa 02', NULL, NULL, NULL, NULL, NULL, 'true', 'true', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `kebele`
--

CREATE TABLE `kebele` (
  `id` int(11) NOT NULL,
  `kebele_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kebele`
--

INSERT INTO `kebele` (`id`, `kebele_name`, `description`) VALUES
(3, 'kebel 2', 'kebele 2 description'),
(4, 'Tulefa 02', 'tulefa 02 kebele');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `permission_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `description`, `permission_name`) VALUES
(1, 'Job Seeker Registration', 'JOB_SEEKER_REGISTRATION'),
(2, 'Upload bulk data', 'UPLOAD_BULK_DATA');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `date_added` varchar(255) DEFAULT NULL,
  `f_remark` varchar(255) DEFAULT NULL,
  `last_modified` varchar(255) DEFAULT NULL,
  `last_seen` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `uploaded_by` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `sira_hidet` varchar(255) DEFAULT NULL,
  `office` varchar(255) DEFAULT NULL,
  `woreda` varchar(255) DEFAULT NULL,
  `zone` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `attachment`, `date_added`, `f_remark`, `last_modified`, `last_seen`, `name`, `remark`, `uploaded_by`, `status`, `sira_hidet`, `office`, `woreda`, `zone`) VALUES
(84, 'admin123_2023-12-18_18-26-28_pm.docx', '2023-12-18 18:26:28 pm', NULL, NULL, NULL, 'በ2015  በጀት', 'በ2015  በጀት አመት እስከ  ጥር  ወር  2015 ዓ.ም በመንግስት መ/ቤቶችና የልማት ድርጅቶች በቋሚነት የተቀጠሩ የዩኒቪርሲቲና የቴክኒክና ሙያ ', 'admin123', 'Draft', 'ADMIN', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_setting`
--

CREATE TABLE `tbl_setting` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `comp_values` varchar(255) DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `eastablishment` varchar(255) DEFAULT NULL,
  `marque` varchar(255) DEFAULT NULL,
  `media_icon` varchar(255) DEFAULT NULL,
  `mission` varchar(255) DEFAULT NULL,
  `operationg_hour` varchar(255) DEFAULT NULL,
  `org_structure` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `public_reg` varchar(255) DEFAULT NULL,
  `vission` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_setting`
--

INSERT INTO `tbl_setting` (`id`, `address`, `comp_values`, `company_email`, `eastablishment`, `marque`, `media_icon`, `mission`, `operationg_hour`, `org_structure`, `phone`, `public_reg`, `vission`) VALUES
(2, 'Bulg City Administrtaion', NULL, 'bulga@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'true', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `educational_level` varchar(255) DEFAULT NULL,
  `employee_status` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `hire_date` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `termination_date` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `address`, `date_of_birth`, `department`, `educational_level`, `employee_status`, `experience`, `first_name`, `gender`, `hire_date`, `is_active`, `last_name`, `middle_name`, `password`, `phone`, `role`, `termination_date`, `user_name`) VALUES
(49, 'aa', '2001-11-30T21:00:00.000Z', 'Information System', NULL, '098834234', 'che', 'Admin', '12', '2001-11-30T21:00:00.000Z', b'1', '123', 'User', '$2a$10$5WABmFJZHqa9walyxc..G.mcWkA8b0jAKtX9dDRyeDyUjoZSjw97S', 'Male', 'ADMIN', '2001-11-30T21:00:00.000Z', 'admin123'),
(61, 'afaf', NULL, 'afa', NULL, NULL, NULL, 'sfdasf', 'Female', NULL, b'1', 'afa', 'afasf', '$2a$10$SKiNAzWraxfKnbKBGCMysOzOPs3i3UM3f9pR/B9dgLUX68bZRZone', 'afa', 'PROCESS_EXPERT', NULL, 'amen@gmail.com'),
(62, 'kfa', NULL, 'afjafj', NULL, NULL, NULL, 'melaku', 'Male', NULL, b'1', 'mulualem', 'Terefe', '$2a$10$SGukpIVzGM/iNJ1k3qNkYOD9a4Ezh0NVJNh.3XMF1pdp5o7KFvqNC', 'fjafj', 'WOREDA_COORDINATOR', NULL, 'mel@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK79ol37dfpree5i58f8mbmdfm7` (`user_id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goth`
--
ALTER TABLE `goth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_seeker`
--
ALTER TABLE `job_seeker`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kebele`
--
ALTER TABLE `kebele`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tbl_setting`
--
ALTER TABLE `tbl_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `goth`
--
ALTER TABLE `goth`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `job_seeker`
--
ALTER TABLE `job_seeker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `kebele`
--
ALTER TABLE `kebele`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
