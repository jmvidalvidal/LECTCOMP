Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	models: [
		'inicialModel',
		'vialerModel',
		'clausModel',
		'modelComptadors',
		'lecturesModel'
	],
	stores: [
		'inicialStore',
		'vialerStore',
		'clausSistema',
		'llistaComptadors',
		'lecturesStore'
	],
	views: [
		'inicialView',
		'panellLectures',
		'panellCarregar',
		'panellSeleccio'
	],
	name: 'LECTCOMP',
   controllers: [
        'controlador'
   ],
   	
	launch: function() {
		Ext.create('LECTCOMP.view.inicialView', {fullscreen: true});
	}
});
