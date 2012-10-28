Ext.define('LECTCOMP.view.panellCarregar', {
	extend: 'Ext.Panel',
   xtype:'panellCarregar',

	config: {
   	id: 'panellcarregar',
      items: [
			{
         	xtype: 'titlebar',
            docked: 'top',
            title: 'CARREGAR TRIMESTRE',
         },
         {
         	xtype: 'toolbar',
            docked: 'bottom',
            items: [
            	{
               	xtype: 'button',
                  centered: true,
                  id: 'btnCarregar',
                  itemId: '',
                  text: 'INICIAR PROCÉS'
					}
            ]
         },
         {
         	xtype: 'label',
            html: '<p align="justify"><br />Aquest procediment esborrarà totes les dades introduides del trimestre acutal. <br /> <br />Introduiex el codi de seguretat per a carregar les dades</p><br /><br />',
            layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				}                
			},
			{
				xtype: 'passwordfield',
				id: 'codiseguretat',
				label: 'CODI',
            name: 'codiSeguretat',
				required: true,
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
    			}                
			}            
		],
		listeners: [
			{
				fn: 'onBtnCarregarTap',
				event: 'tap',
				delegate: '#btnCarregar'
			}
		]
	},

	onBtnCarregarTap: function(button, e, options) {
		var codi =  Ext.ComponentQuery.query('#codiseguretat')[0].getValue();
		var correcte=0;
        
		//Accedim a l'store per localitzar la clau de seguretat
		var store = Ext.data.StoreManager.lookup('clausSystem');

		for(var i = 0; i < store.getCount(); i++) {  
			if (store.getAt(i).get('clau') == codi){
				correcte=1;
			}
		}

		if (correcte===0){
			Ext.Msg.show({ title: 'Avís:',
				message: 'Codi Seguretat incorrecte',
				buttons:  [{text : 'Acceptar'}]});
		} else {
			Ext.Msg.show({ title: 'Avís:',
				message: 'Carrega completada correctament',
				buttons:  [{text : 'Acceptar'}]});

			this.getParent().pop();
		}
	}
});