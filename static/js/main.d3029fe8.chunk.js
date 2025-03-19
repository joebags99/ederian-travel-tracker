(this["webpackJsonpederian-travel-tracker"]=this["webpackJsonpederian-travel-tracker"]||[]).push([[0],{15:function(e,a,t){},16:function(e,a,t){},17:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),r=t(4),i=t.n(r),o=(t(15),t(22)),l=t(24),c=t(25),m=t(26),d=t(27),u=t(28),g=t(29),p=t(30),y=t(31),b=t(32),f=t(33),v=t(34),h=t(35),x=(t(16),t(18)),E=t(19),N=t(20),C=t(21),w=t(23);const k={"Royal Capital":{Thornefield:{distance:100,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","airship-ederia"]},"Port Haven":{distance:150,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","ship-shared","ship-private","airship-ederia"]},"Drakemoor Hold":{distance:120,modes:["caravan","airship-ederia"]},"Astralor Academy":{distance:80,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","airship-ederia"]}},Thornefield:{"Royal Capital":{distance:100,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","airship-ederia"]},"Forest Outpost":{distance:75,modes:["caravan"]},"Crossroads Inn":{distance:50,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st"]}},"Port Haven":{"Royal Capital":{distance:150,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","ship-shared","ship-private","airship-ederia"]},"Veltaris Harbor":{distance:120,modes:["caravan","ship-shared","ship-private"]},"Eastern Shores":{distance:200,modes:["ship-shared","ship-private"]}},"Drakemoor Hold":{"Royal Capital":{distance:120,modes:["caravan","airship-ederia"]},"Mountain Pass":{distance:80,modes:["caravan"]}},"Astralor Academy":{"Royal Capital":{distance:80,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st","airship-ederia"]},"Arcane Outpost":{distance:100,modes:["caravan","airship-ederia"]}},"Forest Outpost":{Thornefield:{distance:75,modes:["caravan"]}},"Crossroads Inn":{Thornefield:{distance:50,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st"]},"Trade Junction":{distance:60,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st"]}},"Veltaris Harbor":{"Port Haven":{distance:120,modes:["caravan","ship-shared","ship-private"]},"Coastal Fortress":{distance:70,modes:["caravan","ship-shared","ship-private"]}},"Eastern Shores":{"Port Haven":{distance:200,modes:["ship-shared","ship-private"]}},"Mountain Pass":{"Drakemoor Hold":{distance:80,modes:["caravan"]},"Border Crossing":{distance:100,modes:["caravan"]}},"Arcane Outpost":{"Astralor Academy":{distance:100,modes:["caravan","airship-ederia"]}},"Trade Junction":{"Crossroads Inn":{distance:60,modes:["caravan","ryanite-rail-standard","ryanite-rail-1st"]}},"Coastal Fortress":{"Veltaris Harbor":{distance:70,modes:["caravan","ship-shared","ship-private"]}},"Border Crossing":{"Mountain Pass":{distance:100,modes:["caravan"]}}};function P(e,a){if(!a||!a.travel)return 24;let t=null;if(a.travel.standard)for(const n of a.travel.standard)if(n.id===e){t=n;break}if(!t&&a.travel.premium)for(const n of a.travel.premium)if(n.id===e){t=n;break}if(!t||!t.speed)return 24;const s=t.speed.match(/(\d+)/);return s?parseInt(s[1]):24}function S(e,a,t,s){if(!s[e]||!s[e][a])return null;const n=s[e][a];return n.modes&&"object"===typeof n.modes&&!Array.isArray(n.modes)?n.modes[t]&&n.modes[t].distance?n.modes[t].distance:null:n.modes&&Array.isArray(n.modes)&&n.modes.includes(t)?n.distance:null}function U(e,a,t,s){if(!t||!t.travel)return 0;let n=null;if(t.travel.standard)for(const c of t.travel.standard)if(c.id===e){n=c;break}if(!n&&t.travel.premium)for(const c of t.travel.premium)if(c.id===e){n=c;break}if(!n)return 0;const r=a/P(e,t);let i=0;const o=n.costUnit||"";let l=n.cost||0;return o.includes("silver")&&(l/=20),i=o.includes("/day")&&!o.includes("/person")?l*r:o.includes("/week")?l*Math.ceil(r/7):o.includes("/person/day")?l*s*r:o.includes("/person/week")?l*s*Math.ceil(r/7):l,i}function z(e,a,t){if(!t[e]||!t[e][a])return[];const s=t[e][a];return s.modes&&"object"===typeof s.modes&&!Array.isArray(s.modes)?Object.keys(s.modes):s.modes&&Array.isArray(s.modes)?s.modes:[]}var j=function(e){let{travelData:a={},playerCount:t=1,addToCart:r}=e;const[i,l]=Object(s.useState)(""),[c,m]=Object(s.useState)(""),[d,u]=Object(s.useState)(""),[g,p]=Object(s.useState)("time"),[y,b]=Object(s.useState)(null),[f,v]=Object(s.useState)(k);Object(s.useEffect)(()=>{(async()=>{try{const e=await fetch("/ederian-travel-tracker/data/travel-times.json");if(!e.ok)return console.warn("Could not load travel times from /data. Status:",e.status),void console.log("Using default city graph data");const a=await e.json();v(a),console.log("Loaded travel times from /data directory")}catch(e){console.error("Error loading travel times data:",e),console.log("Using default city graph data")}})()},[]);const h=Object.keys(f),j=(()=>{if(!i||!c)return[];const e=new Set,a=e=>e?e.modes&&"object"===typeof e.modes&&!Array.isArray(e.modes)?Object.keys(e.modes):e.modes&&Array.isArray(e.modes)?e.modes:[]:[];if(f[i]&&f[i][c])return a(f[i][c]);for(const t in f)for(const s in f[t]){a(f[t][s]).forEach(a=>e.add(a))}return Array.from(e)})();Object(s.useEffect)(()=>{b(null)},[i,c,d,g]);const q=e=>{const a=Math.floor(e),t=Math.round(24*(e-a));return a>0&&t>0?`${a} day${1!==a?"s":""}, ${t} hour${1!==t?"s":""}`:a>0?`${a} day${1!==a?"s":""}`:`${t} hour${1!==t?"s":""}`},A=e=>{const a=Math.floor(e),t=Math.round(20*(e-a));return a>0&&t>0?`${a} gold, ${t} silver`:a>0?a+" gold":t+" silver"};return n.a.createElement("div",{className:"bg-gray-800 rounded-lg p-6 border-2 border-amber-600 shadow-lg"},n.a.createElement("h2",{className:"text-2xl font-bold text-amber-400 mb-5 flex items-center"},n.a.createElement(x.a,{className:"mr-3",size:24}),"Ederian Route Planner"),n.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-5"},n.a.createElement("div",null,n.a.createElement("label",{className:"block text-base text-amber-300 mb-2 font-medium"},"Origin:"),n.a.createElement("select",{className:"w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none",value:i,onChange:e=>l(e.target.value)},n.a.createElement("option",{value:""},"Select origin city"),h.map(e=>n.a.createElement("option",{key:e,value:e},e)))),n.a.createElement("div",null,n.a.createElement("label",{className:"block text-base text-amber-300 mb-2 font-medium"},"Destination:"),n.a.createElement("select",{className:"w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none",value:c,onChange:e=>m(e.target.value)},n.a.createElement("option",{value:""},"Select destination city"),h.filter(e=>e!==i).map(e=>n.a.createElement("option",{key:e,value:e},e))))),n.a.createElement("div",{className:"mb-5"},n.a.createElement("label",{className:"block text-base text-amber-300 mb-2 font-medium"},"Prioritize:"),n.a.createElement("div",{className:"flex flex-wrap gap-3"},n.a.createElement("button",{className:"px-4 py-2 rounded-md flex items-center text-base font-medium "+("time"===g?"bg-amber-600 text-white border-2 border-amber-400":"bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600"),onClick:()=>p("time")},n.a.createElement(E.a,{size:18,className:"mr-2"}),"Fastest"),n.a.createElement("button",{className:"px-4 py-2 rounded-md flex items-center text-base font-medium "+("cost"===g?"bg-amber-600 text-white border-2 border-amber-400":"bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600"),onClick:()=>p("cost")},n.a.createElement(N.a,{size:18,className:"mr-2"}),"Cheapest"),n.a.createElement("button",{className:"px-4 py-2 rounded-md flex items-center text-base font-medium "+("comfort"===g?"bg-amber-600 text-white border-2 border-amber-400":"bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600"),onClick:()=>p("comfort")},n.a.createElement(C.a,{size:18,className:"mr-2"}),"Most Comfortable"))),n.a.createElement("div",{className:"mb-5"},n.a.createElement("label",{className:"block text-base text-amber-300 mb-2 font-medium"},"Transport Mode (Optional):"),n.a.createElement("select",{className:"w-full bg-gray-700 border-2 border-gray-600 rounded-md p-3 text-white text-base focus:border-amber-500 focus:outline-none",value:d,onChange:e=>u(e.target.value)},n.a.createElement("option",{value:""},"Any available mode"),j.map(e=>{var t,s;const r=[...(null===a||void 0===a||null===(t=a.travel)||void 0===t?void 0:t.standard)||[],...(null===a||void 0===a||null===(s=a.travel)||void 0===s?void 0:s.premium)||[]].find(a=>a&&a.id===e);return r?n.a.createElement("option",{key:e,value:e},r.name," (",r.speed,")"):n.a.createElement("option",{key:e,value:e},e)}))),n.a.createElement("button",{className:"w-full bg-amber-600 hover:bg-amber-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center text-black text-lg shadow-md transition-colors duration-200",onClick:()=>{if(!i||!c)return;const e=function(e,a,t,s,n,r,i){const o={},l={},c=new Set,m={};for(const p in e)o[p]=p===a?0:1/0,l[p]=null,c.add(p),m[p]={};for(;c.size>0;){let a=null,d=1/0;for(const e of c)o[e]<d&&(d=o[e],a=e);if(a===t||null===a||o[a]===1/0)break;c.delete(a);for(const t in e[a]){let c,d;if(c=z(a,t,e),s&&!c.includes(s))continue;if(0===c.length)continue;let u,g=s;if("time"===n)if(s){if(u=S(a,t,s,e),null===u)continue;d=u/P(s,r)}else{let s=1/0;for(const n of c){const i=S(a,t,n,e);if(null===i)continue;const o=i/P(n,r);o<s&&(s=o,g=n,u=i)}if(s===1/0)continue;d=s}else if("cost"===n)if(s){if(u=S(a,t,s,e),null===u)continue;d=U(s,u,r,i)}else{let s=1/0;for(const n of c){const o=S(a,t,n,e);if(null===o)continue;const l=U(n,o,r,i);l<s&&(s=l,g=n,u=o)}if(s===1/0)continue;d=s}else if("comfort"===n){const n={"airship-ederia":5,"airship-bordering":5,"airship-distant":5,"ryanite-rail-1st":4,"ship-private":4,"expedited-rail":3,"ryanite-rail-standard":2,"ship-shared":2,caravan:1,"swift-rider":1};if(s){if(u=S(a,t,s,e),null===u)continue;d=u/P(s,r)}else{let s=0,i=1/0;for(const o of c){const l=n[o]||0,c=S(a,t,o,e);if(null===c)continue;const m=c/P(o,r);(l>s||l===s&&m<i)&&(s=l,i=m,g=o,u=c)}if(i===1/0)continue;d=i}}if(void 0===d||void 0===u)continue;const p=o[a]+d;p<o[t]&&(o[t]=p,l[t]=a,m[a][t]={mode:g,distance:u})}}const d=[],u=[];let g=t;for(;null!==g&&null!==l[g];){const e=l[g];d.unshift(g);const a=m[e][g];a&&u.unshift({from:e,to:g,distance:a.distance,mode:a.mode}),g=e}return g===a&&d.unshift(a),{path:d,segments:u,weight:o[t],valid:o[t]!==1/0&&d.includes(t)&&d.includes(a)}}(f,i,c,d,g,a,t);if(e.valid){const s=function(e,a){let t=0;for(const s of e){const e=P(s.mode,a);t+=s.distance/e}return t}(e.segments,a),n=function(e,a,t){let s=0;for(const n of e)s+=U(n.mode,n.distance,a,t);return s}(e.segments,a,t);b({...e,totalTime:s,totalCost:n})}else b(e)},disabled:!i||!c},n.a.createElement(o.a,{size:20,className:"mr-2"}),"Calculate Route"),y&&y.valid&&n.a.createElement("div",{className:"mt-6 p-5 bg-gray-900 rounded-lg border-2 border-amber-700"},n.a.createElement("h3",{className:"text-xl font-bold text-amber-400 mb-3"},"Route Details"),n.a.createElement("div",{className:"space-y-3 mb-5"},n.a.createElement("div",{className:"text-lg"},n.a.createElement("span",{className:"text-amber-300 font-medium"},"Path: "),n.a.createElement("span",{className:"text-white"},y.path.join(" \u2192 "))),n.a.createElement("div",{className:"text-lg"},n.a.createElement("span",{className:"text-amber-300 font-medium"},"Total Distance: "),n.a.createElement("span",{className:"text-white"},y.segments.reduce((e,a)=>e+a.distance,0)," miles")),n.a.createElement("div",{className:"text-lg"},n.a.createElement("span",{className:"text-amber-300 font-medium"},"Total Travel Time: "),n.a.createElement("span",{className:"text-white"},q(y.totalTime))),n.a.createElement("div",{className:"text-lg"},n.a.createElement("span",{className:"text-amber-300 font-medium"},"Estimated Cost: "),n.a.createElement("span",{className:"text-white"},A(y.totalCost)))),y.segments&&y.segments.length>0&&n.a.createElement("div",null,n.a.createElement("h4",{className:"text-lg font-semibold text-amber-400 mb-3"},"Segment Details"),n.a.createElement("div",{className:"space-y-3 max-h-64 overflow-y-auto pr-2 pb-1"},y.segments.map((e,s)=>{var r,i;const o=[...(null===a||void 0===a||null===(r=a.travel)||void 0===r?void 0:r.standard)||[],...(null===a||void 0===a||null===(i=a.travel)||void 0===i?void 0:i.premium)||[]].find(a=>a&&a.id===e.mode),l=P(e.mode,a),c=e.distance/l,m=U(e.mode,e.distance,a,t);return n.a.createElement("div",{key:s,className:"bg-gray-800 p-4 rounded-md border border-gray-700"},n.a.createElement("div",{className:"flex justify-between text-base"},n.a.createElement("span",{className:"text-white font-medium"},e.from," \u2192 ",e.to),n.a.createElement("span",{className:"text-amber-400 font-bold"},e.distance," miles")),o&&n.a.createElement("div",{className:"mt-2"},n.a.createElement("span",{className:"text-white flex items-center text-base"},n.a.createElement("span",{className:"mr-2 text-xl"},o.image),n.a.createElement("span",{className:"font-medium"},o.name)," ",n.a.createElement("span",{className:"ml-2 text-gray-300"},"(",o.speed,")")),n.a.createElement("div",{className:"flex justify-between text-sm mt-2 text-gray-200"},n.a.createElement("span",null,n.a.createElement("span",{className:"text-amber-300"},"Time:")," ",q(c)),n.a.createElement("span",null,n.a.createElement("span",{className:"text-amber-300"},"Cost:")," ",A(m)))))}))),r&&n.a.createElement("button",{className:"w-full mt-5 bg-gray-700 hover:bg-gray-600 font-bold py-3 rounded-lg flex items-center justify-center text-white text-base border border-gray-500 transition-colors duration-200",onClick:()=>{y&&y.valid&&a&&a.travel&&y.segments.forEach(e=>{const t=[...a.travel.standard||[],...a.travel.premium||[]].find(a=>a&&a.id===e.mode);if(t&&r){const s=P(e.mode,a),n=Math.ceil(e.distance/s),i={...t,id:`${e.mode}-${e.from}-${e.to}`,segmentInfo:`${e.from} \u2192 ${e.to} (${e.distance} miles)`,days:n,preserveDays:!0};r(i)}})}},n.a.createElement(w.a,{size:18,className:"mr-2"}),"Add Travel Options to Cart")),y&&!y.valid&&n.a.createElement("div",{className:"mt-6 p-5 bg-gray-900 rounded-lg border-2 border-red-700 text-red-400 text-lg font-medium"},"No valid route found between these cities with the selected transport mode."))};var q=function(){const[e,a]=Object(s.useState)("travel"),[t,r]=Object(s.useState)("standard"),[i,x]=Object(s.useState)([]),[E,N]=Object(s.useState)(!1),[C,w]=Object(s.useState)(5),[k,P]=Object(s.useState)(!1),[S,U]=Object(s.useState)(7),z={travel:{standard:[{id:"caravan",name:"Caravan",speed:"24 miles/day",cost:1,costUnit:"gold/person/day",notes:"Includes basic provisions and security",image:"\ud83d\udc2a",perPerson:!0},{id:"ryanite-rail-1st",name:"Ryanite Rail (1st class)",speed:"36 miles/day",cost:2,costUnit:"gold/person/day",notes:"Operates only between major cities and settlements",image:"\ud83d\ude86",perPerson:!0},{id:"ryanite-rail-standard",name:"Ryanite Rail (standard)",speed:"36 miles/day",cost:5,costUnit:"silver/person/day",notes:"Operates only between major cities and settlements",image:"\ud83d\ude86",perPerson:!0},{id:"ship-private",name:"Ship (private cabin)",speed:"48 miles/day",cost:2,costUnit:"gold/person/day",notes:"Available only along coastal routes and major rivers",image:"\ud83d\udea2",perPerson:!0},{id:"ship-shared",name:"Ship (shared quarters)",speed:"48 miles/day",cost:5,costUnit:"silver/person/day",notes:"Available only along coastal routes and major rivers",image:"\ud83d\udea2",perPerson:!0},{id:"airship-ederia",name:"Airship (within Ederia)",speed:"96 miles/day",cost:3e3,costUnit:"gold/day",notes:"Requires minimum 3-day advance booking through House Astralor representatives",image:"\ud83d\udef8"},{id:"airship-bordering",name:"Airship (bordering nations)",speed:"96 miles/day",cost:6e3,costUnit:"gold/day",notes:"Requires minimum 3-day advance booking through House Astralor representatives",image:"\ud83d\udef8"},{id:"airship-distant",name:"Airship (distant territories)",speed:"96 miles/day",cost:9e3,costUnit:"gold/day",notes:"Requires minimum 3-day advance booking through House Astralor representatives",image:"\ud83d\udef8"}],premium:[{id:"expedited-rail",name:"Expedited Ryanite Rail",speed:"40 miles/day",cost:5,costUnit:"gold/person/day",notes:"Priority boarding, private compartment, meals included, 10% speed increase",image:"\ud83d\ude85",perPerson:!0},{id:"swift-rider",name:"Swift Rider Service",speed:"60 miles/day",cost:10,costUnit:"gold/day",notes:"Relay of horses stationed every 20 miles, limited to 2 riders per route, available only on main roads",image:"\ud83d\udc0e"},{id:"falcon-messenger",name:"House Falkrest Falcon Messenger",speed:"Varies",cost:20,costUnit:"gold/message",notes:"Delivery of urgent sealed communications, reaches most destinations in Ederia within 1-2 days, limited to messages weighing less than 3 ounces",image:"\ud83e\udd85"}]},security:{watch:[{id:"small-guard",name:"Small Guard Detachment",cost:10,costUnit:"gold/day",notes:"1 Sergeant, 4 Watchmen",image:"\ud83d\udc6e",npcCount:5},{id:"medium-guard",name:"Medium Guard Detachment",cost:18,costUnit:"gold/day",notes:"1 Lieutenant, 1 Sergeant, 8 Watchmen",image:"\ud83d\udc6e",npcCount:10},{id:"large-guard",name:"Large Guard Detachment",cost:35,costUnit:"gold/day",notes:"1 Captain, 2 Sergeants, 17 Watchmen",image:"\ud83d\udc6e",npcCount:20}],mercenary:[{id:"local-militia",name:"Local Militia",cost:15,costUnit:"gold/day",notes:"20 fighters (varied training)",image:"\u2694\ufe0f",npcCount:20},{id:"registered-company",name:"Registered Company",cost:40,costUnit:"gold/day",notes:"15 professional soldiers",image:"\u2694\ufe0f",npcCount:15},{id:"elite-company",name:"Elite Company",cost:100,costUnit:"gold/day",notes:"10 veteran specialists",image:"\u2694\ufe0f",npcCount:10}],potential:[{id:"silver-shields-info",name:"The Silver Shields",cost:100,costUnit:"gold/day",notes:"Elite Company (10) - Specializes in personal protection and escort duties",image:"\ud83d\udee1\ufe0f",isInfo:!0},{id:"thornefield-info",name:"Thornefield Sentinels",cost:40,costUnit:"gold/day",notes:"Registered Company (15) - Expert in rural and wilderness operations",image:"\ud83c\udf32",isInfo:!0},{id:"shadow-riders-info",name:"Shadow Riders",cost:40,costUnit:"gold/day",notes:"Registered Company (15) - Specialists in urban security and intelligence gathering",image:"\ud83d\udd75\ufe0f",isInfo:!0},{id:"veltaris-info",name:"Veltaris Mariners",cost:100,costUnit:"gold/day",notes:"Elite Company (10) - Naval and coastal security operations",image:"\u2693",isInfo:!0}],specialized:[{id:"wyvern-scout",name:"House Drakemoor Wyvern Scout",cost:75,costUnit:"gold/day",notes:"Single Crownclaw Knight with wyvern mount, aerial reconnaissance and messaging, limited combat capability, 24-hour advance notice required",image:"\ud83d\udc09",npcCount:1},{id:"mage-warden",name:"House Astralor Mage-Warden",cost:50,costUnit:"gold/day",notes:"Specialized arcane security, detects magical threats and provides countermeasures, can establish temporary wards for safe lodging",image:"\ud83e\uddd9",npcCount:1}]},provisions:{daily:[{id:"small-provisions",name:"Small Group Provisions",cost:5,costUnit:"gold/day",notes:"For 5-10 people. Food, water, basic equipment maintenance",image:"\ud83c\udf56"},{id:"medium-provisions",name:"Medium Group Provisions",cost:12,costUnit:"gold/day",notes:"For 11-25 people. Includes pack animals and spare equipment",image:"\ud83c\udf56"},{id:"large-provisions",name:"Large Group Provisions",cost:30,costUnit:"gold/day",notes:"For 26-60 people. Includes field kitchen and medical supplies",image:"\ud83c\udf56"},{id:"huge-provisions",name:"Huge Group Provisions",cost:60,costUnit:"gold/day",notes:"For 61-100 people. Includes dedicated logistics staff",image:"\ud83c\udf56"}],specialized:[{id:"luxury-rations",name:"Luxury Rations",cost:2,costUnit:"gold/person/day",notes:"Fine wines and spirits, fresh meats, variety of fruits and vegetables",image:"\ud83c\udf77"},{id:"expedition-package",name:"Extended Expedition Package",cost:200,baseCost:!0,additionalCost:1,additionalCostUnit:"gold/person/day",notes:"Weatherproof tents, portable furniture, one month of preserved rations, medicine chest with healing potions",image:"\u26fa"}]},accommodations:{lodging:[{id:"standard-inn",name:"Local Inn (standard)",cost:5,costUnit:"silver/person/night",notes:"Private or shared room, basic meals",image:"\ud83c\udfe8",perPerson:!0},{id:"premium-inn",name:"Local Inn (premium)",cost:2,costUnit:"gold/person/night",notes:"Private room, quality meals, bath services",image:"\ud83c\udfe8",perPerson:!0},{id:"noble-estate",name:"Noble Estate Hosting",cost:30,costUnit:"gold/person",notes:"Luxury accommodations as guest of local nobility (Gift of 10-50 gold per person recommended)",image:"\ud83c\udff0",perPerson:!0,customizablePrice:!0,minPrice:10,maxPrice:50},{id:"embassy",name:"Ederian Embassy",cost:0,costUnit:"No direct cost",notes:"Available only in major cities or foreign capitals, full diplomatic services (requires royal authorization)",image:"\ud83c\udfdb\ufe0f"},{id:"encampment",name:"Field Encampment",cost:5,costUnit:"gold/day (setup fee)",additionalCost:"plus provisions",notes:"Established by royal quartermasters, includes security perimeter",image:"\u26fa"}],administrative:[{id:"chancery",name:"Mobile Chancery",cost:25,costUnit:"gold/day",notes:"Includes 2 royal scribes, official seals and documentation, secure message handling",image:"\ud83d\udcdc"},{id:"herald",name:"Court Herald",cost:10,costUnit:"gold/day",notes:"Makes official proclamations, arranges local meetings and audiences, manages protocol and ceremony",image:"\ud83d\udce2"},{id:"investigator",name:"Royal Investigator",cost:15,costUnit:"gold/day",notes:"Specializes in evidence gathering, legal authority to question subjects, trained in detection of falsehoods",image:"\ud83d\udd0d"}]},magical:{services:[{id:"arcane-lock",name:"Arcane Lock",cost:25,costUnit:"gold/application",notes:"Secures documents or rooms against tampering",image:"\ud83d\udd12"},{id:"truth-serum",name:"Truth Serum",cost:75,costUnit:"gold/dose",notes:"Compels truthful answers for 1 hour (resisted by strong will)",image:"\u2697\ufe0f"},{id:"scrying",name:"Location Scrying",cost:150,costUnit:"gold/attempt",notes:"Attempts to locate specific person or object within 100 miles",image:"\ud83d\udd2e"},{id:"weather",name:"Weather Prediction",cost:40,costUnit:"gold",notes:"Accurate 3-day forecast for region",image:"\u2601\ufe0f"}]},special:{intelligence:[{id:"informants",name:"Local Informants",cost:30,costUnit:"gold (average)",notes:"Market rumors and common knowledge, basic movements of notable figures, public sentiment reports",image:"\ud83d\udc65"},{id:"spy-network",name:"Royal Spy Network",cost:0,costUnit:"Requires approval",notes:"Detailed reports on political movements, identification of potential threats, access to existing agents in the field",image:"\ud83d\udd75\ufe0f"}],resources:[{id:"royal-seal",name:"Royal Seal Authority",cost:0,costUnit:"N/A",notes:"Can requisition emergency resources, may command temporary service from any royal subject, grants access to secure locations",image:"\ud83d\udc51"},{id:"gift-chest",name:"Royal Gift Chest",cost:500,costUnit:"gold (average)",notes:"Curated selection of diplomatic gifts, includes Ederian luxury goods, customized to recipient's known preferences",image:"\ud83c\udf81"},{id:"banquet-fund",name:"Formal Banquet Fund",cost:300,costUnit:"gold (average)",notes:"Finances to host local nobility or officials, includes entertainment and hospitality",image:"\ud83c\udf7d\ufe0f"},{id:"cartographer",name:"Royal Cartographer",cost:20,costUnit:"gold/day",notes:"Updates and creates detailed maps, documents new discoveries or changes",image:"\ud83d\uddfa\ufe0f"},{id:"resupply",name:"House Thornefield Rapid Resupply",cost:0,costUnit:"25% premium on provisions",notes:"Emergency food and supply delivery to remote locations",image:"\ud83d\udce6"},{id:"blessing",name:"House Emberlyn Blessing Ritual",cost:30,costUnit:"gold",notes:"Ceremonial blessing for missions or endeavors, increases morale of local supporters",image:"\u2728"}]}},q=[{id:"travel",label:"Travel Options",icon:n.a.createElement(o.a,{size:20}),categories:["standard","premium"]},{id:"security",label:"Security Services",icon:n.a.createElement(l.a,{size:20}),categories:["watch","mercenary","specialized","potential"]},{id:"provisions",label:"Provisions",icon:n.a.createElement(c.a,{size:20}),categories:["daily","specialized"]},{id:"accommodations",label:"Accommodations",icon:n.a.createElement(m.a,{size:20}),categories:["lodging","administrative"]},{id:"magical",label:"Magical Services",icon:n.a.createElement(d.a,{size:20}),categories:["services"]},{id:"special",label:"Special Resources",icon:n.a.createElement(u.a,{size:20}),categories:["intelligence","resources"]}],A={standard:"Standard Travel",premium:"Premium Services",watch:"Ederian Watch",mercenary:"Mercenary Companies",specialized:"Specialized Security",potential:"Potential Companies",daily:"Daily Provisions",specialized:"Specialized Provisions",lodging:"Lodging Options",administrative:"Administrative Services",services:"Arcane Services",intelligence:"Intelligence Network",resources:"Resources & Services"},R=e=>{if(e.isInfo)return;const a=i.findIndex(a=>a.id===e.id),t=e.preserveDays?e.days:k?S:1;let s={...e};if(e.customizablePrice&&(s.customPriceValue=e.cost),a>=0){const e=[...i];e[a].quantity+=1,x(e)}else x([...i,{...s,quantity:1,days:t,people:e.perPerson?1:0}])},M=(e,a)=>{if(a<1)return;const t=i.map(t=>t.id===e?{...t,quantity:a}:t);x(t)},T=(e,a)=>{if(!(a<1))if(k){U(a);const e=i.map(e=>({...e,days:a}));x(e)}else{const t=i.map(t=>t.id===e?{...t,days:a}:t);x(t)}},O=(e,a)=>{if(a<1)return;const t=i.map(t=>t.id===e?{...t,people:a}:t);x(t)},I=()=>{let e=C;return i.forEach(a=>{a.npcCount&&(e+=a.npcCount*a.quantity)}),e},F=()=>{const e=I();return i.reduce((a,t)=>{let s=0,n=t.customizablePrice&&void 0!==t.customPriceValue?t.customPriceValue:t.cost||0;const r=t.costUnit||"";if(r.includes("silver")&&(n/=20),r.includes("/day")&&!r.includes("/person"))s=n*t.days*t.quantity;else if(r.includes("/week")&&!r.includes("/person"))s=n*Math.ceil(t.days/7)*t.quantity;else if(r.includes("/person/day"))s=n*e*t.days*t.quantity;else if(r.includes("/person/week"))s=n*e*Math.ceil(t.days/7)*t.quantity;else if(!r.includes("/person")||r.includes("/day")||r.includes("/night"))if(r.includes("/night")&&!r.includes("/person"))s=n*t.days*t.quantity;else if(r.includes("/person/night"))s=n*e*t.days*t.quantity;else if(r.includes("/message")||r.includes("/dose")||r.includes("/application"))s=n*t.quantity;else if(t.baseCost){s=(n+(t.additionalCost||0)*e*t.days)*t.quantity}else s=n*t.quantity;else s=n*e*t.quantity;return a+s},0)},$=e=>{const a=Math.floor(e),t=Math.round(20*(e-a));return a>0&&t>0?`${a} gold, ${t} silver`:a>0?a+" gold":t+" silver"};return n.a.createElement("div",{className:"flex flex-col h-screen bg-gray-900 text-white font-sans"},n.a.createElement("header",{className:"bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center"},n.a.createElement("div",{className:"flex items-center space-x-2"},n.a.createElement(g.a,{size:24,className:"text-amber-500"}),n.a.createElement("h1",{className:"text-xl font-bold text-amber-500"},"Ederian Travel Tracker")),n.a.createElement("div",{className:"flex space-x-4 items-center"},n.a.createElement("div",{className:"bg-gray-900 p-2 rounded flex items-center mr-2"},n.a.createElement("span",{className:"text-sm text-gray-400 mr-2"},"PCs:"),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>w(Math.max(1,C-1))},n.a.createElement(p.a,{size:14})),n.a.createElement("span",{className:"mx-2 w-6 text-center"},C),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>w(C+1)},n.a.createElement(y.a,{size:14}))),n.a.createElement("div",{className:"bg-gray-900 p-2 rounded flex items-center mr-2"},n.a.createElement("span",{className:"text-sm text-gray-400 mr-2"},"NPCs:"),n.a.createElement("span",{className:"w-6 text-center"},I()-C)),n.a.createElement("div",{className:"bg-gray-900 p-2 rounded flex items-center mr-2"},n.a.createElement("div",{className:"flex items-center space-x-2"},n.a.createElement("div",null,n.a.createElement("label",{className:"text-sm text-gray-400 mr-2"},"Standard Travel Days:"),n.a.createElement("div",{className:"flex items-center"},n.a.createElement("button",{className:"px-3 py-1 text-xs rounded-l "+(k?"bg-amber-600 text-white":"bg-gray-700 text-gray-300"),onClick:()=>P(!0)},"ON"),n.a.createElement("button",{className:"px-3 py-1 text-xs rounded-r "+(k?"bg-gray-700 text-gray-300":"bg-amber-600 text-white"),onClick:()=>P(!1)},"OFF"))),k&&n.a.createElement("div",{className:"flex items-center"},n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>U(Math.max(1,S-1))},n.a.createElement(p.a,{size:14})),n.a.createElement("span",{className:"mx-2 w-6 text-center"},S),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>{const e=S+1;U(e);const a=i.map(a=>({...a,days:e}));x(a)}},n.a.createElement(y.a,{size:14}))))),n.a.createElement("button",{className:"bg-amber-600 hover:bg-amber-700 p-2 rounded flex items-center space-x-1",onClick:()=>N(!E)},n.a.createElement(b.a,{size:20}),n.a.createElement("span",null,"Cart (",i.length,")")))),n.a.createElement("div",{className:"flex flex-1 overflow-hidden"},n.a.createElement("main",{className:"flex-1 overflow-y-auto p-4"},n.a.createElement("div",{className:"mb-4 flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700"},q.map(t=>n.a.createElement("button",{key:t.id,className:"flex items-center px-4 py-2 mr-2 rounded-lg transition-colors "+(e===t.id?"bg-gray-700 text-amber-500 border border-amber-700":"bg-gray-800 hover:bg-gray-700"),onClick:()=>{return e=t.id,a(e),void r(q.find(a=>a.id===e).categories[0]);var e}},n.a.createElement("span",{className:"mr-2"},t.icon),t.label))),n.a.createElement("div",{className:"mb-6 flex flex-wrap gap-2"},q.find(a=>a.id===e).categories.map(e=>n.a.createElement("button",{key:e,className:"px-3 py-1 text-sm rounded-full transition-colors "+(t===e?"bg-amber-600 text-white":"bg-gray-800 hover:bg-gray-700"),onClick:()=>{r(e)}},A[e]))),"travel"===e&&n.a.createElement("div",{className:"mb-6"},n.a.createElement(j,{travelData:z,playerCount:C,addToCart:R})),n.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},z[e][t].map(e=>n.a.createElement("div",{key:e.id,className:"bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600 transition-colors "+(e.isInfo?"opacity-80":"")},n.a.createElement("div",{className:"p-4"},n.a.createElement("div",{className:"flex items-start justify-between"},n.a.createElement("div",{className:"flex items-center"},n.a.createElement("span",{className:"text-2xl mr-2"},e.image),n.a.createElement("h3",{className:"text-lg font-semibold"},e.name)),!e.isInfo&&n.a.createElement("button",{className:"bg-amber-600 hover:bg-amber-700 p-1.5 rounded-full",onClick:()=>R(e)},n.a.createElement(y.a,{size:16}))),n.a.createElement("div",{className:"mt-2"},n.a.createElement("div",{className:"text-amber-500 font-medium"},e.cost," ",e.costUnit||"",e.baseCost&&e.additionalCost&&` + ${e.additionalCost} ${e.additionalCostUnit||""}`),e.speed&&n.a.createElement("div",{className:"text-gray-400 text-sm"},e.speed),e.npcCount&&n.a.createElement("div",{className:"text-gray-300 text-sm mt-1"},"NPCs: ",e.npcCount),n.a.createElement("p",{className:"text-gray-400 text-sm mt-1"},e.notes||""))))))),n.a.createElement("aside",{className:`w-96 bg-gray-800 border-l border-gray-700 transform transition-transform ${E?"translate-x-0":"translate-x-full"} fixed right-0 top-0 h-screen overflow-y-auto z-10 p-4`},n.a.createElement("div",{className:"flex justify-between items-center mb-4"},n.a.createElement("h2",{className:"text-xl font-bold text-amber-500 flex items-center"},n.a.createElement(b.a,{size:20,className:"mr-2"}),"Your Selection"),n.a.createElement("button",{className:"text-gray-400 hover:text-white",onClick:()=>N(!1)},n.a.createElement(f.a,{size:20}))),0===i.length?n.a.createElement("div",{className:"text-gray-400 p-4 text-center"},n.a.createElement("div",{className:"text-4xl mb-2"},"\ud83d\uded2"),n.a.createElement("p",null,"Your cart is empty"),n.a.createElement("p",{className:"text-sm mt-2"},"Add items from the catalog to begin tracking costs")):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"space-y-4"},i.map(e=>n.a.createElement("div",{key:e.id,className:"bg-gray-900 rounded-lg p-3 relative"},n.a.createElement("button",{className:"absolute top-2 right-2 text-gray-500 hover:text-red-500",onClick:()=>{return a=e.id,void x(i.filter(e=>e.id!==a));var a}},n.a.createElement(f.a,{size:16})),n.a.createElement("div",{className:"flex items-start mb-2"},n.a.createElement("span",{className:"text-2xl mr-2"},e.image),n.a.createElement("div",null,n.a.createElement("h4",{className:"font-medium"},e.name),n.a.createElement("div",{className:"text-sm text-amber-500"},e.cost," ",e.costUnit||"",e.baseCost&&e.additionalCost&&` + ${e.additionalCost} ${e.additionalCostUnit||""}`))),n.a.createElement("div",{className:"space-y-2 mt-3"},e.npcCount?n.a.createElement("div",{className:"mb-2 bg-gray-700 p-2 rounded text-sm"},n.a.createElement("span",{className:"text-amber-400"},"+",e.npcCount)," NPCs added to party"):null,n.a.createElement("div",{className:"flex items-center justify-between"},n.a.createElement("label",{className:"text-sm text-gray-400"},"Quantity:"),n.a.createElement("div",{className:"flex items-center"},n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>M(e.id,e.quantity-1)},n.a.createElement(p.a,{size:14})),n.a.createElement("span",{className:"mx-2 w-6 text-center"},e.quantity),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>M(e.id,e.quantity+1)},n.a.createElement(y.a,{size:14})))),(e.costUnit.includes("/day")||e.costUnit.includes("/night")||e.costUnit.includes("/week")||e.baseCost)&&n.a.createElement("div",{className:"flex items-center justify-between"},n.a.createElement("label",{className:"text-sm text-gray-400"},"Days:"),n.a.createElement("div",{className:"flex items-center"},k?n.a.createElement("div",{className:"bg-amber-700 text-xs px-2 py-1 rounded text-white"},"Standardized: ",S):n.a.createElement(n.a.Fragment,null,n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>T(e.id,e.days-1)},n.a.createElement(p.a,{size:14})),n.a.createElement("span",{className:"mx-2 w-6 text-center"},e.days),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>T(e.id,e.days+1)},n.a.createElement(y.a,{size:14}))))),e.customizablePrice&&n.a.createElement("div",{className:"flex items-center justify-between mt-2"},n.a.createElement("label",{className:"text-sm text-gray-400"},"Custom Gift (per person):"),n.a.createElement("div",{className:"flex items-center"},n.a.createElement("input",{type:"number",min:e.minPrice||0,max:e.maxPrice||100,value:e.customPriceValue,onChange:a=>((e,a)=>{const t=i.map(t=>{if(t.id===e&&t.customizablePrice){const e=Math.min(Math.max(a,t.minPrice||0),t.maxPrice||1e3);return{...t,customPriceValue:e}}return t});x(t)})(e.id,parseInt(a.target.value)||0),className:"w-16 bg-gray-700 border border-gray-600 rounded p-1 text-center text-white"}),n.a.createElement("span",{className:"ml-1 text-amber-500"},"gold"))),e.perPerson&&n.a.createElement("div",{className:"flex items-center justify-between"},n.a.createElement("label",{className:"text-sm text-gray-400"},"People:"),n.a.createElement("div",{className:"flex items-center"},n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>O(e.id,e.people-1)},n.a.createElement(p.a,{size:14})),n.a.createElement("span",{className:"mx-2 w-6 text-center"},e.people),n.a.createElement("button",{className:"p-1 bg-gray-800 rounded hover:bg-gray-700",onClick:()=>O(e.id,e.people+1)},n.a.createElement(y.a,{size:14}))))),n.a.createElement("div",{className:"mt-3 text-right font-medium"},"Subtotal: ",$((e=>{const a=I();let t=0,s=e.customizablePrice&&void 0!==e.customPriceValue?e.customPriceValue:e.cost||0;const n=e.costUnit||"";if(n.includes("silver")&&(s/=20),n.includes("/day")&&!n.includes("/person"))t=s*e.days*e.quantity;else if(n.includes("/week")&&!n.includes("/person"))t=s*Math.ceil(e.days/7)*e.quantity;else if(n.includes("/person/day"))t=s*a*e.days*e.quantity;else if(n.includes("/person/week"))t=s*a*Math.ceil(e.days/7)*e.quantity;else if(!n.includes("/person")||n.includes("/day")||n.includes("/night"))if(n.includes("/night")&&!n.includes("/person"))t=s*e.days*e.quantity;else if(n.includes("/person/night"))t=s*a*e.days*e.quantity;else if(n.includes("/message")||n.includes("/dose")||n.includes("/application"))t=s*e.quantity;else if(e.baseCost){t=(s+(e.additionalCost||0)*a*e.days)*e.quantity}else t=s*e.quantity;else t=s*a*e.quantity;return t})(e)))))),n.a.createElement("div",{className:"mt-6 border-t border-gray-700 pt-4"},n.a.createElement("div",{className:"flex justify-between items-center mb-3"},n.a.createElement("span",{className:"text-gray-400 text-sm"},"Total Party Size:"),n.a.createElement("span",{className:"text-white"},I()," (",C," PCs + ",I()-C," NPCs)")),n.a.createElement("div",{className:"flex justify-between text-lg font-bold mb-1"},n.a.createElement("span",null,"Total:"),n.a.createElement("span",{className:"text-amber-500"},$(F()))),n.a.createElement("p",{className:"text-xs text-gray-400"},"All requisitions by the King's Hand must be properly documented and submitted to the Royal Treasurer's office within 30 days.")),n.a.createElement("button",{className:"w-full bg-amber-600 hover:bg-amber-700 font-bold py-2 rounded-lg mt-4 flex items-center justify-center"},n.a.createElement(g.a,{size:16,className:"mr-2"}),"Generate Requisition Order")))),n.a.createElement("footer",{className:"bg-gray-800 border-t border-gray-700 p-3 sticky bottom-0"},n.a.createElement("div",{className:"flex justify-between items-center"},n.a.createElement("div",{className:"flex items-center space-x-4"},n.a.createElement("div",{className:"flex items-center space-x-2"},n.a.createElement(v.a,{size:16,className:"text-gray-400"}),n.a.createElement("span",{className:"text-sm text-gray-400"},i.length," items selected")),n.a.createElement("div",{className:"text-sm border-l border-gray-600 pl-4"},n.a.createElement("span",{className:"text-gray-400"},"Total Party Size: "),n.a.createElement("span",{className:"font-medium text-white"},I()),n.a.createElement("span",{className:"text-gray-500 text-xs ml-1"},"(",C," PCs + ",I()-C," NPCs)"))),n.a.createElement("div",{className:"flex items-center"},n.a.createElement("span",{className:"mr-2"},"Total Cost:"),n.a.createElement("span",{className:"text-lg font-bold text-amber-500"},$(F()))),n.a.createElement("button",{className:"bg-gray-700 hover:bg-gray-600 p-2 rounded flex items-center space-x-1",onClick:()=>N(!0)},n.a.createElement(b.a,{size:16}),n.a.createElement("span",null,"View Cart"),n.a.createElement(h.a,{size:16})))))};var A=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,36)).then(a=>{let{getCLS:t,getFID:s,getFCP:n,getLCP:r,getTTFB:i}=a;t(e),s(e),n(e),r(e),i(e)})};i.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(q,null))),A()},6:function(e,a,t){e.exports=t(17)}},[[6,1,2]]]);
//# sourceMappingURL=main.d3029fe8.chunk.js.map