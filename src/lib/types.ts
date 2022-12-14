import { string, type } from "io-ts"
import * as t from 'io-ts'

export interface User {
    username : String
}

export type CaptainDirgoError = 
  { name: "SIGNIN_USER_ALREADY_TAKEN" }
  | { name: "LOGIN_USER_OR_PASSWORD_INVALID" }
  | { name : "UNKNOWN_ERROR" }
  | { name : "BAD_REQUEST"; fields : Array<String> }

export const SignupRequestC = t.type({
	username : t.string,
	password : t.string,
	email : t.string
  })
export type SignupRequest = t.TypeOf<typeof SignupRequestC>

export const LoginRequestC = t.type({
	username : t.string,
	password : t.string,
  })
export type LoginRequest = t.TypeOf<typeof LoginRequestC>

export interface SignupResponse {
  user? : User    
  errors: Array<CaptainDirgoError>
}

export interface LoginResponse {
  status : "ok" | "bad"
  errors: Array<CaptainDirgoError>
}
