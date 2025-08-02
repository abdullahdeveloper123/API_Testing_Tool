import React from 'react'

export default function HistoryPanel({ history, onSelect, onDelete, onClear, onExport }) {
    return (
        <div className="history-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <h3>🕘 History</h3>
                {history.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={onExport} style={{ padding: '5px 10px', borderRadius: 5 }}>
                            Export CSV
                        </button>
                        <button onClick={onClear} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 5 }}>
                            Remove All
                        </button>
                    </div>
                )}
            </div>


            {history.length === 0 && <p>No requests yet.</p>}

            <ul>
                {history.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <button
                            onClick={() => onSelect(item)}
                            style={{ flex: 1, textAlign: 'left', background: '#eee', border: 'none', padding: 8, borderRadius: 5 }}
                        >
                            {item.method} {item.url}
                        </button>
                        <button
                            onClick={() => onDelete(index)}
                            style={{
                                marginLeft: 10,
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 8px',
                                borderRadius: 4,
                                cursor: 'pointer',
                                width: 'fit-content'
                            }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
