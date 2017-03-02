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

    .controller("RapportsCtrl",['$scope','Restangular',function($scope,Restangular){
        $scope.ventes=[];
        $scope.ventes[0]={produits:[],besoins:[]};
        $scope.ventes[0].produits[0]={};
        $scope.ventes[0].produits[0].quantite=0;
        $scope.ventes[0].besoins[0]={quantite:0};

        var allVisite=Restangular.all("visite");
        var allVente=Restangular.all("vente");


        Restangular.all("produit").getList().then(function(produit){
            $scope.produits=produit;
        });

        Restangular.all("client").getList().then(function(client){
            $scope.clients=client;
        });

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
            var date=""+(new Date().getYear()+1900)+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
            angular.forEach($scope.ventes,function(v,k){
                v.date=date;
                allVisite.post(v).then(function(data){

                    angular.forEach(v.produits,function(p,pk){
                        p.date=date;
                        p.type="livre";
                        p.visite_id=data.id;
                        allVente.post(p).then(function(pdata){

                        },function(pq){
                            console.log(pq);
                        });
                    });

                    angular.forEach(v.besoins,function(p,pk){
                        p.date=date;
                        p.type="besoins";
                        p.visite_id=data.id;
                        allVente.post(p).then(function(pdata){

                        },function(pq){
                            console.log(pq);
                        });
                    })
                },function(q){
                    console.log(q);
                });
            });
        };


    }])

    .controller("LoginCtrl",['$scope',function($scope){

    }]);