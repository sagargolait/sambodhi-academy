'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KeyRound } from 'lucide-react'
import { payloadAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await payloadAPI.forgotPassword({ email })

            if (response.success) {
                setSuccess(true)
                toast.success('Password reset link sent!')
            } else {
                setError(response.message || 'Failed to send reset link')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
            console.error('Forgot password error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">

            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <KeyRound className="h-12 w-12 text-[#F3C623]" />
                        </div>
                        <CardTitle className="text-2xl text-center font-bold">Forgot Password</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!success ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-4">
                                <p className="text-green-600">
                                    If an account exists for {email}, you will receive a password reset link shortly.
                                </p>
                                <Button
                                    onClick={() => router.push('/student-login')}
                                    className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                                >
                                    Return to Login
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    <CardContent className="pt-4 text-center">
                        <Link
                            href="/student-login"
                            className="text-sm text-[#10375C] hover:text-[#F3C623] transition-colors duration-200"
                        >
                            Remember your password? Login
                        </Link>
                    </CardContent>
                </Card>
            </main>

        </div>
    )
}