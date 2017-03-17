/**
 * Created by Edward NANDA on 17/02/2017.
 */

controller
    .controller("AppCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("HeaderCtrl",['$scope',function($scope){
        $scope.current=new Date();
        var current=new Date();
        console.log(current.toLocaleDateString())
    }])
    
    .controller("FooterCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])

    .controller("HomeCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){
        $scope.current=new Date();

        console.log($scope.current);

        $scope.ventes=[];
        $scope.besoin=[];
        $scope.vendeurs=[];

        // recupération des vendeurs
        Restangular.all('user').getList().then(function(data){
            angular.forEach(data,function(u,k){
                if(u.profil.nom=="Vendeur"||u.profil.nom=="vendeur"||u.profil.nom=="VENDEUR"){
                    $scope.vendeurs.push(u);
                }
            });
        });

        // recupération des ventes et besoins
        Restangular.all('vente').getList().then(function(data){
            $scope.ventes.push($filter('filter')(data,{type:'livre'},true));
            $scope.besoin.push($filter('filter')(data,{type:'besoins'},true));
        });

        // recupération des 3 meilleurs ventes
        Restangular.all('vente/livre/2015-01-01/2018-01-01').getList().then(function(data){
            $scope.meilleur_vente=data;
        });

        // recupération des 3 meilleurs besoins
        Restangular.all('vente/besoins/2015-01-01/2018-01-01').getList().then(function(data){
            $scope.meilleur_besoin=data;
        });

        // recupération des rapports de visites
        Restangular.all('visite').getList().then(function(data){
            $scope.visites=data;
            console.log(data);
        });

    }])

    .controller("DetailCtrl",['$scope','Restangular','$stateParams',function($scope,Restangular,$stateParams){
        var id=$stateParams.id;

        //recupération des détails d'une visite
        Restangular.one("visite",id).get().then(function(data){
            $scope.visite=data;
            console.log(data);
        })
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
                        p.user_id=2;
                        p.type="livre";
                        p.visite_id=data.id;
                        allVente.post(p).then(function(pdata){

                        },function(pq){
                            console.log(pq);
                        });
                    });

                    angular.forEach(v.besoins,function(p,pk){
                        p.date=date;
                        p.user_id=2;
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
                //$scope.ventes=[];
                //$scope.ventes[0]={produits:[],besoins:[]};
                //$scope.ventes[0].produits[0]={};
                //$scope.ventes[0].produits[0].quantite=0;
                //$scope.ventes[0].besoins[0]={quantite:0};
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
    
    .controller("ProfilCtrl",['$scope','Restangular',function($scope,Restangular){

        var allCategorie=Restangular.all("profil");

        Restangular.all("profil").getList().then(function(profil){
            angular.forEach(profil,function(p,k){
                p.create=new Date(profil[0].created_at).toLocaleDateString();
                p.update=new Date(profil[0].updated_at).toLocaleDateString();
            });
            console.log(profil);
            $scope.profils=profil;
        });
        

        $scope.editer_profil=function(c){
            $scope.profil=c;
            if($scope.profil.utilisateur==1)
                $scope.profil.utilisateur=true;
            if($scope.profil.client==1 )
                $scope.profil.client=true;
            if($scope.profil.categorie==1)
                $scope.profil.categorie=true;
            if($scope.profil.produit==1)
                $scope.profil.produit=true;
            if($scope.profil.rapport==1)
                $scope.profil.rapport=true;
            if($scope.profil.bilan_ville==1)
                $scope.profil.bilan_ville=true;
            if($scope.profil.bilan_national==1)
                $scope.profil.bilan_national=true;
            if($scope.profil.profil==1)
                $scope.profil.profil=true;
        };

        $scope.supprimer_profil=function(c){
            $scope.profils.splice($scope.profils.indexOf(c), 1);
            c.remove();
        };

        $scope.enregistrer_profil=function(){
            console.log($scope.profil);

            if($scope.profil.utilisateur==undefined)
                $scope.profil.utilisateur=false;
            if($scope.profil.client==undefined )
                $scope.profil.client=false;
            if($scope.profil.categorie==undefined)
                $scope.profil.categorie=false;
            if($scope.profil.produit==undefined)
                $scope.profil.produit=false;
            if($scope.profil.rapport==undefined)
                $scope.profil.rapport=false;
            if($scope.profil.bilan_ville==undefined)
                $scope.profil.bilan_ville=false;
            if($scope.profil.bilan_national==undefined)
                $scope.profil.bilan_national=false;
            if($scope.profil.profil==undefined)
                $scope.profil.profil=false;

            if($scope.profil.id!=undefined){
                var fd = new FormData();
                _.each($scope.profil, function (val, key) {
                    fd.append(key, val);
                });
                fd.append("_method", "PUT");
                Restangular.one('profil',$scope.profil.id).withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                   console.log(data);
                    $scope.profil={};
                },function(q){
                    console.log(q);
                });
            }
            else{

                allCategorie.post($scope.profil).then(function(data){
                    $scope.profils.push(data);
                    $scope.profil={};
                },function(q){
                    console.log(q);
                })
            }
        };


    }])
    
    .controller("ClientCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){

        $scope.client={};
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
    
    .controller("UtilisateurCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){

        $scope.villes=[{value:"Douala",name:"Douala"},{value:"Yaoundé",name:"Yaoundé"}];

        $scope.utilisateur={};
        var allClient=Restangular.all("user");
        $scope.action="edit";
        
        Restangular.all("user").getList().then(function(utilisateur){
            $scope.utilisateurs=utilisateur;
        });

        Restangular.all("profil").getList().then(function(data){
            $scope.profils=data;
        });

        $scope.afficher_utilisateur=function(c){
            $scope.action="vue";
            $scope.utilisateur=c;
        };

        $scope.editer_utilisateur=function(c){
            $scope.action="edit";
            $scope.utilisateur=c;
        };

        $scope.supprimer_utilisateur=function(c){
            $scope.utilisateurs.splice($scope.utilisateurs.indexOf(c), 1);
            c.remove();
        };

        $scope.enregistrer_utilisateur=function(){
            console.log($scope.utilisateur);

            if($scope.utilisateur.id!=undefined){
                var fd = new FormData();
                _.each($scope.utilisateur, function (val, key) {
                    fd.append(key, val);
                });
                fd.append("_method", "PUT");
                Restangular.one('user',$scope.utilisateur.id).withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                   console.log(data);
                    $scope.utilisateur={};
                },function(q){
                    console.log(q);
                });
            }
            else{
                allClient.post($scope.utilisateur).then(function(data){
                    $scope.utilisateurs.push(data);
                    $scope.utilisateur={};
                },function(q){
                    console.log(q);
                })
            }
        };


    }])

    .controller("LoginCtrl",['$scope',function($scope){

    }]);