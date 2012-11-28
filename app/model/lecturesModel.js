Ext.define('LECTCOMP.model.lecturesModel', {
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'id',
		fields: [
			{   name: 'id',
				type: 'auto'
			},
			{
				name: 'valor',
				type: 'int'
			},
			{
				name: 'nComptador',
				type: 'string'
			},
			{
				name: 'dataLectura',
				type: 'string'
			},
			{
				name: 'esVolta',
				type: 'string'
			},
			{
				name: 'incidencia',
  				type: 'string'
  			}
		]
	}
});