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
        $scope.ventes[0]={produits:[]};
        $scope.ventes[0].produits[0]={};

        $scope.ajouter_visite=function(){
            $scope.ventes.push({produits:[{quantite:0}]});
        }
    }])

    .controller("LoginCtrl",['$scope',function($scope){

    }]);