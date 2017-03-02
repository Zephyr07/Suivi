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
    $urlRouterProvider.otherwise( '/login');

    $stateProvider
        .state('login',{
            url:"/auth",
            title:"Authentification",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'body@login': {
                    templateUrl: template_url+'auth/login.html',
                    controller:'LoginCtrl'
                },
                'footer@login': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('home',{
            url:"/",
            title:"Home",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@home': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@home': {
                    templateUrl: template_url+'home/content.html',
                    controller:'HomeCtrl'
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
}]);