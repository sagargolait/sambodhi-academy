'use client'

import React from 'react'
import { payloadAPI } from '@/lib/api';
import { Button } from '../ui/button';
type Props = {
    userJson: any
}

function Dashboard({ userJson }: Props) {
    return (
        <div className="p-6">
            <Button className='float-end' onClick={() => {
                payloadAPI.logout()
                window.location.href = '/'
            }}>
                Logout
            </Button>
            <h1 className="text-2xl text-black font-bold mb-4">
                Welcome, {userJson.user.fullName || userJson.user.email}
            </h1>
            <p>Select an item from the sidebar to view content.</p>
        </div>
    )
}

export default Dashboard