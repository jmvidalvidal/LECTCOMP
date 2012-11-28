Ext.define('LECTCOMP.view.panellLectures', {
	extend: 'Ext.tab.Panel',
	xtype: 'panellLectures',
    
	config: {
		cCar: '',
		nCar: '',
		items: [
			
			{
				xtype: 'container',
				title: 'COMPTADOR',
				id: 'selectorComptadors',
				hidden: false,
				ui: '',
				layout: {
					type: 'vbox'
				},
				items: [
					{
						xtype: 'toolbar',
						docked: 'top',
						title: 'Introdueix el comptador'
					},
					{
						xtype: 'textfield',
						id: 'campNumComptador',
						required: true,
						label: 'Número',
						layout: {
							type: 'vbox'
						}					
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						items: [
							{
								xtype: 'button',
								centered: true,
								itemId: 'btnSelNumComptador',
								text: 'SELECCIONAR COMPTADOR/S'
							}
						]
					}					
				]
			},
			{
				xtype: 'container',
				title: 'ADREÇA',
				id: 'selectorAdreca',
				layout: {
					type: 'vbox',
				},
				items: [
					{
						xtype: 'toolbar',
						docked: 'top',
						title: 'Selecciona adreça i núm.'
					},
					{
						xtype: 'container',
						title: 'NÚM. COMPTADOR',
						items:[
							{
								xtype: 'textfield',
								docked: 'top',
								id: 'nCarrer',
								label: 'Número',
								required: true
							},						
							{
								xtype: 'list',
								docked: 'bottom',
								height: 400,
								id: 'listAdreca',
								itemId: 'mylist1',
								itemTpl: ['<div>{nomCarrerVia}</div>'],
								store: 'vialerStore',
								grouped: true,
								indexBar: true,
							}	
						]
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						items: [
							{
								xtype: 'button',
								centered: true,
								itemId: 'btnSelAdrComptador',
								text: 'SELECCIONAR COMPTADOR/S'
							}
						]
					}
				]
				
			},
			{
				xtype: 'container',
				title: 'Seleccio',
				id: 'selectorAdreca',
				layout: {
					type: 'vbox',
				},
				items: [
					{
						xtype: 'titlebar',
						docked: 'top',
						id: 'mytitlebar1',
						itemId: '',
						title: 'SELECCIONA'
					},
					{
						xtype: 'label',
						height: 46,
						html: '',
						id: 'textSelFeta'
					},
					{
						xtype: 'list',
						height: 384,
						id: 'listSeleccio',
						width: 318,
						itemTpl: ['<div><b>{nComptador} {llegit}</b></div>'],
						store: 'llistaComptadors'
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						items: [
							{
								xtype: 'button',
								centered: true,
								itemId: 'mybutton5',
								ui: 'back',
								text: 'TORNAR A LA SELECCIÓ'
							}
						]
					}
				]
        },
        {	xtype: 'container',
				layout: {
					type: 'vbox',
				},
				title: 'NOU',
				items: [
					{
						xtype: 'toolbar',
						docked: 'top',
						title: 'Comptador nou'
					},
					{
						xtype: 'textfield',
						id: 'nouNumComptador',
						margin:8,
						required: true,
						label: 'Número',
						layout: {
							type: 'vbox'
						}					
					},
					{
						xtype: 'textfield',
						id: 'nouLectura',
						margin:8,
						required: true,
						label: 'Lectura',
						layout: {
							type: 'vbox'
						}					
					},				
					{
						xtype: 'textfield',
						id: 'nouIncidencia',
						margin:8,
						required: true,
						label: 'Adreça',
						layout: {
							type: 'vbox'
						}					
					},				
					{
						xtype: 'toolbar',
						docked: 'bottom',
						items: [
							{
								xtype: 'button',
								centered: true,
								itemId: 'btnNouNumComptador',
								text: 'AFEGEIX COMPTADOR'
							}
						]
					}					
				]
		 }			
		],
      listeners: [
			{
				fn: 'onTabpanelInitialize',
				event: 'initialize'
			},
			{
				fn: 'onBtnNouNumComptadorTap',
				event: 'tap',
				delegate: '#btnNouNumComptador'
			},
			{
				fn: 'onBtnSelNumComptadorTap',
				event: 'tap',
				delegate: '#btnSelNumComptador'
			},			
			{
				fn: 'onBtnSelAdrComptadorTap',
				event: 'tap',
				delegate: '#btnSelAdrComptador'
			},
         {
				fn: 'onListAdrecaItemTap',
				event: 'itemtap',
				delegate: '#listAdreca'
			}
      ]
	},
      		
	onTabpanelInitialize: function(container, value, oldValue, options) {
		this.cCar='';
	},	
	
	onBtnNouNumComptadorTap: function(button, e, options) {
		var storeLect = Ext.data.StoreManager.lookup('lecturesStore');
		var vData = new Date();
		var vNumComptador =  Ext.ComponentQuery.query('#nouNumComptador')[0].getValue();
		var vLectura =  Ext.ComponentQuery.query('#nouLectura')[0].getValue();
		var vIncidencia =  Ext.ComponentQuery.query('#nouIncidencia')[0].getValue();
		
		if ((vNumComptador !== '') && (vLectura !== '') && (vIncidencia !== '')) {
			var registre={"valor":vLectura, "nComptador": vNumComptador, "dataLectura": vData.toUTCString(), "esVolta":"0", "incidencia": vIncidencia}
			storeLect.add(registre);
			storeLect.sync();

			Ext.ComponentQuery.query('#nouNumComptador')[0].setValue('');
			Ext.ComponentQuery.query('#nouLectura')[0].setValue('');
			Ext.ComponentQuery.query('#nouIncidencia')[0].setValue('');
			
			Ext.Msg.alert("Avís:", "Dades registrades");
		} else {
			Ext.Msg.alert("Avís:", "Falten dades");
		}
	},	

	onBtnSelNumComptadorTap: function(button, e, options) {
		//Quan hem introduit el número de comptador o entrat l'adreça
		//Ocultem el contenidor del selector de comptadors
		//I mostrem la llista de comptadors seleccionats.
		var nCompt =  Ext.ComponentQuery.query('#campNumComptador')[0].getValue();

		if (nCompt !== ''){
			storeComtpadors = Ext.data.StoreManager.lookup('llistaComptadors');
			//Esborrem possibles filtres
			storeComtpadors.clearFilter();

			//Filtrem pel camp nComptador
			var thisRegEx = new RegExp(nCompt, "i");
			storeComtpadors.filterBy(function(record) {
				if (thisRegEx.test(record.get('nComptador'))) {
					return true;
				}
				return false;
			});
			
			storeComtpadors.sort('numero','DESC');
			storeComtpadors.sort('codiCarrer','ASC');
			
			this.getParent().push({xtype:'panellSeleccio'});
			
		} else {
			//No has introduit cap valor 
			Ext.Msg.show({ title: 'Avís:',
				message: 'No has introduit cap Número ',
				buttons:  [{text : 'Acceptar'}]}); 
				this.refresh();
		}
	},

	onBtnSelAdrComptadorTap: function(button, e, options) {
		var numCarrer =  Ext.ComponentQuery.query('#nCarrer')[0].getValue();
		
		if (this.cCar==='') {
			//No has introduit cap valor 
			Ext.Msg.show({ title: 'Avís:',
				message: 'No has seleccionat cap carrer',
				buttons:  [{text : 'Acceptar'}]}); 
			this.refresh();
		} else if (numCarrer === ''){
			//No has introduit cap valor 
			Ext.Msg.show({ title: 'Avís:',
				message: 'No has introduit el número del bloc',
				buttons:  [{text : 'Acceptar'}]}); 
			this.refresh();			 
		} else {
			var sComtpadors = Ext.data.StoreManager.lookup('llistaComptadors');
			//Esborrem possibles filtres
			sComtpadors.clearFilter();
			var codi=this.cCar
			//Filtrem pel camp codiCarrer i numero    
			sComtpadors.filterBy(function(record) {
				if ((record.get('codiCarrer')===(codi)) &&
				    (record.get('numero')===(numCarrer))) {
					return true;
				} else {
					return false;	
				}
			});			

			sComtpadors.sort('pis','ASC');
			sComtpadors.sort('numero','DESC');
			sComtpadors.sort('codiCarrer','ASC');
			
			this.getParent().push({xtype:'panellSeleccio'});
		}
	},
	
	onListAdrecaItemTap: function(dataview, index, target, record, e, options) {
		//Guardem el codi 
		this.cCar=record.data.codiCarrer;
		this.nCar=record.data.nomCarrerVia;
	}
		
});
