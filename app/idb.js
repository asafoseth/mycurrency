import idb from 'idb';

var dbPromise = idb.open('currencies-db',1, function(upgradeDb){
 var keyValStore = upgradeDb.createObjectStore('keyval');
 keyValStore.put('currency', 'id');
});

dbPromise.then(function(db){
    var tx = db.transaction('keyval', 'readwrite');
    var keyValStore = tx.objectStore('keyval');
    return keyValStore.put('id', '');
}).then(function(){
    console.log('Added Currencies');
})

//incomplete 