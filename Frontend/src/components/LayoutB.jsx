import {Link, Outlet, useNavigate} from 'react-router-dom'
import {useUser} from '../context/userContext'

const LayoutB = () => {
    const {usuario, setUsuario} = useUser()
    const navigate = useNavigate()
    
        const handleLogout = () => {
            localStorage.removeItem('usuario')
            setUsuario(null)
            navigate('/')
        }

        return (
            <div>
                <header className='d-flex justify-content-between align-items-center p-3 bg-danger-subtle border-bottom'>
                    <div className='ms-3'>
                        <h3 className='m-0'>Maxikiosco</h3>
                    </div>

                    <nav className='me-3 d-flex align-items-center gap-2'>
                        <Link className='btn btn-outline-primary' to="/">Inicio</Link>
                        <Link className='btn btn-outline-primary' to="/catalogo">Catalogo</Link>

                        {usuario ? (
                            <>
                            <Link className='btn btn-outline-primary' to="/carrito">Carrito</Link>
                            <span className='ms-2'>Hola, {usuario.nombre_usuario}</span>
                            <button className='btn btn-danger ms-2' onClick={handleLogout}>Cerrar Sesión</button>
                            </>
                        ) : (
                            <>
                            <Link className='btn btn-outline-success' to="/login">Iniciar Sesión</Link>
                            <Link className='btn btn-outline-warning' to="/registro">Registrarse</Link>
                            </>
                        )
                    }                    
                    </nav>             
                </header>

                <main className='p-4'>
                    <Outlet />
                </main>
            </div>
        )
}

export default LayoutB