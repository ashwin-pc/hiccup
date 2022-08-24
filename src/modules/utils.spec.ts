import { classNames } from './utils'

describe('classNames', () => {
  it('should combine a string of classnames and boolean string pairs to a single classname value', () => {
    const classes = ['first', [true, 'second'], 'third', [false, 'fourth']]
    expect(classNames(classes)).toMatchInlineSnapshot(`"first second third"`)
  })
})
