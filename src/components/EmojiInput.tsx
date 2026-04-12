import { useCallback, memo } from 'react';

const PRESET_EMOJIS = ['🚀', '⚡', '🧠', '🧪', '💡', '🎯', '🔥', '💎'];

const RANDOM_EMOJIS = [
  '🥫', '🚀', '⚡', '🧠', '🧪', '💡', '🎯', '🔥', '💎', '🌟', '🎨', '🦊',
  '🐉', '🌈', '🎸', '🏆', '🦄', '🍕', '🎃', '🌊', '🍀', '🎭', '🔮', '🦋',
  '🌙', '☀️', '❄️', '🎵', '🏔️', '🌺', '🦁', '🐬', '🎪', '🔑', '⚓', '🎲',
];

interface EmojiInputProps {
  emoji: string;
  onChange: (emoji: string) => void;
}

function EmojiInput({ emoji, onChange }: EmojiInputProps) {
  const handleRandom = useCallback(() => {
    const pool = RANDOM_EMOJIS.filter((e) => e !== emoji);
    const next = pool[Math.floor(Math.random() * pool.length)];
    onChange(next);
  }, [emoji, onChange]);

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
        <button className="btn btn-ghost" onClick={handleRandom} title="Random emoji" aria-label="Pick random emoji">
          🎲 Random
        </button>
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
