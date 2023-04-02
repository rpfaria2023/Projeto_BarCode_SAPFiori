sap.ui.define([
    //Declaração de bibliotecas
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    //Inicialização
    function (Controller, library, JSONModel) {
        "use strict";

        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { //onInit equivale a INITIALIZATION no abap
             let produto = {};
             let productModel = new JSONModel(produto);
             let view = this.getView();
             view.setModel(productModel, "ModeloProduto");

             //this no javascript = ME-> no ABAP
            },
            onClickImage: function(oEvent){
                urlObject.redirect(oEvent.getSource().getSrc(), true );
            },

            onPressBuscar: function(){
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true
                };
                //debugger
                //promisse = quando uma função retorna como parâmetro de exportação
                //outra função
                $.ajax(parameters).done(function(response){
                    //debugger
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    //clear
                    oProdutoModel.setData({});
                    oProdutoModel.refresh(); //limpa tela
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this) ) //sucesso //this = me->
                .fail(function(){
                    debugger

                }.bind(this) ); //exception tratamento de erro

                debugger //Break-point no ABAP



                //variável tipo texto - com aspas
                let material = "Água mineral natural";
                //variável tipo numérido inteiro
                let peso = 500;
                let uom = "ml";
                //numérico com casas decimais
                let qtdsodio = 15.66;
                //booleano - abap_bool
                let conteudoliquido = true;

                //tabela interna no JavaScript - array
                let composicao = ["bicarbonado","magnésio","sulfato","brometo"];
                //estrutura - tipo com várias propriedades - ou também chamado objeto
                let produto = {
                    descricao : "chá verde",
                    marca:  "quaker",
                    peso : 130,
                    uom : "g" 
                }

            }
        });
    });
