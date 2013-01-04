Ext.define('LECTCOMP.store.lecturesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'LECTCOMP.model.lecturesModel'
    ],

    config: {
        model: 'LECTCOMP.model.lecturesModel',
        storeId: 'lecturesStore',
    }
});

