import {useEffect, useState, useCallback} from 'react';

type useConfirmationType = (callback: Function, skipConfirmation?: boolean) => {
  run: ()=>void,
  confirm: ()=>void,
  cancel: ()=>void, 
  waitingForConfirmation: boolean
}

const useConfirmation : useConfirmationType= (callback, skipConfirmation) => {
  
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  const run = useCallback(()=>{
    if(!skipConfirmation){
      setWaitingForConfirmation(true)
    }else {
      callback();
    }
  },[callback, skipConfirmation, waitingForConfirmation])


  const confirm = useCallback(()=>{
    if(waitingForConfirmation){
      callback();
    }
    setWaitingForConfirmation(false)
  },[callback, waitingForConfirmation])


  const cancel = useCallback(() => {
    setWaitingForConfirmation(false)
  },[])

  useEffect(()=>{
    if(skipConfirmation) confirm()
  },[skipConfirmation])

  return {
    waitingForConfirmation,
    run,
    cancel,
    confirm
  }
};

export default useConfirmation;