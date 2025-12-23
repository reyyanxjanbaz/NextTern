import { TimeInState } from '../../../../shared/types/status-card';

/**
 * Calculate time in state.
 */
export function calculateTimeInState(
  enteredAt: Date | string,
  staleThresholdDays: number = 7
): TimeInState {
  const enteredDate = new Date(enteredAt);
  const now = new Date();
  const diffMs = now.getTime() - enteredDate.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let durationText: string;
  if (days > 0) {
    durationText = days === 1 ? '1 day' : `${days} days`;
  } else if (hours > 0) {
    durationText = hours === 1 ? '1 hour' : `${hours} hours`;
  } else {
    durationText = minutes <= 1 ? 'Just now' : `${minutes} minutes`;
  }

  return {
    enteredAt: enteredDate,
    duration: { days, hours, minutes },
    durationText,
    isStale: days >= staleThresholdDays,
    staleThresholdDays,
  };
}
