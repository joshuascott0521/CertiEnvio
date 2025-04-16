"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService, userService } from "@/services/api"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("authToken")
          if (token) {
            const response = await userService.getProfile()
            if (response.success) {
              setUser(response.data)
              setIsAuthenticated(true)
            } else {
              localStorage.removeItem("authToken")
              setIsAuthenticated(false)
            }
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    try {
      const response = await authService.login(email, password)
      if (response.success && response.data.Token) {
        if (rememberMe) {
          localStorage.setItem("authToken", response.data.Token)
        }

        const userResponse = await userService.getProfile()
        if (userResponse.success) {
          setUser(userResponse.data)
          setIsAuthenticated(true)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  const refreshUser = async () => {
    try {
      const response = await userService.getProfile()
      if (response.success) {
        setUser(response.data)
      }
    } catch (error) {
      console.error("Error refreshing user:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
