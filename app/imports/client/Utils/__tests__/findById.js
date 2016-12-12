import findById from '../findById'

test('should find by id', () => {
  const collection = [
    { id: 'a', thing: 'x'},
    { id: 'b', thing: 't'},
  ]

  expect(findById('a', collection)).toMatchSnapshot()
})

