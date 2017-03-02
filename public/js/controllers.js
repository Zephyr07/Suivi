/**
 * Created by Edward NANDA on 17/02/2017.
 */

controller
    .controller("AppCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("HeaderCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("FooterCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])

    .controller("HomeCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])

    .controller("RapportsCtrl",['$scope',function($scope){
        $scope.ventes=[];
        $scope.ventes[0]={produits:[],besoins:[]};
        $scope.ventes[0].produits[0]={};
        $scope.ventes[0].besoins[0]={};

        $scope.ajouter_visite=function(){
            $scope.ventes.push({produits:[{quantite:0}],besoins:[{quantite:0}]});
        };

        $scope.supprimer_visite=function(v){
            if($scope.ventes.length>1){
                $scope.ventes.splice($scope.ventes.indexOf(v), 1);
            }
        };

        $scope.ajouter_produit=function(v){
            v.produits.push({quantite:0});
        };

        $scope.supprimer_produit=function(v,p){
            if(v.produits.length>1){
                v.produits.splice(v.produits.indexOf(p), 1);
            }
        };

        $scope.ajouter_besoin=function(v){
            v.besoins.push({quantite:0});
        };

        $scope.supprimer_besoin=function(v,p){
            if(v.besoins.length>1){
                v.besoins.splice(v.besoins.indexOf(p), 1);
            }
        };

        $scope.enregistrer_visite=function(){
            console.log($scope.ventes);
        }


    }])

    .controller("LoginCtrl",['$scope',function($scope){

    }]);