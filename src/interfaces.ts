import { UserFieldNames } from './constants'

export interface UserFormData {
  [UserFieldNames.FirstName]: string
  [UserFieldNames.LastName]: string
  [UserFieldNames.Email]: string
  [UserFieldNames.Password]: string
  [UserFieldNames.PasswordConfirm]: string
}
