import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const RequisitionOrder = ({ isOpen, onClose, cart, playerCount, totalCost, formatCost }) => {
  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Reference for print functionality
  const printRef = useRef();

  // If not open, don't render anything
  if (!isOpen) return null;

  // Format date for the document
  const today = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  // Generate a random requisition number
  const requisitionNumber = `KH-${Math.floor(1000 + Math.random() * 9000)}-${today.getFullYear()}`;

  // Get total NPCs
  const totalNPCs = cart.reduce((total, item) => {
    return total + (item.npcCount ? item.npcCount * item.quantity : 0);
  }, 0);

  // Group items by category
  const groupedItems = cart.reduce((groups, item) => {
    // Determine category based on item properties
    let category = 'Other';
    if (item.id.includes('airship') || item.id.includes('rail') || item.id.includes('ship') || item.id.includes('caravan')) {
      category = 'Transportation';
    } else if (item.id.includes('guard') || item.id.includes('militia') || item.id.includes('company') || item.id.includes('wyvern') || item.id.includes('mage-warden')) {
      category = 'Security';
    } else if (item.id.includes('provisions') || item.id.includes('rations')) {
      category = 'Provisions';
    } else if (item.id.includes('inn') || item.id.includes('estate') || item.id.includes('embassy') || item.id.includes('encampment')) {
      category = 'Accommodations';
    } else if (item.id.includes('arcane') || item.id.includes('serum') || item.id.includes('scrying') || item.id.includes('weather')) {
      category = 'Magical Services';
    }
    
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div 
        ref={printRef}
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg relative"
        style={{
          backgroundImage: `url('https://i.imgur.com/z1c8f4g.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#3A2921'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700"
        >
          <X size={20} />
        </button>

        <div className="p-10 md:p-16">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{fontFamily: 'serif'}}>Royal Requisition</h1>
            <div className="flex justify-center space-x-3 items-center">
              <div className="h-0.5 bg-amber-900 w-12 opacity-70"></div>
              <div className="text-xl" style={{fontFamily: 'serif'}}>The King's Hand</div>
              <div className="h-0.5 bg-amber-900 w-12 opacity-70"></div>
            </div>
          </div>

          {/* Requisition Details */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-semibold">Requisition No: </span> 
                <span>{requisitionNumber}</span>
              </div>
              <div>
                <span className="font-semibold">Date: </span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-semibold">Requested By: </span>
                <span>Agent of the Crown</span>
              </div>
              <div>
                <span className="font-semibold">Party Size: </span>
                <span>{playerCount} PCs, {totalNPCs} NPCs</span>
              </div>
            </div>
          </div>

          {/* Proclamation */}
          <div className="mb-8 italic text-center border-t border-b border-amber-900 border-opacity-30 py-4">
            <p>"In service of His Majesty's Crown, by authority of the King's Hand, these provisions and services are hereby requisitioned for the furtherance of royal business within the realm of Ederia and beyond. Let all loyal subjects render aid as written below, with payment to follow according to the established rates of the royal treasury."</p>
          </div>

          {/* Items Details */}
          <div className="mb-8">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 border-b border-amber-900 border-opacity-30">{category}</h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex flex-wrap justify-between">
                      <div className="mr-4 flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm opacity-75">
                          {item.segmentInfo && <div>{item.segmentInfo}</div>}
                          {item.days > 1 && <div>Duration: {item.days} days</div>}
                          {item.quantity > 1 && <div>Quantity: {item.quantity}</div>}
                          {item.perPerson && <div>For: {item.people || playerCount} persons</div>}
                          {item.npcCount && <div>Includes: {item.npcCount} personnel</div>}
                        </div>
                      </div>
                      <div className="text-right font-semibold">
                        {formatCost(item.cost * (item.quantity || 1))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-double border-amber-900 pt-4 text-right">
            <div className="text-xl font-bold">
              Total Expenditure: {formatCost(totalCost)}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-between items-center text-sm opacity-75">
            <div>Per Royal Edict #417</div>
            <div className="text-center">
              <div className="mb-1">* This requisition must be filed with the Royal Treasury within 30 days *</div>
              <div>~ Expenses deemed excessive may be subject to review by the Crown's Council ~</div>
            </div>
            <div>Crown's Seal</div>
          </div>

          {/* Signature Block */}
          <div className="mt-10 flex justify-between">
            <div className="text-center">
              <div className="border-t border-amber-900 border-opacity-50 mt-8 pt-1 w-40">
                Authorized Signature
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-amber-900 border-opacity-50 mt-8 pt-1 w-40">
                Treasury Approval
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionOrder;