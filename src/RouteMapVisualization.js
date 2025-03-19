import React, { useEffect, useRef } from 'react';

// Helper function to get available modes between two cities
function getAvailableModes(fromCity, toCity, cityGraph) {
  if (!cityGraph[fromCity] || !cityGraph[fromCity][toCity]) {
    return [];
  }
  
  const connection = cityGraph[fromCity][toCity];
  
  // Check connection format
  if (connection.modes && typeof connection.modes === 'object' && !Array.isArray(connection.modes)) {
    // New format with mode-specific distances
    return Object.keys(connection.modes);
  } else if (connection.modes && Array.isArray(connection.modes)) {
    // Old format with a single distance for all modes
    return connection.modes;
  }
  
  return [];
}

function RouteMapVisualization({ route, cityGraph }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!route || !route.valid || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(0, 0, width, height);
    
    // Create positions for all cities (simple circular layout)
    const cityPositions = {};
    const allCities = Object.keys(cityGraph);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2.5;
    
    // First position the cities in the route path in a line
    const routeCities = route.path;
    const segmentAngle = Math.PI * 1.5 / (routeCities.length - 1 || 1);
    let startAngle = Math.PI / 4;
    
    routeCities.forEach((city, index) => {
      const angle = startAngle + segmentAngle * index;
      cityPositions[city] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        inRoute: true
      };
    });
    
    // Position remaining cities randomly
    allCities.forEach(city => {
      if (!cityPositions[city]) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * (0.6 + Math.random() * 0.4);
        cityPositions[city] = {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          inRoute: false
        };
      }
    });
    
    // Draw connections between all cities
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4B5563';
    
    for (const city in cityGraph) {
      const fromPos = cityPositions[city];
      
      for (const neighbor in cityGraph[city]) {
        const toPos = cityPositions[neighbor];
        
        // Skip if this connection has no available modes
        const modes = getAvailableModes(city, neighbor, cityGraph);
        if (modes.length === 0) continue;
        
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.stroke();
      }
    }
    
    // Draw the route path with thicker lines and different color
    ctx.lineWidth = 4;
    
    for (let i = 0; i < route.segments.length; i++) {
      const segment = route.segments[i];
      const fromPos = cityPositions[segment.from];
      const toPos = cityPositions[segment.to];
      
      // Skip if positions aren't available
      if (!fromPos || !toPos) continue;
      
      // Color based on transport mode
      let strokeColor;
      switch (segment.mode) {
        case 'airship-ederia':
        case 'airship-bordering':
        case 'airship-distant':
          strokeColor = '#9333EA'; // Purple for airships
          break;
        case 'ryanite-rail-1st':
        case 'ryanite-rail-standard':
        case 'expedited-rail':
          strokeColor = '#2563EB'; // Blue for rail
          break;
        case 'ship-private':
        case 'ship-shared':
          strokeColor = '#0891B2'; // Cyan for ships
          break;
        case 'caravan':
          strokeColor = '#D97706'; // Amber for caravans
          break;
        case 'swift-rider':
          strokeColor = '#DC2626'; // Red for swift riders
          break;
        default:
          strokeColor = '#D97706'; // Default amber
      }
      
      ctx.strokeStyle = strokeColor;
      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      ctx.lineTo(toPos.x, toPos.y);
      ctx.stroke();
      
      // Draw a directional arrow
      const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
      const midX = (fromPos.x + toPos.x) / 2;
      const midY = (fromPos.y + toPos.y) / 2;
      
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(
        midX - 10 * Math.cos(angle - Math.PI / 6),
        midY - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        midX - 10 * Math.cos(angle + Math.PI / 6),
        midY - 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = strokeColor;
      ctx.fill();
    }
    
    // Draw cities
    for (const city in cityPositions) {
      const pos = cityPositions[city];
      
      // City dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, pos.inRoute ? 10 : 6, 0, Math.PI * 2);
      
      if (city === route.path[0]) {
        // Origin
        ctx.fillStyle = '#10B981'; // Green
        ctx.strokeStyle = '#FFFFFF'; // White border
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (city === route.path[route.path.length - 1]) {
        // Destination
        ctx.fillStyle = '#DC2626'; // Red
        ctx.strokeStyle = '#FFFFFF'; // White border
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (pos.inRoute) {
        // Cities in route
        ctx.fillStyle = '#F59E0B'; // Amber
      } else {
        // Other cities
        ctx.fillStyle = '#6B7280'; // Gray
      }
      
      ctx.fill();
      
      // City label
      ctx.font = pos.inRoute ? 'bold 14px sans-serif' : '12px sans-serif';
      ctx.fillStyle = pos.inRoute ? '#FFFFFF' : '#F3F4F6';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      
      // Add a subtle text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.fillText(city, pos.x, pos.y - 12);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    
    // Draw legend
    const legendY = height - 30;
    let legendX = 20;
    
    // Transport modes used in this route
    const modesUsed = new Set(route.segments.map(s => s.mode));
    
    if (modesUsed.has('airship-ederia') || modesUsed.has('airship-bordering') || modesUsed.has('airship-distant')) {
      ctx.fillStyle = '#9333EA';
      ctx.fillRect(legendX, legendY, 25, 4);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Airship', legendX + 30, legendY);
      legendX += 100;
    }
    
    if (modesUsed.has('ryanite-rail-1st') || modesUsed.has('ryanite-rail-standard') || modesUsed.has('expedited-rail')) {
      ctx.fillStyle = '#2563EB';
      ctx.fillRect(legendX, legendY, 25, 4);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Rail', legendX + 30, legendY);
      legendX += 100;
    }
    
    if (modesUsed.has('ship-private') || modesUsed.has('ship-shared')) {
      ctx.fillStyle = '#0891B2';
      ctx.fillRect(legendX, legendY, 25, 4);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Ship', legendX + 30, legendY);
      legendX += 100;
    }
    
    if (modesUsed.has('caravan')) {
      ctx.fillStyle = '#D97706';
      ctx.fillRect(legendX, legendY, 25, 4);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Caravan', legendX + 30, legendY);
      legendX += 100;
    }
    
    if (modesUsed.has('swift-rider')) {
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(legendX, legendY, 25, 4);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Swift Rider', legendX + 30, legendY);
    }
    
  }, [route, cityGraph]);
  
  return (
    <div className="mt-6 p-5 bg-gray-900 rounded-lg border-2 border-amber-700">
      <h3 className="text-xl font-bold text-amber-400 mb-3">Route Map</h3>
      <canvas 
        ref={canvasRef} 
        width={480} 
        height={320} 
        className="w-full h-auto rounded-md border border-gray-700"
      />
    </div>
  );
}

export default RouteMapVisualization;