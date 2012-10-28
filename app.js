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
		'panellSeleccio',
		'insertLectures'
	],

	name: 'LECTCOMP',
	nServeiSelect:0,
	nComptadorSelect:'',
	nomCarrerSelect:'',
	numeroSelect:'',
	pisSelect:'',
	minimSelect:0,
	maximSelect:0,
	llegitSelect:'',
	
	launch: function() {
		Ext.create('LECTCOMP.view.inicialView', {fullscreen: true});
	}

});
