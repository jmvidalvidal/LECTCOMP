Ext.define('LECTCOMP.view.insertLectures', {
	extend: 'Ext.Panel',
	xtype:'insertLectures',

	config: {
		layout: {
			type: 'vbox',
		},
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'INTRODUEIX LECTURA',
			},
			{
         	xtype: 'label',
         	id: 'labelText',
				html: '',
            layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'start'
				}                
			},
			{
				xtype: 'numberfield',
				id: 'lectura',
				required: true,
				label: 'Valor lectura',
				layout: {
					type: 'vbox'
				}					
			},
			{
         	xtype: 'label',
				html: '</br></br>',
            layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'start'
				}                
			},						
			{
				xtype: 'button', 
				itemId: 'btnInserLectures',
				text: 'Emmagatzemar',
            ui: 'confirm',
            iconAlign: 'center',				
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'start'
				}					
			}
		],
      listeners: [
			{
				fn: 'onPanelInitialize',
				event: 'initialize'
			},      
			{
				fn: 'onBtnInserLectures',
				event: 'tap',
				delegate: '#btnInserLectures'
			}
		]			
	},
	
	onPanelInitialize: function(component, options) {
		Ext.ComponentQuery.query('#labelText')[0].setHtml('<p align="center"><b><br />'+LECTCOMP.app.nComptadorSelect+'<br />'+LECTCOMP.app.nomCarrerSelect+'   '+LECTCOMP.app.numeroSelect+'   '+LECTCOMP.app.pisSelect+'<br /	><br /	><br /	><b>');
        
	},
	
	onBtnInserLectures: function(button, e, options) {
		//var c=LECTCOMP.app.nComptadorSelect;
		//Ext.Msg.alert('Debbuger', 'Dins'+ c);
	}
	
});