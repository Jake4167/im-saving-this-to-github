import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Users, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { mockEvents, parties, categories } from '../data/mockEvents';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timeline
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPartyColor = (partyName) => {
    const party = parties.find(p => p.name === partyName);
    return party ? party.color : '#6b7280';
  };

  const getCategoryColor = (categoryType) => {
    const category = categories.find(c => c.id === categoryType);
    return category ? category.color : '#6b7280';
  };

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRelatedEvents = () => {
    return event.relatedEvents.map(eventId => 
      mockEvents.find(e => e.id === eventId)
    ).filter(Boolean);
  };

  const getCurrentEventIndex = () => {
    return mockEvents.findIndex(e => e.id === id);
  };

  const getPreviousEvent = () => {
    const currentIndex = getCurrentEventIndex();
    return currentIndex > 0 ? mockEvents[currentIndex - 1] : null;
  };

  const getNextEvent = () => {
    const currentIndex = getCurrentEventIndex();
    return currentIndex < mockEvents.length - 1 ? mockEvents[currentIndex + 1] : null;
  };

  const previousEvent = getPreviousEvent();
  const nextEvent = getNextEvent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {event.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  {format(new Date(event.date), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSignificanceColor(event.significance)}`} />
                  <span className="text-sm capitalize font-medium">{event.significance} significance</span>
                </div>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="text-lg px-4 py-2"
              style={{ 
                borderColor: getCategoryColor(event.type), 
                color: getCategoryColor(event.type) 
              }}
            >
              {event.category}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Detailed Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {event.details}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Associated Parties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Associated Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {event.parties.map((party, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-sm px-3 py-1"
                      style={{ 
                        backgroundColor: getPartyColor(party) + '20',
                        color: getPartyColor(party),
                        border: `1px solid ${getPartyColor(party)}40`
                      }}
                    >
                      {party}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Events */}
            {getRelatedEvents().length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Related Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getRelatedEvents().map((relatedEvent) => (
                      <Link 
                        key={relatedEvent.id} 
                        to={`/event/${relatedEvent.id}`}
                        className="block"
                      >
                        <Card className="hover:shadow-md transition-shadow border-l-4 cursor-pointer"
                              style={{ borderLeftColor: getCategoryColor(relatedEvent.type) }}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-1 hover:text-blue-600">
                                  {relatedEvent.title}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(relatedEvent.date), 'MMM d, yyyy')}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {relatedEvent.category}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <p className="font-medium">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <p className="font-medium">{event.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Significance:</span>
                  <p className="font-medium capitalize">{event.significance}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Parties Involved:</span>
                  <p className="font-medium">{event.parties.length}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Related Events:</span>
                  <p className="font-medium">{event.relatedEvents.length}</p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {previousEvent && (
                  <Link to={`/event/${previousEvent.id}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Previous</div>
                        <div className="text-sm">{previousEvent.title}</div>
                      </div>
                    </Button>
                  </Link>
                )}
                
                {nextEvent && (
                  <Link to={`/event/${nextEvent.id}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Next</div>
                        <div className="text-sm">{nextEvent.title}</div>
                      </div>
                    </Button>
                  </Link>
                )}
                
                <Link to="/">
                  <Button className="w-full">
                    View All Events
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;