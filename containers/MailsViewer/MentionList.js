import React from 'react'
import R from 'ramda'

import EmptyLabel from 'components/EmptyLabel'
import Pagi from 'components/Pagi'

import ToggleInfo from './ToggleInfo'

import {
  Wrapper,
  InfoWrapper,
  ListsWrapper,
  MessageLinker,
  Message,
  MessageDivider,
  MessageHeader,
  MessageBody,
  UserLabel,
  UserAvatar,
  UserNickname,
  TitleHeader,
  TypeLabel,
  SourceTitle,
  SourcePreview,
  PreviewBody,
  AtLabel,
} from './styles/mention_list'

import { loadMentions } from './logic'

const getLinkAddr = item => {
  const { sourceType } = item
  const thread = sourceType === 'posts' ? 'post' : sourceType

  return `/${item.community}/${thread}/${item.sourceId}`
}

const MentionList = ({
  data: { entries, pageNumber, pageSize, totalCount },
  readState,
}) => {
  if (R.isEmpty(entries)) return <EmptyLabel text="还没有人提到(@)你" />

  return (
    <Wrapper>
      <InfoWrapper>
        <ToggleInfo readState={readState} totalCount={totalCount} />
      </InfoWrapper>

      <ListsWrapper>
        {entries.map(item => (
          <MessageLinker
            key={item.id}
            href={`${getLinkAddr(item)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Message>
              <MessageHeader>
                <UserLabel>
                  <UserAvatar src={item.fromUser.avatar} />
                  <UserNickname>{item.fromUser.nickname}</UserNickname>
                </UserLabel>
                <TitleHeader>
                  <TypeLabel>在帖子</TypeLabel>
                  <SourceTitle>{item.sourceTitle}</SourceTitle>
                </TitleHeader>
              </MessageHeader>
              <MessageBody>
                <SourcePreview>
                  <PreviewBody>{item.sourcePreview}</PreviewBody>
                  <AtLabel>中@了你</AtLabel>
                </SourcePreview>
              </MessageBody>
            </Message>
            <MessageDivider />
          </MessageLinker>
        ))}
        <Pagi
          left="-20px"
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          onChange={loadMentions}
        />
      </ListsWrapper>
    </Wrapper>
  )
}

export default MentionList
