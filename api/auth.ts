import { LoginDto } from "@/components/auth/LoginForm";
import axios from "@/lib/axios"


export const login = async (payload: LoginDto) => { 
    const result = await axios.post("/api/auth/login", payload);
    console.log("🚀 ~ file: auth.ts:9 ~ login ~ result:", result)
    return result
}

export const loginWithGoogle = async () => {
    const result = await axios.get("/api/auth/google/login")
    console.log("🚀 ~ file: auth.ts:13 ~ loginWithGoogle ~ result:", result)
    return result
}

export const getCurrentUser = async () => {
    const result = await axios.get("/api/users/current-user")
    console.log("🚀 ~ file: auth.ts:18 ~ getCurrentUser ~ result", result)
    return result.data
}
