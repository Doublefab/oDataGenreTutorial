sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("project1.controller.BaseController", {

        _fragments: {},

        // Metodo comune per caricare e aprire un fragment (ad esempio, una dialog)
        baseOpenDialog: async function (sFragmentName) {
            var oView = this.getView();
            var oFragment = this._fragments[sFragmentName];

            if (!oFragment) {
                const name = `project1.view.fragments.${sFragmentName}`;
                const oFragmentInstance = await Fragment.load({ name, controller: this });
                oView.addDependent(oFragmentInstance);
                oFragmentInstance.open();
                this._fragments[sFragmentName] = oFragmentInstance;
                return oFragmentInstance;
            } else {
                // Fragment già caricato, basta aprirlo
                oFragment.open();
                return Promise.resolve(oFragment);
            }
        },

        // Metodo per chiudere un fragment (ad esempio, una dialog)
        baseCloseDialog: function (sFragmentName) {
            if (this._fragments[sFragmentName]) {
                this._fragments[sFragmentName].close(); // Supponendo che sia una dialog
            }
        },

        // Metodo opzionale per distruggere il fragment (pulizia se necessario)
        baseDestroyDialog: function (sFragmentName) {
            if (this._fragments[sFragmentName]) {
                this._fragments[sFragmentName].destroy();
                delete this._fragments[sFragmentName];  // Rimuove dalla cache
            }
        }
    });
});
