const BASE_URL = 'http://localhost:3000'

const getJuegos = async () => {
    try{
        const respuesta = await fetch(`${BASE_URL}/juegos`)
        const datos = await respuesta.json();
        return datos
    }catch (error){
        console.log(error)
    }
}
let juegos;


getJuegos().then((res) => {
    juegos = res
    mostrarCards()
})
crearJuego()
const contenedorJuegos = document.querySelector('#juegos')

function mostrarCards() {
    contenedorJuegos.innerHTML = ""
    juegos.forEach(juegos => {
        const col = document.createElement('div')
        col.className = "col"
        const contenido = `
        <div class="card" style="width: 18rem;">
        <img src="${juegos.imagen}" class="card-img-top" alt="${juegos.nombre}">
        <div class="card-body">
        <h5 class="card-title">${juegos.nombre}</h5>
                    <p class="card-text">${juegos.descripcion}</p>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="cargarDatos('${juegos.id}')">Editar</button>
                    <button type="submit" class="btn btn-danger" onclick="borrarJuego('${juegos.id}')">Borrar</button>
                </div>
            </div>
            `
            col.innerHTML = contenido
            contenedorJuegos.appendChild(col)
        });
    }
    function crearJuego () {
        document.getElementById('exampleModal').addEventListener('submit',async (e) => {
            e.preventDefault()

            const nombre = document.getElementById('nombreJuego').value
            const descripcion = document.getElementById('descripcionJuego').value
            const imagen = document.getElementById('urlImagen').value

            const nuevoJuego = {nombre,descripcion,imagen}
            
            await agregarJuego(nuevoJuego)
            document.getElementById('exampleModal').reset()
        })
    }
    async function validarDatos(juegoaEditar) {
        try {
            const juegosActuales = await getJuegos();
            
            const tituloRepetido = juegosActuales.some(juego => juego.nombre === juegoaEditar.nombre && juego.id !== juegoaEditar.id);
    
            const imagenRepetida = juegosActuales.some(juego => juego.imagen === juegoaEditar.imagen && juego.id !== juegoaEditar.id);
    
            if (tituloRepetido) {
                alert('Error: Ya existe un juego con el mismo título.');
                return false;
            }
    
            if (imagenRepetida) {
                alert('Error: Ya existe un juego con la misma imagen.');
                return false;
            }
    
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function cargarDatos(id) {
    document.getElementById('modalEditar').addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagen = document.getElementById('Imagen').value;

        const juegoEditado = { nombre, descripcion, imagen };

        const esValido = await validarDatos(juegoEditado);

        if(esValido){
            await editarJuego(id, juegoEditado);
            document.getElementById('modalEditar').reset();
        }
    });
}
function borrarJuego (id){
    if(confirm('desea borrar el juego?')== true){
        eliminarJuegos(id)
    }else{
        alert('continue con normalidad')
    }

}
    const agregarJuego = async (juego) => {
        try{
            const respuesta = await fetch(`${BASE_URL}/juegos`, {
                method: 'POST',
                headers :{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(juego),
            })
            return respuesta
        }catch(error){
            console.log(error);
        }
    }
    const editarJuego = async (id,juego) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/juegos/${id}`,{
                method : 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify(juego)
            })
            return respuesta
        } catch (error) {
            console.log(error);
        }
    }
    
    const eliminarJuegos = async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/juegos/${id}`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.log(error)
        }
    }
