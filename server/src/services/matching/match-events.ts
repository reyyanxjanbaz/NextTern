import { EventEmitter } from 'events';

class MatchEventEmitter extends EventEmitter {
  emitMatch(matchId: string, studentId: string, recruiterId: string) {
    this.emit('match', { matchId, studentId, recruiterId });
  }
}

export const matchEvents = new MatchEventEmitter();
