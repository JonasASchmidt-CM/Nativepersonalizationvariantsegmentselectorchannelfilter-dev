import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import TagFilterVariant1 from './components/TagFilterVariant1';
import TweaksMenu from './components/TweaksMenu';

export default function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [showChannelChips, setShowChannelChips] = useState(false);
  const [stickyChannels, setStickyChannels] = useState(false);
  const [showChannelCounts, setShowChannelCounts] = useState(false);
  const [showAllChannelsChip, setShowAllChannelsChip] = useState(true);
  const [showProfileCount, setShowProfileCount] = useState(false);
  const [showChannelClearLink, setShowChannelClearLink] = useState(true);
  const [highlightMatches, setHighlightMatches] = useState(false);

  return (
    <div
      className="min-h-screen py-12 px-6"
      style={{ background: 'linear-gradient(-44.6386deg, rgb(111, 195, 184) 0%, rgb(9, 114, 177) 100%)' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
            CoreMedia Content Studio · Native Personalization
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Variant Segment Selector – Filter by Channels (from CMEC)
          </h1>
          <p className="text-sm text-white/50 mt-1">Draft v01</p>
        </div>

        {/* Segmentation panel */}
        <div className="bg-white rounded-[8px]">

          {/* Panel title bar */}
          <div className="flex items-center gap-0.5 px-6 py-[18px]">
            <button
              onClick={() => setPanelOpen(v => !v)}
              aria-label={panelOpen ? 'Collapse Segmentation' : 'Expand Segmentation'}
              className="flex-shrink-0 mr-1 rounded hover:bg-gray-50/60 transition-colors"
            >
              {panelOpen
                ? <ChevronDown className="w-[18px] h-[18px] text-[#3f3f3f]" />
                : <ChevronRight className="w-[18px] h-[18px] text-[#3f3f3f]" />
              }
            </button>
            <button
              onClick={() => setPanelOpen(v => !v)}
              className="text-left rounded hover:bg-gray-50/60 transition-colors px-1"
            >
              <span
                className="text-[#3f3f3f] text-[20px] leading-normal"
                style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
              >
                Segmentation
              </span>
            </button>
          </div>

          {/* Panel body */}
          {panelOpen && (
            <div className="px-6 pb-6 pt-0">
              {/* Field label */}
              <p
                className="uppercase text-[#3f3f3f] mb-2"
                style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em' }}
              >
                Assigned Segments &amp; Profiles
              </p>

              {/* Segment selector dropdown */}
              <TagFilterVariant1
                showChannelChips={showChannelChips}
                stickyChannels={stickyChannels}
                showChannelCounts={showChannelCounts}
                showAllChannelsChip={showAllChannelsChip}
                showProfileCount={showProfileCount}
                showChannelClearLink={showChannelClearLink}
                highlightMatches={highlightMatches}
              />
            </div>
          )}

        </div>
      </div>

      <TweaksMenu
        showChannelChips={showChannelChips}
        onToggleChannelChips={() => setShowChannelChips(v => !v)}
        stickyChannels={stickyChannels}
        onToggleStickyChannels={() => setStickyChannels(v => !v)}
        showChannelCounts={showChannelCounts}
        onToggleChannelCounts={() => setShowChannelCounts(v => !v)}
        showAllChannelsChip={showAllChannelsChip}
        onToggleAllChannelsChip={() => setShowAllChannelsChip(v => !v)}
        showProfileCount={showProfileCount}
        onToggleShowProfileCount={() => setShowProfileCount(v => !v)}
        showChannelClearLink={showChannelClearLink}
        onToggleChannelClearLink={() => setShowChannelClearLink(v => !v)}
        highlightMatches={highlightMatches}
        onToggleHighlightMatches={() => setHighlightMatches(v => !v)}
      />
    </div>
  );
}
