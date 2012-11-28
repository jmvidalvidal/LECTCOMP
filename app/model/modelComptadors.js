Ext.define('LECTCOMP.model.modelComptadors', {
    extend: 'Ext.data.Model',

    config: {
		idProperty: 'id',
        fields: [
            {   name: 'id',
				type: 'auto'
			},
            {
                name: 'nServei',
                type: 'int'
            },
            {
                name: 'nComptador',
                sortDir: 'DESC',
                sortType: 'asText',
                type: 'string'
            },            
            {
                name: 'nomCarrer',
                type: 'string'
            },
            {
                name: 'codiCarrer',
                type: 'string'
            },
            {
                name: 'numero',
                type: 'string'
            },
            {
                name: 'pis',
                type: 'string'
            },
            {
                name: 'lecturaAnterior',
                type: 'int'
            },
            {
                name: 'minim',
                type: 'int'
            },
            {
                name: 'maxim',
                type: 'int'
            },
            {
                name: 'llegit',
                type: 'string'
            }
        ]
    }
});