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
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="cargarDatos('${juegos.id}')">Editar</button>
                    <button type="submit" class="btn btn-danger" onclick="eliminarJuegos('${juegos.id}')">Borrar</button>
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
function cargarDatos(id) {
    const juego = juegos.find((juego) => juego.id === id);

    document.getElementById('nombreJuego').value = juego.nombre;
    document.getElementById('descripcionJuego').value = juego.descripcion;
    document.getElementById('urlImagen').value = juego.imagen;

    document.getElementById('exampleModal').addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombreJuego').value;
        const descripcion = document.getElementById('descripcionJuego').value;
        const imagen = document.getElementById('urlImagen').value;

        const juegoEditado = { nombre, descripcion, imagen };

        await editarJuego(id, juegoEditado);
        document.getElementById('exampleModal').reset();
    });
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
