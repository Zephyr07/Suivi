
INSERT INTO `categories` (`id`, `intitule`, `type`, `created_at`, `updated_at`) VALUES
(1, 'VIP', 'Client', '2017-03-17 13:13:53', '2017-03-17 13:13:53'),
(2, 'GSM', 'Client', '2017-03-17 13:13:58', '2017-03-17 13:13:58'),
(3, 'VINS', 'Produit', '2017-03-17 13:14:11', '2017-03-17 13:14:11'),
(4, 'CHAMPAGNE', 'Produit', '2017-03-17 13:14:17', '2017-03-17 13:14:17');

-- --------------------------------------------------------


INSERT INTO `clients` (`id`, `nom`, `email`, `telephone`, `adresse`, `ville`, `boite_postale`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 'CASION', 'casion@casion.com', 200000000, 'rue goffre', 'Douala', 1, 1, '2017-03-17 13:16:17', '2017-03-17 13:16:17'),
(4, 'MAHIMA', 'qdqsd@ds.csd', 200000501, 'qsd', 'Yaoundé', 5, 2, '2017-03-17 13:17:04', '2017-03-17 13:17:04');

-- --------------------------------------------------------


INSERT INTO `produits` (`id`, `libelle`, `prix`, `quantite_stock`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 'MUSTAC', 8000, 45, 3, '2017-03-17 13:14:52', '2017-03-17 13:14:52'),
(2, 'MUMM NIGHT EDITION', 1452, 5, 4, '2017-03-17 13:15:10', '2017-03-17 13:15:10'),
(3, 'PERRIET JOUET', 75000, 2, 4, '2017-03-17 13:15:26', '2017-03-17 13:15:26'),
(4, 'MERLOT MAISON CASTEL', 9555, 654, 3, '2017-03-17 13:15:40', '2017-03-17 13:15:40');

-- --------------------------------------------------------

--
INSERT INTO `profils` (`id`, `nom`, `utilisateur`, `categorie`, `client`, `profil`, `produit`, `rapport`, `bilan_ville`, `bilan_national`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur', 1, 1, 1, 1, 1, 1, 1, 1, '2017-03-17 09:56:35', '2017-03-17 09:56:35'),
(2, 'Vendeur', 0, 0, 0, 0, 0, 1, 0, 0, '2017-03-17 10:00:45', '2017-03-17 10:00:45');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--
INSERT INTO `users` (`id`, `nom`, `email`, `ville`, `profil_id`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Edward NANDA', 'enanda@bvssas.com', 'Yaoundé', 1, 'aaaaaaaa', NULL, '2017-03-17 13:06:28', '2017-03-17 13:06:47'),
(5, 'Andrea TAHOUE', 'atahoue@bvssas.com', 'Douala', 2, 'test123', NULL, '2017-03-17 13:10:59', '2017-03-17 13:10:59');

-- --------------------------------------------------------
