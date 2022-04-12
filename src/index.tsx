import {useEffect, useState} from 'react';

type useConfirmationType = (callback: Function, skipConfirmation?: boolean) => {
  run: ()=>void,
  confirm: ()=>void,
  cancel: ()=>void, 
  waitingForConfirmation: boolean
}

export const useConfirmation : useConfirmationType= (callback, skipConfirmation) => {
  
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  function run(){
    if(!skipConfirmation){
      setWaitingForConfirmation(true)
    }else {
      callback();
    }
  }
  function confirm(){
    if(waitingForConfirmation){
      callback();
    }
    setWaitingForConfirmation(false)
  }
  function cancel(){
    setWaitingForConfirmation(false)
  }

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