'use client'

import React from 'react'
import { payloadAPI } from '@/lib/api';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
type Props = {
    userJson: any
}

function Dashboard({ userJson }: Props) {
    return (
        <main className="p-6">
            <div className='flex justify-end ml-auto gap-2'>
                <SidebarTrigger />
                <Button onClick={() => {
                    payloadAPI.logout()
                    window.location.href = '/'
                }}>
                    Logout
                </Button>
            </div>

            <h1 className="text-2xl text-black font-bold my-4">
                Welcome, {userJson.user.fullName || userJson.user.email}
            </h1>
            <p>Select an item from the sidebar to view content.</p>
        </main>
    )
}

export default Dashboard