-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 09, 2023 at 02:56 AM
-- Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gund`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `session_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `last_submission_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `installation_id` int(11) NOT NULL,
  `response_text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `installations`
--

CREATE TABLE `installations` (
  `id` int(11) NOT NULL,
  `work_name` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `material_medium` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `info_short_desc` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `installations`
--

INSERT INTO `installations` (`id`, `work_name`, `artist`, `material_medium`, `date`, `info_short_desc`, `image`) VALUES
(1, 'Hillary', 'Chuck Close', 'archival watercolor print on Hahnemuhle rag paper', '2016', 'Portrait of Hillary Clinton done during her 2016 presidential run.  (No description available on website.)', NULL),
(2, 'Bust of Victoria, Her 101st Year as Queen', 'David James Gilhooly', 'glazed ceramic (sculpture)', '1976', 'Adorned in pearls and a raggedy royal costume, David Gilhoolyâ€™s satirical depiction of Queen Victoria as an aging frog pokes fun at high culture with an absurd and comedic style.', NULL),
(3, 'Sam, Beaumont, Texas', 'Lewis Hine', 'gelatin silver print', '1913', 'This is one of Hine\'s muckraker photographs, which showed the underbelly of society in the early 20th century and was influential in getting child labor laws passed.  (No description available on website.)', NULL),
(4, 'Dancing at the Louvre (The French Collection Part 1: #1)', 'Faith Ringgold', 'quilted fabric and acrylic paint', '1991', 'Ringgold\'s famous quilt confronts the static, white, European art world with the dynamic visitors bringing life to the gallery.  Some visitors may recognize this work from their AP Art History exam.', NULL),
(5, 'Her', 'Kiki Smith', 'patinated bronze', '2004', 'Home, feminism, domesticity, storytelling, and animals are all important themes in Smith\'s work.  Here, she shows the woman and animal in a pose implying their symbiosis, dismantling the predator-prey relationship of traditional folk tales.', NULL),
(6, 'Untitled', 'Joel Shapiro', 'chalk, charcoal and pastel on paper', '1994', '(No description available on website.)', NULL),
(7, 'Somehow, Somewhere', 'Brenda Goodman', 'oil on wood', '2018', '(No description available on website.)', NULL),
(8, 'The Visitors', 'Ragnar Kjartansson', 'nine channel HD video, duration: 64 minutes loop', '2012', '(No description available on website.)', NULL),
(9, 'Untitled (Campo series)', 'Arien Chang Castan', 'black and white photograph', '2010', '(No description available on website.)', NULL),
(10, 'Mud Dauber (from Rookery Mounds)', 'Robert Rauschenberg', '3-color lithograph', '1979', 'For the Rookery Mounds series of lithographs, which is part of the Gund Gallery Collection, published by Gemini G.E.L., Los Angeles, Rauschenberg used photographs taken in and around Fort Myers, Florida.  (No description available on website.)', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wordcloud`
--

CREATE TABLE `wordcloud` (
  `id` int(255) NOT NULL,
  `client_id` int(255) NOT NULL,
  `installation_id` int(255) NOT NULL,
  `words` varchar(500) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `installation_id` (`installation_id`);

--
-- Indexes for table `installations`
--
ALTER TABLE `installations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wordcloud`
--
ALTER TABLE `wordcloud`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `installation_id` (`installation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `installations`
--
ALTER TABLE `installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `wordcloud`
--
ALTER TABLE `wordcloud`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
