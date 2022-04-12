import { useConfirmation } from './'
import { renderHook, act } from "@testing-library/react-hooks";

describe('useConfirmation', () => {
 
  it("It runs after confirmation", ()=>{
    const callback = jest.fn();
    const {result} = renderHook(()=>useConfirmation(callback))

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(false)

    act(()=>{
      result.current.run()
    })

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(true)

    act(()=>{
      result.current.confirm()
    })

    expect(callback).toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(false)
  })

  it("confirm() doesn't run the callback, if run() wasn't called before", ()=>{
    const callback = jest.fn();
    const {result} = renderHook(()=>useConfirmation(callback))

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.confirm()
    })

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.run()
    })

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.confirm()
    })

    expect(callback).toHaveBeenCalled();
  })

  it("confirm() doesn't run the callback, if run() wasn't called before", ()=>{
    const callback = jest.fn();
    const {result} = renderHook(()=>useConfirmation(callback))

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.confirm()
    })

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.run()
    })

    expect(callback).not.toHaveBeenCalled();

    act(()=>{
      result.current.confirm()
    })

    expect(callback).toHaveBeenCalled();
  })

  it("Runs callback immediatly when run() is called, if skipConfirmation is true", ()=>{
    const callback = jest.fn();
    const {result} = renderHook(()=>useConfirmation(callback, true))

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(false)

    act(()=>{
      result.current.run()
    })

    expect(callback).toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(false)
  })

  it("cancel() works", ()=>{
    const callback = jest.fn();
    const {result} = renderHook(()=>useConfirmation(callback))

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(false)


    act(()=>{
      result.current.run()
    })

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.waitingForConfirmation).toBe(true)


    act(()=>{
      result.current.cancel()
    })

    expect(result.current.waitingForConfirmation).toBe(false)

    expect(callback).not.toHaveBeenCalled();
  })

  it("It confirms pending execution, if skipConfirmation goes from false->true", ()=>{
    const callback = jest.fn();
    const {result,rerender} = renderHook(skipConfirmation=>useConfirmation(callback,skipConfirmation), {
      initialProps: false
    })

    act(()=>{
      result.current.run()
    })

    expect(callback).not.toHaveBeenCalled()
    expect(result.current.waitingForConfirmation).toBe(true);

    rerender(true)

    expect(callback).toHaveBeenCalled()
    expect(result.current.waitingForConfirmation).toBe(false);


  })


  it("When the callback changes while waiting for confimration, confirm calls the latest callback", ()=>{
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const {result,rerender} = renderHook((cb : Function)=>useConfirmation(cb), {
      initialProps: callback1
    })

    act(()=>{
      result.current.run()
    })

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
    expect(result.current.waitingForConfirmation).toBe(true);

    rerender(callback2) //Switch to callback2

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
    expect(result.current.waitingForConfirmation).toBe(true);

    act(()=>{
      result.current.confirm()
    })

    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
    expect(result.current.waitingForConfirmation).toBe(false);
  })

})
