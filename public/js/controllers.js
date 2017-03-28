/**
 * Created by Edward NANDA on 17/02/2017.
 */

controller
    .controller("AppCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("HeaderCtrl",['$scope','$cookies','$state',function($scope,$cookies,$state){
        $scope.user=$cookies.getObject("user");
        if($scope.user!=undefined){
            var p=$scope.user.profil;
            console.log($scope.user);
            if(p.produit==1 && p.client==1 && p.categorie==1 && p.profil==1 && p.utilisateur==1){
                $scope.user.admin=true;
            }
        }
    }])
    
    .controller("FooterCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])

    .controller("HomeCtrl",['$scope','Restangular','$filter','$cookies','$state',function($scope,Restangular,$filter,$cookies,$state){
        $scope.current=new Date();
        var j=new Date();
        var user_id=0;

        $scope.user=$cookies.getObject("user");
        if($scope.user==undefined){
            $state.go("login");
        }

        if($scope.user.profil.bilan_ville==1 || $scope.user.profil.bilan_national==1){
            user_id=0;
        }
        else{
            user_id=$scope.user.id;
            $scope.vendeur=user_id;
        }
        $scope.ventes=[];
        $scope.besoin=[];
        $scope.vendeurs=[];
        $scope.categories=[];
        $scope.familles=[{value:"Pernod Ricard",name:"Pernod Ricard"},{value:"Castel",name:"Castel"}];
        $scope.famille="Castel";
        $scope.deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate();
        $scope.fin=$scope.deb;

        var donnees=[];

        // recupération des vendeurs
        Restangular.all('user').getList().then(function(data){
            angular.forEach(data,function(u,k){
                if(u.profil.rapport==1 && u.profil.utilisateur==0){
                    $scope.vendeurs.push(u);
                }
            });
        });

        // recupération des catégories produits
        Restangular.all('categorie').getList().then(function(data){
            angular.forEach(data,function(c,k){
                if(c.type=="Produit"){
                    $scope.categories.push(c);
                }
            });
            if($scope.categories.length>0){
                $scope.categorie=$scope.categories[0].id;
            }
            // chargement des ventes
            Restangular.all('vente_categorie/'+$scope.categorie.id+'/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
                console.log(data);
                angular.forEach(data,function(v,l){
                    donnees.push({name: v.libelle,data:[v.quantite]});
                });
                bilan_vente_graphe(donnees,$scope.deb+'-'+$scope.fin);

            },function(q){
                console.log(q);
            });
        });

        $scope.bilan=function(){
            donnees=[];
            if ($scope.categorie!=undefined){
                Restangular.all('vente_categorie/'+$scope.categorie+'/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
                    angular.forEach(data,function(v,l){
                        donnees.push({name: v.libelle,data:[v.quantite]});
                    });
                    bilan_vente_graphe(donnees,$scope.deb+'-'+$scope.fin);
                },function(q){
                    console.log(q);
                });
            }
        };

        $scope.filtrer=function(id,deb,fin){
            console.log(id,deb,fin);
            $scope.meilleur_besoin=[];
            $scope.meilleur_client=[];
            $scope.meilleur_vente=[];
            $scope.visite=[];
            if(id==undefined){
                user_id=0;
            }
            else{
                user_id=id;
            }

            // recupération des 3 meilleurs ventes
            Restangular.all('vente/livre/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
                angular.forEach(data,function(v,k){
                    v.quantite=cast_prix(""+v.quantite);
                });
                $scope.meilleur_vente=data;
            });

            // recupération des 3 meilleurs besoins
            Restangular.all('vente/besoins/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
                angular.forEach(data,function(v,k){
                    v.quantite=cast_prix(""+v.quantite);
                });
                $scope.meilleur_besoin=data;
            });

            // recupération des 3 meilleurs clients
            Restangular.all('visite_best/'+$scope.deb+'/'+$scope.fin).getList().then(function(data){
                angular.forEach(data,function(v,k){
                    v.somme=cast_prix(""+v.somme);
                });
                $scope.meilleur_client=data;
            });

            // recupération des rapports de visites de la période
            Restangular.all('visite/'+$scope.deb+'/'+$scope.fin).getList().then(function(data){
                angular.forEach(data,function(v,k){
                    v.somme=cast_prix(""+v.somme);
                });
                $scope.visites=data;
                console.log(data);
            });

            $scope.bilan();
        };


        // recupération des 3 meilleurs ventes
        Restangular.all('vente/livre/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
            angular.forEach(data,function(v,k){
                v.quantite=cast_prix(""+v.quantite);
            });
            $scope.meilleur_vente=data;
        });

        // recupération des 3 meilleurs besoins
        Restangular.all('vente/besoins/'+$scope.deb+'/'+$scope.fin+'/'+user_id).getList().then(function(data){
            angular.forEach(data,function(v,k){
                v.quantite=cast_prix(""+v.quantite);
            });
            $scope.meilleur_besoin=data;
        });

        // recupération des 3 meilleurs clients
        Restangular.all('visite_best/'+$scope.deb+'/'+$scope.fin).getList().then(function(data){
            angular.forEach(data,function(v,k){
                v.somme=cast_prix(""+v.somme);
            });
            $scope.meilleur_client=data;
        });

        // recupération des rapports de visites de la période
        Restangular.all('visite/'+$scope.deb+'/'+$scope.fin).getList().then(function(data){
            angular.forEach(data,function(v,k){
                v.somme=cast_prix(""+v.somme);
            });
            $scope.visites=data;
            console.log(data);
        });

    }])

    .controller("DetailCtrl",['$scope','Restangular','$stateParams','$cookies',function($scope,Restangular,$stateParams,$cookies){
        var id=$stateParams.id;
        $scope.user=$cookies.getObject("user");
        $scope.current=new Date();
        //recupération des détails d'une visite
        Restangular.one("visite",id).get().then(function(data){
            data.client.telephone=cast_prix(""+data.client.telephone);
            $scope.visite=data;
            console.log(data);
            $scope.visite.somme=cast_prix(""+$scope.visite.somme);
            Restangular.one("categorie",data.client.categorie_id).get().then(function(data){
                $scope.visite.client.categorie=data;
            });
            Restangular.all("vente").getList({visite_id:data.id}).then(function(data){
                $scope.visite.ventes=data;
                var ventes=[];
                var besoins=[];
                $scope.ventes=[];
                $scope.besoins=[];
                $scope.visite.user=data[0].user;
                angular.forEach(data,function(v,k){
                    if(v.type=='livre'){
                        ventes.push({name:v.produit.libelle,y: v.quantite});
                        $scope.ventes.push({name:v.produit.libelle,y: v.quantite});
                    }
                    else if(v.type=='besoins'){
                        besoins.push({name:v.produit.libelle,y: v.quantite});
                        $scope.besoins.push({name:v.produit.libelle,y: v.quantite});
                    }
                });

                // creation graphe
                graphe_rapport("ventes",ventes);
                graphe_rapport("besoins",besoins);

            },function(q){
                console.log(q);
            })
        },function(q){
            console.log(q);
        });

        $scope.pdf=function(){
            generatePDF();
        }

    }])

    .controller("RapportsCtrl",['$scope','Restangular','$filter','$cookies',function($scope,Restangular,$filter,$cookies){
        var user=$cookies.getObject("user");

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
                if(v.client_id!=undefined){
                    v.date=date;
                    var somme=0;
                    allVisite.post(v).then(function(data){
                        angular.forEach(v.produits,function(p,pk){
                            if(p.quantite>0){
                                // recuperation du prix du produit
                                var pro=$filter("filter")($scope.produits,{id: p.produit_id})[0];
                                somme+=(pro.prix* p.quantite);
                                p.date=date;
                                p.user_id=user.id;
                                p.type="livre";
                                p.visite_id=data.id;
                                allVente.post(p).then(function(pdata){

                                },function(pq){
                                    console.log(pq);
                                });
                            }

                        });

                        angular.forEach(v.besoins,function(p,pk){
                            if(p.produit_id!=undefined && p.quantite>0){
                                p.date=date;
                                p.user_id=user.id;
                                p.type="besoins";
                                p.visite_id=data.id;
                                allVente.post(p).then(function(pdata){

                                },function(pq){
                                    console.log(pq);
                                });
                            }
                        });

                        data.somme=somme;

                        var fd = new FormData();
                        _.each(data, function (val, key) {
                            fd.append(key, val);
                        });
                        fd.append("_method", "PUT");
                        Restangular.one('visite',data.id).withHttpConfig({transformRequest: angular.identity})
                            .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                                //console.log(data);

                            },function(q){
                                console.log(q);
                            });

                    },function(q){
                        console.log(q);
                    });
                    $scope.ventes=[];
                    $scope.ventes[0]={produits:[],besoins:[]};
                    $scope.ventes[0].produits[0]={};
                    $scope.ventes[0].produits[0].quantite=0;
                    $scope.ventes[0].besoins[0]={quantite:0};
                }
                else{
                    alert("Aucun client sélectionné");
                }

            });
        };


    }])

    .controller("ProduitCtrl",['$scope','Restangular','$filter',function($scope,Restangular,$filter){

        $scope.par_page=15;

        var allProduit=Restangular.all("produit");
        $scope.familles=[{value:"Pernod Ricard",name:"Pernod Ricard"},{value:"Castel",name:"Castel"}];

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

        $scope.par_page=15;
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

        $scope.par_page=15;
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
            if($scope.profil.id!=undefined){
                $scope.profil.profil=$scope.profil.profil==true?1:0;
                $scope.profil.produit=$scope.profil.produit==true?1:0;
                $scope.profil.utilisateur=$scope.profil.utilisateur==true?1:0;
                $scope.profil.categorie=$scope.profil.categorie==true?1:0;
                $scope.profil.rapport=$scope.profil.rapport==true?1:0;
                $scope.profil.client=$scope.profil.client==true?1:0;
                $scope.profil.bilan_ville=$scope.profil.bilan_ville==true?1:0;
                $scope.profil.bilan_national=$scope.profil.bilan_national==true?1:0;

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
        $scope.par_page=15;
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

    .controller("LoginCtrl",['$scope','$cookies','Restangular','$state',function($scope,$cookies,Restangular,$state){
        $scope.message="";
        $cookies.putObject("user",undefined,{path:"/"});

        $scope.login=function(auth){
            console.log(auth);
            if(auth.email!=undefined && auth.password!=undefined){
                Restangular.all("user").getList({email:auth.email,password:auth.password}).then(function(data){
                    console.log(data);
                    if(data.length==1){
                        $cookies.putObject("user",data[0],{path:"/"});
                        $state.go("home");
                    }
                    else{
                       $scope.message="Utilisateur inexistant"
                    }
                },function(q){
                    console.log(q);
                })
            }
            else{
                $scope.message="Champs non rempli";
            }
        }
    }]);

function chart(target,date,donnees){

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    $('#area_besoin').highcharts('StockChart', {

        rangeSelector : {
            selected : 4
        },

        title : {
            text : 'AAPL Stock Price'
        },

        series : [{
            name : 'AAPL Stock Price',
            data : donnees,
            marker : {
                enabled : true,
                radius : 3
            },
            //lineWidth : 0,
            shadow : true,
            tooltip : {
                valueDecimals : 2
            }
        }]
    });
}

function bilan_vente_graphe(donnees,periode){
    Highcharts.setOptions(Highcharts.theme);

    Highcharts.chart('area', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bilan des ventes'
        },
        xAxis: {
            categories: [
                periode
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantité'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: donnees
    });
}

function graphe_rapport(libelle,data){

    console.log(data);
    Highcharts.setOptions(Highcharts.theme);
    // Build the chart
    Highcharts.chart(libelle, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Palmares des '+libelle
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Quantité',
            colorByPoint: true,
            data:data
        }]
    });
}

function cast_prix(p){
    var tab= p.split('');
    tab=tab.reverse();
    var i=0;
    var prix="";
    angular.forEach(tab,function(c,k){
        prix=c+""+prix;
        i++;
        if(i%3==0 && tab.length>3){
            prix=" "+prix;
        }
    });
    return prix;
}

function generatePDF () {
    kendo.drawing.drawDOM($("#rapport")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
    });
}