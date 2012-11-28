Ext.define('LECTCOMP.store.vialerStore', {
    extend: 'Ext.data.Store',

    requires: [
        'LECTCOMP.model.vialerModel'
    ],

    config: {
	    model: 'LECTCOMP.model.vialerModel',
        storeId: 'vialerStore',
        proxy:  {
            type: 'localstorage',
            id  : 'vialerStore-id'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('nomCarrerVia')[3];
            }
        },
        sorters: {
            property: 'nomCarrer'
        }
    }
});
