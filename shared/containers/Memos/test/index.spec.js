import sinon from 'sinon'

describe('Given the Memos container tests spec', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should have a dummy test that passes', () => {
    expect(5 * 5).to.equal(25)
  })
  it('Should have a dummy test that fails', () => {
    expect(5 * 5).to.equal(0)
  })
})
