export const delay = (timeInMs = 0) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeInMs)
  })

export const classNames = (classes: (string | (boolean | string)[])[]) =>
  classes
    .map((cls) => {
      if (typeof cls === 'string') return cls

      return cls[0] ? cls[1] : false
    })
    .filter((cls) => !!cls)
    .join(' ')
