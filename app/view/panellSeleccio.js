Ext.define('LECTCOMP.view.panellSeleccio', {
	extend: 'Ext.dataview.List',
	xtype:'panellSeleccio',

	config: {
		itemTpl: ['<div><b>{nComptador} {nomCarrer} {numero} {pis} {llegit}</b></div>'],
		id: 'listSeleccio',
		//onItemDisclosure: true,
		store: 'llistaComptadors',
		layout: {
			type: 'vbox',
   			align:'strecth',
   			pack:'start'
   		},
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'SELECCIONA COMPTADOR',
			},
		],
		listeners: [
			{
				fn: 'onListItemTap',
				event: 'itemtap'
			}
		]
	},
	
	onListItemTap: function(dataview, index, target, record, e, options) {
		var minC=record.get('minim');
		var maxC=record.get('maxim');
		var lectAnt=record.get('lecturaAnterior');
		
		
		Ext.Msg.prompt('Introduiex la lectura', '', 
			function(btn, text){
				if (btn == 'cancel'){
					Ext.Msg.alert("Avís", 'Lectura cancel·lada');
    			} else if (btn == 'ok'){
    				if (text=='') {
						Ext.Msg.alert("Avís", 'No has introduit lectura');    					
    				} else {
						if ((minC<=text) && (text<=maxC)) {
							//Lectura dins dels límnits acceptats				
							Ext.Msg.show({
         	   					title:'Confirmes la lectura '+text+'?',
	            				msg: '',
    	        				buttons: [{text : 'Cancel·lar'}, {text : 'Acceptar'}, {text : 'Amb Incid.'}],
        	    				fn: showResult,
            					animEl: 'elId',
            					icon: Ext.MessageBox.QUESTION
        					});
        					function showResult(btn){
            				if(btn == 'Acceptar'){
									guardarLectura(record,text,record.get('nComptador'), 0, '');            					
			            	} else if(btn == 'Amb Incid.') {
									Ext.Msg.prompt('Introduiex la incidència', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
														if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															guardarLectura(record,text,record.get('nComptador'), 0, textIncidencia);
														}
												} else {
														Ext.Msg.alert("Avís", 'Lectura cancel·lada');
												}            			
									});		            		
			               } else {
									Ext.Msg.alert("Avís", 'Lectura cancel·lada');		  		               	
		      	         } 
        					}					
						} else {
							if (lectAnt>text){
								//La lectura introduida és inferior a l'anterior
								Ext.Msg.show({
      		      			title:'Error: És volta de comptador?',
         		   			msg: '',
            					buttons: [{text : 'No'}, {text : 'Si'}, {text : 'Si amb Incid.'}],
            					fn: showVolta,
            					animEl: 'elId',
            					icon: Ext.MessageBox.QUESTION
	        					});
	   	     				function showVolta(btn){
   	      	   			if(btn == 'Si'){
										guardarLectura(record,text,record.get('nComptador'), 1, '');                 
		   	      	   	} else if(btn == 'No'){
										Ext.Msg.prompt('Guardar amb incidència?', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
														if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															guardarLectura(record,text,record.get('nComptador'), 0, textIncidencia);
														}
												} else {
														Ext.Msg.alert("Avís", 'Lectura cancel·lada');
												}            			
										});		            		
									                 
		         		   	} else {
										Ext.Msg.prompt('Introduiex la incidència', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
														if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															guardarLectura(record,text,record.get('nComptador'), 0, textIncidencia);
														}
												} else {
													Ext.Msg.alert("Avís", 'Lectura cancel·lada');
												}            			
										});		            		
		      	   	   	}
        						}					
								
							} else {
								//La lectura és superior a l'anterior, però està fora dels marges lògics.
								var missatge;
								if (text<minC){
									missatge='Poc consum: Acceptes '+text+'?';
								} else{
									missatge='Massa consum: Acceptes '+text+'?';
								}
		
								Ext.Msg.show({
      		      			title:missatge,
         		   			msg: '',
            					buttons: [{text : 'No'}, {text : 'Si'},{text : 'Si amb Incid.'}],
            					fn: showExces,
   	         				animEl: 'elId',
	            				icon: Ext.MessageBox.QUESTION
	   	     				});
   	   	  				function showExces(btn){
         		   			if(btn == 'Si'){
										guardarLectura(record,text,record.get('nComptador'), 0, '');
									} else if(btn == 'No'){        
										Ext.Msg.alert("Avís", 'Lectura cancel·lada');                 
		         	   		} else {
										Ext.Msg.prompt('Introduiex la incidència', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
													if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															guardarLectura(record,text,record.get('nComptador'), 0, textIncidencia);
														}
												} else {
													Ext.Msg.alert("Avís", 'Lectura cancel·lada');
												}            			
										});		            		
		         		   	}
        						}					
							}	
						}
					}					
				}// 			     
    		}
		);
		
		function guardarLectura(reg, vLectura,vNumComptador, vEsVolta, vIncidencia){
			debugger;
			var storeLect = Ext.data.StoreManager.lookup('lecturesStore');
			var vData = new Date();

			var registre={"valor":vLectura, "nComptador": vNumComptador, "dataLectura": vData.toUTCString(), "esVolta":vEsVolta, "incidencia": vIncidencia}
			storeLect.add(registre);
			storeLect.sync();
			
			reg.set("llegit", "<IMG SRC='img/ok.png' WIDTH=15 HEIGHT=15>");
   	}
	
	} //Fi onListItemTap
	
});