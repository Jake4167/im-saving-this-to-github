import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Filter, X } from 'lucide-react';

const FilterSidebar = ({ 
  parties, 
  categories, 
  selectedParties, 
  selectedCategories,
  selectedSignificance,
  onPartyToggle, 
  onCategoryToggle,
  onSignificanceToggle,
  onClearFilters,
  totalFilters 
}) => {
  const significanceLevels = [
    { id: 'high', name: 'High', color: 'bg-red-500' },
    { id: 'medium', name: 'Medium', color: 'bg-yellow-500' },
    { id: 'low', name: 'Low', color: 'bg-green-500' }
  ];

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {totalFilters > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear ({totalFilters})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryToggle(category.id)}
                />
                <label 
                  htmlFor={category.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Significance */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Significance</h3>
          <div className="space-y-2">
            {significanceLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <Checkbox
                  id={level.id}
                  checked={selectedSignificance.includes(level.id)}
                  onCheckedChange={() => onSignificanceToggle(level.id)}
                />
                <label 
                  htmlFor={level.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  {level.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Parties</h3>
          <div className="space-y-2">
            {parties.map((party) => (
              <div key={party.id} className="flex items-center space-x-2">
                <Checkbox
                  id={party.id}
                  checked={selectedParties.includes(party.name)}
                  onCheckedChange={() => onPartyToggle(party.name)}
                />
                <label 
                  htmlFor={party.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: party.color }}
                  />
                  {party.name}
                  {party.status === 'dissolved' && (
                    <Badge variant="secondary" className="text-xs">
                      Dissolved
                    </Badge>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;