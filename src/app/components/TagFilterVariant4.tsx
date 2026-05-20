import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

// Variant 4: Combobox with Tag Autocomplete
// Best for: Keyboard-first users, quick filtering
// Type-ahead search with instant tag suggestions and filtering

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface Segment {
  id: string;
  name: string;
  type: 'profile' | 'segment';
  tags: string[];
  description?: string;
}

const mockTags: Tag[] = [
  { id: '1', name: 'Marketing', color: '#4CAF50' },
  { id: '2', name: 'Sales', color: '#2196F3' },
  { id: '3', name: 'Premium', color: '#FF9800' },
  { id: '4', name: 'Enterprise', color: '#9C27B0' },
  { id: '5', name: 'Trial', color: '#FFC107' },
  { id: '6', name: 'Active', color: '#8BC34A' },
  { id: '7', name: 'Inactive', color: '#757575' },
  { id: '8', name: 'VIP', color: '#E91E63' },
  { id: '9', name: 'Standard', color: '#607D8B' },
  { id: '10', name: 'Regional', color: '#00BCD4' },
  { id: '11', name: 'North America', color: '#3F51B5' },
  { id: '12', name: 'Europe', color: '#009688' },
  { id: '13', name: 'Asia Pacific', color: '#795548' },
];

const mockSegments: Segment[] = [
  { id: '1', name: 'High-Value Customers', type: 'segment', tags: ['1', '3', '8'], description: 'Customers with high lifetime value' },
  { id: '2', name: 'Trial Users', type: 'segment', tags: ['5', '6'], description: 'Users in trial period' },
  { id: '3', name: 'Enterprise Accounts', type: 'profile', tags: ['4', '8', '1'], description: 'Large enterprise customers' },
  { id: '4', name: 'Regional Sales Focus', type: 'segment', tags: ['2', '10'], description: 'Regional targeting' },
  { id: '5', name: 'Inactive Users', type: 'profile', tags: ['7'], description: 'Users who haven\'t logged in recently' },
  { id: '6', name: 'Standard Plan', type: 'profile', tags: ['9', '6'], description: 'Standard subscription tier' },
  { id: '7', name: 'North American Enterprise', type: 'segment', tags: ['11', '4', '8'], description: 'Enterprise in NA' },
  { id: '8', name: 'European Marketing', type: 'segment', tags: ['12', '1'], description: 'EU marketing focus' },
];

export default function TagFilterVariant4() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [mode, setMode] = useState<'tags' | 'segments'>('tags');
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedTags = mockTags
    .filter(tag => !selectedTags.includes(tag.id))
    .filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 8);

  const filteredSegments = mockSegments.filter(segment => {
    if (selectedTags.length === 0) {
      return segment.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchesTags = selectedTags.every(tagId => segment.tags.includes(tagId));
    const matchesSearch = segment.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const removeTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags(prev => [...prev, tagId]);
      setSearchQuery('');
      setHighlightedIndex(0);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'tags' && suggestedTags.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % suggestedTags.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + suggestedTags.length) % suggestedTags.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestedTags[highlightedIndex]) {
          addTag(suggestedTags[highlightedIndex].id);
        }
      }
    } else if (mode === 'segments' && filteredSegments.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % filteredSegments.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + filteredSegments.length) % filteredSegments.length);
      }
    }

    if (e.key === 'Backspace' && searchQuery === '' && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery, mode]);

  useEffect(() => {
    if (selectedTags.length > 0 || searchQuery) {
      setMode('segments');
    } else {
      setMode('tags');
    }
  }, [selectedTags, searchQuery]);

  return (
    <div className="w-full max-w-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">Variant 4: Combobox with Tag Autocomplete</h2>

      <div className="relative">
        {/* Combobox Input */}
        <div
          className={`w-full flex flex-wrap gap-2 items-center px-3 py-2 bg-white border-2 rounded transition-all ${
            isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          {selectedTags.map(tagId => {
            const tag = mockTags.find(t => t.id === tagId);
            return tag ? (
              <span
                key={tagId}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tagId);
                  }}
                  className="hover:bg-black/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ) : null;
          })}
          <div className="flex-1 flex items-center gap-2 min-w-[120px]">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder={selectedTags.length === 0 ? 'Type to filter by tags or segments...' : 'Add more tags or search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-sm text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            {mode === 'tags' && suggestedTags.length > 0 && (
              <div>
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Filter by tags
                  </span>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {suggestedTags.map((tag, index) => (
                    <button
                      key={tag.id}
                      onClick={() => addTag(tag.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        index === highlightedIndex
                          ? 'bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-sm text-gray-900">{tag.name}</span>
                      <kbd className="ml-auto px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded border border-gray-300">
                        Enter
                      </kbd>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'segments' && (
              <div>
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {filteredSegments.length} Segment{filteredSegments.length !== 1 ? 's' : ''}
                    </span>
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedTags([]);
                          setSearchQuery('');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {filteredSegments.length > 0 ? (
                    filteredSegments.map((segment, index) => (
                      <button
                        key={segment.id}
                        className={`w-full px-4 py-3 text-left transition-colors border-b border-gray-100 last:border-b-0 ${
                          index === highlightedIndex
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{segment.name}</span>
                              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                                {segment.type}
                              </span>
                            </div>
                            {segment.description && (
                              <p className="text-xs text-gray-600 mb-2">{segment.description}</p>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {segment.tags.map(tagId => {
                                const tag = mockTags.find(t => t.id === tagId);
                                return tag ? (
                                  <span
                                    key={tagId}
                                    className="text-xs px-2 py-0.5 rounded-full text-white"
                                    style={{ backgroundColor: tag.color }}
                                  >
                                    {tag.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No segments found</p>
                      <p className="text-xs mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Keyboard Hints */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">Enter</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="font-semibold text-sm mb-2">Pros:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Fastest interaction for keyboard users</li>
          <li>Combines tag filtering and segment search in one interface</li>
          <li>Minimal UI - no separate filter controls needed</li>
          <li>Autocomplete reduces typing and errors</li>
          <li>Works well with many tags - just type to narrow down</li>
        </ul>
        <h3 className="font-semibold text-sm mt-3 mb-2">Cons:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Less discoverable for mouse-only users</li>
          <li>Requires user to know (or guess) tag names</li>
          <li>Can feel cramped when many tags are selected</li>
        </ul>
      </div>
    </div>
  );
}
