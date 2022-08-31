import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { sendRegisteredKeywordIncludeContentCreatedAlarm } from '../utils/alarm.utils';
import { KeywordRepository } from '../../keyword/keyword.repository';

declare type CreateEventPayload = {
  id: number;
  content: string;
};

@Injectable()
export class KeywordEventListener {
  constructor(private readonly keywordRepository: KeywordRepository) {}

  @OnEvent('board.created', { async: true })
  async handleBoardCreatedEvent(payload: CreateEventPayload) {
    await this.findAndAlarmKeywords('board', payload);
  }

  @OnEvent('comment.created', { async: true })
  async handleCommentCreatedEvent(payload: CreateEventPayload) {
    await this.findAndAlarmKeywords('comment', payload);
  }

  private async findAndAlarmKeywords(
    type: string,
    payload: CreateEventPayload,
  ) {
    const findKeywords = await this.keywordRepository.findMatchingKeywords(
      payload.content.split(/\s+/),
    );
    findKeywords.map(async (findKeyword) => {
      // alarm keywords
      sendRegisteredKeywordIncludeContentCreatedAlarm(
        type,
        payload.id,
        findKeyword.author,
        findKeyword.keyword,
      );
    });
  }
}
