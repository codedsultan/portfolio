import type { RecordedAnswer } from '@/data/answers';

/** A typed question must score at least this much to get a recorded answer. */
export const MATCH_THRESHOLD = 2;

/** Lowercase, turn punctuation into spaces, drop accents, collapse whitespace. */
export function normalizeQuestion(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function scoreAnswer(normalized: string, answer: RecordedAnswer): number {
  if (normalized === normalizeQuestion(answer.question)) return Number.POSITIVE_INFINITY;

  const padded = ` ${normalized} `;
  return Object.entries(answer.keywords).reduce(
    (total, [phrase, weight]) => (padded.includes(` ${phrase} `) ? total + weight : total),
    0,
  );
}

/**
 * Returns the recorded answer a typed question points at, or null. Never
 * guesses: below the threshold, or when two answers tie for the top score,
 * the caller shows the no-match message instead.
 */
export function matchQuestion(
  input: string,
  answers: readonly RecordedAnswer[],
): RecordedAnswer | null {
  const normalized = normalizeQuestion(input);
  if (!normalized) return null;

  const ranked = answers
    .map((answer) => ({ answer, score: scoreAnswer(normalized, answer) }))
    .sort((a, b) => b.score - a.score);

  const [best, runnerUp] = ranked;
  if (!best || best.score < MATCH_THRESHOLD) return null;
  if (runnerUp && runnerUp.score === best.score) return null;
  return best.answer;
}
