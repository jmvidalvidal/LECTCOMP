Ext.define('LECTCOMP.view.inicialView', {
	extend: 'Ext.navigation.View',
	alias: 'widget.inicialview',
	xtype: 'inicialView',

	config: {
		defaultBackButtonText: '',
		useTitleForBackButtonText: true,
		layout: {
			type: 'card'
		},
		navigationBar: {
			itemId: 'BarraNavegador'
		},
		items: [
			{
				xtype: 'list',
				title: 'LECTCOMP',
				id: 'variablesView',
				itemTpl: ['<div><center><b>{textCamp} {valorCamp}</b></center></div>'],
				store: 'inicialStore',
				disableSelection: true,
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},
				items: [
					{
						xtype: 'toolbar',
						docked: 'bottom',
						layout: {
							type: 'hbox',
							align: 'center',
							pack: 'center'
						},
						items: [
							{
								xtype: 'button',
								id: 'botoCarregar',
								itemId: 'mybutton2',
								ui: 'round',
								width: 97,
								iconAlign: 'center',
								text: 'Carregar'
							},
							{
								xtype: 'button',
								id: 'botoLectures',
								itemId: 'mybutton1',
								ui: 'round',
								width: 97,
								iconAlign: 'center',
								text: 'Lectures'
							},
							{
								xtype: 'button',
								id: 'botoEnviar',
								itemId: 'mybutton3',
								ui: 'round',
								width: 97,
								iconAlign: 'center',
								text: 'Enviar'
							}
						]
					},
					{
						xtype: 'image',
						height: 163,
						ui: '',
						width: 155,
						src: 'img/escut.jpg'
					}
				]
			}
   	],
		listeners: [
			{
				fn: 'onBotoCarregarTap',
				event: 'tap',
				delegate: '#botoCarregar'
			},
			{
				fn: 'onBotoLecturesTap',
				event: 'tap',
				delegate: '#botoLectures'
			},
			{
				fn: 'onBotoEnviarTap',
				event: 'tap',
				delegate: '#botoEnviar'
			}
		]
	},

	onBotoCarregarTap: function(button, e, options) {
		this.push({xtype:'panellCarregar'});
	},

	onBotoLecturesTap: function(button, e, options) {
		var storeVlr = Ext.data.StoreManager.lookup('vialerStore');
		var storeCmp = Ext.data.StoreManager.lookup('llistaComptadors');
		if ((storeVlr.getCount()===0) && (storeCmp.getCount()===0)){
			Ext.Msg.alert("Avís:", 'Vialer i Comtpadors no carregats');
		} else if (storeVlr.getCount()===0) {
			Ext.Msg.alert("Avís:", 'Vialer no carregat');
		} else if (storeCmp.getCount()===0) {
			Ext.Msg.alert("Avís:", 'Comptadors no carregats');
		} else {
      	var storeIni = Ext.data.StoreManager.lookup('inicialStore');
      	var avui, dataFi, dataInici;
      	if (storeIni.getCount() === 3){
					avui=new Date();
					dataFi = this.conversorData(storeIni.getAt(2).get('valorCamp'));
					dataInici = this.conversorData(storeIni.getAt(1).get('valorCamp'));

					if ((dataInici <= avui) && (avui <= dataFi)) {
						this.push({xtype:'panellLectures'});
					} else {
						Ext.Msg.show({ title: 'Avís:',
							message: 'Estàs fora del rang de dates permès',
							buttons:  [{text : 'Acceptar'}]});
					}
			} else {
				Ext.Msg.alert("Avis","Dades Trimestre errònies");
			}
		}
	},


	onBotoEnviarTap: function(button, e, options) {
		var storeLect = Ext.data.StoreManager.lookup('lecturesStore');
		var num = storeLect.getCount( );
		
		if (num==0){
					Ext.Msg.alert("Avís:","No hi ha lectures per enviar");		
		} else {		
        	var me = this,
            	sendStore = Ext.create('Ext.data.Store', {
                	model: 'LECTCOMP.model.lecturesModel',
                	data: [],
                	proxy: {
                    	type: 'ajax',
                    	url : 'http://localhost/LECTCOMP/php/rebre-json1.php',
                	}
            	}),
            	storeLect   = Ext.data.StoreManager.lookup('lecturesStore'),
            	dataToSend  = storeLect.getData(),
            	arrayToSend = [];

	        dataToSend.each(function (lectura) {
    	        arrayToSend.push(lectura);
        	    lectura.setDirty();
        	});

        	sendStore.getProxy().on('exception', function(proxy, response, operation) {
            	missatge=response.responseText;
	            if(missatge == "Registres guardats"){
					Ext.Msg.alert("Avís:","Dades enviades correctament");
        		} else {
        			Ext.Msg.alert("Error:","Dades NO enviades");
	        	} 
    	    });

        	sendStore.add(arrayToSend);
        	sendStore.sync();
        }
	},

	conversorData: function(data_dd_mm_yyyy){
			var dia_aux = parseInt(data_dd_mm_yyyy.substring(0, 2),10);
			var mes_aux = parseInt(data_dd_mm_yyyy.substring(3, 5),10);
			var any_aux = parseInt(data_dd_mm_yyyy.substring(6, 10),10);
			var data_aux = new Date();

			data_aux.setDate(dia_aux);
			data_aux.setMonth(mes_aux-1);
			data_aux.setFullYear(any_aux);
			data_aux.setHours(0);
			data_aux.setMinutes(0);
			data_aux.setSeconds(0);
			data_aux.setMilliseconds(0);

			return data_aux;
	}


});