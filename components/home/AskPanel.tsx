'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { askIntro, recordedAnswers, type AnswerSource, type RecordedAnswer } from '@/data/answers';
import { matchQuestion } from '@/lib/askMatcher';
import { cn } from '@/lib/utils';

/** Longest question the input accepts. */
const MAX_QUESTION_LENGTH = 200;
/** Show the character count once the question is this close to the limit. */
const LIMIT_WARNING_RANGE = 20;

type AskResult = { kind: 'answer'; answer: RecordedAnswer } | { kind: 'no-match' } | null;

/** Bold each source label where it appears in the answer text. */
function emphasize(text: string, sources: AnswerSource[]): ReactNode[] {
  const labels = sources.map((s) => s.label).filter((label) => text.includes(label));
  if (labels.length === 0) return [text];

  const escaped = labels.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  return text
    .split(pattern)
    .map((part, i) => (labels.includes(part) ? <strong key={i} className="font-semibold">{part}</strong> : part));
}

function SourceLink({ source, index }: { source: AnswerSource; index: number }) {
  const className =
    'num-mono inline-flex min-h-9 items-center gap-2 rounded-md border border-line-strong bg-blue-tint px-2.5 py-1.5 text-[13px] font-medium text-blue-deep transition-colors hover:border-blue';
  const content = (
    <>
      <span className="text-slate" aria-hidden>
        {index + 1}
      </span>
      {source.label}
    </>
  );

  if (source.href.startsWith('http')) {
    return (
      <a href={source.href} target="_blank" rel="noreferrer" className={className}>
        {content}
        <ArrowUpRight size={12} aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  // Hash links use a plain anchor so the browser fires `hashchange`, which the
  // résumé tabs listen for. Files (the PDF) are not routes either.
  if (source.href.includes('#') || source.href.endsWith('.pdf')) {
    return (
      <a href={source.href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={source.href} className={className}>
      {content}
    </Link>
  );
}

function QuestionChips({
  activeId,
  onPick,
}: {
  activeId: string | null;
  onPick: (answer: RecordedAnswer) => void;
}) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Suggested questions">
      {recordedAnswers.map((answer) => {
        const isActive = activeId === answer.id;
        return (
          <li key={answer.id}>
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => onPick(answer)}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-blue bg-blue-tint text-blue-deep'
                  : 'border-line-strong bg-surface text-ink-soft hover:border-blue hover:text-blue',
              )}
            >
              {answer.question}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function AnswerCard({ answer }: { answer: RecordedAnswer }) {
  return (
    <article className="mt-7 rounded-[10px] border border-line bg-surface px-6 py-6 sm:px-7">
      <h2 className="num-mono text-[12px] uppercase tracking-[0.06em] text-slate">
        Answer · recorded
        <span className="sr-only">: {answer.question}</span>
      </h2>
      <p className="mt-3 text-[17px] leading-relaxed text-ink">{emphasize(answer.answer, answer.sources)}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <ol className="flex flex-wrap gap-2.5" aria-label="Sources">
          {answer.sources.map((source, i) => (
            <li key={source.href}>
              <SourceLink source={source} index={i} />
            </li>
          ))}
        </ol>
        <span className="num-mono ml-1.5 text-[12px] text-slate">{askIntro.footer}</span>
      </div>
    </article>
  );
}

export function AskPanel() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AskResult>(null);

  const activeId = result?.kind === 'answer' ? result.answer.id : null;
  const remaining = MAX_QUESTION_LENGTH - query.length;
  const isNearLimit = remaining <= LIMIT_WARNING_RANGE;

  function pick(answer: RecordedAnswer) {
    setQuery(answer.question);
    setResult({ kind: 'answer', answer });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    const answer = matchQuestion(query, recordedAnswers);
    setResult(answer ? { kind: 'answer', answer } : { kind: 'no-match' });
  }

  return (
    <div className="mt-7 max-w-[900px]">
      <form onSubmit={handleSubmit} className="flex max-w-[820px] gap-2.5" role="search">
        <label htmlFor="ask-input" className="sr-only">
          {askIntro.inputLabel}
        </label>
        <input
          id="ask-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={askIntro.placeholder}
          autoComplete="off"
          maxLength={MAX_QUESTION_LENGTH}
          aria-describedby={isNearLimit ? 'ask-limit' : undefined}
          className="min-h-[52px] min-w-0 flex-1 rounded-lg border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-slate-light"
        />
        <button
          type="submit"
          className="min-h-[52px] rounded-lg bg-blue-action px-6 text-[15px] font-semibold text-white transition-colors hover:bg-blue-bright active:translate-y-px"
        >
          Ask
        </button>
      </form>
      {isNearLimit && (
        <p id="ask-limit" className="num-mono mt-2 text-[12px] text-slate">
          {remaining === 0
            ? `${MAX_QUESTION_LENGTH}-character limit reached`
            : `${remaining} ${remaining === 1 ? 'character' : 'characters'} left`}
        </p>
      )}

      <div className="mt-3.5">
        <QuestionChips activeId={activeId} onPick={pick} />
      </div>

      <div aria-live="polite" className="max-w-[820px]">
        {result?.kind === 'answer' && <AnswerCard answer={result.answer} />}
        {result?.kind === 'no-match' && (
          <div className="mt-7 rounded-[10px] border border-line bg-surface px-6 py-6 sm:px-7">
            <p className="text-[17px] leading-relaxed text-ink">{askIntro.noMatch}</p>
            <div className="mt-4">
              <QuestionChips activeId={null} onPick={pick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
