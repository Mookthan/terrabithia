// Today's game result for this session (prototype; the back end keeps one answer per person per day).
import { useSyncExternalStore } from 'react';
import { earn } from '@/features/rewards/coinStore';
import { dayKey } from './guessData';

const fresh = () => ({ key: dayKey(), pick: null, correct: false, clues: 1 });
let state = fresh();
const listeners = new Set();
const today = () => (state.key === dayKey() ? state : fresh());
const set = (patch) => { state = { ...today(), ...patch }; listeners.forEach((l) => l()); };
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const useGuess = () => { useSyncExternalStore(subscribe, () => state); return today(); };

export const showMoreClue = () => set({ clues: today().clues + 1 });

/** Lock in today's answer; a right answer earns the guess coins (once a day). */
export function answer(puzzle, id) {
  if (today().pick) return;
  const correct = id === puzzle.answer;
  set({ pick: id, correct });
  if (correct) earn('guess', puzzle.key);
}
