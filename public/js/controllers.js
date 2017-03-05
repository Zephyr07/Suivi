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
                $scope.ventes=[];
                $scope.ventes[0]={produits:[],besoins:[]};
                $scope.ventes[0].produits[0]={};
                $scope.ventes[0].produits[0].quantite=0;
                $scope.ventes[0].besoins[0]={quantite:0};
            });
        };


    }])

    .controller("ProduitCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){

        var allProduit=Restangular.all("produit");

        //var produit_cat=[];

        Restangular.all("produit").getList().then(function(produit){

            $scope.produits=produit;
        });

        Restangular.all("categorie").getList().then(function(cat){
            $scope.categories=$filter("filter")(cat,{type:'Produit'});
        });


        $scope.editer_produit=function(p){
            $scope.produit=p;
        };

        $scope.supprimer_produit=function(p){
            $scope.produits.splice($scope.produits.indexOf(p), 1);
            p.remove();
        };

        $scope.enregistrer_produit=function(){
            if($scope.produit.id!=undefined){
                var fd = new FormData();
                _.each($scope.produit, function (val, key) {
                    fd.append(key, val);
                });
                fd.append("_method", "PUT");
                Restangular.one('produit',$scope.produit.id).withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                    console.log(data);
                    $scope.produit={};
                },function(q){
                    console.log(q);
                });
            }
            else{
                allProduit.post($scope.produit).then(function(data){
                    $scope.produits.push(data);
                    $scope.produit={};
                })
            }
        };


    }])

    .controller("CategorieCtrl",['$scope','Restangular',function($scope,Restangular){

        var allCategorie=Restangular.all("categorie");

        //var produit_cat=[];
        $scope.types=[{"nom":"Client"},{"nom":"Produit"}];
        Restangular.all("categorie").getList().then(function(categorie){
            $scope.categories=categorie;
        });

        Restangular.all("categorie_produit").getList().then(function(cat){
            $scope.categories=cat;
        });


        $scope.editer_categorie=function(c){
            $scope.categorie=c;
        };

        $scope.supprimer_categorie=function(c){
            $scope.categories.splice($scope.categories.indexOf(c), 1);
            c.remove();
        };

        $scope.enregistrer_categorie=function(){
            console.log($scope.categorie);

            if($scope.categorie.id!=undefined){
                var fd = new FormData();
                _.each($scope.categorie, function (val, key) {
                    fd.append(key, val);
                });
                fd.append("_method", "PUT");
                Restangular.one('categorie',$scope.categorie.id).withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                   console.log(data);
                    $scope.categorie={};
                },function(q){
                    console.log(q);
                });
            }
            else{
                allCategorie.post($scope.categorie).then(function(data){
                    $scope.categories.push(data);
                    $scope.categorie={};
                })
            }
        };


    }])
    
    .controller("ClientCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){

        var allClient=Restangular.all("client");
        $scope.action="edit";
        
        Restangular.all("client").getList().then(function(client){
            $scope.clients=client;
        });

        Restangular.all("categorie").getList().then(function(cat){
            $scope.categories=$filter("filter")(cat,{type:'Client'});
        });

        $scope.afficher=function(c){
            $scope.action="edit";
            $scope.client={};
        };

        $scope.afficher_client=function(c){
            $scope.action="vue";
            $scope.client=c;
        };

        $scope.editer_client=function(c){
            $scope.action="edit";
            $scope.client=c;
        };

        $scope.supprimer_client=function(c){
            $scope.clients.splice($scope.clients.indexOf(c), 1);
            c.remove();
        };

        $scope.enregistrer_client=function(){
            console.log($scope.client);

            if($scope.client.id!=undefined){
                var fd = new FormData();
                _.each($scope.client, function (val, key) {
                    fd.append(key, val);
                });
                fd.append("_method", "PUT");
                Restangular.one('client',$scope.client.id).withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                   console.log(data);
                    $scope.client={};
                },function(q){
                    console.log(q);
                });
            }
            else{
                allClient.post($scope.client).then(function(data){
                    $scope.clients.push(data);
                    $scope.client={};
                },function(q){
                    console.log(q);
                })
            }
        };


    }])

    .controller("LoginCtrl",['$scope',function($scope){

    }]);