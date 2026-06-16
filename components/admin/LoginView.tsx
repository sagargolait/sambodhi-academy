'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()

      if (res.ok && data.token) {
        router.replace('/admin')
        router.refresh()
      } else {
        setError(data.errors?.[0]?.message || data.message || 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #10375C 0%, #1a5276 50%, #10375C 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Image
              src="/sambodhi-logo.png"
              alt="Sambodhi Academy"
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: '700',
              color: '#10375C',
              letterSpacing: '-0.3px',
            }}
          >
            Sambodhi Academy
          </h1>
          <p
            style={{
              margin: '6px 0 0',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Sign in to Admin Panel
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#dc2626',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@sambodhiacademy.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#111827',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F3C623')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#111827',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#F3C623')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#9ca3af' : '#F3C623',
              color: '#10375C',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget.style.background = '#EB8317')
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget.style.background = '#F3C623')
            }}
            onMouseDown={(e) => {
              if (!loading) (e.currentTarget.style.transform = 'scale(0.98)')
            }}
            onMouseUp={(e) => {
              if (!loading) (e.currentTarget.style.transform = 'scale(1)')
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p
          style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#9ca3af',
          }}
        >
          © {new Date().getFullYear()} Sambodhi Academy. All rights reserved.
        </p>
      </div>
    </div>
  )
}
