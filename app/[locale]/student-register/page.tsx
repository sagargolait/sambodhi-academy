'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from 'lucide-react'
import { payloadAPI } from '@/lib/api'
import { toast } from 'sonner'

export default function StudentRegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setIsSubmitting(false)
            return
        }

        try {
            const response = await payloadAPI.register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            })

            if (response.user) {
                toast.success('Registration successful!')
                router.push('/student-login?registered=true')
            } else {
                setError(response.message || 'Registration failed')
            }
        } catch (error) {
            setError('An error occurred during registration')
            console.error('Registration error:', error)
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
                            <UserPlus className="h-12 w-12 text-[#F3C623]" />
                        </div>
                        <CardTitle className="text-2xl text-center font-bold">Student Registration</CardTitle>
                        <CardDescription className="text-center">
                            Create your account to access our courses and resources.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button
                                type="submit"
                                className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardContent className="pt-4 text-center">
                        <p className="text-sm text-[#10375C]">
                            Already have an account?{' '}
                            <Link
                                href="/student-login"
                                className="font-semibold hover:text-[#F3C623] transition-colors duration-200"
                            >
                                Login here
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </main>

        </div>
    )
}