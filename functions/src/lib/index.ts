export * from './model';
export * from './auth.service';
export * from './auth.model';
import { converter as playerConverter } from './auth.converter';
import { converter as timestampConverter } from './timestamp.converter';

export const converter = {
  player: playerConverter,
  timestamp: timestampConverter
}
