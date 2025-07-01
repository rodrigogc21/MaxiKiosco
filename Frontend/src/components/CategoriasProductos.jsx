import {useState, useEffect} from 'react'
import {useUser} from '../context/userContext'

const CategoriasProductos = () => {
    const {usuario} = useUser()
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState ([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/api/categorias')
        .then(res => res.json())
        .then(data => setCategorias(data))
        .catch(err => console.error('Error al obtener categorías', err))
    }, [])

    useEffect(() => {
        if (categoriaSeleccionada) {
            fetch(`http://localhost:3001/api/productos/categoria/${categoriaSeleccionada}`)
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al obtener productos', err))
        }
    }, [categoriaSeleccionada])

    const agregarAlCarrito = async (id_producto) => {
        if (!usuario || !usuario.id_usuario) {
            alert('Debes iniciar sesión para agregar al carrito')
            return
        }

        try {
            const res = await fetch('http://localhost:3001/api/carrito/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario,
                    id_producto,
                    cantidad: 1
                })
            })

            const data = await res.json()
            if (res.ok) {
                alert('Producto agregado al carrito')
            } else {
                alert(data.error || 'Error al agregar al carrito')
            }
        } catch (error) {
            console.error('Error al agregar al carrito: ', error)
            alert('Error en la conexión con el servidor')
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Categorías</h2>
            <div className="d-flex flex-wrap gap-2 mb-4">
                {categorias.map(cat => (
                    <button
                    key={cat.id_categoria}
                    onClick={() => setCategoriaSeleccionada(cat.id_categoria)}
                    className={`btn btn-outline-danger ${
                        categoriaSeleccionada === cat.id_categoria ? 'active' : ''
                    }`}
                    >
                    {cat.nombre_categoria}
                    </button>
                ))}
            </div>

            {categoriaSeleccionada && (
                <>
                <h3 className="mb-3">Productos</h3>
                <div className="row">
                    {productos.map(prod => (
                        <div className="col-md-4 col-sm-6 mb-4" key={prod.id_producto}>
                            <div className="card h-100">
                                <img
                                src={prod.imagen_url}
                                alt={prod.nombre_producto}
                                className="card-img-top"
                                style={{height: '200px', objectFit: 'cover'}}
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{prod.nombre_producto}</h5>
                                    <p className="card-text">${prod.precio_producto}</p>
                                    <button
                                     className="btn btn-danger mt-auto"
                                     onClick={() => agregarAlCarrito(prod.id_producto)}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default CategoriasProductos