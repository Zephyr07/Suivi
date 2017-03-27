-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 27 Mars 2017 à 19:48
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `suivi`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_intitule_unique` (`intitule`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `intitule`, `type`, `created_at`, `updated_at`) VALUES
(1, 'WHISKY', 'Produit', '2017-03-27 11:47:22', '2017-03-27 11:47:22'),
(2, 'VODKA', 'Produit', '2017-03-27 11:49:30', '2017-03-27 13:00:48'),
(3, 'GIN/RHUM/TEQUILLA/LIQUEURS', 'Produit', '2017-03-27 11:59:21', '2017-03-27 13:11:02'),
(4, 'COGNAC', 'Produit', '2017-03-27 12:00:03', '2017-03-27 13:10:56'),
(5, 'CHAMPAGNE', 'Produit', '2017-03-27 12:00:13', '2017-03-27 13:10:46'),
(6, 'CHÂTEAUX & DOMAINES', 'Produit', '2017-03-27 12:21:45', '2017-03-27 13:10:51'),
(8, 'VINS INTERNATIONNAUX', 'Produit', '2017-03-27 12:23:11', '2017-03-27 13:11:25'),
(9, 'MARQUES TERROIRS', 'Produit', '2017-03-27 12:28:14', '2017-03-27 13:10:39'),
(11, 'VIN DU MONDE', 'Produit', '2017-03-27 12:48:22', '2017-03-27 13:11:19'),
(12, 'CHR', 'Client', '2017-03-27 13:04:40', '2017-03-27 13:04:40'),
(13, 'GMS', 'Client', '2017-03-27 13:04:51', '2017-03-27 13:04:51'),
(14, 'VIP', 'Client', '2017-03-27 13:04:58', '2017-03-27 13:04:58'),
(15, 'PARTICULIER', 'Client', '2017-03-27 13:05:12', '2017-03-27 13:05:12');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` int(11) NOT NULL,
  `adresse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `boite_postale` int(11) NOT NULL,
  `categorie_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_nom_unique` (`nom`),
  KEY `clients_categorie_id_foreign` (`categorie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Contenu de la table `clients`
--

INSERT INTO `clients` (`id`, `nom`, `email`, `telephone`, `adresse`, `ville`, `boite_postale`, `categorie_id`, `created_at`, `updated_at`) VALUES
(3, 'Edward NANDA', '', 0, '', '', 0, 15, '2017-03-27 15:57:15', '2017-03-27 15:57:15');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_11_000000_profil', 1),
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2017_02_23_232645_categorie', 1),
('2017_02_23_232746_produit', 1),
('2017_02_23_232850_client', 1),
('2017_02_23_232946_visite', 1),
('2017_03_02_131038_vente', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE IF NOT EXISTS `produits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `famille` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prix` int(11) NOT NULL,
  `quantite_stock` int(11) NOT NULL,
  `categorie_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `produits_libelle_unique` (`libelle`),
  KEY `produits_categorie_id_foreign` (`categorie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=78 ;

--
-- Contenu de la table `produits`
--

INSERT INTO `produits` (`id`, `libelle`, `famille`, `prix`, `quantite_stock`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 'IMPERIAL BLU C', 'Pernod Ricard', 40000, 0, 1, '2017-03-27 13:06:47', '2017-03-27 13:06:47'),
(4, 'IMPERILA BLU B', 'Pernod Ricard', 4000, 0, 1, '2017-03-27 13:07:26', '2017-03-27 13:07:26'),
(5, 'PASSPORT C', 'Pernod Ricard', 78000, 0, 1, '2017-03-27 13:09:41', '2017-03-27 13:09:41'),
(6, 'PASSPORT B', 'Pernod Ricard', 7800, 0, 1, '2017-03-27 13:12:19', '2017-03-27 13:12:19'),
(7, 'CLAN CAMPBELL C', 'Pernod Ricard', 87000, 0, 1, '2017-03-27 13:13:10', '2017-03-27 13:13:10'),
(8, 'CLAN CAMPBELL B', 'Pernod Ricard', 7800, 0, 1, '2017-03-27 13:13:55', '2017-03-27 13:13:55'),
(9, 'BALLANTINE''S BRASIL C', 'Pernod Ricard', 44000, 0, 1, '2017-03-27 13:15:54', '2017-03-27 13:15:54'),
(10, 'BALLANTINE''S BRASIL B', 'Pernod Ricard', 8800, 0, 1, '2017-03-27 13:16:34', '2017-03-27 13:16:34'),
(11, 'BALLANTINE''S FINEST C', 'Pernod Ricard', 78000, 0, 1, '2017-03-27 13:18:00', '2017-03-27 13:18:00'),
(12, 'BALLANTINE''S FINEST B', 'Pernod Ricard', 7800, 0, 1, '2017-03-27 13:18:48', '2017-03-27 13:18:48'),
(13, 'BALLANTINE''S 12 ANS C', 'Pernod Ricard', 138000, 0, 1, '2017-03-27 13:19:25', '2017-03-27 13:19:25'),
(14, 'BALLANTINE''S 12ANS B', 'Pernod Ricard', 13800, 0, 1, '2017-03-27 13:19:55', '2017-03-27 13:19:55'),
(15, 'CHIVAS REGAL 12ANS C', 'Pernod Ricard', 165000, 0, 1, '2017-03-27 13:33:17', '2017-03-27 13:33:17'),
(16, 'CHIVAS REGAL 12ANS B', 'Pernod Ricard', 13800, 0, 1, '2017-03-27 13:35:20', '2017-03-27 13:35:20'),
(17, 'CHIVAS REGAL EXTRA C', 'Pernod Ricard', 144000, 0, 1, '2017-03-27 13:36:06', '2017-03-27 13:36:06'),
(18, 'CHIVAS REGAL EXTRA B', 'Pernod Ricard', 24000, 0, 1, '2017-03-27 13:36:49', '2017-03-27 13:36:49'),
(19, 'BALLANTINE''S 17ANS B', 'Pernod Ricard', 37000, 0, 1, '2017-03-27 13:37:59', '2017-03-27 13:37:59'),
(20, 'BALLANTINE''S 21ANS B', 'Pernod Ricard', 47000, 0, 1, '2017-03-27 13:38:53', '2017-03-27 13:38:53'),
(21, 'BALLANTINE''S 30ANS B', 'Pernod Ricard', 170000, 0, 1, '2017-03-27 13:39:41', '2017-03-27 13:39:41'),
(22, 'CHIVAS REGAL 18ANS C', 'Pernod Ricard', 285000, 0, 1, '2017-03-27 13:40:49', '2017-03-27 13:40:49'),
(23, 'CHIVAS REGAL 181NS B', 'Pernod Ricard', 47000, 0, 1, '2017-03-27 13:41:15', '2017-03-27 13:41:15'),
(24, 'CHIVAS ULTIS B', 'Pernod Ricard', 105000, 0, 1, '2017-03-27 13:41:55', '2017-03-27 13:41:55'),
(25, 'CHIVAS REGAL 25ANS B', 'Pernod Ricard', 162000, 0, 1, '2017-03-27 13:42:38', '2017-03-27 13:42:38'),
(26, 'ROYAL SALUTE 21ANS', 'Pernod Ricard', 80000, 0, 1, '2017-03-27 13:43:23', '2017-03-27 13:43:23'),
(27, 'ROYAL SALUTE 38ANS B', 'Pernod Ricard', 365000, 0, 1, '2017-03-27 13:45:18', '2017-03-27 13:45:18'),
(28, 'JAMESON C', 'Pernod Ricard', 122000, 0, 1, '2017-03-27 13:45:59', '2017-03-27 13:45:59'),
(29, 'JAMESON B', 'Pernod Ricard', 12200, 0, 1, '2017-03-27 13:46:21', '2017-03-27 13:46:21'),
(30, 'BEEFEATER GIN C', 'Pernod Ricard', 87000, 0, 3, '2017-03-27 13:50:20', '2017-03-27 13:50:20'),
(31, 'BEFEATER GIN B', 'Pernod Ricard', 8700, 0, 3, '2017-03-27 13:51:02', '2017-03-27 13:51:02'),
(32, 'BEEFEATER 24 C', 'Pernod Ricard', 83000, 0, 3, '2017-03-27 13:52:04', '2017-03-27 13:52:04'),
(33, 'BEEFEATER 24 B', 'Pernod Ricard', 8300, 0, 3, '2017-03-27 13:53:13', '2017-03-27 13:53:13'),
(34, 'PLYMOUTH GIN C', 'Pernod Ricard', 71500, 0, 3, '2017-03-27 13:55:17', '2017-03-27 13:56:27'),
(37, 'PLYMOUTH GIN B', 'Pernod Ricard', 7150, 0, 3, '2017-03-27 13:57:23', '2017-03-27 13:57:23'),
(38, 'HAVANA CLUB 3ANS C', 'Pernod Ricard', 53000, 0, 3, '2017-03-27 13:59:00', '2017-03-27 13:59:00'),
(39, 'HAVANA CLUB 3ANS B', 'Pernod Ricard', 10600, 0, 3, '2017-03-27 13:59:35', '2017-03-27 13:59:35'),
(40, 'HAVANA CLUB 7ANS C', 'Pernod Ricard', 79000, 0, 3, '2017-03-27 14:00:19', '2017-03-27 14:00:19'),
(41, 'HAVANA CLUB 7ANS B', 'Pernod Ricard', 15800, 0, 3, '2017-03-27 14:00:50', '2017-03-27 14:00:50'),
(42, 'HAVANA CLUB RESERVA ANEJO C', 'Pernod Ricard', 60000, 0, 3, '2017-03-27 14:01:38', '2017-03-27 14:01:38'),
(43, 'HAVANA CLUB RESERVA ANEJO B', 'Pernod Ricard', 12000, 0, 3, '2017-03-27 14:02:15', '2017-03-27 14:02:15'),
(44, 'MALIBU C', 'Pernod Ricard', 85000, 0, 3, '2017-03-27 14:02:47', '2017-03-27 14:02:47'),
(45, 'MALIBU B', 'Pernod Ricard', 10000, 0, 3, '2017-03-27 14:03:14', '2017-03-27 14:03:14'),
(46, 'KAHLUA C', 'Pernod Ricard', 100000, 0, 3, '2017-03-27 14:03:53', '2017-03-27 14:03:53'),
(47, 'KAHLUA', 'Pernod Ricard', 10000, 0, 3, '2017-03-27 14:04:28', '2017-03-27 14:04:28'),
(48, 'OLMECA BLANCO C', 'Pernod Ricard', 116000, 0, 3, '2017-03-27 14:04:57', '2017-03-27 14:04:57'),
(49, 'OLMECA BLANCO B', 'Pernod Ricard', 11600, 0, 3, '2017-03-27 14:05:38', '2017-03-27 14:05:38'),
(50, 'OLMECA GOLD C', 'Pernod Ricard', 121000, 0, 3, '2017-03-27 14:06:09', '2017-03-27 14:06:09'),
(51, 'OLMECA GOLD B', 'Pernod Ricard', 12100, 0, 3, '2017-03-27 14:06:42', '2017-03-27 14:06:42'),
(52, 'OLMECA EXTRA AGED C', 'Pernod Ricard', 178000, 0, 3, '2017-03-27 14:07:46', '2017-03-27 14:07:46'),
(53, 'OLMECA EXTRA AGED B', 'Pernod Ricard', 17800, 0, 3, '2017-03-27 14:08:42', '2017-03-27 14:08:42'),
(54, 'RICARD C', 'Pernod Ricard', 105000, 0, 3, '2017-03-27 14:11:42', '2017-03-27 14:11:42'),
(55, 'RICARD B', 'Pernod Ricard', 10500, 0, 3, '2017-03-27 14:12:11', '2017-03-27 14:12:11'),
(56, 'PASTIS 51 C', 'Pernod Ricard', 100000, 0, 3, '2017-03-27 14:12:42', '2017-03-27 14:12:42'),
(57, 'PASTIS 51 B', 'Pernod Ricard', 10000, 0, 3, '2017-03-27 14:13:11', '2017-03-27 14:13:11'),
(58, 'PERNOD C', 'Pernod Ricard', 110000, 0, 3, '2017-03-27 14:14:27', '2017-03-27 14:14:27'),
(59, 'PERNOD B', 'Pernod Ricard', 11000, 0, 3, '2017-03-27 14:14:58', '2017-03-27 14:14:58'),
(60, 'PASTIS ROSE 51 C', 'Pernod Ricard', 38000, 0, 3, '2017-03-27 14:16:01', '2017-03-27 14:16:01'),
(61, 'PASTIS ROSE B', 'Pernod Ricard', 7600, 0, 3, '2017-03-27 14:18:54', '2017-03-27 14:18:54'),
(62, 'SUZE C', 'Pernod Ricard', 95000, 0, 3, '2017-03-27 14:19:32', '2017-03-27 14:19:32'),
(64, 'SUZE B', 'Pernod Ricard', 9500, 0, 3, '2017-03-27 14:19:55', '2017-03-27 14:19:55'),
(65, 'WYBOROWA C', 'Pernod Ricard', 61000, 0, 2, '2017-03-27 14:21:44', '2017-03-27 14:21:44'),
(66, 'WIBOROWA B', 'Pernod Ricard', 6100, 0, 2, '2017-03-27 14:22:49', '2017-03-27 14:22:49'),
(67, 'ABSOLUT VODKA C', 'Pernod Ricard', 98000, 0, 2, '2017-03-27 14:23:18', '2017-03-27 14:23:18'),
(68, 'ABSOLUT VODKA B', 'Pernod Ricard', 9800, 0, 2, '2017-03-27 14:23:43', '2017-03-27 14:23:43'),
(69, 'ABSOLUT CITRON B', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:24:15', '2017-03-27 14:25:18'),
(70, 'ABSOLUT KURANTB', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:25:59', '2017-03-27 14:25:59'),
(71, 'ABSOLUT MANGO B', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:27:16', '2017-03-27 14:27:16'),
(72, 'ABSOLUT VANILLA B', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:28:37', '2017-03-27 14:28:37'),
(73, 'ABSOLUT RUBY RED B', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:29:29', '2017-03-27 14:29:29'),
(74, 'ABSOLUT RASPBERRI B', 'Pernod Ricard', 10500, 0, 2, '2017-03-27 14:31:05', '2017-03-27 14:31:05'),
(75, 'ABSOLUT MANDRIN B', 'Pernod Ricard', 10500, 0, 3, '2017-03-27 14:31:44', '2017-03-27 14:31:44'),
(76, 'ABSOLUT VODKA 100 C', 'Pernod Ricard', 240000, 0, 2, '2017-03-27 14:33:15', '2017-03-27 14:33:15'),
(77, 'ABSOLUT VODKA 100 B', 'Pernod Ricard', 24000, 0, 2, '2017-03-27 14:33:52', '2017-03-27 14:33:52');

-- --------------------------------------------------------

--
-- Structure de la table `profils`
--

CREATE TABLE IF NOT EXISTS `profils` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `utilisateur` int(11) NOT NULL,
  `categorie` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  `profil` int(11) NOT NULL,
  `produit` int(11) NOT NULL,
  `rapport` int(11) NOT NULL,
  `bilan_ville` int(11) NOT NULL,
  `bilan_national` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profils_nom_unique` (`nom`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Contenu de la table `profils`
--

INSERT INTO `profils` (`id`, `nom`, `utilisateur`, `categorie`, `client`, `profil`, `produit`, `rapport`, `bilan_ville`, `bilan_national`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur', 1, 1, 1, 1, 1, 0, 0, 0, '2017-03-27 15:30:23', '2017-03-27 15:30:23'),
(2, 'Vendeur', 0, 0, 0, 0, 0, 1, 0, 0, '2017-03-27 15:30:27', '2017-03-27 15:30:27'),
(3, 'Responsable', 0, 0, 0, 0, 0, 0, 1, 0, '2017-03-27 15:30:36', '2017-03-27 15:30:36'),
(4, 'Manager', 0, 0, 0, 0, 0, 0, 1, 1, '2017-03-27 15:30:45', '2017-03-27 15:30:45'),
(5, 'Super Administrateur', 1, 1, 1, 1, 1, 1, 1, 1, '2017-03-27 15:31:03', '2017-03-27 15:31:03');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profil_id` int(10) unsigned NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nom_unique` (`nom`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_profil_id_foreign` (`profil_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `email`, `ville`, `profil_id`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Edward NANDA', 'enanda@bvssas.com', 'Douala', 5, 'aaaaaaaa', NULL, '2017-03-27 10:03:52', '2017-03-27 15:55:15'),
(2, 'François BINAM', 'fbinam@bvssas.com', 'Douala', 2, 'aaaaaaaa', NULL, '2017-03-27 10:04:40', '2017-03-27 10:04:40'),
(3, 'Erika MENGUE', 'emengue@bvssas.com', 'Douala', 2, 'aaaaaaaa', NULL, '2017-03-27 13:04:05', '2017-03-27 13:04:05');

-- --------------------------------------------------------

--
-- Structure de la table `ventes`
--

CREATE TABLE IF NOT EXISTS `ventes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quantite` int(11) NOT NULL,
  `date` date NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `visite_id` int(10) unsigned NOT NULL,
  `produit_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ventes_user_id_foreign` (`user_id`),
  KEY `ventes_visite_id_foreign` (`visite_id`),
  KEY `ventes_produit_id_foreign` (`produit_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Contenu de la table `ventes`
--

INSERT INTO `ventes` (`id`, `quantite`, `date`, `type`, `visite_id`, `produit_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 4, '2017-03-27', 'livre', 1, 75, 2, '2017-03-27 16:02:16', '2017-03-27 16:02:16'),
(2, 70, '2017-03-27', 'livre', 1, 72, 2, '2017-03-27 16:02:17', '2017-03-27 16:02:17'),
(3, 45, '2017-03-27', 'livre', 1, 69, 2, '2017-03-27 16:02:17', '2017-03-27 16:02:17'),
(4, 14, '2017-03-27', 'livre', 1, 14, 2, '2017-03-27 16:02:17', '2017-03-27 16:02:17'),
(5, 18, '2017-03-27', 'besoins', 1, 20, 2, '2017-03-27 16:02:17', '2017-03-27 16:02:17');

-- --------------------------------------------------------

--
-- Structure de la table `visites`
--

CREATE TABLE IF NOT EXISTS `visites` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `personne` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `raison` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prospect` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `opportunite` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `somme` int(11) NOT NULL,
  `proposition` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visites_client_id_foreign` (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Contenu de la table `visites`
--

INSERT INTO `visites` (`id`, `date`, `personne`, `raison`, `prospect`, `opportunite`, `somme`, `proposition`, `client_id`, `created_at`, `updated_at`) VALUES
(1, '2017-03-27', '', '', '', '', 1442700, '', 3, '2017-03-27 16:02:16', '2017-03-27 16:02:18');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_profil_id_foreign` FOREIGN KEY (`profil_id`) REFERENCES `profils` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ventes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ventes_visite_id_foreign` FOREIGN KEY (`visite_id`) REFERENCES `visites` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `visites`
--
ALTER TABLE `visites`
  ADD CONSTRAINT `visites_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
