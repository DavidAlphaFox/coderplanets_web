import { types as t } from 'mobx-state-tree'
import { PAGE_SIZE } from '../../config'

export const FavoriteCategory = t.model('FavoriteCategory', {
  title: t.optional(t.string, ''),
  desc: t.optional(t.string, ''),
  totalCount: t.optional(t.number, 0),
  private: t.optional(t.boolean, false),
})

export const PagedFavoriteCategories = t.model('PagedFavoriteCategories', {
  entries: t.optional(t.array(FavoriteCategory), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, PAGE_SIZE.COMMON),
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})
