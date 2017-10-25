/*
 * DrawerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'

// import { makeDebugger } from '../../utils/functions'

// const debug = makeDebugger('S:DrawerStore')

const DrawerStore = t
  .model('DrawerStore', {
    visible: t.optional(t.boolean, false),
    type: t.optional(t.enumeration('visibleType', ['post', 'user']), 'post'),
    // header:
    // body:
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
  }))
  .actions(self => ({
    open(type) {
      self.visible = !self.visible
      self.type = type === 'user' ? 'user' : 'post'
    },

    close() {
      self.visible = false
    },
  }))

export default DrawerStore