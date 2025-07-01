import {createContext, useContext, useState, useEffect} from 'react'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'))
        setUsuario(storedUser)
    }, [])

    return (
        <UserContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)