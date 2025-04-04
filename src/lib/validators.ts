export const MIN_AUTOCOMPLETE_CHARS = 2;

export const hasMinChars = (input?: string | null) => (input?.trim().length || 0) >= MIN_AUTOCOMPLETE_CHARS;
