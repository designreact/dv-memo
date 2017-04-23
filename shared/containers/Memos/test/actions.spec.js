/* eslint no-unused-expressions:0 */
/* eslint import/no-extraneous-dependencies:0 */
/* eslint import/no-webpack-loader-syntax:0 */
/* eslint import/no-unresolved:0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import types from '../constants'
import notifierTypes from '../../Notifier/constants'
import { fetchMemos, createMemo, updateMemo, deleteMemo } from '../actions'

// updateMemo, deleteMemo
describe('Given the Memos actions', () => {
  const path = 'test-path'
  const middlewares = [thunk]
  /* eslint max-len:0 */
  // 5 memos
  const memosJsonString = '[{"id":0,"created_date":"Tue Apr 11 2017 20:30:00 GMT+0100 (BST)","title":"Some awesome memo","body":"Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies."},{"id":1,"created_date":"Tue Apr 11 2017 20:45:00 GMT+0100 (BST)","title":"Another awesome memo","body":"Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups."},{"id":2,"created_date":"Tue Apr 11 2017 21:00:00 GMT+0100 (BST)","title":"Boring memo","body":"Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops."},{"id":3,"created_date":"Tue Apr 11 2017 21:15:00 GMT+0100 (BST)","title":"Interesting memo","body":"Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups."},{"id":4,"created_date":"Tue Apr 11 2017 21:30:00 GMT+0100 (BST)","title":"Exciting memo","body":"Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups."}]'
  afterEach(() => {
    fetchMock.restore()
  })
  describe('Given the fetchMemos method', () => {
    describe('Given an unsuccessful response', () => {
      const mockStore = configureMockStore(middlewares)
      const store = mockStore({ memos: [] })
      fetchMock.get(`${path}/ideas`, 404)
      store.dispatch(fetchMemos(path))
      it('Should dispatch a MEMO_ERROR action', () => {
        expect(store.getActions()[0].type).to.equal(types.MEMO_ERROR)
      })
      it('Should dispatch a NOTIFY_ERROR action', () => {
        expect(store.getActions()[1].type).to.equal(notifierTypes.NOTIFY_ERROR)
      })
    })
    describe('Given a successful response', () => {
      it('Should dispatch a MEMO_FETCH action', done => {
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({ memos: [] })
        const expectedActions = [
          { type: types.MEMO_FETCH, memos: JSON.parse(memosJsonString) },
        ]
        fetchMock.get(`${path}/ideas`, memosJsonString)
        store.dispatch(fetchMemos(path))
        // FIXME - dangerous use of timeout to ensure store actions are populated
        // possibly due to latency in fetch mock? FYI tried sandox.useFakeTimers() already
        setTimeout(() => {
          expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(expectedActions))
          done()
        }, 0)
      })
    })
  })
  describe('Given the updateMemo method', () => {
    describe('Given an unsuccessful response', () => {
      const mockStore = configureMockStore(middlewares)
      const store = mockStore({ memos: [] })
      fetchMock.post(`${path}/ideas/update`, 404)
      store.dispatch(updateMemo(path, { id: 0 }))
      it('Should dispatch a MEMO_ERROR action', () => {
        expect(store.getActions()[0].type).to.equal(types.MEMO_ERROR)
      })
      it('Should dispatch a NOTIFY_ERROR action', () => {
        expect(store.getActions()[1].type).to.equal(notifierTypes.NOTIFY_ERROR)
      })
    })
    describe('Given a successful response', () => {
      it('Should dispatch a MEMO_UPDATE and a NOTIFY_SAVED action', done => {
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({ memos: [] })
        const expectedActions = [
          { type: types.MEMO_UPDATE, memos: JSON.parse(memosJsonString) },
          { type: notifierTypes.NOTIFY_SAVED, message: 'Memo has been saved' },
        ]
        fetchMock.post(`${path}/ideas/update`, memosJsonString)
        store.dispatch(updateMemo(path, { id: 0 }))
        // FIXME - dangerous use of timeout to ensure store actions are populated
        // possibly due to latency in fetch mock? FYI tried sandox.useFakeTimers() already
        setTimeout(() => {
          expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(expectedActions))
          done()
        }, 0)
      })
    })
  })
  describe('Given the createMemo method', () => {
    describe('Given an unsuccessful response', () => {
      it('Should dispatch a MEMO_ERROR action', () => {
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({ memos: [] })
        fetchMock.get(`${path}/ideas/new`, 404)
        store.dispatch(createMemo(path))
        it('Should dispatch a MEMO_ERROR action', () => {
          expect(store.getActions()[0].type).to.equal(types.MEMO_ERROR)
        })
        it('Should dispatch a NOTIFY_ERROR action', () => {
          expect(store.getActions()[1].type).to.equal(notifierTypes.NOTIFY_ERROR)
        })
      })
    })
    describe('Given a successful response', () => {
      it('Should dispatch a MEMO_CREATE and a NOTIFY_SAVED action', done => {
        const mockStore = configureMockStore(middlewares)
        const newMemo = {
          id: 9,
          created_date: 'Tue Apr 18 2017 15:37:25 GMT+0100 (BST)',
          title: 'Title',
          body: 'Body',
          isNew: true,
        }
        const store = mockStore({ memos: [] })
        const expectedActions = [
          { type: types.MEMO_CREATE, memo: newMemo },
          { type: notifierTypes.NOTIFY_SAVED, message: 'New memo created' },
        ]
        fetchMock.get(`${path}/ideas/new`, JSON.stringify(newMemo))
        store.dispatch(createMemo(path))
        // FIXME - dangerous use of timeout to ensure store actions are populated
        // possibly due to latency in fetch mock? FYI tried sandox.useFakeTimers() already
        setTimeout(() => {
          expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(expectedActions))
          done()
        }, 0)
      })
    })
  })
  describe('Given the deleteMemo method', () => {
    describe('Given an unsuccessful response', () => {
      it('Should dispatch a MEMO_ERROR action', () => {
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({ memos: [] })
        fetchMock.post(`${path}/ideas/delete`, 404)
        store.dispatch(deleteMemo(path))
        it('Should dispatch a MEMO_ERROR action', () => {
          expect(store.getActions()[0].type).to.equal(types.MEMO_ERROR)
        })
      })
    })
    describe('Given a successful response', () => {
      it('Should dispatch a MEMO_DELETE and a NOTIFY_SAVED action', done => {
        const mockStore = configureMockStore(middlewares)
        const memo = {
          id: 0,
          created_date: 'Tue Apr 18 2017 15:37:25 GMT+0100 (BST)',
          title: 'Title',
          body: 'Body',
          isNew: true,
        }
        const store = mockStore({ memos: [] })
        const expectedActions = [
          { type: types.MEMO_DELETE, memos: JSON.parse(memosJsonString) },
          { type: notifierTypes.NOTIFY_SAVED, message: 'Memo was deleted' },
        ]
        fetchMock.post(`${path}/ideas/delete`, memosJsonString)
        store.dispatch(deleteMemo(path, memo))
        // FIXME - dangerous use of timeout to ensure store actions are populated
        // possibly due to latency in fetch mock? FYI tried sandox.useFakeTimers() already
        setTimeout(() => {
          expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(expectedActions))
          done()
        }, 0)
      })
    })
  })
})
