import React from 'react'

import { useConfirmation } from 'use-confirmation'

const App = () => {
  return (
    <div>
      <ConfirmExample text={"Confirm 1"}/>
      <ConfirmExample text={"Confirm 2"}/>
    </div>
  )
}
export default App


const ConfirmExample = ({text}) => {
  const dangerousCallback = () => console.log(text);
  const {
          run, 
          cancel, 
          confirm, 
          waitingForConfirmation
        } = useConfirmation(dangerousCallback)
  return (
    <div>
      <button onClick={run}>Run</button>
      <ConfirmationModal 
        visible={waitingForConfirmation}
        onCancel={cancel} 
        onConfirm={confirm} 
        text={`Do you really run ${text}`}
      />
    </div>
  )
}

const ConfirmationModal = ({onConfirm, onCancel, text, visible}) => {

  if(!visible) return null;

  return (
    <div>
      <span>{text}</span>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  )
} 