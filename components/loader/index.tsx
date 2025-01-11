import { Loader } from 'lucide-react'
import React from 'react'

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        </div>
    )
}

export default LoadingScreen

