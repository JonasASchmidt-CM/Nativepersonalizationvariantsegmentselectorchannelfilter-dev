import { useState } from 'react';
import { Settings2, ChevronDown, ChevronUp } from 'lucide-react';

interface TweaksMenuProps {
  showChannelChips: boolean;
  onToggleChannelChips: () => void;
  stickyChannels: boolean;
  onToggleStickyChannels: () => void;
  showChannelCounts: boolean;
  onToggleChannelCounts: () => void;
  showAllChannelsChip: boolean;
  onToggleAllChannelsChip: () => void;
  showProfileCount: boolean;
  onToggleShowProfileCount: () => void;
  showChannelClearLink: boolean;
  onToggleChannelClearLink: () => void;
  highlightMatches: boolean;
  onToggleHighlightMatches: () => void;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onMouseDown={e => e.preventDefault()}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className="relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: checked ? '#006cae' : '#d1d5db' }}
    >
      <span
        className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(4px)' }}
      />
    </button>
  );
}

export default function TweaksMenu({
  showChannelChips,
  onToggleChannelChips,
  stickyChannels,
  onToggleStickyChannels,
  showChannelCounts,
  onToggleChannelCounts,
  showAllChannelsChip,
  onToggleAllChannelsChip,
  showProfileCount,
  onToggleShowProfileCount,
  showChannelClearLink,
  onToggleChannelClearLink,
  highlightMatches,
  onToggleHighlightMatches,
}: TweaksMenuProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      data-tweaks-menu
      className="fixed bottom-6 right-6 z-[60] w-72 bg-white rounded-[8px] shadow-xl border border-gray-200"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <button
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors ${expanded ? 'border-b border-gray-100' : ''}`}
      >
        <Settings2 className="w-4 h-4 text-[#3f3f3f]" />
        <span
          className="uppercase text-[#3f3f3f] flex-1 text-left"
          style={{ fontWeight: 500, fontSize: 12, letterSpacing: '0.06em' }}
        >
          UI Tweaks
        </span>
        {expanded
          ? <ChevronDown className="w-4 h-4 text-[#3f3f3f]" />
          : <ChevronUp className="w-4 h-4 text-[#3f3f3f]" />
        }
      </button>

      {expanded && (
      <div>
      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Channel chips on segments</p>
          <p className="text-xs text-gray-400 mt-0.5">Show associated channel pills in each segment row</p>
        </div>
        <Toggle checked={showChannelChips} onChange={onToggleChannelChips} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Sticky channel filter</p>
          <p className="text-xs text-gray-400 mt-0.5">Pin &quot;Filter by Channels&quot; to the top while scrolling the dropdown</p>
        </div>
        <Toggle checked={stickyChannels} onChange={onToggleStickyChannels} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Segment count on channel chips</p>
          <p className="text-xs text-gray-400 mt-0.5">Show the number of associated segments next to each channel name</p>
        </div>
        <Toggle checked={showChannelCounts} onChange={onToggleChannelCounts} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Show &quot;All Channels&quot; channel</p>
          <p className="text-xs text-gray-400 mt-0.5">Include the global, site-wide meta-channel in the filter list</p>
        </div>
        <Toggle checked={showAllChannelsChip} onChange={onToggleAllChannelsChip} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Show user count suffix on segment names</p>
          <p className="text-xs text-gray-400 mt-0.5">Append the trailing &quot;(N)&quot; profile count after each segment name</p>
        </div>
        <Toggle checked={showProfileCount} onChange={onToggleShowProfileCount} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Show Channel Filter Clear Link</p>
          <p className="text-xs text-gray-400 mt-0.5">Show the &quot;Clear N selected&quot; shortcut next to the channel filter heading</p>
        </div>
        <Toggle checked={showChannelClearLink} onChange={onToggleChannelClearLink} />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#3f3f3f]">Highlight search matches</p>
          <p className="text-xs text-gray-400 mt-0.5">Mark matched query text in segment names with a neon yellow background</p>
        </div>
        <Toggle checked={highlightMatches} onChange={onToggleHighlightMatches} />
      </div>
      </div>
      )}
    </div>
  );
}
