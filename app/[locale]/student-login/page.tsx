'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from 'lucide-react'
import { payloadAPI } from '@/lib/api'
import { toast } from 'sonner'

export default function StudentLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await payloadAPI.login({
                email,
                password
            })

            if (response.token && response.user) {
                document.cookie = `students-token=${response.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
                toast.success('Login successful!')
                router.replace('/student-admin')
            } else {
                toast.error(response.message || 'Login failed')
            }
        } catch (error) {
            toast.error('An error occurred during login')
            console.error('Login error:', error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <BookOpen className="h-12 w-12 text-[#F3C623]" />
                        </div>
                        <CardTitle className="text-2xl text-center font-bold">Student Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and password to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
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
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Button type="submit" className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardContent className="pt-6 border-t">
                        <div className="flex flex-col space-y-4 text-center">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-[#10375C] hover:text-[#F3C623] transition-colors duration-200"
                            >
                                Forgot your password?
                            </Link>
                            <div className="text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/student-register"
                                    className="text-[#10375C] font-semibold hover:text-[#F3C623] transition-colors duration-200"
                                >
                                    Register here
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}