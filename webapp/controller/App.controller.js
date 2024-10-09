sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.App", {

     onInit: function() {
     
        // Controlla se il modello esiste
        const oModel = this.getView().getModel(); // Modello OData principale

        if (!oModel) {
           console.error("Modello OData non trovato!");
           return;
        }
     
        oModel.read("/Genres", { // Chiamata OData all'entità 'Genres'
           success: function(oData) {
              oData.results.forEach(item => {
                 console.log("Genre: ", item); // Visualizza ogni oggetto 'Genres' nel console log
              });
           },
           error: function(oError) {
              console.error("Errore durante la chiamata OData: ", oError);
           }
        });
     }
  });
});
