
export interface User {
    sessionToken : String
}

export interface RegisterResponse {
    errors: Array<String>
    user? : User    
}
