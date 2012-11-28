Ext.define('LECTCOMP.model.vialerModel', {
    extend: 'Ext.data.Model',

    config: {
		  idProperty: 'id',
        fields: [
        		{   name: 'id',
					type: 'auto'
				},
            {
                name: 'idCarrer',
                type: 'int'
            },
            {
                name: 'codiCarrer',
                type: 'string'
            },
            {
                name: 'nomCarrer',
                type: 'string'
            },
            {
                name: 'nomCarrerVia',
                type: 'string'
            }
        ]
    }
});