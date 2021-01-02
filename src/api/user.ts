import { User } from './../interfaces'
import { get, post } from './utils'

export const fetchUser = async (): Promise<Partial<User> | null> => {
  let user: Partial<User>
  try {
    const response = await get('/api/user')
    user = response.data
    return user
  } catch (e) {
    console.error('Error fetching user', e)
    return null
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    await post('/auth/login', { email, password })
  } catch (e) {
    console.error('Error logging in user', e)
    throw e
  }
}

export const signUpUser = async (userPayload: Partial<User>): Promise<User> => {
  let user: User
  try {
    const response = await post('/auth/signup', userPayload)
    user = response.data
    return user
  } catch (e) {
    console.error('Error signing up user', e)
    throw e
  }
}
