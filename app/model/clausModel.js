Ext.define('LECTCOMP.model.clausModel', {
    extend: 'Ext.data.Model',

    config: {
		  idProperty: 'id',    	
        fields: [
        		{  name: 'id',
					type: 'auto'
				},
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'clau',
                type: 'string'
            }
        ]
    }
});