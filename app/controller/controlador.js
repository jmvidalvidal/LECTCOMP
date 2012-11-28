Ext.define('LECTCOMP.controller.controlador', {
    extend: 'Ext.app.Controller',

    config: {
    },

    init: function(application) {
		Ext.Viewport.setMasked({xtype: 'loadmask'
       		       , message: "Inicialitzant..."});

      var storeIni = Ext.data.StoreManager.lookup('inicialStore');
		Ext.data.JsonP.request({
 	      	   url: 'http://localhost/LECTCOMP/json/trimestre.json',
    	      	callbackName: 'inicialCb',
       	   	success: function(result, request) {
	        			storeIni.removeAll();
   	       		var inicial = result.inicial;
      	   		for (var i = 0; i < inicial.length ; i++) {
  	      				storeIni.add(inicial[i]);
        	   		};
         			storeIni.sync();
	      	   },
      	      failure: function() {
	            	Ext.Msg.alert("Avis","No hi ha internet o el servidor ha caigut.");
        			}
      });
      
		var storeClaus = Ext.data.StoreManager.lookup('clausSistema');
		Ext.data.JsonP.request({
 	      	   url: 'http://localhost/LECTCOMP/json/claus.json',
    	      	callbackName: 'clausCb',
       	   	success: function(result, request) {
	        			storeClaus.removeAll();
   	       		var claus = result.claus;
      	   		for (var i = 0; i < claus.length ; i++) {
  	      				storeClaus.add(claus[i]);
        	   		};
         			storeClaus.sync();
	      	   },
      	      failure: function() {
	            	Ext.Msg.alert("Avis","No hi ha internet o el servidor ha caigut.");
        			}
      });
      Ext.Viewport.unmask();
	}
      
    

});