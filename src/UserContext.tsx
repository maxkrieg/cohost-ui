import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { get } from './api'

export interface User {
  firstName?: string
  lastName?: string
}

export type UserContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user) => console.warn('no user provider'),
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await get('/api/user')
        setUser(response.data)
      } catch (e) {
        console.error('error getting user in UserContextProvider')
      }
    }
    getUser()
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
