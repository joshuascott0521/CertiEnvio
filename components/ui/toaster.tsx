"use client"

import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="text-green-500" />
      case "error":
        return <AlertCircle className="text-red-500" />
      case "info":
        return <Info className="text-blue-500" />
      case "warning":
        return <AlertTriangle className="text-yellow-500" />
      default:
        return <Info className="text-gray-400" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) =>
          toast.open ? (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`bg-white shadow-md rounded-lg border border-gray-200 p-4 flex items-start gap-3 w-80 ${
                toast.variant === "success"
                  ? "border-green-600 bg-green-100 text-green-900"
                  : toast.variant === "error"
                  ? "border-red-600 bg-red-100 text-red-900"
                  : toast.variant === "info"
                  ? "border-blue-600 bg-blue-100 text-blue-900"
                  : ""
              }`}
            >
              <div className="mt-0.5">{getIcon(toast.variant)}</div>
              <div className="flex flex-col">
                {toast.title && <p className="font-semibold">{toast.title}</p>}
                {toast.description && (
                  <p className="text-sm text-gray-700">{toast.description}</p>
                )}
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  )
}
