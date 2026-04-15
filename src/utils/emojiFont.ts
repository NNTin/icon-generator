export interface EmojiFont {
  id: string;
  label: string;
  value: string;
}

export const EMOJI_FONTS: EmojiFont[] = [
  {
    id: 'system',
    label: 'System Default',
    value: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
  },
  {
    id: 'apple',
    label: 'Apple Color Emoji',
    value: "'Apple Color Emoji', sans-serif",
  },
  {
    id: 'segoe',
    label: 'Segoe UI Emoji',
    value: "'Segoe UI Emoji', sans-serif",
  },
  {
    id: 'noto',
    label: 'Noto Color Emoji',
    value: "'Noto Color Emoji', sans-serif",
  },
  {
    id: 'twemoji',
    label: 'Twemoji',
    value: "'Twemoji Mozilla', sans-serif",
  },
];

export const DEFAULT_EMOJI_FONT = EMOJI_FONTS[0];

/** Default CSS font-family string used for emoji rendering. */
export const DEFAULT_FONT = DEFAULT_EMOJI_FONT.value;

export function getFontValue(fontId: string): string {
  return EMOJI_FONTS.find((f) => f.id === fontId)?.value ?? DEFAULT_FONT;
}
