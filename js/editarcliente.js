(function(){
    let DB;
    const nombreInput = document.querySelector('#nombre');

    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();

        //Verificar el ID de la url
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente =  parametrosURL.get('id');
        if(idCliente){
            setTimeout(()=>{
                obtenerCliente(idCliente);
            }, 100);  
        }
    });

    function conectarDB(){
        const abrirConexion  = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }   
    }

    function obtenerCliente(idCliente){
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                if(cursor.value.id === Number(idCliente)){
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente){
        const {nombre} = datosCliente;

        nombreInput.value = nombre;
    }
})();