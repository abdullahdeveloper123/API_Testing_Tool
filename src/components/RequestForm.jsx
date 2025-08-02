import React, { useState } from 'react'

export default function RequestForm({ onSend }) {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [body, setBody] = useState('')
  const [headers, setHeaders] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [queryParams, setQueryParams] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const fullUrl = queryParams
      ? `${url}?${queryParams}`
      : url

    onSend({
      url: fullUrl,
      method,
      headers,
      body,
      authToken,
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div>
        <label>Request URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/data"
        />
      </div>

      <div>
        <label>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>

      <div>
        <label>Authentication Token (Optional)</label>
        <input
          type="text"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          placeholder="Bearer token123..."
        />
      </div>

      <div>
        <label>Query Params (e.g. `page=1&limit=10`)</label>
        <input
          type="text"
          value={queryParams}
          onChange={(e) => setQueryParams(e.target.value)}
          placeholder="key=value&key2=value2"
        />
      </div>

      <div>
        <label>Headers (JSON)</label>
        <textarea
          rows="3"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder='{"Content-Type": "application/json"}'
        />
      </div>

      {(method === 'POST' || method === 'PUT') && (
        <div>
          <label>Body (JSON)</label>
          <textarea
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"name": "John"}'
          />
        </div>
      )}

      <button type="submit">Send Request</button>
    </form>
  )
}
