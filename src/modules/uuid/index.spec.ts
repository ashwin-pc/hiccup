import { uuid } from '.';

describe('uuid', () => {
  test('should generate random uuid', () => {
    const id = uuid();
    expect(id.length).toBe(36);
  });

  test('should generate new uuid for each call', () => {
      const id_1 = uuid()
      const id_2 = uuid()

      expect(id_1 == id_2).toBeFalsy()
  })
  
});
