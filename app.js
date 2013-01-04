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

   	adr_ip_dades: 'http://localhost',
   	adr_ip_aplicacio: 'http://localhost',
   	//adr_ip_aplicacio:http://217.126.56.102:8082

	launch: function() {
		Ext.create('LECTCOMP.view.inicialView', {fullscreen: true});
	}
});
