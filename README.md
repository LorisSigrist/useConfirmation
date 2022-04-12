# use-confirmation

A hook to ask users for confirmation before executing a function. 

Install via npm: `npm i use-confirmation`

## Usage

```jsx
const App = () => {
  const dangerousCallback = () => console.log("This is some dangerous Code");

  const { 
      run,      //Call this to start confirmation
      cancel,   //Call to Cancel ongoing confirmation
      confirm,  //Call to Confirm and run the callback
      waitingForConfirmation  //Confirmation in progress? Boolean
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
```

## Callback changes
The callback does not have to be constant. `confirm()` will run whatever callback is mounted at that moment it is clicked. If you instead want to cancel the ongoing confirmation, whenever the callback changes, you can do this:

```ts
const {cancel} = useConfirmation(callback, skipConfirmation)
useEffect(cancel, [callback])
```

Keep in mind that React recreates (and therefore changes) functions all the time, so if you do this, you will have to carefully control when your callback gets recreated using the `useCallback` hook. This can be quite a bit of mental overhead, which is why it is not the default behaviour. 

## Skip Confirmation
There are some situations, where you only want to ask for confirmation some of the time. For example: If you are submitting an input value, you might only want to ask for confirmation, if the inputted value seems strange. For this reason, you can optionally pass a second argument to the hook, which skips confirmation.

```ts
const skipConfirmation : boolean = isInputStrange(input)
const {...} = useConfirmation(callback, skipConfirmation)
```

If skipConfirmation is truthy, `run()` will immediatly execute the callback, no confirmation required.

If skipConfirmation becomes truthy while we are waiting for confirmation, the ongoing confirmation will automatically be confirmed.