'use client'

import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface Result {
  googlePlaceId?: string | null
  error?: string
}

export default function Home() {
  const [businessName, setBusinessName] = useState('')
  const [result, setResults] = useState<Result>()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const results: { googlePlaceId: string | null } = await fetch(
        '/api/scraper',
        {
          method: 'POST',
          body: JSON.stringify({ businessName }),
        },
      ).then(r => r.json())
      setResults(results)
    } catch (error) {
      console.error('Error:', error)
      setResults({ error: 'Failed to fetch place ID' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <h1 className="text-5xl font-bold mb-8">
            Let&apos;s get your business review!
          </h1>
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              placeholder="Enter business name"
              className="input input-bordered w-full max-w-xs mb-4 mr-2"
              required
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>

          {result && (
            <div className="mb-20 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Your QR Code:</h2>
              <div className="bg-white p-2">
                <QRCodeSVG
                  value={`https://search.google.com/local/writereview?placeid=${result?.googlePlaceId}`}
                  size={256}
                />
              </div>
              <p className="mt-4">
                <a
                  href={`https://search.google.com/local/writereview?placeid=${result?.googlePlaceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Open review page
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
