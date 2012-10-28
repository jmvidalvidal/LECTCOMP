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
			}
		],
		listeners: [
			{
				fn: 'onListItemTap',
				event: 'itemtap'
			}
		]
	},
	
	onListItemTap: function(dataview, index, target, record, e, options) {
		//Ext.Msg.alert('Debbuger', 'Dins Adre�a');

		LECTCOMP.app.nServeiSelect=record.get('nServei'),		
		LECTCOMP.app.nComptadorSelect=record.get('nComptador'),		
		LECTCOMP.app.nomCarrerSelect=record.get('nomCarrer'),		
		LECTCOMP.app.numeroSelect=record.get('numero'),		
		LECTCOMP.app.pisSelect=record.get('pis'),		
		LECTCOMP.app.minimSelect=record.get('minim'),		
		LECTCOMP.app.maximSelect=record.get('maxim'),		
		LECTCOMP.app.llegitSelect=record.get('llegit'),		
		this.getParent().push({xtype:'insertLectures'});
	}
		
});