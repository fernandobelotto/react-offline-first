import axios from "axios"
import { useEffect, useState, useTransition } from "react"
import { useOnline } from "./useOnline"
import Spinner from './icons/spinner'
import CloudOffline from "./icons/cloud-offline"
import Cloud from "./icons/cloud"
import CloudFailed from "./icons/cloud-failed"
import debounce from 'lodash.debounce'
const COUNTER = 'counter'

const url = 'http://localhost:3000/'

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

  const sync = async () =>  {
    if (!isOnline) {
      return setSyncState('offline')
    }
    localStorage.setItem(COUNTER, counter.toString())
    setSyncState('synchronizing')
    try {
      await axios.post(url, { counter })
      const { data } = await axios.get(url)
      setCounter(data?.counter)
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
