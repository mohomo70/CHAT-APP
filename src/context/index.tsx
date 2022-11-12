import { createContext } from "react";

// const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||'{}'):null

export const userContext = createContext({user:null,setingUser:(st:string) => {}})
const userProvider = userContext.Provider
export default userProvider