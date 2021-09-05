import hash from './'

describe('hash', () => {
  test('should generate same hash for the same string', () => {
    const firstString = hash('Test String')
    const secondString = hash('Test String')

    expect(firstString).toEqual(secondString)
  })

  test('should generate different hash for slightly different string', () => {
    const firstString = hash('Test Strin')
    const secondString = hash('Test String')

    expect(firstString).not.toEqual(secondString)
  })

  test('should generate different hash for smae string but differnet seed', () => {
    const firstString = hash('Test String', 1)
    const secondString = hash('Test String', 2)

    expect(firstString).not.toEqual(secondString)
  })

  test('should generate same hash snapshot', () => {
    const firstString = hash('Test String')

    expect(firstString).toMatchInlineSnapshot(`2846227403526163`)
  })
})
