import { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

// Variant 2: Sidebar Tag Filter
// Best for: Power users, detailed filtering, many tags
// Shows tags in a collapsible sidebar next to segments

interface Tag {
  id: string;
  name: string;
  color?: string;
  count?: number;
}

interface Segment {
  id: string;
  name: string;
  type: 'profile' | 'segment';
  tags: string[];
  description?: string;
}

const mockTags: Tag[] = [
  { id: '1', name: 'Marketing', color: '#4CAF50', count: 12 },
  { id: '2', name: 'Sales', color: '#2196F3', count: 8 },
  { id: '3', name: 'Premium', color: '#FF9800', count: 15 },
  { id: '4', name: 'Enterprise', color: '#9C27B0', count: 6 },
  { id: '5', name: 'Trial', color: '#FFC107', count: 20 },
  { id: '6', name: 'Active', color: '#8BC34A', count: 25 },
  { id: '7', name: 'Inactive', color: '#757575', count: 10 },
  { id: '8', name: 'VIP', color: '#E91E63', count: 5 },
  { id: '9', name: 'Standard', color: '#607D8B', count: 18 },
  { id: '10', name: 'Regional', color: '#00BCD4', count: 7 },
];

const mockSegments: Segment[] = [
  { id: '1', name: 'High-Value Customers', type: 'segment', tags: ['1', '3', '8'], description: 'Customers with high lifetime value' },
  { id: '2', name: 'Trial Users', type: 'segment', tags: ['5', '6'], description: 'Users in trial period' },
  { id: '3', name: 'Enterprise Accounts', type: 'profile', tags: ['4', '8', '1'], description: 'Large enterprise customers' },
  { id: '4', name: 'Regional Sales Focus', type: 'segment', tags: ['2', '10'], description: 'Regional targeting' },
  { id: '5', name: 'Inactive Users', type: 'profile', tags: ['7'], description: 'Users who haven\'t logged in recently' },
  { id: '6', name: 'Standard Plan', type: 'profile', tags: ['9', '6'], description: 'Standard subscription tier' },
];

export default function TagFilterVariant2() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const filteredTags = mockTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSegments = mockSegments.filter(segment => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tagId => segment.tags.includes(tagId));
  });

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="w-full max-w-4xl p-8">
      <h2 className="text-xl font-semibold mb-6">Variant 2: Sidebar Tag Filter</h2>

      <div className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Select segment...</span>
            {selectedTags.length > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="flex">
              {/* Sidebar Filters */}
              {showFilters && (
                <div className="w-64 border-r border-gray-200 bg-gray-50">
                  <div className="p-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">Filter Tags</span>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Hide
                      </button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 max-h-80 overflow-y-auto">
                    <div className="space-y-1">
                      {filteredTags.map(tag => (
                        <label
                          key={tag.id}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => toggleTag(tag.id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1 flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">
                              {tag.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{tag.count}</span>
                        </label>
                      ))}
                    </div>

                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="w-full mt-3 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-200 font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Segments List */}
              <div className="flex-1">
                <div className="p-3 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {filteredSegments.length} Segment{filteredSegments.length !== 1 ? 's' : ''}
                    </span>
                    {!showFilters && (
                      <button
                        onClick={() => setShowFilters(true)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Filter className="w-3.5 h-3.5" />
                        Show filters
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {filteredSegments.length > 0 ? (
                    filteredSegments.map(segment => (
                      <button
                        key={segment.id}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
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
                      <Filter className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No segments match the selected filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="font-semibold text-sm mb-2">Pros:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Scalable to 50+ tags with scrolling sidebar</li>
          <li>Dedicated space for filters doesn't interfere with content</li>
          <li>Shows tag counts for better context</li>
          <li>Can collapse sidebar to maximize segment viewing area</li>
        </ul>
        <h3 className="font-semibold text-sm mt-3 mb-2">Cons:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Requires wider dropdown to accommodate sidebar</li>
          <li>Extra click to show/hide filters</li>
        </ul>
      </div>
    </div>
  );
}
