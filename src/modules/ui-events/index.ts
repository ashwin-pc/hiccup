interface CustomEventListener {
  (evt: CustomEvent): void
}

function on(eventType: string, listener: CustomEventListener) {
  document.addEventListener(eventType, listener as EventListener)
}

function off(eventType: string, listener: CustomEventListener) {
  document.removeEventListener(eventType, listener as EventListener)
}

function once(eventType: string, listener: CustomEventListener) {
  on(eventType, handleEventOnce)

  function handleEventOnce(event: CustomEvent) {
    listener(event)
    off(eventType, handleEventOnce)
  }
}

function trigger(eventType: string, data: any) {
  const event = new CustomEvent(eventType, { detail: data })
  document.dispatchEvent(event)
}

export { on, once, off, trigger }
