Ext.define('LECTCOMP.store.llistaComptadors', {
    extend: 'Ext.data.Store',
    requires: [
        'LECTCOMP.model.modelComptadors'
    ],
    config: {
        model: 'LECTCOMP.model.modelComptadors',
        storeId: 'llistaComptadors',

        proxy:  {
            type: 'localstorage',
            id  : 'llistaComptadors-id'
        }
	}
});