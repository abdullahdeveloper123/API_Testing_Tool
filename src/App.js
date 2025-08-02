import React, { useState, useEffect } from 'react'
import RequestForm from './components/RequestForm'
import ResponseViewer from './components/ResponseViewer'
import HistoryPanel from './components/HistoryPanel'

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('api-history')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const addToHistory = (entry) => {
    const newHistory = [entry, ...history.slice(0, 19)] // limit to 20
    setHistory(newHistory)
    localStorage.setItem('api-history', JSON.stringify(newHistory))
  }

  const deleteFromHistory = (index) => {
    const newHistory = [...history]
    newHistory.splice(index, 1)
    setHistory(newHistory)
    localStorage.setItem('api-history', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('api-history')
  }


  const sendRequest = async ({ url, method, headers, body, authToken }) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    let parsedHeaders = {}
    try {
      if (headers) parsedHeaders = JSON.parse(headers)
    } catch (e) {
      setError('Invalid JSON in headers.')
      setLoading(false)
      return
    }

    if (authToken) {
      parsedHeaders['Authorization'] = authToken.startsWith('Bearer ')
        ? authToken
        : `Bearer ${authToken}`
    }

    let options = {
      method,
      headers: parsedHeaders,
    }

    if (method !== 'GET' && method !== 'DELETE' && body) {
      try {
        options.body = JSON.stringify(JSON.parse(body))
      } catch (e) {
        setError('Invalid JSON in body.')
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch(url, options)
      const contentType = res.headers.get('content-type')
      const data =
        contentType && contentType.includes('application/json')
          ? await res.json()
          : await res.text()

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: data,
      })

      addToHistory({ url, method, headers, body, authToken })
    } catch (err) {
      setError('Request failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const exportHistoryToCSV = () => {
    if (history.length === 0) return

    const csvHeader = ['Method', 'URL', 'Headers', 'Body', 'AuthToken']
    const rows = history.map(item => [
      item.method,
      item.url,
      JSON.stringify(item.headers || {}),
      JSON.stringify(item.body || {}),
      item.authToken || '',
    ])

    const csvContent = [csvHeader, ...rows]
      .map(row =>
        row
          .map(field => `"${String(field).replace(/"/g, '""')}"`) // escape quotes
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'api-history.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }



  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>API Tester</h1>
      <div className="layout">
        <div className="main-content">
          <RequestForm onSend={sendRequest} />
          <ResponseViewer response={response} loading={loading} error={error} />
        </div>
        <HistoryPanel
          history={history}
          onSelect={sendRequest}
          onDelete={deleteFromHistory}
          onClear={clearHistory}
          onExport={exportHistoryToCSV}
        />


      </div>
    </div>
  )
}

export default App
