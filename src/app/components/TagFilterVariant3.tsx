import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Tag as TagIcon } from 'lucide-react';

// Variant 3: Hierarchical Tag Categories
// Best for: Organized tag taxonomy, grouped filtering
// Shows tags organized by categories with expand/collapse

interface Tag {
  id: string;
  name: string;
  category: string;
  color?: string;
}

interface TagCategory {
  id: string;
  name: string;
  icon?: string;
}

interface Segment {
  id: string;
  name: string;
  type: 'profile' | 'segment';
  tags: string[];
  description?: string;
}

const tagCategories: TagCategory[] = [
  { id: 'customer', name: 'Customer Type' },
  { id: 'status', name: 'Status' },
  { id: 'business', name: 'Business Unit' },
  { id: 'geography', name: 'Geography' },
];

const mockTags: Tag[] = [
  { id: '1', name: 'Premium', category: 'customer', color: '#FF9800' },
  { id: '2', name: 'Enterprise', category: 'customer', color: '#9C27B0' },
  { id: '3', name: 'Standard', category: 'customer', color: '#607D8B' },
  { id: '4', name: 'Trial', category: 'customer', color: '#FFC107' },
  { id: '5', name: 'Active', category: 'status', color: '#8BC34A' },
  { id: '6', name: 'Inactive', category: 'status', color: '#757575' },
  { id: '7', name: 'VIP', category: 'status', color: '#E91E63' },
  { id: '8', name: 'Marketing', category: 'business', color: '#4CAF50' },
  { id: '9', name: 'Sales', category: 'business', color: '#2196F3' },
  { id: '10', name: 'Support', category: 'business', color: '#00BCD4' },
  { id: '11', name: 'North America', category: 'geography', color: '#3F51B5' },
  { id: '12', name: 'Europe', category: 'geography', color: '#009688' },
  { id: '13', name: 'Asia Pacific', category: 'geography', color: '#795548' },
];

const mockSegments: Segment[] = [
  { id: '1', name: 'Premium North American Customers', type: 'segment', tags: ['1', '5', '11'], description: 'High-value NA market' },
  { id: '2', name: 'Trial Users - Marketing', type: 'segment', tags: ['4', '5', '8'], description: 'Marketing trial leads' },
  { id: '3', name: 'Enterprise VIP Accounts', type: 'profile', tags: ['2', '7', '9'], description: 'Top-tier enterprise clients' },
  { id: '4', name: 'European Sales Focus', type: 'segment', tags: ['9', '12', '5'], description: 'Active sales targets in EU' },
  { id: '5', name: 'Inactive Standard Users', type: 'profile', tags: ['6', '3'], description: 'Dormant standard accounts' },
  { id: '6', name: 'APAC Support Segments', type: 'profile', tags: ['10', '13', '5'], description: 'Support-focused APAC users' },
];

export default function TagFilterVariant3() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['customer', 'status']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const getTagsByCategory = (categoryId: string) => {
    return mockTags
      .filter(tag => tag.category === categoryId)
      .filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filteredSegments = mockSegments.filter(segment => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tagId => segment.tags.includes(tagId));
  });

  const selectedTagsData = mockTags.filter(tag => selectedTags.includes(tag.id));

  return (
    <div className="w-full max-w-3xl p-8">
      <h2 className="text-xl font-semibold mb-6">Variant 3: Hierarchical Tag Categories</h2>

      <div className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="text-gray-700">Select segment...</span>
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-1 ml-2">
                {selectedTagsData.slice(0, 3).map(tag => (
                  <span
                    key={tag.id}
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
                {selectedTags.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-white">
                    +{selectedTags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex">
              {/* Tag Categories (Left Panel) */}
              <div className="w-80 border-r border-gray-200 max-h-96 overflow-y-auto">
                {tagCategories.map(category => {
                  const categoryTags = getTagsByCategory(category.id);
                  const isExpanded = expandedCategories.includes(category.id);
                  const hasSelectedTags = categoryTags.some(tag => selectedTags.includes(tag.id));

                  return (
                    <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <span className={`text-sm font-medium ${hasSelectedTags ? 'text-blue-600' : 'text-gray-700'}`}>
                            {category.name}
                          </span>
                        </div>
                        {hasSelectedTags && (
                          <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
                            {categoryTags.filter(tag => selectedTags.includes(tag.id)).length}
                          </span>
                        )}
                      </button>

                      {isExpanded && categoryTags.length > 0 && (
                        <div className="bg-gray-50 px-4 py-2 space-y-1">
                          {categoryTags.map(tag => (
                            <label
                              key={tag.id}
                              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag.id)}
                                onChange={() => toggleTag(tag.id)}
                                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: tag.color }}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {tag.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Segments List (Right Panel) */}
              <div className="flex-1">
                <div className="p-3 border-b border-gray-200 bg-white sticky top-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {filteredSegments.length} Result{filteredSegments.length !== 1 ? 's' : ''}
                    </span>
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear filters
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
                      <TagIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No segments match the selected tags</p>
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
          <li>Excellent for large, organized tag sets (50+ tags)</li>
          <li>Reduces cognitive load by grouping related tags</li>
          <li>Easy to scan specific categories</li>
          <li>Visual hierarchy makes navigation intuitive</li>
        </ul>
        <h3 className="font-semibold text-sm mt-3 mb-2">Cons:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Requires predefined category structure</li>
          <li>More clicks to access tags in collapsed categories</li>
          <li>Takes more horizontal space</li>
        </ul>
      </div>
    </div>
  );
}
