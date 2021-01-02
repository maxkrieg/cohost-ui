import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { fetchUser } from './api'
import { User } from './interfaces'

export type UserContextType = {
  user: Partial<User> | null
  setUser: Dispatch<SetStateAction<Partial<User> | null>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user) => console.warn('no user provider'),
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Partial<User> | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUser()
        setUser(fetchedUser)
      } catch (e) {
        console.error('Error getting user in UserContextProvider')
      }
    }
    getUser()
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
