import React, { useState, useEffect } from 'react';
import { Map, Navigation, Clock, DollarSign, Compass, PlaneTakeoff } from 'lucide-react';

// We'll replace this with data loaded from the JSON file
const defaultCityGraph = {
  "Royal Capital": {
    "Thornefield": { 
      distance: 100, 
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'airship-ederia'] 
    },
    "Port Haven": { 
      distance: 150, 
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'ship-shared', 'ship-private', 'airship-ederia'] 
    },
    "Drakemoor Hold": { 
      distance: 120, 
      modes: ['caravan', 'airship-ederia'] 
    },
    "Astralor Academy": {
      distance: 80,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'airship-ederia']
    }
  },
  "Thornefield": {
    "Royal Capital": { 
      distance: 100, 
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'airship-ederia'] 
    },
    "Forest Outpost": { 
      distance: 75, 
      modes: ['caravan'] 
    },
    "Crossroads Inn": { 
      distance: 50, 
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st'] 
    }
  },
  "Port Haven": {
    "Royal Capital": {
      distance: 150,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'ship-shared', 'ship-private', 'airship-ederia']
    },
    "Veltaris Harbor": {
      distance: 120,
      modes: ['caravan', 'ship-shared', 'ship-private']
    },
    "Eastern Shores": {
      distance: 200,
      modes: ['ship-shared', 'ship-private']
    }
  },
  "Drakemoor Hold": {
    "Royal Capital": {
      distance: 120,
      modes: ['caravan', 'airship-ederia']
    },
    "Mountain Pass": {
      distance: 80,
      modes: ['caravan']
    }
  },
  "Astralor Academy": {
    "Royal Capital": {
      distance: 80,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st', 'airship-ederia']
    },
    "Arcane Outpost": {
      distance: 100,
      modes: ['caravan', 'airship-ederia']
    }
  },
  "Forest Outpost": {
    "Thornefield": {
      distance: 75,
      modes: ['caravan']
    }
  },
  "Crossroads Inn": {
    "Thornefield": {
      distance: 50,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st']
    },
    "Trade Junction": {
      distance: 60,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st']
    }
  },
  "Veltaris Harbor": {
    "Port Haven": {
      distance: 120,
      modes: ['caravan', 'ship-shared', 'ship-private']
    },
    "Coastal Fortress": {
      distance: 70,
      modes: ['caravan', 'ship-shared', 'ship-private']
    }
  },
  "Eastern Shores": {
    "Port Haven": {
      distance: 200,
      modes: ['ship-shared', 'ship-private']
    }
  },
  "Mountain Pass": {
    "Drakemoor Hold": {
      distance: 80,
      modes: ['caravan']
    },
    "Border Crossing": {
      distance: 100,
      modes: ['caravan']
    }
  },
  "Arcane Outpost": {
    "Astralor Academy": {
      distance: 100,
      modes: ['caravan', 'airship-ederia']
    }
  },
  "Trade Junction": {
    "Crossroads Inn": {
      distance: 60,
      modes: ['caravan', 'ryanite-rail-standard', 'ryanite-rail-1st']
    }
  },
  "Coastal Fortress": {
    "Veltaris Harbor": {
      distance: 70,
      modes: ['caravan', 'ship-shared', 'ship-private']
    }
  },
  "Border Crossing": {
    "Mountain Pass": {
      distance: 100,
      modes: ['caravan']
    }
  }
};

// Helper functions for route calculations
function getTransportSpeed(transportMode, travelData) {
  if (!travelData || !travelData.travel) return 24; // Default to caravan speed if travelData isn't available
  
  let modeData = null;
  
  // Search in standard travel options
  if (travelData.travel.standard) {
    for (const item of travelData.travel.standard) {
      if (item.id === transportMode) {
        modeData = item;
        break;
      }
    }
  }
  
  // Search in premium travel options if not found
  if (!modeData && travelData.travel.premium) {
    for (const item of travelData.travel.premium) {
      if (item.id === transportMode) {
        modeData = item;
        break;
      }
    }
  }
  
  if (!modeData || !modeData.speed) return 24; // Default to caravan speed
  
  // Extract numeric value from speed string
  const speedMatch = modeData.speed.match(/(\d+)/);
  return speedMatch ? parseInt(speedMatch[1]) : 24;
}

// Helper function to get the distance for a specific mode between two cities
function getDistance(fromCity, toCity, mode, cityGraph) {
  if (!cityGraph[fromCity] || !cityGraph[fromCity][toCity]) {
    return null; // No direct connection
  }
  
  const connection = cityGraph[fromCity][toCity];
  
  // Check if the connection has mode-specific distances
  if (connection.modes && typeof connection.modes === 'object' && !Array.isArray(connection.modes)) {
    // New format with mode-specific distances
    if (connection.modes[mode] && connection.modes[mode].distance) {
      return connection.modes[mode].distance;
    }
    
    // Mode not available for this route
    return null;
  } else if (connection.modes && Array.isArray(connection.modes)) {
    // Old format with a single distance for all modes
    if (connection.modes.includes(mode)) {
      return connection.distance;
    }
    
    // Mode not available for this route
    return null;
  }
  
  // Invalid connection format
  return null;
}

function calculateSegmentCost(transportMode, distance, travelData, playerCount) {
  if (!travelData || !travelData.travel) return 0; // Return 0 if travelData isn't available
  
  let modeData = null;
  
  // Search in standard travel options
  if (travelData.travel.standard) {
    for (const item of travelData.travel.standard) {
      if (item.id === transportMode) {
        modeData = item;
        break;
      }
    }
  }
  
  // Search in premium travel options if not found
  if (!modeData && travelData.travel.premium) {
    for (const item of travelData.travel.premium) {
      if (item.id === transportMode) {
        modeData = item;
        break;
      }
    }
  }
  
  if (!modeData) return 0;
  
  const speed = getTransportSpeed(transportMode, travelData);
  const daysRequired = distance / speed;
  
  let cost = 0;
  const costUnit = modeData.costUnit || '';
  
  // Convert silver to gold for calculations
  let baseCost = modeData.cost || 0;
  if (costUnit.includes('silver')) {
    baseCost = baseCost / 20; // 20 silver = 1 gold
  }
  
  // Calculate based on cost structure
  if (costUnit.includes('/day') && !costUnit.includes('/person')) {
    cost = baseCost * daysRequired;
  } else if (costUnit.includes('/week')) {
    cost = baseCost * Math.ceil(daysRequired / 7);
  } else if (costUnit.includes('/person/day')) {
    cost = baseCost * playerCount * daysRequired;
  } else if (costUnit.includes('/person/week')) {
    cost = baseCost * playerCount * Math.ceil(daysRequired / 7);
  } else {
    // Flat rate
    cost = baseCost;
  }
  
  return cost;
}

function getMaxSpeed(modes, travelData) {
  let maxSpeed = 0;
  
  for (const mode of modes) {
    const speed = getTransportSpeed(mode, travelData);
    if (speed > maxSpeed) {
      maxSpeed = speed;
    }
  }
  
  return maxSpeed || 24; // Default to caravan speed if no modes available
}

// Helper function to get all available modes between two cities
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

function getMinCost(modes, distance, travelData, playerCount) {
  let minCost = Infinity;
  
  for (const mode of modes) {
    const cost = calculateSegmentCost(mode, distance, travelData, playerCount);
    if (cost < minCost) {
      minCost = cost;
    }
  }
  
  return minCost === Infinity ? 0 : minCost;
}

// Dijkstra's algorithm for finding shortest path
function findShortestPath(graph, start, end, transportMode, optimize, travelData, playerCount) {
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  const bestModes = {}; // Track best transport mode for each segment
  
  for (const city in graph) {
    distances[city] = city === start ? 0 : Infinity;
    previous[city] = null;
    unvisited.add(city);
    bestModes[city] = {};
  }
  
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current = null;
    let smallestDistance = Infinity;
    
    for (const city of unvisited) {
      if (distances[city] < smallestDistance) {
        smallestDistance = distances[city];
        current = city;
      }
    }
    
    // If we've reached the end or there's no path, break
    if (current === end || current === null || distances[current] === Infinity) {
      break;
    }
    
    unvisited.delete(current);
    
    // Check all neighbors of the current node
    for (const neighbor in graph[current]) {
      let availableModes;
      
      // Get available modes for this connection based on connection format
      availableModes = getAvailableModes(current, neighbor, graph);
      
      // Skip if transport mode specified and not available for this route
      if (transportMode && !availableModes.includes(transportMode)) {
        continue;
      }
      
      // Skip if there are no valid transport modes
      if (availableModes.length === 0) {
        continue;
      }
      
      let edgeWeight;
      let bestMode = transportMode;
      let routeDistance;
      
      if (optimize === 'time') {
        if (transportMode) {
          // Use the specified transport mode
          routeDistance = getDistance(current, neighbor, transportMode, graph);
          if (routeDistance === null) continue; // Skip if mode not available
          
          const speed = getTransportSpeed(transportMode, travelData);
          edgeWeight = routeDistance / speed;
        } else {
          // Find fastest mode available for this segment
          let fastestTime = Infinity;
          
          for (const mode of availableModes) {
            const distance = getDistance(current, neighbor, mode, graph);
            if (distance === null) continue; // Skip if distance not available
            
            const speed = getTransportSpeed(mode, travelData);
            const time = distance / speed;
            
            if (time < fastestTime) {
              fastestTime = time;
              bestMode = mode;
              routeDistance = distance;
            }
          }
          
          if (fastestTime === Infinity) continue; // Skip if no valid mode found
          edgeWeight = fastestTime;
        }
      } else if (optimize === 'cost') {
        if (transportMode) {
          // Use the specified transport mode
          routeDistance = getDistance(current, neighbor, transportMode, graph);
          if (routeDistance === null) continue; // Skip if mode not available
          
          edgeWeight = calculateSegmentCost(
            transportMode, 
            routeDistance, 
            travelData, 
            playerCount
          );
        } else {
          // Find cheapest mode available for this segment
          let cheapestCost = Infinity;
          
          for (const mode of availableModes) {
            const distance = getDistance(current, neighbor, mode, graph);
            if (distance === null) continue; // Skip if distance not available
            
            const cost = calculateSegmentCost(
              mode, 
              distance, 
              travelData, 
              playerCount
            );
            
            if (cost < cheapestCost) {
              cheapestCost = cost;
              bestMode = mode;
              routeDistance = distance;
            }
          }
          
          if (cheapestCost === Infinity) continue; // Skip if no valid mode found
          edgeWeight = cheapestCost;
        }
      } else if (optimize === 'comfort') {
        // For comfort, we'll prefer 1st class options and airships
        // This is a simple heuristic - could be refined based on actual comfort metrics
        const comfortRanking = {
          'airship-ederia': 5,
          'airship-bordering': 5,
          'airship-distant': 5,
          'ryanite-rail-1st': 4,
          'ship-private': 4,
          'expedited-rail': 3,
          'ryanite-rail-standard': 2,
          'ship-shared': 2,
          'caravan': 1,
          'swift-rider': 1
        };
        
        if (transportMode) {
          // We're still optimizing for time, but with the specified comfortable mode
          routeDistance = getDistance(current, neighbor, transportMode, graph);
          if (routeDistance === null) continue; // Skip if mode not available
          
          const speed = getTransportSpeed(transportMode, travelData);
          edgeWeight = routeDistance / speed;
        } else {
          // Find most comfortable mode available
          let mostComfortable = 0;
          let comfortTime = Infinity;
          
          for (const mode of availableModes) {
            const comfortLevel = comfortRanking[mode] || 0;
            const distance = getDistance(current, neighbor, mode, graph);
            if (distance === null) continue; // Skip if distance not available
            
            const speed = getTransportSpeed(mode, travelData);
            const time = distance / speed;
            
            // Prioritize comfort, but use time as a tiebreaker
            if (comfortLevel > mostComfortable || (comfortLevel === mostComfortable && time < comfortTime)) {
              mostComfortable = comfortLevel;
              comfortTime = time;
              bestMode = mode;
              routeDistance = distance;
            }
          }
          
          if (comfortTime === Infinity) continue; // Skip if no valid mode found
          edgeWeight = comfortTime; // Still optimize for time among the most comfortable options
        }
      }
      
      // Skip if we couldn't find a valid route
      if (edgeWeight === undefined || routeDistance === undefined) {
        continue;
      }
      
      const totalWeight = distances[current] + edgeWeight;
      
      if (totalWeight < distances[neighbor]) {
        distances[neighbor] = totalWeight;
        previous[neighbor] = current;
        bestModes[current][neighbor] = {
          mode: bestMode,
          distance: routeDistance
        };
      }
    }
  }
  
  // Reconstruct the path and gather segment details
  const path = [];
  const segments = [];
  let current = end;
  
  while (current !== null && previous[current] !== null) {
    const prev = previous[current];
    path.unshift(current);
    
    // Get the best mode and distance for this segment
    const modeInfo = bestModes[prev][current];
    
    if (modeInfo) {
      // Add segment details
      segments.unshift({
        from: prev,
        to: current,
        distance: modeInfo.distance,
        mode: modeInfo.mode
      });
    }
    
    current = prev;
  }
  
  if (current === start) {
    path.unshift(start);
  }
  
  return {
    path,
    segments,
    weight: distances[end],
    valid: distances[end] !== Infinity && path.includes(end) && path.includes(start)
  };
}

function calculateTotalTravelTime(segments, travelData) {
  let totalTime = 0;
  
  for (const segment of segments) {
    const speed = getTransportSpeed(segment.mode, travelData);
    totalTime += segment.distance / speed;
  }
  
  return totalTime;
}

function calculateTotalCost(segments, travelData, playerCount) {
  let totalCost = 0;
  
  for (const segment of segments) {
    totalCost += calculateSegmentCost(
      segment.mode,
      segment.distance,
      travelData,
      playerCount
    );
  }
  
  return totalCost;
}

function RoutePlanner({ travelData = {}, playerCount = 1, addToCart }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [prioritize, setPrioritize] = useState('time');
  const [route, setRoute] = useState(null);
  const [cityGraph, setCityGraph] = useState(defaultCityGraph);
  
  // Load travel times data from JSON file
  useEffect(() => {
    const loadTravelData = async () => {
      try {
        // Use PUBLIC_URL to create the correct path
        const response = await fetch(`${process.env.PUBLIC_URL}/data/travel-times.json`);
        if (!response.ok) {
          console.warn('Could not load travel times from /data. Status:', response.status);
          console.log('Using default city graph data');
          return;
        }
        
        const data = await response.json();
        setCityGraph(data);
        console.log('Loaded travel times from /data directory');
      } catch (error) {
        console.error('Error loading travel times data:', error);
        console.log('Using default city graph data');
      }
    };
    
    loadTravelData();
  }, []);
  
  const cities = Object.keys(cityGraph);
  
  const calculateRoute = () => {
    if (!origin || !destination) return;
    
    const result = findShortestPath(
      cityGraph, 
      origin, 
      destination, 
      transportMode, 
      prioritize,
      travelData,
      playerCount
    );
    
    if (result.valid) {
      const totalTime = calculateTotalTravelTime(result.segments, travelData);
      const totalCost = calculateTotalCost(result.segments, travelData, playerCount);
      
      setRoute({
        ...result,
        totalTime,
        totalCost
      });
    } else {
      setRoute(result);
    }
  };
  
  // Get available transport modes between all cities
  const getAvailableTransportModes = () => {
    if (!origin || !destination) return [];
    
    // Get all available modes across all cities
    const allModes = new Set();
    
    // Helper function to check connection format and extract modes
    const extractModes = (connection) => {
      if (!connection) return [];
      
      if (connection.modes && typeof connection.modes === 'object' && !Array.isArray(connection.modes)) {
        // New format with mode-specific distances
        return Object.keys(connection.modes);
      } else if (connection.modes && Array.isArray(connection.modes)) {
        // Old format with a single distance for all modes
        return connection.modes;
      }
      
      return [];
    };
    
    // If cities are directly connected
    if (cityGraph[origin] && cityGraph[origin][destination]) {
      return extractModes(cityGraph[origin][destination]);
    }
    
    // For non-direct connections, return all possible transport modes
    for (const city in cityGraph) {
      for (const neighbor in cityGraph[city]) {
        const modes = extractModes(cityGraph[city][neighbor]);
        modes.forEach(mode => allModes.add(mode));
      }
    }
    
    return Array.from(allModes);
  };
  
  // Filter transport modes that are available for the selected route
  const availableTransportModes = getAvailableTransportModes();
  
  useEffect(() => {
    // Reset route when inputs change
    setRoute(null);
  }, [origin, destination, transportMode, prioritize]);
  
  // Helper function to format time in days and hours
  const formatTime = (days) => {
    const wholeDays = Math.floor(days);
    const hours = Math.round((days - wholeDays) * 24);
    
    if (wholeDays > 0 && hours > 0) {
      return `${wholeDays} day${wholeDays !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (wholeDays > 0) {
      return `${wholeDays} day${wholeDays !== 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
  };
  
  // Helper function to format cost as gold/silver
  const formatCost = (cost) => {
    const gold = Math.floor(cost);
    const silver = Math.round((cost - gold) * 20);
    
    if (gold > 0 && silver > 0) {
      return `${gold} gold, ${silver} silver`;
    } else if (gold > 0) {
      return `${gold} gold`;
    } else {
      return `${silver} silver`;
    }
  };
  
  // Add all transportation in the route to cart
  const addRouteToCart = () => {
    if (!route || !route.valid || !travelData || !travelData.travel) return;
    
    // Add each segment's transport mode to the cart
    route.segments.forEach(segment => {
      // Find the transport item in travelData
      const standardModes = travelData.travel.standard || [];
      const premiumModes = travelData.travel.premium || [];
      const allTransportItems = [
        ...standardModes,
        ...premiumModes
      ];
      
      const transportItem = allTransportItems.find(item => item && item.id === segment.mode);
      
      if (transportItem && addToCart) {
        // Calculate days based on segment
        const speed = getTransportSpeed(segment.mode, travelData);
        const days = Math.ceil(segment.distance / speed);
        
        // Create a modified item with segment info
        const itemWithSegment = {
          ...transportItem,
          segmentInfo: `${segment.from} → ${segment.to} (${segment.distance} miles)`
        };
        
        // Add to cart with the calculated days
        addToCart(itemWithSegment);
      }
    });
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border-2 border-amber-600 shadow-lg">
      <h2 className="text-2xl font-bold text-amber-400 mb-5 flex items-center">
        <Navigation className="mr-3" size={24} />
        Ederian Route Planner
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-base text-amber-300 mb-2 font-medium">Origin:</label>
          <select 
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            <option value="">Select origin city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-base text-amber-300 mb-2 font-medium">Destination:</label>
          <select 
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Select destination city</option>
            {cities.filter(city => city !== origin).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-5">
        <label className="block text-base text-amber-300 mb-2 font-medium">Prioritize:</label>
        <div className="flex flex-wrap gap-3">
          <button 
            className={`px-4 py-2 rounded-md flex items-center text-base font-medium ${prioritize === 'time' ? 'bg-amber-600 text-white border-2 border-amber-400' : 'bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600'}`}
            onClick={() => setPrioritize('time')}
          >
            <Clock size={18} className="mr-2" />
            Fastest
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center text-base font-medium ${prioritize === 'cost' ? 'bg-amber-600 text-white border-2 border-amber-400' : 'bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600'}`}
            onClick={() => setPrioritize('cost')}
          >
            <DollarSign size={18} className="mr-2" />
            Cheapest
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center text-base font-medium ${prioritize === 'comfort' ? 'bg-amber-600 text-white border-2 border-amber-400' : 'bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600'}`}
            onClick={() => setPrioritize('comfort')}
          >
            <Compass size={18} className="mr-2" />
            Most Comfortable
          </button>
        </div>
      </div>
      
      <div className="mb-5">
        <label className="block text-base text-amber-300 mb-2 font-medium">Transport Mode (Optional):</label>
        <select 
          className="w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none"
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
        >
          <option value="">Any available mode</option>
          {availableTransportModes.map(mode => {
            // Safely access travel data with null checks
            const standardModes = travelData?.travel?.standard || [];
            const premiumModes = travelData?.travel?.premium || [];
            const modeData = [...standardModes, ...premiumModes]
              .find(item => item && item.id === mode);
            
            return modeData ? (
              <option key={mode} value={mode}>
                {modeData.name} ({modeData.speed})
              </option>
            ) : (
              <option key={mode} value={mode}>{mode}</option>
            );
          })}
        </select>
      </div>
      
      <button 
        className="w-full bg-amber-500 hover:bg-amber-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center text-black text-lg shadow-md transition-colors duration-200"
        onClick={calculateRoute}
        disabled={!origin || !destination}
      >
        <Map size={20} className="mr-2" />
        Calculate Route
      </button>
      
      
      {route && route.valid && (
        <div className="mt-6 p-5 bg-gray-900 rounded-lg border-2 border-amber-700">
          <h3 className="text-xl font-bold text-amber-400 mb-3">Route Details</h3>
          
          <div className="space-y-3 mb-5">
            <div className="text-lg">
              <span className="text-amber-300 font-medium">Path: </span>
              <span className="text-white">{route.path.join(" → ")}</span>
            </div>
            
            <div className="text-lg">
              <span className="text-amber-300 font-medium">Total Distance: </span>
              <span className="text-white">{route.segments.reduce((total, segment) => total + segment.distance, 0)} miles</span>
            </div>
            
            <div className="text-lg">
              <span className="text-amber-300 font-medium">Total Travel Time: </span>
              <span className="text-white">{formatTime(route.totalTime)}</span>
            </div>
            
            <div className="text-lg">
              <span className="text-amber-300 font-medium">Estimated Cost: </span>
              <span className="text-white">{formatCost(route.totalCost)}</span>
            </div>
          </div>
          
          {route.segments && route.segments.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-3">Segment Details</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 pb-1">
                {route.segments.map((segment, index) => {
                  // Safely access travel data with null checks
                  const standardModes = travelData?.travel?.standard || [];
                  const premiumModes = travelData?.travel?.premium || [];
                  const modeData = [...standardModes, ...premiumModes]
                    .find(item => item && item.id === segment.mode);
                  
                  const speed = getTransportSpeed(segment.mode, travelData);
                  const segmentTime = segment.distance / speed;
                  const segmentCost = calculateSegmentCost(
                    segment.mode,
                    segment.distance,
                    travelData,
                    playerCount
                  );
                  
                  return (
                    <div key={index} className="bg-gray-800 p-4 rounded-md border border-gray-700">
                      <div className="flex justify-between text-base">
                        <span className="text-white font-medium">
                          {segment.from} → {segment.to}
                        </span>
                        <span className="text-amber-400 font-bold">
                          {segment.distance} miles
                        </span>
                      </div>
                      {modeData && (
                        <div className="mt-2">
                          <span className="text-white flex items-center text-base">
                            <span className="mr-2 text-xl">{modeData.image}</span> 
                            <span className="font-medium">{modeData.name}</span> <span className="ml-2 text-gray-300">({modeData.speed})</span>
                          </span>
                          <div className="flex justify-between text-sm mt-2 text-gray-200">
                            <span><span className="text-amber-300">Time:</span> {formatTime(segmentTime)}</span>
                            <span><span className="text-amber-300">Cost:</span> {formatCost(segmentCost)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {addToCart && (
            <button
              className="w-full mt-5 bg-gray-700 hover:bg-gray-600 font-bold py-3 rounded-lg flex items-center justify-center text-white text-base border border-gray-500 transition-colors duration-200"
              onClick={addRouteToCart}
            >
              <PlaneTakeoff size={18} className="mr-2" />
              Add Travel Options to Cart
            </button>
          )}
        </div>
      )}
      
      {route && !route.valid && (
        <div className="mt-6 p-5 bg-gray-900 rounded-lg border-2 border-red-700 text-red-400 text-lg font-medium">
          No valid route found between these cities with the selected transport mode.
        </div>
      )}
    </div>
  );
}

export default RoutePlanner;