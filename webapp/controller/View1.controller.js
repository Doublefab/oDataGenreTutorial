sap.ui.define([
    "project1/controller/BaseController", // Cambiato il percorso per estendere il BaseController
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
], function (BaseController, History, UIComponent, JSONModel,Fragment) {
    "use strict";

    return BaseController.extend("project1.controller.View1", {
        onInit: function () {
            // Inizializza un modello JSON per i nuovi dati del genere
            const oData = {};
            this.getView().setModel(new JSONModel(oData), "newGenreData");
        },

        // Gestione del submit del form per aggiungere un nuovo genere
        onSubmitNewGenre: function () {
            var oModel = this.getView().getModel('adminServicev2'); // OData Model
            var oNewGenre = {
                name: this.byId("genreNameInput").getValue(),
                descr: this.byId("genreDescrInput").getValue()
            };

            console.log(this.getView().getModel('adminServicev2'));
            console.log(oNewGenre);

            oModel.create("/Genres", oNewGenre, {
                success: () => {
                    sap.m.MessageToast.show("Genre created successfully!");
                    this.baseCloseDialog('addGenreDialog');
                    this.getView().getModel().refresh(true);
                    this.getView().getModel("newGenreData").setProperty('/', {});
                },
                error: () => {
                    sap.m.MessageToast.show("Error creating genre");
                }
            });
        },

        // Gestione del click su un elemento della tabella
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var sGenreId = oContext.getProperty("ID");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                genreId: sGenreId
            });
        },

        // Gestione del click sul pulsante per aggiungere un nuovo genere
        onAddGenre: function () {
            var oView = this.getView();

            // Carica il fragment solo se non è già stato caricato
            if (!this.byId("addGenreDialog")) {
                Fragment.load({
                    id: oView.getId(),  // Imposta l'ID del View come prefisso
                    name: "project1.view.fragments.AddGenre",  // Path del fragment
                    controller: this   // Passa il controller al fragment
                }).then(function (oDialog) {
                    // Aggiungi il dialog come dipendente della view per una corretta gestione
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("addGenreDialog").open();
            }
        },
    });
});
