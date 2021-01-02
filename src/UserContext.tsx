import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { fetchUser } from './api'
import { IUser } from './interfaces'

export type UserContextType = {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user) => console.warn('no user provider'),
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const fetchedUser = await fetchUser()
        setUser(fetchedUser)
      } catch (e) {
        console.error('Error getting user in UserContextProvider')
      }
    }
    fetchAndSetUser()
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
