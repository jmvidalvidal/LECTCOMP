Ext.define('LECTCOMP.store.lecturesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'LECTCOMP.model.lecturesModel'
    ],

    config: {
        data: [
			{"valor":2424, "nComptador": "93252390", "dataLectura": "25/09/2012 09:00", "esVolta":"0", "incidencia": ""}
        ],
        model: 'LECTCOMP.model.lecturesModel',
        storeId: 'lecturesStore'
    }
});

