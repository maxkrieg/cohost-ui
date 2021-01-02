import { UserFieldNames } from './constants'

export interface User {
  [UserFieldNames.FirstName]: string
  [UserFieldNames.LastName]: string
  [UserFieldNames.Email]: string
  [UserFieldNames.Password]: string
  [UserFieldNames.PasswordConfirm]: string
  [UserFieldNames.IsAdmin]: boolean
}
// export interface User {
//   email?: string
//   handle?: string
//   firstName?: string
//   lastName?: string
//   isAdmin?: boolean
// }
