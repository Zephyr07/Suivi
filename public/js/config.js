/**
 * Created by Edward NANDA on 17/02/2017.
 */

config

    .config(['RestangularProvider', function (RestangularProvider) {
        //set the base url for api calls on our RESTful services
        var newBaseUrl = "/";

        RestangularProvider.setBaseUrl(newBaseUrl);
    }])

    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise( '/auth');

    $stateProvider
        .state('login',{
            url:"/auth",
            title:"Authentification",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@login': {
                    templateUrl: template_url+'static/header-login.html'
                },
                'body@login': {
                    templateUrl: template_url+'auth/login.html',
                    controller:'LoginCtrl'
                }
            }
        })
        .state('home',{
            url:"/",
            title:"Home",
            views:{
                '':{
                    templateUrl: template_url + 'index.html',
                    controller:'HomeCtrl'
                },
                'header@home': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@home': {
                    templateUrl: template_url+'home/content.html'
                },
                'detail@home': {
                    templateUrl: template_url+'partials/filtre.html'
                },
                'footer@home': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('rapports',{
            url:"/rapports",
            title:"Rapports",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@rapports': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@rapports': {
                    templateUrl: template_url+'rapports/formulaire.html',
                    controller:"RapportsCtrl"
                }
            }
        })

        .state('detail_rapport',{
            url:"/detail/:id",
            title:"Détail",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@detail_rapport': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@detail_rapport': {
                    templateUrl: template_url+'rapports/detail.html',
                    controller:"DetailCtrl"
                }
            }
        })
        .state('impression',{
            url:"/impression/:id",
            title:"Imprimer",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@impression': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@impression': {
                    templateUrl: template_url+'rapports/impression.html',
                    controller:"DetailCtrl"
                }
            }
        })

        .state('liste',{
            url:"/liste",
            title:"Liste des rapport.",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@liste': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@liste': {
                    templateUrl: template_url+'rapports/liste.html',
                    controller:"ListeCtrl"
                }
            }
        })

        .state('liste_vente',{
            url:"/liste_vente",
            title:"Liste des rapport.",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@liste_vente': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'detail@liste_vente': {
                    templateUrl: template_url + 'partials/filtre.html'
                },
                'body@liste_vente': {
                    templateUrl: template_url+'ventes/liste_vente.html',
                    controller:"ListeVenteCtrl"
                }
            }
        })

        .state('liste_besoin',{
            url:"/liste_besoin",
            title:"Liste des rapport.",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@liste_besoin': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'detail@liste_besoin': {
                    templateUrl: template_url + 'partials/filtre.html'
                },
                'body@liste_besoin': {
                    templateUrl: template_url+'ventes/liste_besoin.html',
                    controller:"ListeBesoinCtrl"
                }
            }
        })

        .state('liste_client',{
            url:"/liste_client",
            title:"Liste des rapport.",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@liste_client': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'detail@liste_client': {
                    templateUrl: template_url + 'partials/filtre.html'
                },
                'body@liste_client': {
                    templateUrl: template_url+'ventes/liste_client.html',
                    controller:"ListeClientCtrl"
                }
            }
        })

        .state('produits',{
            url:"/produits",
            title:"Produits",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@produits': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@produits': {
                    templateUrl: template_url+'admin/formulaire_produit.html',
                    controller:"ProduitCtrl"
                }
            }
        })

        .state('categories',{
            url:"/categories",
            title:"Categorie",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@categories': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@categories': {
                    templateUrl: template_url+'admin/formulaire_categorie.html',
                    controller:"CategorieCtrl"
                }
            }
        })
        .state('clients',{
            url:"/clients",
            title:"Clients",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@clients': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@clients': {
                    templateUrl: template_url+'admin/formulaire_client.html',
                    controller:"ClientCtrl"
                }
            }
        })
        .state('profils',{
            url:"/profils",
            title:"Profils",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@profils': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@profils': {
                    templateUrl: template_url+'admin/formulaire_profil.html',
                    controller:"ProfilCtrl"
                }
            }
        })

        .state('users',{
            url:"/utilisateurs",
            title:"Utilisateurs",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@users': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@users': {
                    templateUrl: template_url+'admin/formulaire_utilisateur.html',
                    controller:"UtilisateurCtrl"
                }
            }
        })
}]);