/*
 *
 * JobContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Affix } from 'antd'

import { makeDebugger, storePlug, THREAD } from 'utils'

import ArticleBodyHeader from 'containers/ArticleBodyHeader'
import Comments from 'containers/Comments'
import MarkDownRender from 'components/MarkDownRender'
import Maybe from 'components/Maybe'

import {
  Wrapper,
  MainWrapper,
  ArticleWrapper,
  BodyHeaderWrapper,
  CommentsWrapper,
} from './styles'

import SideCards from './SideCards'

import * as logic from './logic'

/* eslint-disable-next-line */
const debug = makeDebugger('C:JobContent')

class JobContentContainer extends React.Component {
  componentDidMount() {
    const { jobContent } = this.props
    logic.init(jobContent)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { jobContent } = this.props
    const { curRoute, viewingData } = jobContent

    const { mainPath: communityRaw } = curRoute

    return (
      <Wrapper>
        <Maybe test={viewingData.id}>
          <React.Fragment>
            <MainWrapper>
              <ArticleWrapper>
                <BodyHeaderWrapper>
                  <ArticleBodyHeader
                    communityRaw={communityRaw}
                    thread={THREAD.JOB}
                    data={viewingData}
                  />
                </BodyHeaderWrapper>
                <MarkDownRender body={viewingData.body} />
              </ArticleWrapper>
              <CommentsWrapper>
                <Comments ssr />
              </CommentsWrapper>
            </MainWrapper>
            <Affix offsetTop={30}>
              <SideCards data={viewingData} />
            </Affix>
          </React.Fragment>
        </Maybe>
      </Wrapper>
    )
  }
}

export default inject(storePlug('jobContent'))(observer(JobContentContainer))
