/*
 * File: app/store/inicialStore.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('LECTCOMP.store.inicialStore', {
    extend: 'Ext.data.Store',
    alias: 'store.inicialstore',

    requires: [
        'LECTCOMP.model.inicialModel'
    ],

    config: {
        data: [
            {
                idCamp: 'trimestre',
                textCamp: '',
                valorCamp: '3r Trimestre 2012'
            },
            {
                idCamp: 'iniTrim',
                textCamp: 'Inici lectures:',
                valorCamp: '30/08/2012'
            },
            {
                idCamp: 'fiTrim',
                textCamp: 'Fi lectures:',
                valorCamp: '30/10/2012'
            }
        ],
        model: 'LECTCOMP.model.inicialModel',
        storeId: 'inistore'
    }
});