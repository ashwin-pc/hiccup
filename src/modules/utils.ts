export const delay = (timeInMs = 0) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeInMs)
  })
