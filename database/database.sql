-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 06:27 PM
-- Server version: 10.5.27-MariaDB
-- PHP Version: 8.2.28

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_seminar`
--
CREATE DATABASE IF NOT EXISTS `project_seminar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project_seminar`;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `seminar_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text DEFAULT NULL,
  `feedbackDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '0001_01_01_000000_create_users_table', 1),
(14, '0001_01_01_000001_create_cache_table', 1),
(15, '0001_01_01_000002_create_jobs_table', 1),
(16, '2025_04_15_131028_create_seminars_table', 1),
(17, '2025_04_15_133841_create_registrations_table', 1),
(18, '2025_04_15_133912_create_payments_table', 1),
(19, '2025_04_15_133957_create_feedbacks_table', 1),
(20, '2025_04_15_134022_create_speaker_applications_table', 1),
(21, '2025_04_15_134128_create_seminar_speakers_table', 1),
(22, '2025_04_15_134157_create_user_role_history_table', 1),
(23, '2025_05_01_113012_add_status_to_payments_table', 2),
(24, '2025_05_01_120157_make_payment_method_nullable_in_payments_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `seminar_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `invoiceNumber` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `paymentMethod` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `seminar_id`, `amount`, `paymentDate`, `invoiceNumber`, `status`, `paymentMethod`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 6, 135.00, '2025-04-25 15:47:59', 'INV-20250425-3071', 'pending', 'Google Pay', '2025-04-25 15:47:59', '2025-04-25 15:47:59', NULL),
(2, 9, 8, 284.00, '2025-04-23 21:15:08', 'INV-20250424-6760', 'pending', 'Crypto', '2025-04-23 21:15:08', '2025-04-23 21:15:08', NULL),
(3, 7, 8, 284.00, '2025-04-21 11:26:31', 'INV-20250421-5695', 'pending', 'Bank Transfer', '2025-04-21 11:26:31', '2025-04-21 11:26:31', NULL),
(4, 13, 8, 284.00, '2025-04-24 14:54:26', 'INV-20250424-8402', 'pending', 'Google Pay', '2025-04-24 14:54:26', '2025-04-24 14:54:26', NULL),
(5, 12, 7, 223.00, '2025-03-20 18:30:08', 'INV-20250321-4025', 'pending', 'Google Pay', '2025-03-20 18:30:08', '2025-03-20 18:30:08', NULL),
(6, 10, 5, 106.00, '2025-07-01 01:17:47', 'INV-20250701-3905', 'pending', 'PayPal', '2025-07-01 01:17:47', '2025-07-01 01:17:47', NULL),
(7, 5, 6, 135.00, '2025-04-27 09:39:44', 'INV-20250427-2759', 'pending', 'Bank Transfer', '2025-04-27 09:39:44', '2025-04-27 09:39:44', NULL),
(8, 8, 10, 137.00, '2025-05-07 02:25:16', 'INV-20250507-6827', 'pending', 'Bank Transfer', '2025-05-07 02:25:16', '2025-05-07 02:25:16', NULL),
(9, 4, 4, 243.00, '2025-03-03 09:26:30', 'INV-20250303-4636', 'pending', 'PayPal', '2025-03-03 09:26:30', '2025-03-03 09:26:30', NULL),
(10, 3, 8, 284.00, '2025-04-03 14:57:27', 'INV-20250403-4678', 'pending', 'PayPal', '2025-04-03 14:57:27', '2025-04-03 14:57:27', NULL),
(11, 14, 4, 243.00, '2025-04-25 09:24:23', 'INV-20250425-8120', 'pending', 'Apple Pay', '2025-04-25 09:24:23', '2025-04-25 09:24:23', NULL),
(12, 7, 3, 182.00, '2025-05-07 19:59:40', 'INV-20250508-7048', 'pending', 'Crypto', '2025-05-07 19:59:40', '2025-05-07 19:59:40', NULL),
(13, 4, 2, 397.00, '2025-04-21 23:39:14', 'INV-20250422-6864', 'pending', 'Apple Pay', '2025-04-21 23:39:14', '2025-04-21 23:39:14', NULL),
(14, 9, 2, 397.00, '2025-04-14 18:55:44', 'INV-20250415-9996', 'pending', 'PayPal', '2025-04-14 18:55:44', '2025-04-14 18:55:44', NULL),
(15, 9, 1, 181.00, '2025-04-04 13:38:38', 'INV-20250404-8041', 'pending', 'Crypto', '2025-04-04 13:38:38', '2025-04-04 13:38:38', NULL),
(16, 5, 4, 243.00, '2025-04-13 20:14:28', 'INV-20250414-7328', 'pending', 'Credit Card', '2025-04-13 20:14:28', '2025-04-13 20:14:28', NULL),
(17, 6, 1, 181.00, '2025-04-03 18:21:53', 'INV-20250404-2152', 'pending', 'PayPal', '2025-04-03 18:21:53', '2025-04-03 18:21:53', NULL),
(18, 12, 2, 397.00, '2025-03-26 13:29:53', 'INV-20250326-3258', 'pending', 'Apple Pay', '2025-03-26 13:29:53', '2025-03-26 13:29:53', NULL),
(19, 2, 7, 223.00, '2025-04-24 18:25:47', 'INV-20250425-544', 'pending', 'Bank Transfer', '2025-04-24 18:25:47', '2025-04-24 18:25:47', NULL),
(20, 6, 5, 106.00, '2025-06-17 02:16:57', 'INV-20250617-5538', 'pending', 'Bank Transfer', '2025-06-17 02:16:57', '2025-06-17 02:16:57', NULL),
(21, 8, 3, 182.00, '2025-04-27 08:54:13', 'INV-20250427-8769', 'pending', 'Crypto', '2025-04-27 08:54:13', '2025-04-27 08:54:13', NULL),
(22, 4, 10, 137.00, '2025-04-19 16:37:24', 'INV-20250419-485', 'pending', 'Apple Pay', '2025-04-19 16:37:24', '2025-04-19 16:37:24', NULL),
(23, 5, 8, 284.00, '2025-03-23 13:08:56', 'INV-20250323-3700', 'pending', 'Google Pay', '2025-03-23 13:08:56', '2025-03-23 13:08:56', NULL),
(24, 12, 5, 106.00, '2025-07-05 16:55:10', 'INV-20250705-1742', 'pending', 'PayPal', '2025-07-05 16:55:10', '2025-07-05 16:55:10', NULL),
(33, 22, 4, 243.00, '2025-05-01 08:39:29', 'SEMINAR-681375939ba80', 'settlement', 'qris', '2025-05-01 06:22:27', '2025-05-01 08:39:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `seminar_id` bigint(20) UNSIGNED NOT NULL,
  `registrationDate` timestamp NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `user_id`, `seminar_id`, `registrationDate`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 6, '2025-04-25 08:44:41', '2025-04-25 08:44:41', '2025-04-25 08:44:41', NULL),
(2, 9, 8, '2025-04-23 07:04:12', '2025-04-23 07:04:12', '2025-04-23 07:04:12', NULL),
(3, 6, 9, '2025-04-10 01:55:41', '2025-04-10 01:55:41', '2025-04-10 01:55:41', NULL),
(4, 7, 8, '2025-04-21 06:38:05', '2025-04-21 06:38:05', '2025-04-21 06:38:05', NULL),
(5, 13, 8, '2025-04-23 23:30:28', '2025-04-23 23:30:28', '2025-04-23 23:30:28', NULL),
(6, 12, 7, '2025-03-20 17:04:50', '2025-03-20 17:04:50', '2025-03-20 17:04:50', NULL),
(7, 13, 9, '2025-04-14 02:13:47', '2025-04-14 02:13:47', '2025-04-14 02:13:47', NULL),
(8, 9, 9, '2025-03-20 04:40:06', '2025-03-20 04:40:06', '2025-03-20 04:40:06', NULL),
(9, 10, 5, '2025-06-30 20:13:52', '2025-06-30 20:13:52', '2025-06-30 20:13:52', NULL),
(10, 5, 6, '2025-04-26 13:35:53', '2025-04-26 13:35:53', '2025-04-26 13:35:53', NULL),
(11, 8, 10, '2025-05-06 04:04:49', '2025-05-06 04:04:49', '2025-05-06 04:04:49', NULL),
(12, 4, 4, '2025-03-03 03:06:58', '2025-03-03 03:06:58', '2025-03-03 03:06:58', NULL),
(13, 3, 8, '2025-04-02 21:24:46', '2025-04-02 21:24:46', '2025-04-02 21:24:46', NULL),
(14, 14, 4, '2025-04-25 07:28:39', '2025-04-25 07:28:39', '2025-04-25 07:28:39', NULL),
(15, 7, 3, '2025-05-07 14:22:15', '2025-05-07 14:22:15', '2025-05-07 14:22:15', NULL),
(16, 4, 2, '2025-04-21 00:11:39', '2025-04-21 00:11:39', '2025-04-21 00:11:39', NULL),
(17, 9, 2, '2025-04-14 13:02:57', '2025-04-14 13:02:57', '2025-04-14 13:02:57', NULL),
(18, 9, 1, '2025-04-03 17:02:47', '2025-04-03 17:02:47', '2025-04-03 17:02:47', NULL),
(19, 5, 4, '2025-04-13 17:48:44', '2025-04-13 17:48:44', '2025-04-13 17:48:44', NULL),
(20, 6, 1, '2025-04-03 17:06:41', '2025-04-03 17:06:41', '2025-04-03 17:06:41', NULL),
(21, 12, 2, '2025-03-26 08:31:05', '2025-03-26 08:31:05', '2025-03-26 08:31:05', NULL),
(22, 2, 7, '2025-04-24 16:57:08', '2025-04-24 16:57:08', '2025-04-24 16:57:08', NULL),
(23, 6, 5, '2025-06-16 16:54:08', '2025-06-16 16:54:08', '2025-06-16 16:54:08', NULL),
(24, 8, 3, '2025-04-27 01:58:56', '2025-04-27 01:58:56', '2025-04-27 01:58:56', NULL),
(25, 4, 10, '2025-04-19 03:27:47', '2025-04-19 03:27:47', '2025-04-19 03:27:47', NULL),
(26, 5, 8, '2025-03-22 21:29:59', '2025-03-22 21:29:59', '2025-03-22 21:29:59', NULL),
(27, 12, 5, '2025-07-05 04:51:57', '2025-07-05 04:51:57', '2025-07-05 04:51:57', NULL),
(33, 22, 4, '2025-05-01 06:22:47', '2025-05-01 06:22:47', '2025-05-01 06:22:47', NULL),
(34, 22, 9, '2025-05-01 10:08:10', '2025-05-01 10:08:10', '2025-05-01 10:08:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seminars`
--

CREATE TABLE `seminars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `eventDate` date NOT NULL,
  `eventTime` time NOT NULL,
  `speaker_id` bigint(20) UNSIGNED DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `googleMeetLink` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seminars`
--

INSERT INTO `seminars` (`id`, `title`, `description`, `eventDate`, `eventTime`, `speaker_id`, `price`, `googleMeetLink`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Advanced React Techniques', 'Nesciunt incidunt itaque suscipit animi laboriosam iusto. Sit est omnis dolorem ad ipsa et. Necessitatibus repellat incidunt sed harum.\n\nSint et est id voluptate. Consequatur est inventore nemo rerum.\n\nSit aut placeat ut est eveniet a vel. Tempore quos modi aspernatur optio quis quasi iste hic. Consequatur enim aliquam adipisci cum. Inventore nihil unde quia eum.', '2025-04-23', '14:10:00', 13, 181.00, 'https://meet.google.com/Rwx2TQ2nyJ', '2025-02-20 01:56:09', '2025-04-15 07:42:52', NULL),
(2, 'Mastering Cloud Computing', 'Debitis voluptates neque perspiciatis magni animi corrupti nostrum. Et iure corrupti reprehenderit et id harum. Aspernatur perferendis consequatur qui qui. Nulla sapiente neque doloribus perferendis sapiente nihil.\n\nSoluta expedita tempore tenetur nobis necessitatibus. Molestiae tempore nostrum commodi nobis mollitia. Dolor beatae perferendis modi aut earum aut impedit. Sit quia reprehenderit magnam saepe.\n\nQui asperiores nobis sequi. Tenetur saepe at quas ducimus atque beatae laborum minima. Voluptas sit quia laborum reiciendis.', '2025-04-30', '23:15:00', 14, 397.00, 'https://meet.google.com/eiGzfJConm', '2025-03-08 18:36:41', '2025-04-27 09:29:58', NULL),
(3, 'Mastering JavaScript', 'Laudantium voluptatem reprehenderit delectus rerum error sunt excepturi. Sint laudantium repellendus dolores sequi velit doloremque soluta. Et ipsam molestiae quis laborum accusantium libero.\n\nUt in optio laboriosam. Voluptas facilis explicabo provident odio. Veniam aliquid sint qui ut corrupti. Quae quo modi voluptatum cumque rerum cum totam voluptates.\n\nVoluptates inventore error dolores eum sapiente dignissimos et. Laudantium omnis in reiciendis magnam. Accusamus quidem et et vitae. Ipsa eum rerum et distinctio ut magnam porro.', '2025-06-26', '07:01:00', 13, 182.00, 'https://meet.google.com/QtGX1RYoU4', '2025-03-17 13:52:07', '2025-04-15 07:42:52', NULL),
(4, 'Advanced DevOps Techniques', 'Sed est minus veniam quia rerum. Similique sit qui atque dolorem. Ipsa aut laboriosam maiores pariatur. Sint recusandae rerum minima id.\n\nPerspiciatis veniam accusamus eaque est qui eaque minus. Consequuntur omnis voluptatem dignissimos iusto non. Consequatur vero ut ullam voluptatem animi officiis et.\n\nQuod suscipit esse praesentium voluptates possimus. Laudantium beatae exercitationem eius incidunt nostrum. Reiciendis rerum consectetur sequi minus qui placeat omnis. Aspernatur non sequi molestiae necessitatibus consequatur recusandae.', '2025-05-02', '06:40:00', 12, 243.00, 'https://meet.google.com/HD0zY1YoyK', '2025-04-07 22:54:36', '2025-04-15 07:42:52', NULL),
(5, 'The Future of Data Science', 'Nulla quos voluptatem voluptatem aut eum quia. Nemo magni est deserunt ipsum. Hic cum officiis et. Rerum accusantium et et vel expedita.\n\nMollitia perferendis reprehenderit molestiae. Eum consequatur ut est aut dolores sunt. Illo earum a repellat nesciunt voluptatem.\n\nSint ducimus rem numquam. Quia consequatur iste ullam voluptate repellat et. Dolorum fuga rerum itaque et quia soluta.', '2025-07-15', '17:38:00', 13, 106.00, 'https://meet.google.com/jJ5Sorap8G', '2025-02-18 05:23:13', '2025-04-15 07:42:52', NULL),
(6, 'Advanced React Techniques', 'Quo velit dolor deleniti eaque eaque. Aut quas corporis voluptatum quasi quia eum dolorem. Neque eum deserunt consequatur voluptatem cum. Sit excepturi consequuntur dicta et temporibus.\n\nIure doloribus est dignissimos ut doloremque aut ipsum. Rerum dolorem hic voluptatum blanditiis. Aut velit qui deserunt explicabo quaerat vel. Totam sit eos porro animi porro inventore. Ratione repellat autem rerum corrupti et sint.\n\nMolestias consequatur quasi laboriosam qui velit autem. Dolore facere a voluptate quos. Error exercitationem repellat quo est sed nisi.', '2025-05-09', '07:06:00', 14, 135.00, 'https://meet.google.com/QuI5vXrRTD', '2025-03-07 14:26:48', '2025-04-15 07:42:52', NULL),
(7, 'Mastering Database Design', 'Quia numquam odit harum aliquid qui sunt. Sint voluptas alias et debitis.\n\nError dolorem dolorum doloremque eos ad. Voluptatibus eligendi aut ut aut aut. Et provident ipsam sint non id voluptatum. Expedita tempore est dolore.\n\nCumque dolores fuga totam enim voluptate nesciunt. Velit dolorem libero optio quo. Occaecati numquam facere accusamus.', '2025-04-28', '12:15:00', 13, 223.00, 'https://meet.google.com/SCUOFrr11T', '2025-02-21 18:17:26', '2025-04-15 07:42:52', NULL),
(8, 'The Future of Database Design', 'Eveniet officiis consequatur quo quod. Corrupti debitis sit voluptas tenetur.\n\nSed fugit et officia natus. Ducimus maiores assumenda vero. Reprehenderit praesentium placeat porro sit quae natus aut quidem. Sint nesciunt animi autem cumque.\n\nEveniet vel quod quos eum aut. Asperiores est sit qui qui atque. Itaque ea ut at a aut fuga maxime nostrum. Suscipit sed dolor culpa qui est ullam.', '2025-04-30', '11:16:00', 14, 284.00, 'https://meet.google.com/HioJLSjEQE', '2025-03-01 08:03:39', '2025-04-15 07:42:52', NULL),
(9, 'Advanced JavaScript Techniques', 'Magnam in distinctio nulla natus quos. Molestiae corrupti quisquam magni libero quo et sunt. Tempore ducimus minus consectetur necessitatibus.\n\nDolores sed consectetur hic maiores soluta. Debitis beatae consequuntur omnis quo tempore adipisci. Soluta et consequatur molestiae autem accusamus expedita.\n\nQui tempore qui ut sint ducimus. Incidunt dolorem aliquid quia nesciunt qui. Vero exercitationem maiores neque nobis magni molestiae numquam.', '2025-05-17', '19:44:00', 13, 0.00, 'https://meet.google.com/iRh97QcCRF', '2025-04-03 01:35:04', '2025-04-15 07:42:52', NULL),
(10, 'Advanced Mobile Development Techniques', 'Et blanditiis omnis id sit quia quae et dicta. Enim sunt aut illum magni similique numquam. Voluptates aliquid quo non ea aut voluptatem.\n\nQuia suscipit laborum laborum eius ea placeat dolorem. Voluptates occaecati sed ex veritatis quisquam. Eligendi doloribus ut vel voluptatem laboriosam itaque ut. Dolorum non ea voluptatem voluptas laboriosam voluptatibus.\n\nQuis nulla quia molestiae et. Deserunt saepe nulla rerum voluptatem distinctio accusantium. Eos dolore nisi doloremque fugit debitis perferendis omnis.', '2025-06-13', '14:15:00', 13, 137.00, 'https://meet.google.com/1mp82lV4CJ', '2025-04-02 20:52:18', '2025-04-15 07:42:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seminar_speakers`
--

CREATE TABLE `seminar_speakers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `seminar_id` bigint(20) UNSIGNED NOT NULL,
  `speaker_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seminar_speakers`
--

INSERT INTO `seminar_speakers` (`id`, `seminar_id`, `speaker_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 13, '2025-02-20 01:56:09', '2025-02-20 01:56:09', NULL),
(2, 1, 12, '2025-04-02 20:14:25', '2025-04-02 20:14:25', NULL),
(3, 2, 14, '2025-03-08 18:36:41', '2025-03-08 18:36:41', NULL),
(4, 2, 12, '2025-03-24 22:29:35', '2025-03-24 22:29:35', NULL),
(5, 3, 13, '2025-03-17 13:52:07', '2025-03-17 13:52:07', NULL),
(6, 3, 14, '2025-04-03 17:28:47', '2025-04-03 17:28:47', NULL),
(7, 4, 12, '2025-04-07 22:54:36', '2025-04-07 22:54:36', NULL),
(8, 5, 13, '2025-02-18 05:23:13', '2025-02-18 05:23:13', NULL),
(9, 5, 12, '2025-03-06 00:15:10', '2025-03-06 00:15:10', NULL),
(10, 6, 14, '2025-03-07 14:26:48', '2025-03-07 14:26:48', NULL),
(11, 6, 13, '2025-03-17 03:00:31', '2025-03-17 03:00:31', NULL),
(12, 7, 13, '2025-02-21 18:17:26', '2025-02-21 18:17:26', NULL),
(13, 8, 14, '2025-03-01 08:03:39', '2025-03-01 08:03:39', NULL),
(14, 9, 13, '2025-04-03 01:35:04', '2025-04-03 01:35:04', NULL),
(15, 10, 13, '2025-04-02 20:52:18', '2025-04-02 20:52:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `speaker_applications`
--

CREATE TABLE `speaker_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `applicationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `speaker_applications`
--

INSERT INTO `speaker_applications` (`id`, `user_id`, `applicationDate`, `status`, `remarks`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, '2025-03-21 09:34:14', 'rejected', 'Insufficient experience in the field.', '2025-03-21 09:34:14', '2025-04-09 19:41:57', NULL),
(2, 6, '2025-01-30 23:40:21', 'rejected', 'Please reapply with more specific qualifications.', '2025-01-30 23:40:21', '2025-02-14 23:16:59', NULL),
(3, 2, '2025-03-28 18:42:43', 'pending', 'Waiting for additional information.', '2025-03-28 18:42:43', '2025-03-28 18:42:43', NULL),
(4, 8, '2025-01-20 05:03:56', 'rejected', 'Insufficient experience in the field.', '2025-01-20 05:03:56', '2025-03-21 23:33:52', NULL),
(5, 4, '2025-03-11 05:46:42', 'approved', 'Great application with relevant experience.', '2025-03-11 05:46:42', '2025-03-28 23:18:39', NULL),
(6, 5, '2025-02-23 04:41:40', 'rejected', 'Insufficient experience in the field.', '2025-02-23 04:41:40', '2025-03-16 11:47:36', NULL),
(7, 9, '2025-03-25 10:14:01', 'approved', 'Approved based on previous speaking engagements.', '2025-03-25 10:14:01', '2025-03-25 10:19:47', NULL),
(8, 7, '2025-02-03 12:39:35', 'pending', 'Waiting for additional information.', '2025-02-03 12:39:35', '2025-02-03 12:39:35', NULL),
(9, 22, '2025-05-01 10:44:07', 'pending', 'halo ini testing pertama', '2025-05-01 10:44:07', '2025-05-01 10:44:07', NULL),
(10, 22, '2025-05-01 10:48:18', 'pending', 'halo ini testing 2', '2025-05-01 10:48:18', '2025-05-01 10:48:18', NULL),
(11, 22, '2025-05-01 10:51:45', 'pending', 'testing 3', '2025-05-01 10:51:45', '2025-05-01 10:51:45', NULL),
(12, 22, '2025-05-01 10:54:16', 'pending', 'ini testing 4', '2025-05-01 10:54:16', '2025-05-01 10:54:16', NULL),
(13, 22, '2025-05-01 11:34:55', 'pending', 'testing last', '2025-05-01 11:34:55', '2025-05-01 11:34:55', NULL),
(14, 22, '2025-05-01 11:37:13', 'pending', 'wkwkwk', '2025-05-01 11:37:13', '2025-05-01 11:37:13', NULL),
(15, 22, '2025-05-01 11:39:05', 'pending', 'www', '2025-05-01 11:39:05', '2025-05-01 11:39:05', NULL),
(16, 22, '2025-05-01 11:46:18', 'pending', 'dddd', '2025-05-01 11:46:18', '2025-05-01 11:46:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('guest','user','admin') NOT NULL DEFAULT 'user',
  `isSpeaker` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `isSpeaker`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', 'admin@admin.com', NULL, 'admin', 'admin', 0, NULL, '2025-04-15 14:42:06', '2025-04-15 14:42:06', NULL),
(2, 'Isaac Tillman', 'akutch@example.com', NULL, 'nb9[xfT', 'user', 0, NULL, '2024-11-11 11:58:52', '2025-04-15 07:42:51', NULL),
(3, 'Miss Myriam Schmeler I', 'alfredo.heathcote@example.com', NULL, '&yE65\":/xW]]Kn', 'user', 0, NULL, '2024-12-03 09:47:49', '2025-04-15 07:42:51', NULL),
(4, 'Emelie Hammes', 'kaya.hegmann@example.com', NULL, 'bM.`iawk#w/[87?DOs', 'user', 0, NULL, '2024-12-28 20:17:36', '2025-04-15 07:42:51', NULL),
(5, 'Rex Gaylord', 'sarah60@example.com', NULL, 'tovM?_', 'user', 0, NULL, '2024-11-10 12:57:23', '2025-04-15 07:42:51', NULL),
(6, 'Mrs. Amie Ondricka Jr.', 'elesch@example.org', NULL, 'Y0mQOkz', 'user', 0, NULL, '2024-12-14 19:24:19', '2025-04-15 07:42:51', NULL),
(7, 'Isaiah Steuber Romeo', 'clare30@example.org', NULL, '&|y\\w;:EX)!$GH~$PU', 'user', 0, NULL, '2025-03-30 15:17:06', '2025-04-23 08:17:41', NULL),
(8, 'Maximillian Mohr', 'cecil18@example.net', NULL, 'v~Ul!J,@pSVKAXiP\'\'.', 'user', 0, NULL, '2025-01-27 08:34:49', '2025-04-15 07:42:51', NULL),
(9, 'Erling Lind', 'rosenbaum.otis@example.net', NULL, 'J-e[7S,N;4a%W@p\'%?C', 'user', 0, NULL, '2025-01-22 15:55:00', '2025-04-15 07:42:51', NULL),
(10, 'Juliana Kihn', 'west.karelle@example.org', NULL, 'gyNo-s`$pj', 'user', 0, NULL, '2024-12-13 05:15:18', '2025-04-15 07:42:51', NULL),
(11, 'Miss Rylee Ortiz Sr.', 'fatima.beer@example.net', NULL, ':WSd/`^', 'user', 0, NULL, '2025-03-05 19:39:11', '2025-04-15 07:42:51', NULL),
(12, 'Dr. Maxwell Legros III', 'maud69@example.com', NULL, '$2y$12$6Vq7suCPNXvqREvqjkwHQOLCrnbYSLkqZa4jRwEPAYyvTZHFRBPYO', 'user', 1, NULL, '2024-09-10 15:58:57', '2025-04-15 07:42:51', NULL),
(13, 'Mr. Norbert Upton', 'jamil.morar@example.com', NULL, '$2y$12$Eu.x9Cy41ZqgwCoircodY.U7KAVSexv1.y3QJSI7izoILffFt8HGa', 'user', 1, NULL, '2024-08-21 18:58:25', '2025-04-15 07:42:51', NULL),
(14, 'Prof. Gaetano Botsford', 'eulah57@example.net', NULL, '$2y$12$zGmJsGcqAoiCMJyjwXg6DuN1ccOBi5mFfO5bFFKqXaXufvXeLUyRW', 'user', 1, NULL, '2024-10-12 09:09:41', '2025-04-15 07:42:52', NULL),
(15, 'vincent', 'vincent@example.com', NULL, '$2y$12$kwhDXdZBSpymIILS7cxNfu/mqatEmTVq6QDBeSuxnzk6.H1CUbnUy', 'user', 0, NULL, '2025-04-23 08:18:31', '2025-04-23 08:18:31', NULL),
(16, 'mundo', 'mundo@mundo.com', NULL, '$2y$12$a/vPKQKFyzq8uh58zWrpe.y01NEzqnLpvxSO95xqvz.xOv.BN2sQy', 'guest', 0, NULL, '2025-04-23 08:27:57', '2025-04-23 08:27:57', NULL),
(17, 'halo', 'halo@halo.com', NULL, '$2y$12$0VW6NJS7gvtZfwHBqlrFtucankcYXXtZdGJKV.gFPCm3d6cvAw/pe', 'guest', 1, NULL, '2025-04-23 08:28:55', '2025-04-23 08:28:55', NULL),
(19, 'juan', 'juan@juan.com', NULL, '$2y$12$M04ALuNtNJ/ZU9uqH4jhBusttTWc4uY0qDzi2B2QBm2RaF1bQrfvy', 'guest', 1, NULL, '2025-04-23 08:47:15', '2025-04-23 08:47:15', NULL),
(22, 'user', 'user@user.com', NULL, 'user', 'user', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role_history`
--

CREATE TABLE `user_role_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `actionType` varchar(255) NOT NULL,
  `actionDetails` text DEFAULT NULL,
  `actionDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_role_history`
--

INSERT INTO `user_role_history` (`id`, `user_id`, `actionType`, `actionDetails`, `actionDate`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 7, 'feedback', 'Submitted mixed feedback with rating 1', '2024-12-13 00:55:28', '2024-12-13 00:55:28', '2024-12-13 00:55:28', NULL),
(2, 13, 'registration', 'Registered for seminar: Delectus et qui.', '2024-12-25 18:55:50', '2024-12-25 18:55:50', '2024-12-25 18:55:50', NULL),
(3, 2, 'payment', 'Made payment of $304.05 for seminar', '2025-04-07 17:54:12', '2025-04-07 17:54:12', '2025-04-07 17:54:12', NULL),
(4, 2, 'roleChange', 'Role changed from user to user', '2024-10-24 14:11:50', '2024-10-24 14:11:50', '2024-10-24 14:11:50', NULL),
(5, 2, 'logout', 'User logged out after extended session', '2024-12-20 12:41:27', '2024-12-20 12:41:27', '2024-12-20 12:41:27', NULL),
(6, 1, 'roleChange', 'Role changed from user to user', '2024-12-28 20:54:00', '2024-12-28 20:54:00', '2024-12-28 20:54:00', NULL),
(7, 14, 'roleChange', 'Role changed from guest to admin', '2024-12-17 02:31:36', '2024-12-17 02:31:36', '2024-12-17 02:31:36', NULL),
(8, 7, 'login', 'User logged in from tablet using Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_6 rv:6.0) Gecko/20200429 Firefox/37.0', '2025-04-05 11:48:49', '2025-04-05 11:48:49', '2025-04-05 11:48:49', NULL),
(9, 10, 'feedback', 'Submitted positive feedback with rating 2', '2025-02-25 12:41:09', '2025-02-25 12:41:09', '2025-02-25 12:41:09', NULL),
(10, 14, 'feedback', 'Submitted positive feedback with rating 1', '2025-01-07 13:42:08', '2025-01-07 13:42:08', '2025-01-07 13:42:08', NULL),
(11, 6, 'roleChange', 'Role changed from user to admin', '2024-11-02 00:24:12', '2024-11-02 00:24:12', '2024-11-02 00:24:12', NULL),
(12, 12, 'logout', 'User logged out after brief session', '2025-04-14 07:03:14', '2025-04-14 07:03:14', '2025-04-14 07:03:14', NULL),
(13, 1, 'login', 'User logged in from mobile app using Mozilla/5.0 (Windows NT 5.1; sl-SI; rv:1.9.2.20) Gecko/20140108 Firefox/35.0', '2024-12-27 21:26:17', '2024-12-27 21:26:17', '2024-12-27 21:26:17', NULL),
(14, 8, 'registration', 'Registered for seminar: Inventore nihil suscipit voluptatibus tempore.', '2024-10-23 01:17:40', '2024-10-23 01:17:40', '2024-10-23 01:17:40', NULL),
(15, 14, 'logout', 'User logged out after brief session', '2024-12-30 03:16:24', '2024-12-30 03:16:24', '2024-12-30 03:16:24', NULL),
(16, 2, 'payment', 'Made payment of $374.27 for seminar', '2025-01-18 07:20:09', '2025-01-18 07:20:09', '2025-01-18 07:20:09', NULL),
(17, 14, 'profile_update', 'Updated profile information: password', '2025-01-21 14:41:57', '2025-01-21 14:41:57', '2025-01-21 14:41:57', NULL),
(18, 12, 'roleChange', 'Role changed from user to admin', '2024-12-06 18:39:30', '2024-12-06 18:39:30', '2024-12-06 18:39:30', NULL),
(19, 6, 'payment', 'Made payment of $422.02 for seminar', '2024-11-27 21:41:15', '2024-11-27 21:41:15', '2024-11-27 21:41:15', NULL),
(20, 7, 'roleChange', 'Role changed from user to admin', '2025-01-13 09:06:48', '2025-01-13 09:06:48', '2025-01-13 09:06:48', NULL),
(21, 7, 'login', 'User logged in from tablet using Mozilla/5.0 (Windows NT 6.2) AppleWebKit/5350 (KHTML, like Gecko) Chrome/36.0.837.0 Mobile Safari/5350', '2025-04-01 02:11:15', '2025-04-01 02:11:15', '2025-04-01 02:11:15', NULL),
(22, 2, 'logout', 'User logged out after extended session', '2024-12-11 01:43:28', '2024-12-11 01:43:28', '2024-12-11 01:43:28', NULL),
(23, 3, 'roleChange', 'Role changed from user to admin', '2024-11-23 15:53:56', '2024-11-23 15:53:56', '2024-11-23 15:53:56', NULL),
(24, 5, 'payment', 'Made payment of $59.19 for seminar', '2025-01-11 08:26:37', '2025-01-11 08:26:37', '2025-01-11 08:26:37', NULL),
(25, 9, 'logout', 'User logged out after extended session', '2025-03-31 22:10:41', '2025-03-31 22:10:41', '2025-03-31 22:10:41', NULL),
(26, 11, 'logout', 'User logged out after extended session', '2025-03-10 05:37:13', '2025-03-10 05:37:13', '2025-03-10 05:37:13', NULL),
(27, 14, 'profile_update', 'Updated profile information: notification settings', '2024-12-17 23:00:38', '2024-12-17 23:00:38', '2024-12-17 23:00:38', NULL),
(28, 4, 'logout', 'User logged out after brief session', '2025-03-20 16:02:31', '2025-03-20 16:02:31', '2025-03-20 16:02:31', NULL),
(29, 8, 'logout', 'User logged out after extended session', '2024-11-19 16:59:01', '2024-11-19 16:59:01', '2024-11-19 16:59:01', NULL),
(30, 3, 'logout', 'User logged out after brief session', '2025-04-03 09:42:47', '2025-04-03 09:42:47', '2025-04-03 09:42:47', NULL),
(31, 7, 'profile_update', 'Updated profile information: contact details', '2024-12-05 02:29:28', '2024-12-05 02:29:28', '2024-12-05 02:29:28', NULL),
(32, 6, 'roleChange', 'Role changed from guest to admin', '2024-12-19 04:38:55', '2024-12-19 04:38:55', '2024-12-19 04:38:55', NULL),
(33, 12, 'registration', 'Registered for seminar: Quo omnis nihil voluptatibus.', '2025-01-14 20:43:51', '2025-01-14 20:43:51', '2025-01-14 20:43:51', NULL),
(34, 3, 'logout', 'User logged out after brief session', '2025-01-11 03:34:14', '2025-01-11 03:34:14', '2025-01-11 03:34:14', NULL),
(35, 11, 'payment', 'Made payment of $141.95 for seminar', '2024-11-19 04:54:14', '2024-11-19 04:54:14', '2024-11-19 04:54:14', NULL),
(36, 13, 'payment', 'Made payment of $375.17 for seminar', '2025-04-08 10:27:18', '2025-04-08 10:27:18', '2025-04-08 10:27:18', NULL),
(37, 4, 'feedback', 'Submitted mixed feedback with rating 4', '2024-12-02 07:42:58', '2024-12-02 07:42:58', '2024-12-02 07:42:58', NULL),
(38, 12, 'profile_update', 'Updated profile information: contact details', '2024-11-07 15:39:12', '2024-11-07 15:39:12', '2024-11-07 15:39:12', NULL),
(39, 7, 'profile_update', 'Updated profile information: contact details', '2024-11-10 14:03:26', '2024-11-10 14:03:26', '2024-11-10 14:03:26', NULL),
(40, 5, 'feedback', 'Submitted mixed feedback with rating 1', '2025-03-30 03:11:57', '2025-03-30 03:11:57', '2025-03-30 03:11:57', NULL),
(41, 4, 'feedback', 'Submitted mixed feedback with rating 3', '2025-03-01 04:08:27', '2025-03-01 04:08:27', '2025-03-01 04:08:27', NULL),
(42, 2, 'login', 'User logged in from tablet using Opera/9.23 (Windows NT 5.1; en-US) Presto/2.11.164 Version/11.00', '2024-11-13 22:16:26', '2024-11-13 22:16:26', '2024-11-13 22:16:26', NULL),
(43, 9, 'login', 'User logged in from tablet using Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X; nl-NL) AppleWebKit/532.11.5 (KHTML, like Gecko) Version/3.0.5 Mobile/8B115 Safari/6532.11.5', '2025-01-06 18:36:37', '2025-01-06 18:36:37', '2025-01-06 18:36:37', NULL),
(44, 3, 'feedback', 'Submitted critical feedback with rating 5', '2025-01-07 00:18:50', '2025-01-07 00:18:50', '2025-01-07 00:18:50', NULL),
(45, 6, 'profile_update', 'Updated profile information: preferences', '2024-12-01 02:56:59', '2024-12-01 02:56:59', '2024-12-01 02:56:59', NULL),
(46, 7, 'login', 'User logged in from tablet using Opera/8.47 (Windows NT 6.0; nl-NL) Presto/2.11.296 Version/12.00', '2025-04-11 01:11:29', '2025-04-11 01:11:29', '2025-04-11 01:11:29', NULL),
(47, 8, 'payment', 'Made payment of $144.2 for seminar', '2025-04-03 00:48:16', '2025-04-03 00:48:16', '2025-04-03 00:48:16', NULL),
(48, 12, 'login', 'User logged in from mobile app using Mozilla/5.0 (X11; Linux i686; rv:7.0) Gecko/20110920 Firefox/37.0', '2025-04-10 19:43:23', '2025-04-10 19:43:23', '2025-04-10 19:43:23', NULL),
(49, 5, 'profile_update', 'Updated profile information: contact details', '2024-12-27 18:19:28', '2024-12-27 18:19:28', '2024-12-27 18:19:28', NULL),
(50, 3, 'profile_update', 'Updated profile information: preferences', '2024-11-29 00:51:10', '2024-11-29 00:51:10', '2024-11-29 00:51:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedbacks_user_id_foreign` (`user_id`),
  ADD KEY `feedbacks_seminar_id_foreign` (`seminar_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_user_id_foreign` (`user_id`),
  ADD KEY `payments_seminar_id_foreign` (`seminar_id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registrations_user_id_foreign` (`user_id`),
  ADD KEY `registrations_seminar_id_foreign` (`seminar_id`);

--
-- Indexes for table `seminars`
--
ALTER TABLE `seminars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seminars_speaker_id_foreign` (`speaker_id`);

--
-- Indexes for table `seminar_speakers`
--
ALTER TABLE `seminar_speakers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seminar_speakers_seminar_id_foreign` (`seminar_id`),
  ADD KEY `seminar_speakers_speaker_id_foreign` (`speaker_id`);

--
-- Indexes for table `speaker_applications`
--
ALTER TABLE `speaker_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `speaker_applications_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_role_history`
--
ALTER TABLE `user_role_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_role_history_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `seminars`
--
ALTER TABLE `seminars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `seminar_speakers`
--
ALTER TABLE `seminar_speakers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `speaker_applications`
--
ALTER TABLE `speaker_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_role_history`
--
ALTER TABLE `user_role_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_seminar_id_foreign` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedbacks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_seminar_id_foreign` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_seminar_id_foreign` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registrations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `seminars`
--
ALTER TABLE `seminars`
  ADD CONSTRAINT `seminars_speaker_id_foreign` FOREIGN KEY (`speaker_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `seminar_speakers`
--
ALTER TABLE `seminar_speakers`
  ADD CONSTRAINT `seminar_speakers_seminar_id_foreign` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seminar_speakers_speaker_id_foreign` FOREIGN KEY (`speaker_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `speaker_applications`
--
ALTER TABLE `speaker_applications`
  ADD CONSTRAINT `speaker_applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_role_history`
--
ALTER TABLE `user_role_history`
  ADD CONSTRAINT `user_role_history_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
