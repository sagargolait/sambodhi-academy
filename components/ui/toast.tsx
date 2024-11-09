'use client'

import React, { useState } from 'react'
import { Toaster, toast as toastFunction, resolveValue, ToastOptions } from 'react-hot-toast'
import { X } from 'lucide-react'

interface ToastProps extends ToastOptions {
  title: string
  description?: string
}

const Toast: React.FC<ToastProps> = ({ title, description, ...props }) => {
  return (
    <div className="bg-card text-card-foreground shadow-lg">
      <div className="flex items-start p-4 sm:p-6">
        <div className="flex-1 pt-1">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        <button
          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => toastFunction.dismiss(props.id)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const toast = (props: ToastProps) => {
  return toastFunction((t) => <Toast {...props} id={t.id} />, { ...props, duration: 3000 })
}

const useToast = () => {
  return toastFunction
}

export { Toast, toast, useToast, Toaster }