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
				store: 'inistore',
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
			},
			{
				fn: 'onNavigationviewShow',
				event: 'show'
			}
		]
	},

	onBotoCarregarTap: function(button, e, options) {
		this.push({xtype:'panellCarregar'});
	},

	onBotoLecturesTap: function(button, e, options) {
		this.push({xtype:'panellLectures'});
	},

	onBotoEnviarTap: function(button, e, options) {
	Ext.Msg.show({ title: 'Avís:',
		message: 'Dades enviades correctament',
		buttons:  [{text : 'Acceptar'}]});
	},

	onNavigationviewShow: function(component, options) {
		var storeInici = Ext.data.StoreManager.lookup('inistore'), dataInici, dataFi, avui;

		if (storeInici.getCount() === 0){

      /*Si la base de dades inicial és buida vol dir que no hem carregat cap fitxer*/
      /*amb les dades dels comptadors*/
      /*Per tant ho notifiquem*/
      Ext.Msg.show({ title: 'Avís:',
			message: 'No hi ha dades per fer lectures',
			buttons:  [{text : 'Acceptar'}]});
		} else if (storeInici.getCount() === 3){
			avui=new Date();
			dataFi = conversorData(storeInici.getAt(2).get('valorCamp'));
			dataInici = conversorData(storeInici.getAt(1).get('valorCamp'));
                
			if ((dataInici <= avui) && (avui <= dataFi)) {
				/*Estem dins del període*/
				Ext.ComponentQuery.query('#botoLectures')[0].setDisabled(false);
			} else {
				Ext.ComponentQuery.query('#botoLectures')[0].setDisabled(true);
				Ext.Msg.show({ title: 'Avís:',
					message: 'Estàs fora del rang de dates permès',
					buttons:  [{text : 'Acceptar'}]});        
			}
		} else {
			/*La base de dades iniciStore ha d'estar inicialitzada amb 3 camps
			 Sino és el cas donem un error*/
			Ext.ComponentQuery.query('#botoLectures')[0].setDisabled(true);
			Ext.Msg.show({ title: 'Error:',
				message: 'Error en la BD iniciStore',
				buttons:  [{text : 'Acceptar'}]});       
		}

		function conversorData(data_dd_mm_yyyy){
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
	}

});