import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { EMOJI_CATEGORIES } from '../utils/emojiData';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSelect = useCallback(
    (emoji: string) => {
      onSelect(emoji);
      onClose();
    },
    [onSelect, onClose]
  );

  const query = search.trim().toLowerCase();

  const filtered = query
    ? EMOJI_CATEGORIES.map((cat) => ({
        ...cat,
        emojis: cat.emojis.filter((e) => e.includes(query)),
      })).filter((cat) => cat.emojis.length > 0)
    : EMOJI_CATEGORIES;

  return (
    <div className="emoji-picker" ref={containerRef} role="dialog" aria-label="Emoji picker">
      <div className="emoji-picker-search-wrap">
        <input
          ref={searchRef}
          type="text"
          className="emoji-picker-search"
          placeholder="Search emojis…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search emojis"
        />
      </div>
      <div className="emoji-picker-body">
        {filtered.length === 0 ? (
          <p className="emoji-picker-empty">No emojis found</p>
        ) : (
          filtered.map((cat) => (
            <div key={cat.name} className="emoji-picker-category">
              <div className="emoji-picker-category-name">{cat.name}</div>
              <div className="emoji-picker-grid">
                {cat.emojis.map((e) => (
                  <button
                    key={e}
                    className="emoji-picker-btn"
                    onClick={() => handleSelect(e)}
                    aria-label={`Select ${e}`}
                    title={e}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default memo(EmojiPicker);
