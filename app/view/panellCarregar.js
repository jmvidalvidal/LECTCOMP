Ext.define('LECTCOMP.view.panellCarregar', {
	extend: 'Ext.Panel',
    xtype:'panellCarregar',

	config: {
   	id: 'panellcarregar',
   	scrollable: 'vertical',
   	layout:{
   		type: 'vbox',
   		align:'strecth',
   		pack:'start'		
   	},
      items: [
			{
         	xtype: 'titlebar',
            docked: 'top',
            title: 'CARREGAR DADES',
            },
   			{
				xtype: 'label',
				id: 'labelTipus',
				html: '<div align="center"><strong>TIPUS DE CONNEXIÓ:</strong></div>',
				margin:5,
 
			},
			{
				xtype: 'label',
				html: '<p align="justify">Els procediments marcats amb * necessiten contrasenya per executar-se',
				margin:14,
 
			},
			{
				xtype: 'passwordfield',
				label: 'Contrasenya',
				id: 'contrasenya',
				margin:14,
			},
        	{
           	xtype: 'button',
            id: 'btnCarregarSistema',
            text: 'Carregar Dades Trimestre',
            ui: 'action',
            margin:14
         },
        	{
           	xtype: 'button',
            id: 'btnCarregarVialer',
            text: '*Carregar Vialer',
            ui: 'action',
            margin:14
         },
        	{
           	xtype: 'button',
            id: 'btnCarregarComptadors',
            text: '*Carregar Comptadors',
            ui: 'action',
            margin:14
         },
        	{
           	xtype: 'button',
            id: 'btnInicialitzarLectures',
            text: '*Esborrar lectures fetes',
            ui: 'decline',
            margin:14
         },
         {
           	xtype: 'button',
            id: 'btnNumLectures',
            text: 'Lectures introduïdes',
            ui: 'confirm',
            margin:14
         },
         {
           	xtype: 'button',
            id: 'btnAdrIp',
            text: 'Connexió dades remot',
            ui: 'confirm',
            margin:14
         }         
      ],
		listeners: [
            {
                fn: 'onPanellCarregarInitialize',
                event: 'initialize'
            },		
			{
				fn: 'onBtnCarregarSistema',
				event: 'tap',
				delegate: '#btnCarregarSistema'
			},
			{
				fn: 'onBtnCarregarVialer',
				event: 'tap',
				delegate: '#btnCarregarVialer'
			},
			{
				fn: 'onBtnCarregarComptadors',
				event: 'tap',
				delegate: '#btnCarregarComptadors'
			},
			{
				fn: 'onbtnInicialitzarLectures',
				event: 'tap',
				delegate: '#btnInicialitzarLectures'
			},
			{
				fn: 'onbtnNumLectures',
				event: 'tap',
				delegate: '#btnNumLectures'
			},
			{
				fn: 'onbtnAdrIp',
				event: 'tap',
				delegate: '#btnAdrIp'
			},
			{
				fn: 'onShow',
				event: 'show'
			}			
		]
	},
	
	onPanellCarregarInitialize: function(component, options) {
		if (LECTCOMP.app.adr_ip_dades==='http://217.126.56.102:8082'){
			Ext.ComponentQuery.query('#btnAdrIp')[0].setText('Cambiar connexió dades Local');
			Ext.ComponentQuery.query('#labelTipus')[0].setHtml('<div align="center"><strong>TIPUS DE CONNEXIÓ: REMOT</strong></div>');				
		} else {
			Ext.ComponentQuery.query('#btnAdrIp')[0].setText('Cambiar connexió dades Remot');	
			Ext.ComponentQuery.query('#labelTipus')[0].setHtml('<div align="center"><strong>TIPUS DE CONNEXIÓ: LOCAL</strong></div>');				
		}
	},
	
	onBtnCarregarSistema: function(button, e, options) {
		Ext.Viewport.setMasked({xtype: 'loadmask'
       		       , message: "Inicialitzant..."});
        var storeIni = Ext.data.StoreManager.lookup('inicialStore');
		Ext.data.JsonP.request({
 	      	   url: LECTCOMP.app.adr_ip_dades+'/LECTCOMP/json/trimestre.json',
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
 	      	   url: LECTCOMP.app.adr_ip_dades+'/LECTCOMP/json/claus.json',
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
      		
      this.getParent().pop();
	},

	onBtnCarregarVialer: function(button, e, options) {
		vContrasenya =  Ext.ComponentQuery.query('#contrasenya')[0].getValue();
		
		if (vContrasenya!== ''){
			var esCorrecte = this.contrasenyaValida(vContrasenya);
			if (esCorrecte === 1){	
				var storeVlr = Ext.data.StoreManager.lookup('vialerStore');
		
				//Carreguem el vialer
				Ext.Viewport.setMasked({xtype: 'loadmask'
         		       , message: "Carregant Vialer..."});
		
				Ext.data.JsonP.request({
   	      	   url: LECTCOMP.app.adr_ip_dades+'/LECTCOMP/json/vialer.json',
      	      	callbackName: 'vialerCb',
         	   	success: function(result, request) {
            			storeVlr.removeAll();
	            		var vialer = result.vialer;
   	         		for (var i = 0; i < vialer.length ; i++) {
      	      			storeVlr.add(vialer[i]);
	         	   	};
   	         		storeVlr.sync();
      	         	 // Unmask the viewport
	      	          Ext.Viewport.unmask();
   	      	   },
      	      	failure: function() {
            			Ext.Viewport.unmask();
	            		Ext.Msg.alert(
		           			 "Avis",
   		         		 "No hi ha internet o el servidor ha caigut."
      		  		);
        			}
      		});
      	} else {
				Ext.Msg.show({ title: 'Avís:',
						message: 'Codi Seguretat incorrecte',
						buttons:  [{text : 'Acceptar'}]});
      	}	
    	} else {
     		Ext.Msg.alert("Avís:", "Falta la contrasenya");
    	} 
	},
	
	onBtnCarregarComptadors: function(button, e, options) {
		vContrasenya =  Ext.ComponentQuery.query('#contrasenya')[0].getValue();
		
		if (vContrasenya!== ''){
			var esCorrecte = this.contrasenyaValida(vContrasenya);
			if (esCorrecte === 1){						
	      	//Carreguem els comptadors
		      //Si l'anterior càrrega a fallat no seguim
  				var storeCmpt = Ext.data.StoreManager.lookup('llistaComptadors');
	
				Ext.Viewport.setMasked({xtype: 'loadmask', message: "Carregant Comptadors..."});
			
				Ext.data.JsonP.request({
					url: LECTCOMP.app.adr_ip_dades+'/LECTCOMP/json/comptadors.json',
					callbackName: 'comtpadorsCb',
					success: function(result, request) {
						storeCmpt.removeAll();
   	      	   var comptadors = result.comptadors;
      	      	for (var i = 0; i < comptadors.length ; i++) {
	         	   	storeCmpt.add(comptadors[i]);
   	         	};
						storeCmpt.sync();
						
						// Unmask the viewport
						Ext.Viewport.unmask();
					},
					failure: function() {
         		   Ext.Viewport.unmask();
            		Ext.Msg.alert("Avis",
            			 		"No hi ha internet o el servidor ha caigut."
	        			);
	   	     	}
   	   	});
      	} else {
				Ext.Msg.show({ title: 'Avís:',
						message: 'Codi Seguretat incorrecte',
						buttons:  [{text : 'Acceptar'}]});
      	}	   	   	
    	} else {
     		Ext.Msg.alert("Avís:", "Falta la contrasenya");
    	}       
	},
	
	onbtnInicialitzarLectures: function(button, e, options) {
		vContrasenya =  Ext.ComponentQuery.query('#contrasenya')[0].getValue();
		
		if (vContrasenya!== ''){		
			var esCorrecte = this.contrasenyaValida(vContrasenya);
			if (esCorrecte === 1){	
				Ext.Msg.show({title:'Estàs segur?',
						msg: '',
      		      buttons: [{text : 'Acceptar'},{text : 'Cancel·lar'}],
         		   fn: showResult,
            		animEl: 'elId',
	            	icon: Ext.MessageBox.QUESTION
	   	     		});
		
				function showResult(btn){
					if(btn == 'Acceptar'){
						var storeLect = Ext.data.StoreManager.lookup('lecturesStore');
		
						Ext.Viewport.setMasked({xtype: 'loadmask', message: "Inicialitzant lectures..."});
	
   	   			storeLect.removeAll();
      			
      				storeLect.sync();
		
						Ext.Viewport.unmask();
					}
				}
			} else {
				Ext.Msg.show({ title: 'Avís:',
						message: 'Codi Seguretat incorrecte',
						buttons:  [{text : 'Acceptar'}]});
      	}	  
    	} else {
     		Ext.Msg.alert("Avís:", "Falta la contrasenya");
    	} 					
	},
	
	onbtnNumLectures: function(button, e, options) {
		var storeLect = Ext.data.StoreManager.lookup('lecturesStore');
		var num = storeLect.getCount( );
		
		Ext.Msg.alert("Lectures:",num);
	},
	
	
   contrasenyaValida: function(text) {
		var correcte=0;
		//Accedim a l'store per localitzar la clau de seguretat
		var store = Ext.data.StoreManager.lookup('clausSistema');

		for(var i = 0; i < store.getCount(); i++) {  
			if (store.getAt(i).get('clau') == text){
				correcte=1;
			}
		}
		
		return correcte;
	},
	
	onbtnAdrIp: function(button, e, options) {
		if (LECTCOMP.app.adr_ip_dades==='http://217.126.56.102:8082'){
			Ext.ComponentQuery.query('#btnAdrIp')[0].setText('Cambiar connexió dades Remot');
			Ext.ComponentQuery.query('#labelTipus')[0].setHtml('<div align="center"><strong>TIPUS DE CONNEXIÓ: LOCAL</strong></div>');
			LECTCOMP.app.adr_ip_dades='http://192.168.1.11:8082';				
		} else {
			Ext.ComponentQuery.query('#btnAdrIp')[0].setText('Cambiar connexió dades Local');	
			Ext.ComponentQuery.query('#labelTipus')[0].setHtml('<div align="center"><strong>TIPUS DE CONNEXIÓ: REMOT</strong></div>');				
			LECTCOMP.app.adr_ip_dades='http://217.126.56.102:8082';				
		}
	},
	
	onShow: function(){
		var storeI = Ext.data.StoreManager.lookup('inicialStore');
		var storeC = Ext.data.StoreManager.lookup('clausSistema');
		if ((storeI.getCount()===0) || (storeC.getCount()===0)){
			Ext.ComponentQuery.query('#btnCarregarVialer')[0].setDisabled(true);
			Ext.ComponentQuery.query('#btnCarregarComptadors')[0].setDisabled(true);
			Ext.ComponentQuery.query('#btnInicialitzarLectures')[0].setDisabled(true);
		} else {
			Ext.ComponentQuery.query('#btnCarregarVialer')[0].setDisabled(false);
			Ext.ComponentQuery.query('#btnCarregarComptadors')[0].setDisabled(false);
			Ext.ComponentQuery.query('#btnInicialitzarLectures')[0].setDisabled(false);
		}
	}			
});