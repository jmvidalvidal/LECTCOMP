Ext.define('LECTCOMP.store.inicialStore', {
    extend: 'Ext.data.Store',

    requires: [
        'LECTCOMP.model.inicialModel'
    ],

    config: {
        model: 'LECTCOMP.model.inicialModel',
        storeId: 'inicialStore',
        proxy:  {
            type: 'localstorage',
            id  : 'inicialStore-id'
        }
    }    
});