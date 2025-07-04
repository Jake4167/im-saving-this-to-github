import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onEventClick, parties, categories }) => {
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

  return (
    <Card 
      className="mb-4 hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02] transform"
      style={{ borderLeftColor: getCategoryColor(event.type) }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 hover:text-blue-600 transition-colors">
              {event.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(event.date), 'MMMM d, yyyy')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getSignificanceColor(event.significance)}`} />
            <Badge variant="outline" style={{ borderColor: getCategoryColor(event.type), color: getCategoryColor(event.type) }}>
              {event.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-700 mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1 flex-wrap">
              {event.parties.slice(0, 3).map((party, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    backgroundColor: getPartyColor(party) + '20',
                    color: getPartyColor(party),
                    border: `1px solid ${getPartyColor(party)}40`
                  }}
                >
                  {party}
                </Badge>
              ))}
              {event.parties.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.parties.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          {event.relatedEvents.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ExternalLink className="w-3 h-3" />
              {event.relatedEvents.length} related
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/event/${event.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              View Full Page
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => onEventClick(event)}
            className="px-4"
          >
            Quick View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;