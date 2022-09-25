import axios from "axios"
import { useEffect, useState } from "react"
import { useOnline } from "./useOnline"
import Spinner from './icons/spinner'
import CloudOffline from "./icons/cloud-offline"
import Cloud from "./icons/cloud"
import CloudFailed from "./icons/cloud-failed"

const COUNTER = 'counter'

const icons: any = {
  'synchronizing': <Spinner />,
  'offline': <CloudOffline />,
  'synced': <Cloud />,
  'failed': <CloudFailed />,
}

export default function App() {

  const [syncState, setSyncState] = useState<
    'synchronizing' | 'idle' | 'failed' | 'synced' | 'offline'
  >('idle')

  const isOnline = useOnline()

  const [counter, setCounter] = useState<number>(() => {
    return Number(localStorage.getItem(COUNTER)) || 0
  })

  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)

  async function sync() {
    if (!isOnline) {
      return setSyncState('offline')
    }
    localStorage.setItem(COUNTER, counter.toString())
    setSyncState('synchronizing')
    try {
      await axios.post('http://localhost:3001/counter', { counter })
    } catch (e) {
      return setSyncState('failed')
    }
    setSyncState('synced')
  }

  // sync in network change
  useEffect(() => {
    if (!isOnline) {
      setSyncState('offline')
    } else {
      sync()
    }
  }, [isOnline])

  // sync in startup
  useEffect(() => {
    sync()
  }, [])

  // sync in state change
  useEffect(() => {
    sync()
  }, [counter])

  return (
    <>
      <h1>offline first app</h1>
      <p>{counter}</p>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <hr />
      <p>{icons[syncState]} {syncState}</p>
    </>
  )
}
