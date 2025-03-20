import React, { useState, useEffect } from 'react';
import { Scroll, ShoppingCart, Menu, X, ChevronRight, Minus, Plus, Info, Shield, Ship, Map, Home, Sparkles, Crown, Coffee } from 'lucide-react';
import './App.css';
import RoutePlanner from './RoutePlanner';
import RequisitionOrder from './RequisitionOrder';

function App() {
  // State management
  const [activeTab, setActiveTab] = useState('travel');
  const [activeCategory, setActiveCategory] = useState('standard');
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playerCount, setPlayerCount] = useState(5); // Default 5 player characters
  const [standardDaysEnabled, setStandardDaysEnabled] = useState(false);
  const [standardDays, setStandardDays] = useState(7); // Default 7 days
  const [showRequisition, setShowRequisition] = useState(false);
  
  // Data structure for all travel options and services
  const travelData = {
    travel: {
      standard: [
        { id: "caravan", name: "Caravan", speed: "24 miles/day", cost: 1, costUnit: "gold/person/day", notes: "Includes basic provisions and security", image: "🐪", perPerson: true },
        { id: "ryanite-rail-1st", name: "Ryanite Rail (1st class)", speed: "36 miles/day", cost: 2, costUnit: "gold/person/day", notes: "Operates only between major cities and settlements", image: "🚆", perPerson: true },
        { id: "ryanite-rail-standard", name: "Ryanite Rail (standard)", speed: "36 miles/day", cost: 5, costUnit: "silver/person/day", notes: "Operates only between major cities and settlements", image: "🚆", perPerson: true },
        { id: "ship-private", name: "Ship (private cabin)", speed: "48 miles/day", cost: 2, costUnit: "gold/person/day", notes: "Available only along coastal routes and major rivers", image: "🚢", perPerson: true },
        { id: "ship-shared", name: "Ship (shared quarters)", speed: "48 miles/day", cost: 5, costUnit: "silver/person/day", notes: "Available only along coastal routes and major rivers", image: "🚢", perPerson: true },
        { id: "airship-ederia", name: "Airship (within Ederia)", speed: "96 miles/day", cost: 3000, costUnit: "gold/day", notes: "Requires minimum 3-day advance booking through House Astralor representatives", image: "🛸" },
        { id: "airship-bordering", name: "Airship (bordering nations)", speed: "96 miles/day", cost: 6000, costUnit: "gold/day", notes: "Requires minimum 3-day advance booking through House Astralor representatives", image: "🛸" },
        { id: "airship-distant", name: "Airship (distant territories)", speed: "96 miles/day", cost: 9000, costUnit: "gold/day", notes: "Requires minimum 3-day advance booking through House Astralor representatives", image: "🛸" },
      ],
      premium: [
        { id: "expedited-rail", name: "Expedited Ryanite Rail", speed: "40 miles/day", cost: 5, costUnit: "gold/person/day", notes: "Priority boarding, private compartment, meals included, 10% speed increase", image: "🚅", perPerson: true },
        { id: "swift-rider", name: "Swift Rider Service", speed: "60 miles/day", cost: 10, costUnit: "gold/day", notes: "Relay of horses stationed every 20 miles, limited to 2 riders per route, available only on main roads", image: "🐎" },
        { id: "falcon-messenger", name: "House Falkrest Falcon Messenger", speed: "Varies", cost: 20, costUnit: "gold/message", notes: "Delivery of urgent sealed communications, reaches most destinations in Ederia within 1-2 days, limited to messages weighing less than 3 ounces", image: "🦅" },
      ]
    },
    security: {
      watch: [
        { id: "small-guard", name: "Small Guard Detachment", cost: 10, costUnit: "gold/day", notes: "1 Sergeant, 4 Watchmen", image: "👮", npcCount: 5 },
        { id: "medium-guard", name: "Medium Guard Detachment", cost: 18, costUnit: "gold/day", notes: "1 Lieutenant, 1 Sergeant, 8 Watchmen", image: "👮", npcCount: 10 },
        { id: "large-guard", name: "Large Guard Detachment", cost: 35, costUnit: "gold/day", notes: "1 Captain, 2 Sergeants, 17 Watchmen", image: "👮", npcCount: 20 },
      ],
      mercenary: [
        { id: "local-militia", name: "Local Militia", cost: 15, costUnit: "gold/day", notes: "20 fighters (varied training)", image: "⚔️", npcCount: 20 },
        { id: "registered-company", name: "Registered Company", cost: 40, costUnit: "gold/day", notes: "15 professional soldiers", image: "⚔️", npcCount: 15 },
        { id: "elite-company", name: "Elite Company", cost: 100, costUnit: "gold/day", notes: "10 veteran specialists", image: "⚔️", npcCount: 10 },
      ],
      
      potential: [
        { id: "silver-shields-info", name: "The Silver Shields", cost: 100, costUnit: "gold/day", notes: "Elite Company (10) - Specializes in personal protection and escort duties", image: "🛡️", isInfo: true },
        { id: "thornefield-info", name: "Thornefield Sentinels", cost: 40, costUnit: "gold/day", notes: "Registered Company (15) - Expert in rural and wilderness operations", image: "🌲", isInfo: true },
        { id: "shadow-riders-info", name: "Shadow Riders", cost: 40, costUnit: "gold/day", notes: "Registered Company (15) - Specialists in urban security and intelligence gathering", image: "🕵️", isInfo: true },
        { id: "veltaris-info", name: "Veltaris Mariners", cost: 100, costUnit: "gold/day", notes: "Elite Company (10) - Naval and coastal security operations", image: "⚓", isInfo: true },
      ],
      specialized: [
        { id: "wyvern-scout", name: "House Drakemoor Wyvern Scout", cost: 75, costUnit: "gold/day", notes: "Single Crownclaw Knight with wyvern mount, aerial reconnaissance and messaging, limited combat capability, 24-hour advance notice required", image: "🐉", npcCount: 1 },
        { id: "mage-warden", name: "House Astralor Mage-Warden", cost: 50, costUnit: "gold/day", notes: "Specialized arcane security, detects magical threats and provides countermeasures, can establish temporary wards for safe lodging", image: "🧙", npcCount: 1 },
      ]
    },
    provisions: {
      daily: [
        { id: "small-provisions", name: "Small Group Provisions", cost: 5, costUnit: "gold/day", notes: "For 5-10 people. Food, water, basic equipment maintenance", image: "🍖" },
        { id: "medium-provisions", name: "Medium Group Provisions", cost: 12, costUnit: "gold/day", notes: "For 11-25 people. Includes pack animals and spare equipment", image: "🍖" },
        { id: "large-provisions", name: "Large Group Provisions", cost: 30, costUnit: "gold/day", notes: "For 26-60 people. Includes field kitchen and medical supplies", image: "🍖" },
        { id: "huge-provisions", name: "Huge Group Provisions", cost: 60, costUnit: "gold/day", notes: "For 61-100 people. Includes dedicated logistics staff", image: "🍖" },
      ],
      specialized: [
        { id: "luxury-rations", name: "Luxury Rations", cost: 2, costUnit: "gold/person/day", notes: "Fine wines and spirits, fresh meats, variety of fruits and vegetables", image: "🍷" },
        { id: "expedition-package", name: "Extended Expedition Package", cost: 200, baseCost: true, additionalCost: 1, additionalCostUnit: "gold/person/day", notes: "Weatherproof tents, portable furniture, one month of preserved rations, medicine chest with healing potions", image: "⛺" },
      ]
    },
    accommodations: {
      lodging: [
        { id: "standard-inn", name: "Local Inn (standard)", cost: 5, costUnit: "silver/person/night", notes: "Private or shared room, basic meals", image: "🏨", perPerson: true },
        { id: "premium-inn", name: "Local Inn (premium)", cost: 2, costUnit: "gold/person/night", notes: "Private room, quality meals, bath services", image: "🏨", perPerson: true },
        { id: "noble-estate", name: "Noble Estate Hosting", cost: 30, costUnit: "gold/person", notes: "Luxury accommodations as guest of local nobility (Gift of 10-50 gold per person recommended)", image: "🏰", perPerson: true, customizablePrice: true, minPrice: 10, maxPrice: 50 },
        { id: "embassy", name: "Ederian Embassy", cost: 0, costUnit: "No direct cost", notes: "Available only in major cities or foreign capitals, full diplomatic services (requires royal authorization)", image: "🏛️" },
        { id: "encampment", name: "Field Encampment", cost: 5, costUnit: "gold/day (setup fee)", additionalCost: "plus provisions", notes: "Established by royal quartermasters, includes security perimeter", image: "⛺" },
      ],
      administrative: [
        { id: "chancery", name: "Mobile Chancery", cost: 25, costUnit: "gold/day", notes: "Includes 2 royal scribes, official seals and documentation, secure message handling", image: "📜" },
        { id: "herald", name: "Court Herald", cost: 10, costUnit: "gold/day", notes: "Makes official proclamations, arranges local meetings and audiences, manages protocol and ceremony", image: "📢" },
        { id: "investigator", name: "Royal Investigator", cost: 15, costUnit: "gold/day", notes: "Specializes in evidence gathering, legal authority to question subjects, trained in detection of falsehoods", image: "🔍" },
      ]
    },
    magical: {
      services: [
        { id: "arcane-lock", name: "Arcane Lock", cost: 25, costUnit: "gold/application", notes: "Secures documents or rooms against tampering", image: "🔒" },
        { id: "truth-serum", name: "Truth Serum", cost: 75, costUnit: "gold/dose", notes: "Compels truthful answers for 1 hour (resisted by strong will)", image: "⚗️" },
        { id: "scrying", name: "Location Scrying", cost: 150, costUnit: "gold/attempt", notes: "Attempts to locate specific person or object within 100 miles", image: "🔮" },
        { id: "weather", name: "Weather Prediction", cost: 40, costUnit: "gold", notes: "Accurate 3-day forecast for region", image: "☁️" },
      ]
    },
    special: {
      intelligence: [
        { id: "informants", name: "Local Informants", cost: 30, costUnit: "gold (average)", notes: "Market rumors and common knowledge, basic movements of notable figures, public sentiment reports", image: "👥" },
        { id: "spy-network", name: "Royal Spy Network", cost: 0, costUnit: "Requires approval", notes: "Detailed reports on political movements, identification of potential threats, access to existing agents in the field", image: "🕵️" },
      ],
      resources: [
        { id: "royal-seal", name: "Royal Seal Authority", cost: 0, costUnit: "N/A", notes: "Can requisition emergency resources, may command temporary service from any royal subject, grants access to secure locations", image: "👑" },
        { id: "gift-chest", name: "Royal Gift Chest", cost: 500, costUnit: "gold (average)", notes: "Curated selection of diplomatic gifts, includes Ederian luxury goods, customized to recipient's known preferences", image: "🎁" },
        { id: "banquet-fund", name: "Formal Banquet Fund", cost: 300, costUnit: "gold (average)", notes: "Finances to host local nobility or officials, includes entertainment and hospitality", image: "🍽️" },
        { id: "cartographer", name: "Royal Cartographer", cost: 20, costUnit: "gold/day", notes: "Updates and creates detailed maps, documents new discoveries or changes", image: "🗺️" },
        { id: "resupply", name: "House Thornefield Rapid Resupply", cost: 0, costUnit: "25% premium on provisions", notes: "Emergency food and supply delivery to remote locations", image: "📦" },
        { id: "blessing", name: "House Emberlyn Blessing Ritual", cost: 30, costUnit: "gold", notes: "Ceremonial blessing for missions or endeavors, increases morale of local supporters", image: "✨" },
      ]
    }
  };

  // Tab data for navigation
  const tabs = [
    { id: 'travel', label: 'Travel Options', icon: <Map size={20} />, categories: ['standard', 'premium'] },
    { id: 'security', label: 'Security Services', icon: <Shield size={20} />, categories: ['watch', 'mercenary', 'specialized', 'potential'] },
    { id: 'provisions', label: 'Provisions', icon: <Coffee size={20} />, categories: ['daily', 'specialized'] },
    { id: 'accommodations', label: 'Accommodations', icon: <Home size={20} />, categories: ['lodging', 'administrative'] },
    { id: 'magical', label: 'Magical Services', icon: <Sparkles size={20} />, categories: ['services'] },
    { id: 'special', label: 'Special Resources', icon: <Crown size={20} />, categories: ['intelligence', 'resources'] },
  ];

  // Category labels
  const categoryLabels = {
    standard: 'Standard Travel',
    premium: 'Premium Services',
    watch: 'Ederian Watch',
    mercenary: 'Mercenary Companies',
    specialized: 'Specialized Security',
    potential: 'Potential Companies',
    daily: 'Daily Provisions',
    specialized: 'Specialized Provisions',
    lodging: 'Lodging Options',
    administrative: 'Administrative Services',
    services: 'Arcane Services',
    intelligence: 'Intelligence Network',
    resources: 'Resources & Services'
  };

  // Add item to cart
  const addToCart = (item, isMultiple = false) => {
    // Skip if it's just an informational item
    if (item.isInfo) return;
    
    // Handle array of items
    if (isMultiple && Array.isArray(item)) {
      // Add all items at once
      setCart(prevCart => {
        const newCart = [...prevCart];
        
        item.forEach(singleItem => {
          const existingItemIndex = newCart.findIndex(cartItem => cartItem.id === singleItem.id);
          const daysValue = singleItem.preserveDays ? singleItem.days : (standardDaysEnabled ? standardDays : 1);
          
          let itemToAdd = { ...singleItem };
          if (itemToAdd.customizablePrice) {
            itemToAdd.customPriceValue = itemToAdd.cost;
          }
          
          if (existingItemIndex >= 0) {
            newCart[existingItemIndex].quantity += 1;
          } else {
            newCart.push({ 
              ...itemToAdd, 
              quantity: 1, 
              days: daysValue, 
              people: itemToAdd.perPerson ? 1 : 0 
            });
          }
        });
        
        return newCart;
      });
      return;
    }
    
    // Original code for single item
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    // Set days value based on standardDaysEnabled setting or preserve item's days if flagged
    const daysValue = item.preserveDays ? item.days : (standardDaysEnabled ? standardDays : 1);
    
    // For items with customizable price, use the default price initially
    let itemToAdd = { ...item };
    if (item.customizablePrice) {
      itemToAdd.customPriceValue = item.cost;
    }
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...itemToAdd, quantity: 1, days: daysValue, people: item.perPerson ? 1 : 0 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update item quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Update days in cart - if standardized is enabled, update ALL items
  const updateDays = (itemId, newDays) => {
    if (newDays < 1) return;
    
    if (standardDaysEnabled) {
      // Update standardDays and all items in cart
      setStandardDays(newDays);
      const updatedCart = cart.map(item => ({...item, days: newDays}));
      setCart(updatedCart);
    } else {
      // Just update this one item
      const updatedCart = cart.map(item => 
        item.id === itemId ? { ...item, days: newDays } : item
      );
      setCart(updatedCart);
    }
  };

  // Update people in cart
  const updatePeople = (itemId, newPeople) => {
    if (newPeople < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, people: newPeople } : item
    );
    setCart(updatedCart);
  };

  // Update custom price
  const updateCustomPrice = (itemId, newPrice) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.customizablePrice) {
        // Enforce min/max bounds
        const boundedPrice = Math.min(Math.max(newPrice, item.minPrice || 0), item.maxPrice || 1000);
        return { ...item, customPriceValue: boundedPrice };
      }
      return item;
    });
    
    setCart(updatedCart);
  };

  // Calculate total party size (PCs + NPCs)
  const calculateTotalPartySize = () => {
    // Start with player characters
    let totalSize = playerCount;
    
    // Add all NPCs from security services in the cart
    cart.forEach(item => {
      if (item.npcCount) {
        totalSize += item.npcCount * item.quantity;
      }
    });
    
    return totalSize;
  };
  
  // Calculate total cost
  const calculateTotal = () => {
    const totalPartySize = calculateTotalPartySize();
    
    return cart.reduce((total, item) => {
      let itemCost = 0;
      
      // Extract numeric value and handle silver/gold conversion
      let baseCost = item.customizablePrice && item.customPriceValue !== undefined ? 
                    item.customPriceValue : (item.cost || 0);
      const costUnit = item.costUnit || '';
      
      if (costUnit.includes('silver')) {
        baseCost = baseCost / 20; // 20 silver = 1 gold
      }
      
      // Calculate based on different cost structures
      if (costUnit.includes('/day') && !costUnit.includes('/person')) {
        itemCost = baseCost * item.days * item.quantity;
      } else if (costUnit.includes('/week') && !costUnit.includes('/person')) {
        itemCost = baseCost * Math.ceil(item.days / 7) * item.quantity;
      } else if (costUnit.includes('/person/day')) {
        itemCost = baseCost * totalPartySize * item.days * item.quantity;
      } else if (costUnit.includes('/person/week')) {
        itemCost = baseCost * totalPartySize * Math.ceil(item.days / 7) * item.quantity;
      } else if (costUnit.includes('/person') && !costUnit.includes('/day') && !costUnit.includes('/night')) {
        itemCost = baseCost * totalPartySize * item.quantity;
      } else if (costUnit.includes('/night') && !costUnit.includes('/person')) {
        itemCost = baseCost * item.days * item.quantity;
      } else if (costUnit.includes('/person/night')) {
        itemCost = baseCost * totalPartySize * item.days * item.quantity;
      } else if (costUnit.includes('/message') || costUnit.includes('/dose') || costUnit.includes('/application')) {
        itemCost = baseCost * item.quantity;
      } else if (item.baseCost) {
        // Handle base cost + per person/day
        const additionalCost = item.additionalCost || 0;
        itemCost = (baseCost + (additionalCost * totalPartySize * item.days)) * item.quantity;
      } else {
        // Flat rate items
        itemCost = baseCost * item.quantity;
      }
      
      return total + itemCost;
    }, 0);
  };

  // Format cost as gold/silver string
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

  // Calculate item cost for display
  const calculateItemCost = (item) => {
    const totalPartySize = calculateTotalPartySize();
    
    let itemCost = 0;
    
    // Extract numeric value and handle silver/gold conversion
    let baseCost = item.customizablePrice && item.customPriceValue !== undefined ? 
                  item.customPriceValue : (item.cost || 0);
    const costUnit = item.costUnit || '';
    
    if (costUnit.includes('silver')) {
      baseCost = baseCost / 20; // 20 silver = 1 gold
    }
    
    // Calculate based on different cost structures
    if (costUnit.includes('/day') && !costUnit.includes('/person')) {
      itemCost = baseCost * item.days * item.quantity;
    } else if (costUnit.includes('/week') && !costUnit.includes('/person')) {
      itemCost = baseCost * Math.ceil(item.days / 7) * item.quantity;
    } else if (costUnit.includes('/person/day')) {
      itemCost = baseCost * totalPartySize * item.days * item.quantity;
    } else if (costUnit.includes('/person/week')) {
      itemCost = baseCost * totalPartySize * Math.ceil(item.days / 7) * item.quantity;
    } else if (costUnit.includes('/person') && !costUnit.includes('/day') && !costUnit.includes('/night')) {
      itemCost = baseCost * totalPartySize * item.quantity;
    } else if (costUnit.includes('/night') && !costUnit.includes('/person')) {
      itemCost = baseCost * item.days * item.quantity;
    } else if (costUnit.includes('/person/night')) {
      itemCost = baseCost * totalPartySize * item.days * item.quantity;
    } else if (costUnit.includes('/message') || costUnit.includes('/dose') || costUnit.includes('/application')) {
      itemCost = baseCost * item.quantity;
    } else if (item.baseCost) {
      // Handle base cost + per person/day
      const additionalCost = item.additionalCost || 0;
      itemCost = (baseCost + (additionalCost * totalPartySize * item.days)) * item.quantity;
    } else {
      // Flat rate items
      itemCost = baseCost * item.quantity;
    }
    
    return itemCost;
  };

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Set default category for the new tab
    setActiveCategory(tabs.find(tab => tab.id === tabId).categories[0]);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Scroll size={24} className="text-amber-500" />
          <h1 className="text-xl font-bold text-amber-500">Ederian Travel Tracker</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="bg-gray-900 p-2 rounded flex items-center mr-2">
            <span className="text-sm text-gray-400 mr-2">PCs:</span>
            <button 
              className="p-1 bg-gray-800 rounded hover:bg-gray-700"
              onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
            >
              <Minus size={14} />
            </button>
            <span className="mx-2 w-6 text-center">{playerCount}</span>
            <button 
              className="p-1 bg-gray-800 rounded hover:bg-gray-700"
              onClick={() => setPlayerCount(playerCount + 1)}
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="bg-gray-900 p-2 rounded flex items-center mr-2">
            <span className="text-sm text-gray-400 mr-2">NPCs:</span>
            <span className="w-6 text-center">{calculateTotalPartySize() - playerCount}</span>
          </div>
          
          <div className="bg-gray-900 p-2 rounded flex items-center mr-2">
            <div className="flex items-center space-x-2">
              <div>
                <label className="text-sm text-gray-400 mr-2">Standard Travel Days:</label>
                <div className="flex items-center">
                  <button 
                    className={`px-3 py-1 text-xs rounded-l ${standardDaysEnabled ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setStandardDaysEnabled(true)}
                  >
                    ON
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-r ${!standardDaysEnabled ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setStandardDaysEnabled(false)}
                  >
                    OFF
                  </button>
                </div>
              </div>
              {standardDaysEnabled && (
                <div className="flex items-center">
                  <button 
                    className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                    onClick={() => setStandardDays(Math.max(1, standardDays - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="mx-2 w-6 text-center">{standardDays}</span>
                  <button 
                    className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                    onClick={() => {
                      const newDays = standardDays + 1;
                      setStandardDays(newDays);
                      // Update all items in cart
                      const updatedCart = cart.map(item => ({...item, days: newDays}));
                      setCart(updatedCart);
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="bg-amber-600 hover:bg-amber-700 p-2 rounded flex items-center space-x-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ShoppingCart size={20} />
            <span>Cart ({cart.length})</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Tab Navigation */}
          <div className="mb-4 flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-2 mr-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-gray-700 text-amber-500 border border-amber-700' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Category Selection */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.find(tab => tab.id === activeTab).categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeCategory === category 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
          
          {/* Route Planner - only show in travel tab */}
          {activeTab === 'travel' && (
            <div className="mb-6">
              <RoutePlanner 
                travelData={travelData} 
                playerCount={playerCount} 
                addToCart={addToCart} 
              />
            </div>
          )}
          
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelData[activeTab][activeCategory].map(item => (
              <div key={item.id}
                className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600 transition-colors ${
                  item.isInfo ? 'opacity-80' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{item.image}</span>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </div>
                    {!item.isInfo && (
                      <button
                        className="bg-amber-600 hover:bg-amber-700 p-1.5 rounded-full"
                        onClick={() => addToCart(item)}
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-amber-500 font-medium">
                      {item.cost} {item.costUnit || ''}
                      {item.baseCost && item.additionalCost && ` + ${item.additionalCost} ${item.additionalCostUnit || ''}`}
                    </div>
                    {item.speed && (
                      <div className="text-gray-400 text-sm">{item.speed}</div>
                    )}
                    {item.npcCount && (
                      <div className="text-gray-300 text-sm mt-1">NPCs: {item.npcCount}</div>
                    )}
                    <p className="text-gray-400 text-sm mt-1">{item.notes || ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar Cart */}
        <aside className={`w-96 bg-gray-800 border-l border-gray-700 transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed right-0 top-0 h-screen overflow-y-auto z-10 p-4`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-500 flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              Your Selection
            </h2>
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-gray-400 p-4 text-center">
              <div className="text-4xl mb-2">🛒</div>
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add items from the catalog to begin tracking costs</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-900 rounded-lg p-3 relative">
                    <button 
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="flex items-start mb-2">
                      <span className="text-2xl mr-2">{item.image}</span>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="text-sm text-amber-500">
                          {item.cost} {item.costUnit || ''}
                          {item.baseCost && item.additionalCost && ` + ${item.additionalCost} ${item.additionalCostUnit || ''}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      {item.npcCount ? (
                        <div className="mb-2 bg-gray-700 p-2 rounded text-sm">
                          <span className="text-amber-400">+{item.npcCount}</span> NPCs added to party
                        </div>
                      ) : null}
                    
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-400">Quantity:</label>
                        <div className="flex items-center">
                          <button 
                            className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <button 
                            className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Only show days input for items with day-based pricing */}
                      {(item.costUnit.includes('/day') || item.costUnit.includes('/night') || item.costUnit.includes('/week') || item.baseCost) && (
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-400">Days:</label>
                          <div className="flex items-center">
                            {standardDaysEnabled ? (
                              <div className="bg-amber-700 text-xs px-2 py-1 rounded text-white">
                                Standardized: {standardDays}
                              </div>
                            ) : (
                              <>
                                <button 
                                  className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                                  onClick={() => updateDays(item.id, item.days - 1)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="mx-2 w-6 text-center">{item.days}</span>
                                <button 
                                  className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                                  onClick={() => updateDays(item.id, item.days + 1)}
                                >
                                  <Plus size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Customizable price field */}
                      {item.customizablePrice && (
                        <div className="flex items-center justify-between mt-2">
                          <label className="text-sm text-gray-400">Custom Gift (per person):</label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min={item.minPrice || 0}
                              max={item.maxPrice || 100}
                              value={item.customPriceValue}
                              onChange={(e) => updateCustomPrice(item.id, parseInt(e.target.value) || 0)}
                              className="w-16 bg-gray-700 border border-gray-600 rounded p-1 text-center text-white"
                            />
                            <span className="ml-1 text-amber-500">gold</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Only show people input for items with per-person pricing */}
                      {(item.perPerson) && (
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-400">People:</label>
                          <div className="flex items-center">
                            <button 
                              className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                              onClick={() => updatePeople(item.id, item.people - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="mx-2 w-6 text-center">{item.people}</span>
                            <button 
                              className="p-1 bg-gray-800 rounded hover:bg-gray-700"
                              onClick={() => updatePeople(item.id, item.people + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 text-right font-medium">
                      Subtotal: {formatCost(calculateItemCost(item))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">Total Party Size:</span>
                  <span className="text-white">{calculateTotalPartySize()} ({playerCount} PCs + {calculateTotalPartySize() - playerCount} NPCs)</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-1">
                  <span>Total:</span>
                  <span className="text-amber-500">{formatCost(calculateTotal())}</span>
                </div>
                <p className="text-xs text-gray-400">All requisitions by the King's Hand must be properly documented and submitted to the Royal Treasurer's office within 30 days.</p>
              </div>
              
              <button 
                className="w-full bg-amber-600 hover:bg-amber-700 font-bold py-2 rounded-lg mt-4 flex items-center justify-center"
                onClick={() => setShowRequisition(true)}
              >
                <Scroll size={16} className="mr-2" />
                Generate Requisition Order
              </button>
            </>
          )}
        </aside>
      </div>
      
      {/* Bottom Bar - Total */}
      <footer className="bg-gray-800 border-t border-gray-700 p-3 sticky bottom-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Info size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">
                {cart.length} items selected
              </span>
            </div>
            <div className="text-sm border-l border-gray-600 pl-4">
              <span className="text-gray-400">Total Party Size: </span>
              <span className="font-medium text-white">{calculateTotalPartySize()}</span>
              <span className="text-gray-500 text-xs ml-1">({playerCount} PCs + {calculateTotalPartySize() - playerCount} NPCs)</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Total Cost:</span>
            <span className="text-lg font-bold text-amber-500">{formatCost(calculateTotal())}</span>
          </div>
          <button 
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded flex items-center space-x-1"
            onClick={() => setSidebarOpen(true)}
          >
            <ShoppingCart size={16} />
            <span>View Cart</span>
            <ChevronRight size={16} />
          </button>
        </div>
        </footer>
      
      {/* Requisition Order Modal */}
      <RequisitionOrder 
        isOpen={showRequisition}
        onClose={() => setShowRequisition(false)}
        cart={cart}
        playerCount={playerCount}
        totalCost={calculateTotal()}
        formatCost={formatCost}
      />
    </div>
  );
}

export default App;