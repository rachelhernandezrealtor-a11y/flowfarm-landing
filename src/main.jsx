import React from 'react'
import ReactDOM from 'react-dom/client'
import FlowFarmLanding2 from './FlowFarmLanding2'

if (typeof sessionStorage !== 'undefined') {
  sessionStorage.setItem('ff_access', 'granted')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <FlowFarmLanding2 />
)
