import { trigger, on, once, off } from '.'

const [type, data] = ['trigger:event', 'trigger-event-data']

describe('ui-events', () => {
  test('should trigger, listen, turn off and no longer listen to event', () => {
    let eventData: string | null = null
    const mockFn = jest.fn(({ detail }) => (eventData = detail))

    on(type, mockFn)
    trigger(type, data)

    expect(mockFn).toBeCalled()
    expect(eventData).toEqual(data)

    // Reset eventData
    eventData = null

    off(type, mockFn)
    trigger(type, data)
    expect(mockFn).toBeCalledTimes(1)
    expect(eventData).toEqual(null)
  })

  test('should not listen to event once', () => {
    let eventData: string | null = null
    const mockFn = jest.fn(({ detail }) => (eventData = detail))
    once(type, mockFn)

    trigger(type, data)
    trigger(type, data)
    trigger(type, data)

    expect(eventData).toEqual(data)
    expect(mockFn).toBeCalledTimes(1)
  })
})
