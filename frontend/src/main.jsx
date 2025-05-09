import './reset.css'
import './styles.css'
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/friends')
      const parsed = await res.json()
      setData(parsed)
    }
    getData()
  },[])
  return (
    <div>
      <h1>Full Stack Starter</h1>
      <div>
        { data && (
          data.map(friend => <div key={friend.id}>{friend.name}</div>)
        )}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
