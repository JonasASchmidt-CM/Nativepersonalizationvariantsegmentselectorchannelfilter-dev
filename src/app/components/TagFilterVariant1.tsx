import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Square, CheckSquare, ExternalLink } from 'lucide-react';

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 17.49 17.49" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path
        d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
        fill="#3F3F3F"
      />
    </svg>
  );
}

function SegmentIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM17.93 9H11V2.07C14.61 2.52 17.48 5.39 17.93 9ZM2 10C2 5.93 5.06 2.56 9 2.07V17.93C5.06 17.44 2 14.07 2 10ZM11 17.93V11H17.93C17.48 14.61 14.61 17.48 11 17.93Z"
          fill="#3F3F3F"
        />
      </g>
    </svg>
  );
}

interface TagItem {
  id: string;
  name: string;
  color: string;
}

interface Segment {
  id: string;
  name: string;
  type: 'profile' | 'segment';
  // Specific channels (websites) this segment is associated with.
  tags: string[];
  // Whether the segment is also part of the global "All Channels" pool
  // (i.e. available to every site in the CMS).
  isGlobal: boolean;
  description?: string;
  profileCount: number;
}

const mockTags: TagItem[] = [
  { id: 't1',  name: 'Marketing',   color: '#22c55e' },
  { id: 't2',  name: 'Sales',       color: '#3b82f6' },
  { id: 't3',  name: 'Premium',     color: '#f97316' },
  { id: 't4',  name: 'Enterprise',  color: '#a855f7' },
  { id: 't5',  name: 'Trial',       color: '#eab308' },
  { id: 't6',  name: 'Active',      color: '#84cc16' },
  { id: 't7',  name: 'Inactive',    color: '#9ca3af' },
  { id: 't8',  name: 'VIP',         color: '#ec4899' },
  { id: 't9',  name: 'Standard',    color: '#64748b' },
  { id: 't10', name: 'Regional',    color: '#06b6d4' },
  { id: 't11', name: 'EMEA',        color: '#0ea5e9' },
  { id: 't12', name: 'APAC',        color: '#6366f1' },
  { id: 't13', name: 'Americas',    color: '#14b8a6' },
  { id: 't14', name: 'Loyalty',     color: '#f43f5e' },
  { id: 't15', name: 'New User',    color: '#8b5cf6' },
  { id: 't16', name: 'Returning',   color: '#d97706' },
  { id: 't17', name: 'Mobile',      color: '#10b981' },
  { id: 't18', name: 'Desktop',     color: '#2563eb' },
  { id: 't19', name: 'B2B',         color: '#7c3aed' },
  { id: 't20', name: 'B2C',         color: '#db2777' },
  { id: 't21', name: 'Churned',     color: '#ef4444' },
  { id: 't22', name: 'At Risk',     color: '#f59e0b' },
  { id: 't23', name: 'Onboarding',  color: '#0d9488' },
  { id: 't24', name: 'Power User',  color: '#7c3aed' },
  { id: 't25', name: 'Aurora',      color: '#0ea5e9' },
  { id: 't26', name: 'Chef Corp.',  color: '#dc2626' },
];

const mockSegments: Segment[] = [
  // ── Case 1: Unassigned — not global, not on any channel ──
  { id: 's101', name: 'Inactive Users',           type: 'profile', tags: [], isGlobal: false, description: 'Users who haven\'t logged in recently',     profileCount: 17 },
  { id: 's102', name: 'Standard Plan',            type: 'profile', tags: [], isGlobal: false, description: 'Standard subscription tier',                profileCount: 5 },
  { id: 's103', name: 'Lapsed Subscribers',       type: 'segment', tags: [], isGlobal: false, description: 'Subscribers whose plan expired',           profileCount: 42 },
  { id: 's104', name: 'Bounced Visitors',         type: 'segment', tags: [], isGlobal: false, description: 'Single-page-view visitors',                profileCount: 311 },
  { id: 's105', name: 'Unverified Accounts',      type: 'profile', tags: [], isGlobal: false, description: 'Accounts pending email verification',      profileCount: 64 },
  { id: 's106', name: 'Archived Profiles',        type: 'profile', tags: [], isGlobal: false, description: 'Deactivated user profiles',                profileCount: 28 },

  // ── Case 2: Global only — assigned to "All Channels" only ──
  { id: 's201', name: 'Chrome Users',             type: 'segment', tags: [], isGlobal: true,  description: 'Visitors on Google Chrome',                profileCount: 8420 },
  { id: 's202', name: 'Mobile Users',             type: 'segment', tags: [], isGlobal: true,  description: 'Visitors on a mobile device',              profileCount: 12044 },
  { id: 's203', name: 'Desktop Users',            type: 'segment', tags: [], isGlobal: true,  description: 'Visitors on a desktop device',             profileCount: 7321 },
  { id: 's204', name: 'High-Value Customers',     type: 'segment', tags: [], isGlobal: true,  description: 'Customers with high lifetime value',       profileCount: 1284 },
  { id: 's205', name: 'Loyalty Members',          type: 'segment', tags: [], isGlobal: true,  description: 'Members in the loyalty program',           profileCount: 612 },
  { id: 's206', name: 'Newsletter Subscribers',   type: 'segment', tags: [], isGlobal: true,  description: 'Opted-in newsletter recipients',           profileCount: 4503 },
  { id: 's207', name: 'Cookie-Consented',         type: 'segment', tags: [], isGlobal: true,  description: 'Visitors who accepted tracking cookies',   profileCount: 9876 },

  // ── Case 3: Exactly one channel, not global ──
  { id: 's301', name: 'Trial Sign-ups',           type: 'segment', tags: ['t5'],         isGlobal: false, description: 'Recently signed up for trial',           profileCount: 372 },
  { id: 's302', name: 'EMEA Newsletter Readers',  type: 'segment', tags: ['t11'],        isGlobal: false, description: 'Newsletter readers in EMEA',             profileCount: 845 },
  { id: 's303', name: 'APAC Visitors',            type: 'segment', tags: ['t12'],        isGlobal: false, description: 'Visitors from APAC region',              profileCount: 1102 },
  { id: 's304', name: 'Aurora Beta Testers',      type: 'segment', tags: ['t25'],        isGlobal: false, description: 'Beta testers on Aurora',                 profileCount: 89 },
  { id: 's305', name: 'Chef Corp. Recipe Fans',   type: 'segment', tags: ['t26'],        isGlobal: false, description: 'Engaged Chef Corp. recipe readers',      profileCount: 1543 },
  { id: 's306', name: 'VIP-Only Promo',           type: 'profile', tags: ['t8'],         isGlobal: false, description: 'VIPs eligible for invite-only promos',   profileCount: 207 },
  { id: 's307', name: 'Onboarding Cohort',        type: 'segment', tags: ['t23'],        isGlobal: false, description: 'Users in onboarding flow',               profileCount: 198 },

  // ── Case 4: Exactly one channel + global ──
  { id: 's401', name: 'Marketing Power Users',    type: 'segment', tags: ['t1'],         isGlobal: true,  description: 'Highly engaged Marketing audience',      profileCount: 421 },
  { id: 's402', name: 'Aurora Loyalty',           type: 'segment', tags: ['t25'],        isGlobal: true,  description: 'Aurora loyalty programme members',       profileCount: 304 },
  { id: 's403', name: 'Chef Corp. Premium Tier',  type: 'segment', tags: ['t26'],        isGlobal: true,  description: 'Premium subscribers on Chef Corp.',      profileCount: 678 },
  { id: 's404', name: 'Returning EMEA Buyers',    type: 'segment', tags: ['t11'],        isGlobal: true,  description: 'Repeat purchasers in EMEA',              profileCount: 521 },
  { id: 's405', name: 'Mobile-First Sales',       type: 'segment', tags: ['t2'],         isGlobal: true,  description: 'Sales prospects on mobile',              profileCount: 938 },
  { id: 's406', name: 'B2C Loyalty Champions',    type: 'profile', tags: ['t20'],        isGlobal: true,  description: 'Top B2C loyalty advocates',              profileCount: 142 },

  // ── Case 5: 2–3 channels, not global ──
  { id: 's501', name: 'Enterprise Accounts',      type: 'profile', tags: ['t4','t19'],            isGlobal: false, description: 'Large B2B enterprise accounts',           profileCount: 0 },
  { id: 's502', name: 'APAC B2B Accounts',        type: 'profile', tags: ['t12','t4','t19'],      isGlobal: false, description: 'B2B accounts across APAC',                profileCount: 0 },
  { id: 's503', name: 'Regional Sales EMEA',      type: 'segment', tags: ['t2','t11','t10'],      isGlobal: false, description: 'Sales focus across EMEA region',          profileCount: 1845 },
  { id: 's504', name: 'Americas B2C Buyers',      type: 'segment', tags: ['t13','t20','t10'],     isGlobal: false, description: 'B2C consumers across the Americas',       profileCount: 736 },
  { id: 's505', name: 'Trial → Premium Path',     type: 'segment', tags: ['t5','t3'],             isGlobal: false, description: 'Trialists likely to upgrade to premium',  profileCount: 312 },
  { id: 's506', name: 'At-Risk Churners',         type: 'segment', tags: ['t22','t16','t7'],      isGlobal: false, description: 'Returning users showing churn signals',   profileCount: 89 },
  { id: 's507', name: 'Aurora × Chef Co-Promo',   type: 'segment', tags: ['t25','t26'],           isGlobal: false, description: 'Cross-promotion audience',                profileCount: 254 },
  { id: 's508', name: 'EMEA Power Users',         type: 'segment', tags: ['t11','t24'],           isGlobal: false, description: 'Heavy users in EMEA',                     profileCount: 463 },

  // ── Case 6: 2–3 channels + global ──
  { id: 's601', name: 'Global Trial Cohort',      type: 'segment', tags: ['t5','t15'],            isGlobal: true,  description: 'Trial sign-ups across all sites',         profileCount: 1207 },
  { id: 's602', name: 'Mobile-First Segment',     type: 'segment', tags: ['t17','t20'],           isGlobal: true,  description: 'Mobile-leaning B2C audience',             profileCount: 2103 },
  { id: 's603', name: 'Enterprise Champions',     type: 'profile', tags: ['t4','t8','t1'],        isGlobal: true,  description: 'Top enterprise advocates',                profileCount: 96 },
  { id: 's604', name: 'Aurora + Chef VIPs',       type: 'profile', tags: ['t25','t26','t8'],      isGlobal: true,  description: 'High-value users present on both sites',  profileCount: 312 },
  { id: 's605', name: 'Returning Loyalty',        type: 'segment', tags: ['t14','t16'],           isGlobal: true,  description: 'Returning visitors in loyalty pool',      profileCount: 1488 },
  { id: 's606', name: 'Onboarding Mobile',        type: 'segment', tags: ['t23','t17','t15'],     isGlobal: true,  description: 'New mobile users mid-onboarding',         profileCount: 745 },
  { id: 's607', name: 'Power User Promo',         type: 'segment', tags: ['t24','t18'],           isGlobal: true,  description: 'Desktop power users for promo targeting', profileCount: 421 },
];

const TAG_LIMIT = 8;

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ backgroundColor: '#ffff00', color: 'inherit', borderRadius: 2 }}>{part}</mark>
      : part
  );
}

function SegmentRow({
  segment,
  selectedTags,
  showChannelChips,
  showProfileCount,
  selected,
  onToggle,
  query,
  highlightMatches,
}: {
  segment: Segment;
  selectedTags: string[];
  showChannelChips: boolean;
  showProfileCount: boolean;
  selected: boolean;
  onToggle: () => void;
  query: string;
  highlightMatches: boolean;
}) {
  return (
    <button
      onMouseDown={e => e.preventDefault()}
      onClick={onToggle}
      className="w-full text-left px-[8px] py-[6px] transition-colors"
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: selected ? '#c8f7f0' : undefined,
      }}
      onMouseEnter={e => {
        if (!selected) e.currentTarget.style.backgroundColor = '#d6f0ff';
      }}
      onMouseLeave={e => {
        if (!selected) e.currentTarget.style.backgroundColor = '';
      }}
    >
      <div className="flex flex-col gap-[4px] pl-[3px]">
        <div className="flex items-center gap-[9px]">
          {selected
            ? <CheckSquare className="flex-shrink-0 w-5 h-5 text-[#006cae]" strokeWidth={1.5} />
            : <Square className="flex-shrink-0 w-5 h-5 text-[#868686]" strokeWidth={1.5} />
          }
          <SegmentIcon className="flex-shrink-0 w-6 h-6" />
          <span className="text-[15px] leading-[1.5] text-[#3f3f3f] truncate">
            {highlightMatches ? highlight(segment.name, query) : segment.name}
            {showProfileCount ? ` (${segment.profileCount})` : ''}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1 pl-[65px]">
          <span className="text-[12px] capitalize font-normal text-[#6b7280]">
            {segment.type}
          </span>
          {showChannelChips && segment.tags.length > 0 && (
            <>
              <span className="text-[12px] text-[#d1d5db] leading-none px-0.5" aria-hidden>·</span>
              {segment.tags.map(tagId => {
                const tag = mockTags.find(t => t.id === tagId);
                if (!tag) return null;
                const isActive = selectedTags.includes(tagId);
                return (
                  <span
                    key={tagId}
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: isActive ? '#006cae' : '#e5e7eb',
                      color: isActive ? '#fff' : '#6b7280',
                    }}
                  >
                    {tag.name}
                  </span>
                );
              })}
            </>
          )}
        </div>
      </div>
    </button>
  );
}

export default function TagFilterVariant1({
  showChannelChips = true,
  stickyChannels = true,
  showChannelCounts = true,
  showAllChannelsChip = false,
  showProfileCount = false,
  showChannelClearLink = true,
  highlightMatches = false,
}: {
  showChannelChips?: boolean;
  stickyChannels?: boolean;
  showChannelCounts?: boolean;
  showAllChannelsChip?: boolean;
  showProfileCount?: boolean;
  showChannelClearLink?: boolean;
  highlightMatches?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['t26']);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [allChannelsSelected, setAllChannelsSelected] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const DROPDOWN_HEIGHT = 520;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target instanceof Element && target.closest('[data-tweaks-menu]')) return;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Note: input focus is handled explicitly in openDropdown to avoid
  // hijacking focus on HMR/fast-refresh re-renders.

  // Reset expansion state when query changes
  useEffect(() => {
    setTagsExpanded(false);
  }, [query]);

  const q = query.trim().toLowerCase();

  // Tags: filter by query, sorted alphabetically (stable — selected chips keep their position)
  const matchedTags = mockTags.filter(tag =>
    q === '' || tag.name.toLowerCase().includes(q)
  );
  const sortedTags = [...matchedTags].sort((a, b) => a.name.localeCompare(b.name));
  const tagSegmentCount = (tagId: string) =>
    mockSegments.reduce((n, s) => n + (s.tags.includes(tagId) ? 1 : 0), 0);
  const globalSegmentCount = mockSegments.reduce((n, s) => n + (s.isGlobal ? 1 : 0), 0);

  // Build a unified chip list. The "All Channels" pseudo-channel participates
  // in the alphabetical ordering when shown (and when 4+ channels exist).
  // Currently-toggled chips are duplicated at the very start of the list
  // (also alphabetically sorted) so the active selection is always visible
  // without scrolling, but stays inline within the same wrapping row.
  type ChipDef = {
    key: string;
    name: string;
    isAll: boolean;
    selected: boolean;
    count: number;
  };
  const showAllChip = showAllChannelsChip && sortedTags.length >= 4;
  const baseChips: ChipDef[] = sortedTags.map(t => ({
    key: t.id,
    name: t.name,
    isAll: false,
    selected: selectedTags.includes(t.id),
    count: tagSegmentCount(t.id),
  }));
  if (showAllChip) {
    baseChips.push({
      key: '__all__',
      name: 'All Channels',
      isAll: true,
      selected: allChannelsSelected,
      count: globalSegmentCount,
    });
  }
  baseChips.sort((a, b) => {
    // Selected chips first, both groups alphabetical.
    if (a.selected !== b.selected) return a.selected ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  const orderedChips = baseChips;
  const visibleChips = tagsExpanded ? orderedChips : orderedChips.slice(0, TAG_LIMIT);
  const hiddenChipCount = orderedChips.length - TAG_LIMIT;
  const selectedChannelCount =
    selectedTags.length + (showAllChannelsChip && allChannelsSelected ? 1 : 0);

  // Tag IDs whose channel name matches the query — used to also surface
  // segments associated with a channel that matches the search term.
  const queryMatchedTagIds = q === '' ? [] : matchedTags.map(t => t.id);

  // Segments: filter by query AND selected tags
  const filteredSegments = mockSegments.filter(segment => {
    const matchesQuery =
      q === '' ||
      segment.name.toLowerCase().includes(q) ||
      (segment.description ?? '').toLowerCase().includes(q) ||
      segment.tags.some(tagId => queryMatchedTagIds.includes(tagId));
    // Channel-filter semantics (CoreMedia CMS): "All Channels" behaves like
    // any other channel chip — it represents the pool of site-wide global
    // segments. Multiple channel selections are combined with OR, so each
    // additional selection grows (never shrinks) the result set. When no
    // channel chip is toggled on at all, the filter is inactive and every
    // segment is visible.
    const noChannelSelected =
      selectedTags.length === 0 && !(showAllChannelsChip && allChannelsSelected);
    const matchesTags =
      noChannelSelected ||
      (showAllChannelsChip && allChannelsSelected && segment.isGlobal) ||
      selectedTags.some(tagId => segment.tags.includes(tagId));
    return matchesQuery && matchesTags;
  });
  const visibleSegments = filteredSegments;

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const openDropdown = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const allSelected =
    visibleSegments.length > 0 &&
    visibleSegments.every(s => selectedSegments.includes(s.id));

  const selectedSegmentObjects = selectedSegments
    .map(id => mockSegments.find(s => s.id === id))
    .filter((s): s is Segment => Boolean(s));
  const hasSelection = selectedSegmentObjects.length > 0;

  return (
    <div ref={wrapperRef} className="w-full">
      <div className="relative w-full">

      {/* Trigger / Input field */}
      <div
        ref={triggerRef}
        onClick={openDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex items-center gap-2 px-[9px] py-[6px] bg-white cursor-text transition-colors ${hasSelection ? 'rounded-t-[4px]' : 'rounded-[4px]'}`}
        style={{
          border: `1px solid ${isOpen || isHovered ? '#006cae' : '#d1d5db'}`,
          boxShadow: isOpen ? 'inset 0 0 0 1px #006cae' : 'none',
          boxSizing: 'border-box',
          marginBottom: hasSelection ? -1 : 0,
        }}
      >
        {/* Search icon */}
        <SearchIcon className="flex-shrink-0 w-[18px] h-[18px]" />

        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={openDropdown}
          placeholder="Search here to add segments to customize your audience for this variant ..."
          className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-[#3f3f3f] placeholder:text-[#868686] placeholder:italic"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        />

        {query && (
          <button
            onMouseDown={e => e.preventDefault()}
            onClick={e => { e.stopPropagation(); setQuery(''); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {isOpen
          ? <ChevronUp className="flex-shrink-0 w-4 h-4 text-[#3f3f3f]" />
          : <ChevronDown className="flex-shrink-0 w-4 h-4 text-[#3f3f3f]" />
        }
      </div>

      {/* Dropdown drawer */}
      {isOpen && (
        <div
          className="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 rounded-b-lg shadow-xl flex flex-col overflow-hidden"
          style={{ maxHeight: DROPDOWN_HEIGHT, marginTop: 0 }}
        >
        <div className="flex-1 min-h-0 overflow-y-auto">

          {/* ── Tags section ── */}
          <div
            className={`px-3 pt-5 pb-3 bg-white border-b border-gray-200 ${stickyChannels ? 'sticky top-0 z-10' : ''}`}
          >
            <div className="flex items-center mb-2.5 gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span
                  className="uppercase text-[#3f3f3f]"
                  style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em' }}
                >
                  Filter by Channels
                </span>
                {sortedTags.length > 0 && (
                  <span
                    className="uppercase text-[#3f3f3f] tabular-nums"
                    style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em' }}
                  >
                    ({sortedTags.length})
                  </span>
                )}
                {showChannelClearLink && selectedChannelCount > 0 && (
                  <button
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      setSelectedTags([]);
                      if (showAllChannelsChip) setAllChannelsSelected(false);
                    }}
                    className="uppercase text-[#868686] hover:text-[#006cae] underline tabular-nums transition-colors ml-1"
                    style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '0.06em' }}
                  >
                    Clear {selectedChannelCount} selected
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleChips.length > 0 ? (
                visibleChips.map(chip => (
                  <button
                    key={chip.key}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      if (chip.isAll) setAllChannelsSelected(v => !v);
                      else toggleTag(chip.key);
                    }}
                    className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-xs font-medium border-2 transition-all ${
                      chip.selected
                        ? 'text-white shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#006cae] hover:text-[#006cae]'
                    }`}
                    style={chip.selected ? { backgroundColor: '#006cae', borderColor: '#006cae' } : {}}
                  >
                    {chip.name}{showChannelCounts ? ` (${chip.count})` : ''}
                  </button>
                ))
              ) : (
                <span className="text-xs text-gray-400 py-0.5 italic">
                  No tags match &ldquo;{query}&rdquo;
                </span>
              )}
            </div>

            {/* Show more / less tags */}
            {!tagsExpanded && hiddenChipCount > 0 && (
              <button
                onMouseDown={e => e.preventDefault()}
                onClick={() => setTagsExpanded(true)}
                className="mt-2.5 text-xs text-[#868686] hover:text-[#006cae] font-medium flex items-center gap-1 underline transition-colors"
              >
                Show All
                <ChevronDown className="w-3 h-3" />
              </button>
            )}
            {tagsExpanded && orderedChips.length > TAG_LIMIT && (
              <button
                onMouseDown={e => e.preventDefault()}
                onClick={() => setTagsExpanded(false)}
                className="mt-2.5 text-xs text-[#868686] hover:text-[#006cae] font-medium flex items-center gap-1 underline transition-colors"
              >
                Show less
                <ChevronUp className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* ── Segments & Profiles section ── */}
          <div>
            <div className="px-4 pt-4 pb-2 flex items-center justify-between bg-white">
              <div className="flex items-center gap-1.5">
                <span
                  className="uppercase text-[#3f3f3f]"
                  style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em' }}
                >
                  Segments &amp; Profiles
                </span>
                {filteredSegments.length > 0 && (
                  <span
                    className="uppercase text-[#3f3f3f] tabular-nums"
                    style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.06em' }}
                  >
                    ({filteredSegments.length})
                  </span>
                )}
              </div>
            </div>

            <div>
              {/* "All" row — hidden when fewer than 4 channels are available */}
              {visibleSegments.length > 0 && sortedTags.length >= 4 && (
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    const visibleIds = visibleSegments.map(s => s.id);
                    setSelectedSegments(prev =>
                      allSelected
                        ? prev.filter(id => !visibleIds.includes(id))
                        : Array.from(new Set([...prev, ...visibleIds]))
                    );
                  }}
                  className="w-full text-left px-[8px] py-[6px] transition-colors"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: allSelected ? '#c8f7f0' : undefined,
                  }}
                  onMouseEnter={e => {
                    if (!allSelected) e.currentTarget.style.backgroundColor = '#d6f0ff';
                  }}
                  onMouseLeave={e => {
                    if (!allSelected) e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  <div className="flex items-center gap-[9px] pl-[3px]">
                    {allSelected
                      ? <CheckSquare className="flex-shrink-0 w-5 h-5 text-[#006cae]" strokeWidth={1.5} />
                      : <Square className="flex-shrink-0 w-5 h-5 text-[#868686]" strokeWidth={1.5} />
                    }
                    <SegmentIcon className="flex-shrink-0 w-6 h-6" />
                    <span className="text-[15px] leading-[1.5] text-[#3f3f3f]">All</span>
                  </div>
                </button>
              )}

              {visibleSegments.length > 0 ? (
                visibleSegments.map(segment => (
                  <SegmentRow
                    key={segment.id}
                    segment={segment}
                    selectedTags={selectedTags}
                    showChannelChips={showChannelChips}
                    showProfileCount={showProfileCount}
                    selected={selectedSegments.includes(segment.id)}
                    query={q}
                    highlightMatches={highlightMatches}
                    onToggle={() => {
                      setSelectedSegments(prev =>
                        prev.includes(segment.id)
                          ? prev.filter(id => id !== segment.id)
                          : [...prev, segment.id]
                      );
                    }}
                  />
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-[20px] font-bold text-gray-400">No segments match your filters</p>
                  {(query || selectedTags.length > 0) && (
                    <button
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => { setSelectedTags([]); setQuery(''); }}
                      className="mt-1.5 text-xs text-[#3f3f3f] hover:text-[#006cae] font-medium underline transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
        {/* Sticky footer */}
        <div className="flex-shrink-0 bg-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
          {/* Divider */}
          <div className="flex items-center pb-[8px] w-full">
            <div className="bg-[#e7e7e7] flex-1 h-px" />
          </div>
          {/* Manage links row */}
          <div className="flex items-center pr-[24px] py-[2px] flex-wrap">
            {[
              { label: 'Manage Segments', pl: 14 },
              { label: 'Manage Profiles',  pl: 16 },
              { label: 'Manage Page Groups', pl: 16 },
            ].map(link => (
              <div key={link.label} className="flex items-center pb-[5px]">
                <button
                  onMouseDown={e => e.preventDefault()}
                  className="inline-flex items-center gap-[5px] text-[#3f3f3f] hover:text-[#006cae] transition-colors"
                  style={{ paddingLeft: link.pl, paddingRight: 5 }}
                >
                  <span className="text-[15px] leading-[1.5] underline whitespace-nowrap">
                    {link.label}
                  </span>
                </button>
                <ExternalLink className="w-4 h-4 text-[#868686] flex-shrink-0" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      </div>

      {/* Selected segments stack (outside the dropdown drawer) */}
      {hasSelection && (
        <div className="w-full" style={{ fontFamily: "'Roboto', sans-serif" }}>
          {selectedSegmentObjects.map((segment, idx) => {
            const isLast = idx === selectedSegmentObjects.length - 1;
            return (
              <div
                key={segment.id}
                className={`bg-white flex items-center gap-2 px-[8px] py-[6px] ${isLast ? 'rounded-b-[4px]' : ''}`}
                style={{
                  border: '1px solid #bcbcbc',
                  marginBottom: isLast ? 0 : -1,
                }}
              >
                <SegmentIcon className="flex-shrink-0 w-6 h-6" />
                <span className="flex-1 min-w-0 text-[15px] leading-[1.5] text-[#3f3f3f] truncate">
                  {segment.name}{showProfileCount ? ` (${segment.profileCount})` : ''}
                </span>
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() =>
                    setSelectedSegments(prev => prev.filter(id => id !== segment.id))
                  }
                  aria-label={`Remove ${segment.name}`}
                  className="flex-shrink-0 text-[#868686] hover:text-[#006cae] transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
