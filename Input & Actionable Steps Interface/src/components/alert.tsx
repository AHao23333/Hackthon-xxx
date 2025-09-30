"use client"

import React from "react"

type AlertProps = {
  message: string
  onClose: () => void
}

export function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="fixed top-5 right-5  w-80 rounded-lg border border-gray-300 bg-white shadow-lg z-[9999]">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-gray-800">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  )
}