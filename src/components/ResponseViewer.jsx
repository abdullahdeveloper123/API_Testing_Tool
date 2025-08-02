import React from 'react'

export default function ResponseViewer({ response, loading, error }) {
  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!response) return <p>No response yet.</p>

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Response</h2>
      <p>Status: {response.status} {response.statusText}</p>

      <h4>Headers:</h4>
      <pre>{JSON.stringify(response.headers, null, 2)}</pre>

      <h4>Body:</h4>
      <pre>{typeof response.body === 'string' ? response.body : JSON.stringify(response.body, null, 2)}</pre>
    </div>
  )
}
