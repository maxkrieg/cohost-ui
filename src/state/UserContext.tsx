import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'

import { fetchUser } from '../api'
import { IUser } from '../interfaces'

export type UserContextType = {
  user: IUser | null
  initialized: boolean
  setUser: Dispatch<SetStateAction<IUser | null>>
  setInitialized: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  initialized: false,
  setUser: (user) => console.warn('no user provider'),
  setInitialized: () => console.warn('no initialized setter'),
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const fetchedUser = await fetchUser()
        setUser(fetchedUser)
        setInitialized(true)
      } catch (e) {
        console.error('Error getting user in UserContextProvider')
      }
    }
    fetchAndSetUser()
  }, [])

  const value = useMemo(
    () => ({
      user,
      setUser,
      initialized,
      setInitialized,
    }),
    [user, initialized],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
