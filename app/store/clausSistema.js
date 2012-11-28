Ext.define('LECTCOMP.store.clausSistema', {
    extend: 'Ext.data.Store',

    requires: [
        'LECTCOMP.model.clausModel'
    ],

    config: {
        model: 'LECTCOMP.model.clausModel',
        storeId: 'clausSistema',
        
        proxy:  {
            type: 'localstorage',
            id  : 'claus-id'
        }        
    }
});