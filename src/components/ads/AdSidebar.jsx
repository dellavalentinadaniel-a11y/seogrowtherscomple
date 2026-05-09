
import React from 'react';
import AdUnit from './AdUnit';

const AdSidebar = () => {
  return (
    <div className="space-y-8 sticky top-24">
      {/* Primary Sidebar Ad - 300x600 (Wide Skyscraper) */}
      <AdUnit 
        slotId="sidebar-primary-slot"
        width="300px"
        height="600px"
        className="hidden lg:flex"
        label="Publicidad Destacada"
        isHostinger={true}
      />
      
      {/* Secondary Sidebar Ad - 300x250 (Medium Rectangle) */}
      <AdUnit 
        slotId="sidebar-secondary-slot"
        width="300px"
        height="250px"
        className="hidden lg:flex"
      />
    </div>
  );
};

export default AdSidebar;
