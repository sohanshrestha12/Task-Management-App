export interface Auth{
    email:string,
    password:string
}
export interface CookieOptions {
    domain?: string;  
    path?: string; 
    expires?: Date | string | number;    
    maxAge?: number;    
    secure?: boolean;   
    httpOnly?: boolean;    
    sameSite?: "Strict" | "Lax" | "None";
}