Ext.define('LECTCOMP.view.panellSeleccio', {
	extend: 'Ext.dataview.List',
	xtype:'panellSeleccio',

	config: {
		itemTpl: ['<div><b>{nComptador} {nomCarrer} {numero} {pis} {llegit}</b></div>'],
		id: 'listSeleccio',
		//onItemDisclosure: true,
		store: 'llistaCompt',
		layout: {
			type: 'vbox',
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
									Ext.Msg.alert("Avís", 'Lectura emmagatzemada');                 
			            	} else if(btn == 'Amb Incid.') {
									Ext.Msg.prompt('Introduiex la incidència', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
														if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															Ext.Msg.alert("Avís", 'Lectura emmagatzemada amb incidència');
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
										Ext.Msg.alert("Avís", 'Lectura emmagatzemada');                 
		   	      	   	} else if(btn == 'No'){
										Ext.Msg.prompt('Guardar amb incidència?', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
														if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															Ext.Msg.alert("Avís", 'Lectura emmagatzemada amb incidència');
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
															Ext.Msg.alert("Avís", 'Lectura emmagatzemada amb incidència');
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
										Ext.Msg.alert("Avís", 'Lectura emmagatzemada');
									} else if(btn == 'No'){        
										Ext.Msg.alert("Avís", 'Lectura cancel·lada');                 
		         	   		} else {
										Ext.Msg.prompt('Introduiex la incidència', '', 
											function(btn, textIncidencia){
												if (btn == 'ok'){
													if (textIncidencia==''){
															Ext.Msg.alert("Avís", 'Cancel·lada: No hi ha incidència');
														}else{
															Ext.Msg.alert("Avís", 'Lectura emmagatzemada amb incidència');
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
	}//Fi onListItemTap
		
});