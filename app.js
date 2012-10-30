Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	models: [
		'inicialModel',
		'vialerModel',
		'clausModel',
		'modelComptadors'
	],
	stores: [
		'inicialStore',
		'vialerStore',
		'clausSistema',
		'llistaComptadors'
	],
	views: [
		'inicialView',
		'panellLectures',
		'panellCarregar',
		'panellSeleccio'
	],

	name: 'LECTCOMP',
	
	launch: function() {
		Ext.create('LECTCOMP.view.inicialView', {fullscreen: true});
	}

});
