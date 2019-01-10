/*
 *
 * ArticleBanner
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import R from 'ramda'
import TimeAgo from 'timeago-react'

import FavoritesCats from '../FavoritesCats'
import { DotDivider } from '../../components'
import ReactionNumbers from './ReactionNumbers'
import MiddleInfo from './MiddleInfo'

import {
  Wrapper,
  BannerContent,
  PostBrief,
  Title,
  Desc,
  MarkTag,
} from './styles'

import { makeDebugger, storePlug } from '../../utils'

import * as logic from './logic'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:ArticleBanner')
/* eslint-enable no-unused-vars */

class ArticleBannerContainer extends React.Component {
  componentDidMount() {
    const { articleBanner } = this.props
    logic.init(articleBanner)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { articleBanner, showStar } = this.props
    const {
      activeThread,
      viewingData,
      starLoading,
      favoriteLoading,
    } = articleBanner

    const isRefined = R.contains('refined', R.pluck('title', viewingData.tags))

    return (
      <Wrapper>
        <FavoritesCats />
        {R.isNil(viewingData.id) ? null : (
          <BannerContent>
            <PostBrief>
              <Title>{viewingData.title}</Title>
              <MiddleInfo thread={activeThread} data={viewingData} />
              <Desc>
                {isRefined ? <MarkTag>精华</MarkTag> : <div />}
                <TimeAgo datetime={viewingData.insertedAt} locale="zh_CN" />
                <DotDivider />
                字数: {viewingData.length}
              </Desc>
            </PostBrief>
            <ReactionNumbers
              data={viewingData}
              starLoading={starLoading}
              favoriteLoading={favoriteLoading}
              showStar={showStar}
            />
          </BannerContent>
        )}
      </Wrapper>
    )
  }
}

ArticleBannerContainer.propTypes = {
  articleBanner: PropTypes.object.isRequired,
  showStar: PropTypes.bool,
}

ArticleBannerContainer.defaultProps = {
  showStar: true,
}

export default inject(storePlug('articleBanner'))(
  observer(ArticleBannerContainer)
)