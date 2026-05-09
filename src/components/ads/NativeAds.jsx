
import React from 'react';
import AdUnit from './AdUnit';

const NativeAds = ({ className }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <AdUnit
        format="fluid"
        layoutKey="-fb+5w+4e-db+86" // Example native layout key
        slotId="native-slot-id"
        className="min-h-[120px]"
        label="Contenido Patrocinado"
      />
    </div>
  );
};

export default NativeAds;
