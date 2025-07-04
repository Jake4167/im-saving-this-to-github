import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calendar, Users, ExternalLink, X } from 'lucide-react';
import { format } from 'date-fns';

const EventModal = ({ event, isOpen, onClose, onRelatedEventClick, allEvents, parties, categories }) => {
  if (!event) return null;

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
      allEvents.find(e => e.id === eventId)
    ).filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2 pr-8">
                {event.title}
              </DialogTitle>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(event.date), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSignificanceColor(event.significance)}`} />
                  <span className="text-sm capitalize">{event.significance} significance</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-2">
            <Badge 
              variant="outline" 
              className="text-sm"
              style={{ 
                borderColor: getCategoryColor(event.type), 
                color: getCategoryColor(event.type) 
              }}
            >
              {event.category}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Details</h3>
            <p className="text-gray-700 leading-relaxed">
              {event.details}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Associated Parties
            </h3>
            <div className="flex gap-2 flex-wrap">
              {event.parties.map((party, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
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
          </div>

          {getRelatedEvents().length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Related Events
              </h3>
              <div className="space-y-2">
                {getRelatedEvents().map((relatedEvent) => (
                  <Card 
                    key={relatedEvent.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                    style={{ borderLeftColor: getCategoryColor(relatedEvent.type) }}
                    onClick={() => onRelatedEventClick(relatedEvent)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1 hover:text-blue-600">
                            {relatedEvent.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(relatedEvent.date), 'MMM d, yyyy')}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {relatedEvent.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;