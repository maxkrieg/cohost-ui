import { UserFieldNames } from './constants'

export interface IBaseUser {
  [UserFieldNames.FirstName]: string
  [UserFieldNames.LastName]: string
  [UserFieldNames.Email]: string
  [UserFieldNames.Password]: string
}

export interface IUserSignUp extends IBaseUser {
  [UserFieldNames.PasswordConfirm]?: string
}

export interface IUser extends IBaseUser {
  [UserFieldNames.IsAdmin]: boolean
}
