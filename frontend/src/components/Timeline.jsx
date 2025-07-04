import React, { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Calendar, TrendingUp, Users, BarChart3 } from 'lucide-react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import FilterSidebar from './FilterSidebar';
import { mockEvents, parties, categories } from '../data/mockEvents';

const Timeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParties, setSelectedParties] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSignificance, setSelectedSignificance] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesParties = selectedParties.length === 0 || 
                           event.parties.some(party => selectedParties.includes(party));
      
      const matchesCategories = selectedCategories.length === 0 || 
                               selectedCategories.includes(event.type);
      
      const matchesSignificance = selectedSignificance.length === 0 || 
                                selectedSignificance.includes(event.significance);
      
      return matchesSearch && matchesParties && matchesCategories && matchesSignificance;
    });
  }, [searchTerm, selectedParties, selectedCategories, selectedSignificance]);

  const stats = useMemo(() => {
    return {
      totalEvents: mockEvents.length,
      highSignificance: mockEvents.filter(e => e.significance === 'high').length,
      partiesInvolved: [...new Set(mockEvents.flatMap(e => e.parties))].length,
      categoriesCount: categories.length
    };
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRelatedEventClick = (event) => {
    setSelectedEvent(event);
    // Modal stays open, just changes content
  };

  const handlePartyToggle = (partyName) => {
    setSelectedParties(prev => 
      prev.includes(partyName) 
        ? prev.filter(p => p !== partyName)
        : [...prev, partyName]
    );
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSignificanceToggle = (significanceLevel) => {
    setSelectedSignificance(prev => 
      prev.includes(significanceLevel) 
        ? prev.filter(s => s !== significanceLevel)
        : [...prev, significanceLevel]
    );
  };

  const handleClearFilters = () => {
    setSelectedParties([]);
    setSelectedCategories([]);
    setSelectedSignificance([]);
    setSearchTerm('');
  };

  const totalFilters = selectedParties.length + selectedCategories.length + selectedSignificance.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Democratic Sim Wiki
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive timeline of political events, elections, legislation, and party formations 
            from January 2025 to July 2025 in the Democratic Simulation.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.highSignificance}</div>
              <div className="text-sm text-gray-600">High Significance</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.partiesInvolved}</div>
              <div className="text-sm text-gray-600">Parties Involved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.categoriesCount}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search events, parties, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 rounded-xl"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              parties={parties}
              categories={categories}
              selectedParties={selectedParties}
              selectedCategories={selectedCategories}
              selectedSignificance={selectedSignificance}
              onPartyToggle={handlePartyToggle}
              onCategoryToggle={handleCategoryToggle}
              onSignificanceToggle={handleSignificanceToggle}
              onClearFilters={handleClearFilters}
              totalFilters={totalFilters}
            />
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Timeline of Events
              </h2>
              <Badge variant="outline" className="text-sm">
                {filteredEvents.length} events
              </Badge>
            </div>
            
            {filteredEvents.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No events found</h3>
                    <p>Try adjusting your search terms or filters</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEventClick={handleEventClick}
                    parties={parties}
                    categories={categories}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRelatedEventClick={handleRelatedEventClick}
          allEvents={mockEvents}
          parties={parties}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Timeline;