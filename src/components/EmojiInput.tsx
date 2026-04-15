import { useCallback, useState, memo } from 'react';
import EmojiPicker from './EmojiPicker';
import { EMOJI_FONTS } from '../utils/emojiFont';

const PRESET_EMOJIS = ['🚀', '⚡', '🧠', '🧪', '💡', '🎯', '🔥', '💎'];

const RANDOM_EMOJIS = [
  '🥫', '🚀', '⚡', '🧠', '🧪', '💡', '🎯', '🔥', '💎', '🌟', '🎨', '🦊',
  '🐉', '🌈', '🎸', '🏆', '🦄', '🍕', '🎃', '🌊', '🍀', '🎭', '🔮', '🦋',
  '🌙', '☀️', '❄️', '🎵', '🏔️', '🌺', '🦁', '🐬', '🎪', '🔑', '⚓', '🎲',
];

interface EmojiInputProps {
  emoji: string;
  onChange: (emoji: string) => void;
  font: string;
  onFontChange: (fontValue: string) => void;
}

function EmojiInput({ emoji, onChange, font, onFontChange }: EmojiInputProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleRandom = useCallback(() => {
    const pool = RANDOM_EMOJIS.filter((e) => e !== emoji);
    const next = pool[Math.floor(Math.random() * pool.length)];
    onChange(next);
  }, [emoji, onChange]);

  const handlePickerSelect = useCallback(
    (selected: string) => {
      onChange(selected);
    },
    [onChange]
  );

  return (
    <div className="emoji-input-section">
      <h2 className="section-title">Your Emoji</h2>

      <div className="emoji-input-row">
        <input
          type="text"
          className="emoji-input"
          value={emoji}
          onChange={(e) => {
            const val = e.target.value;
            if (val.trim()) onChange(val.trim());
          }}
          aria-label="Emoji input"
          maxLength={8}
        />
        <div className="emoji-picker-anchor">
          <button
            className="btn btn-ghost"
            onClick={() => setPickerOpen((o) => !o)}
            aria-label="Open emoji picker"
            aria-expanded={pickerOpen}
            title="Pick emoji"
          >
            🎨 Pick
          </button>
          {pickerOpen && (
            <EmojiPicker
              onSelect={handlePickerSelect}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>
        <button className="btn btn-ghost" onClick={handleRandom} title="Random emoji" aria-label="Pick random emoji">
          🎲 Random
        </button>
      </div>

      <div className="emoji-font-row">
        <label className="preset-label" htmlFor="emoji-font-select">Font</label>
        <select
          id="emoji-font-select"
          className="emoji-font-select"
          value={font}
          onChange={(e) => onFontChange(e.target.value)}
          aria-label="Emoji font"
        >
          {EMOJI_FONTS.map((f) => (
            <option key={f.id} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="preset-label">Presets</div>
      <div className="preset-grid">
        {PRESET_EMOJIS.map((preset) => (
          <button
            key={preset}
            className={`preset-btn${emoji === preset ? ' active' : ''}`}
            onClick={() => onChange(preset)}
            aria-label={`Use ${preset}`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(EmojiInput);
