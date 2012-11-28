Ext.define('LECTCOMP.model.inicialModel', {
    extend: 'Ext.data.Model',

    config: {
		  idProperty: 'id',    	
        fields: [
        		{  name: 'id',
					type: 'auto'
				},        
            {
                name: 'idCamp',
                type: 'string'
            },
            {
                name: 'textCamp',
                type: 'string'
            },
            {
                name: 'valorCamp',
                type: 'string'
            }
        ]
    }
});