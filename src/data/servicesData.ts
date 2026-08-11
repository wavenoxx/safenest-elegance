export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  detailParagraphs: string[];
  images: string[];
  specs: { label: string; value: string }[];
}

export interface CategoryDetail {
  id: string;
  title: string;
  quote: string;
  heroImage: string;
  services: string[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "balcony-invisible-grills": {
    id: "balcony-invisible-grills",
    title: "Balcony Invisible Grills",
    category: "invisible-grills",
    description:
      "Architectural safety panels offering unobstructed skyline views with absolute protection.",
    detailParagraphs: [
      "Your view is a luxury, not a vulnerability. A balcony should be a sanctuary of open horizons, not a source of constant, silent anxiety. Traditional iron grates secure your space by imprisoning it, cutting off the breeze and the skyline. We believe you shouldn't have to compromise.",
      "Using Swiss-engineered 316-grade marine stainless steel cables wrapped in a translucent nylon-12 protective sleeve, we weave an invisible shield. Unyielding to impact, yet completely transparent to the eye. True peace of mind is invisible.",
    ],
    images: ["/images/balcony-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "316 Marine Grade Stainless Steel Core" },
      { label: "Cable Thickness", value: "2.5 mm / 3.0 mm calibrated options" },
      { label: "Tensile Resistance", value: "Up to 450 kg breaking load" },
      { label: "Structural Profile", value: "6063-T6 Structural Aluminum Track" },
      { label: "Warranty Coverage", value: "5-Year Bespoke Warranty" },
    ],
  },
  "staircase-invisible-grills": {
    id: "staircase-invisible-grills",
    title: "Staircase Invisible Grills",
    category: "invisible-grills",
    description:
      "Graceful vertical safety lines running along staircases, securing stairwells without compromising volume.",
    detailParagraphs: [
      "Open volume shouldn't carry hidden risks. Modern stairwells are architectural statements of light and geometry. Traditional railings feel heavy and intrusive, while open voids provoke a silent sense of vertigo for children and elders. We secure the space without closing in the air.",
      "Our staircase safety lines create a translucent architectural screen. It serves as an unyielding structural barrier that blends seamlessly with your handrails, maintaining the spatial elegance of your home's core.",
    ],
    images: ["/images/staircase-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "High-tension stainless steel safety cords" },
      { label: "Spacing Option", value: "3-inch gap density (vertigo prevention)" },
      { label: "Tensile Resistance", value: "400 kg breaking limit" },
      { label: "Mounting Sub-base", value: "Solid wood/marble anchor bolts" },
      { label: "Warranty Coverage", value: "5-Year Bespoke Warranty" },
    ],
  },
  "windows-invisible-grills": {
    id: "windows-invisible-grills",
    title: "Windows Invisible Grills",
    category: "invisible-grills",
    description:
      "Ultra-sleek window safety grids designed to replace bulky, heavy metal iron bars.",
    detailParagraphs: [
      "Eradicate the cage. Traditional iron bars secure your windows but trap your mind, framing every window view with the aesthetics of confinement. Securing your family shouldn't mean living behind bars.",
      "Our window-specific safety grids replace heavy bars with fine, high-tension lines. They fit perfectly inside your existing window sash or sliding channels, letting in 100% of the sunlight while keeping intruders and accidents out.",
    ],
    images: ["/images/windows-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "316 Stainless Steel Core" },
      { label: "Cable Gauge", value: "2.5 mm thin profile" },
      { label: "Tension System", value: "Keyless internal tension lock" },
      { label: "Frame Integration", value: "Flush mounts for sliding/casement tracks" },
      { label: "Warranty Coverage", value: "5-Year Bespoke Warranty" },
    ],
  },
  "child-safety-invisible-grills": {
    id: "child-safety-invisible-grills",
    title: "Child Safety Invisible Grills",
    category: "invisible-grills",
    description:
      "Enhanced safety grids featuring high-density spacing and dual-key tension lockers.",
    detailParagraphs: [
      "Unseen vigilance for what you cherish most. Children explore the world with boundless curiosity and zero fear. For a parent, this means constant, exhausting vigilance near balconies and high windows. Let us carry that guard.",
      "Our child-safety grids feature high-density 2-inch micro-spacing and dual-key tension lockers. It is a silent, unyielding guardian that watches over your toddlers and pets, letting you breathe easy in your own home.",
    ],
    images: ["/images/child-safety-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-duty 3.0 mm stainless steel cables" },
      { label: "Cable Spacing", value: "2-inch micro gap (child-head proof)" },
      { label: "Safety Locking", value: "Double-key manual tension lock" },
      { label: "Tensile Resistance", value: "450 kg breaking load" },
      { label: "Warranty Coverage", value: "5-Year Bespoke Warranty" },
    ],
  },
  "balcony-safety-nets": {
    id: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    category: "core-safety-nets",
    description:
      "UV-stabilized mesh systems wrapping your balcony in a light, unyielding boundary of absolute security.",
    detailParagraphs: [
      "Let the wind flow, without the fear. Balconies are where we connect with the open air, welcoming the breeze and the skyline. But in high-rise residences, that relaxation is often shadowed by a silent vertigo. A single gust of wind or an accidental slip shouldn't define the safety of your home.",
      "Our Balcony Safety Nets wrap your outdoor space in a delicate, high-density mesh. Engineered with UV-stabilized, high-strength polymers, they remain almost weightless to your architecture while offering a soft, unyielding boundary of absolute security.",
    ],
    images: ["/images/balcony-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "UV-Stabilized High-Density Polyethylene (HDPE)" },
      { label: "Mesh Spacing", value: "40 mm x 40 mm square mesh" },
      { label: "Breaking Strength", value: "150 kg per individual mesh strand" },
      { label: "Installation Hardware", value: "Rust-resistant stainless steel wall anchors" },
      { label: "Durability Calibration", value: "Extreme weather & high wind load proof" },
    ],
  },
  "children-safety-nets": {
    id: "children-safety-nets",
    title: "Children Safety Nets",
    category: "core-safety-nets",
    description:
      "Triple-strand safety nets acting as a soft protective cradle to absorb high-velocity impact forces.",
    detailParagraphs: [
      "A safety net for their curiosity. Children explore with zero hesitation, viewing every balcony ledge, window sill, and open stairwell as an invitation to adventure. As parents, we want to give them freedom, but we cannot hold our breath every time they run near the edge.",
      "Our Children Safety Nets create a fail-safe protective barrier. Woven from triple-strand, high-impact polymers, this safety net acts as a soft protective cradle. It absorbs high-velocity impact forces, guarding your toddlers and pets without creating a dark, enclosed feeling.",
    ],
    images: ["/images/children-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Triple-strand braided HDPE mesh" },
      { label: "Mesh Spacing", value: "30 mm x 30 mm micro-gap (blocks tiny hands)" },
      { label: "Breaking Strength", value: "200 kg impact resistance load" },
      { label: "Color Profiles", value: "Translucent off-white or neutral black" },
      { label: "Safety System", value: "Double-lock perimeter stitching" },
    ],
  },
  "staircase-safety-nets": {
    id: "staircase-safety-nets",
    title: "Staircase Safety Nets",
    category: "core-safety-nets",
    description:
      "High-tension safety screens bridging open staircase banisters without blocking light.",
    detailParagraphs: [
      "Secure the vertical void. Grand stairwells and open spiral staircases are the architectural masterpieces of luxury villas and duplexes. Yet, these open volumes present a real, persistent drop hazard for children chasing toys or elders navigating steps.",
      "We bridge the vertical gap without interrupting your home's geometric lines. Our Staircase Safety Nets form a structural, high-tension screen across the banister voids. They provide an elegant, near-weightless safeguard that preserves visual flow and open light.",
    ],
    images: ["/images/staircase-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "100% Virgin copolymer nylon cords" },
      { label: "Knotting profile", value: "Double-knotted non-slip mesh junctions" },
      { label: "Tensile Resistance", value: "180 kg breaking load" },
      { label: "Perimeter Support", value: "6 mm heavy border rope anchoring" },
      { label: "Warranty Coverage", value: "5-Year Bespoke Warranty" },
    ],
  },
"building-safety-nets": {
    id: "building-safety-nets",
    title: "Building Safety Nets",
    category: "core-safety-nets",
    description:
      "Heavy industrial-grade perimeter mesh shields designed to catch falling tools or debris.",
    detailParagraphs: [
      "An engineering shield for the vertical perimeter. High-rise construction and vertical maintenance require absolute, fail-safe parameters. Falling objects from height carry devastating kinetic force, putting residents, workers, and passing pedestrians at risk.",
      "Our Building Safety Nets wrap the outer facade in heavy-duty industrial mesh. Engineered to catch falling tools, structural debris, or maintenance personnel, this safety net provides an impenetrable boundary of protection, securing both the crew above and the street below.",
    ],
    images: ["/images/building-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Heavy industrial-grade nylon/polypropylene" },
      { label: "Mesh Thickness", value: "4.0 mm heavy-gauge cord" },
      { label: "Containment Matrix", value: "Inner micro-liner backing (catches tiny screws)" },
      { label: "Breaking Strength", value: "500 kg+ impact catch capacity" },
      { label: "Industrial Standard", value: "Meets IS-5175 safety specifications" },
    ],
  },
  "construction-safety-nets": {
    id: "construction-safety-nets",
    title: "Construction Safety Nets",
    category: "construction-industrial",
    description: "Heavy-duty perimeter safety netting designed to protect high-rise crews and contain falling structural debris.",
    detailParagraphs: [
      "Safeguarding the path of structural rise. High-altitude construction is a dynamic zone of progress, but it is also a terrain of absolute physical risk. Gravity represents an unyielding hazard for your working crew at every open slab edge, scaffold, and elevator shaft.",
      "Our Construction Safety Nets provide a heavy-duty containment perimeter. Woven from high-tenacity industrial fibers, they absorb extreme kinetic impacts, serving as a life-saving catch system that protects workers from falls and traps structural debris.",
    ],
    images: ["/images/construction-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Tenacity Polypropylene (PP) / Nylon" },
      { label: "Mesh Diameter", value: "3.0 mm heavy-gauge cord" },
      { label: "Knot Construction", value: "Solid knotless weave (prevents strand slippage)" },
      { label: "Impact Capacity", value: "Catches up to 350 kg kinetic drop force" },
      { label: "Standards Compliance", value: "Conforms to IS-11057 safety regulations" },
    ],
  },
  "industrial-safety-nets": {
    id: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    category: "construction-industrial",
    description: "Fail-safe horizontal safety netting layouts engineered for factories, warehouses, and overhead maintenance zones.",
    detailParagraphs: [
      "Zero compromise for high-altitude zones. Modern industrial plants, factories, and warehouses feature massive overhead cranes, high rafters, and deep mezzanine configurations. A single tool falling from high walkways or a misstep during high-level maintenance carries catastrophic consequences.",
      "Our Industrial Safety Nets establish a fail-safe horizontal canopy. Engineered with high-strength, flame-retardant polymers, they form an unyielding catch layer below overhead work zones, allowing ground operations to run smoothly without fear.",
    ],
    images: ["/images/industrial-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-duty flame-retardant nylon filaments" },
      { label: "Mesh Spacing", value: "25 mm x 25 mm square mesh (catches tiny tools)" },
      { label: "Tensile Resistance", value: "250 kg breaking force load" },
      { label: "Border Support", value: "10 mm heavy border cord with steel shackles" },
      { label: "Property Calibration", value: "Flame retardant & high UV resistance" },
    ],
  },
  "terrace-top-nets": {
    id: "terrace-top-nets",
    title: "Terrace Top Nets",
    category: "construction-industrial",
    description: "High-tension perimeter nets extending rooftop borders to secure open sky terrace spaces.",
    detailParagraphs: [
      "Unbounded sky, absolute boundaries. Terraces are the luxury crowns of residential structures—spaces of relaxation, rooftop gatherings, and starry nights. But an open terrace perimeter on high floors creates a subtle, persistent anxiety, especially for parents and pet owners.",
      "Our Terrace Top Nets form an elegant, high-tension safety wall. By extending your terrace parapet with near-invisible, ultra-strong HDPE vertical lines, we secure the entire perimeter. You can enjoy the open sky and vertical vistas with complete peace of mind.",
    ],
    images: ["/images/terrace-top-nets.png"],
    specs: [
      { label: "Material Composition", value: "Monofilament UV-Stabilized Polyethylene" },
      { label: "Line Spacing", value: "1.5-inch grid layout (pet & bird proof)" },
      { label: "Height Calibration", value: "Custom vertical spans from 5 ft to 12 ft" },
      { label: "Anchor Track", value: "Powder-coated structural steel anchor tracks" },
      { label: "Tension Limit", value: "120 kg tension threshold" },
    ],
  },
  "car-parking-safety-nets": {
    id: "car-parking-safety-nets",
    title: "Car Parking Safety Nets",
    category: "construction-industrial",
    description: "Overhead safety mesh shields designed to protect parked vehicles from falling concrete or objects.",
    detailParagraphs: [
      "Silent protection for your valuable assets. Multi-level parking blocks and open residential parking courts face constant exposure to debris, falling concrete plaster, or objects accidentally dropped from balconies above. A tiny piece of stone dropped from height can fracture glass and damage luxury vehicles.",
      "Our Car Parking Safety Nets establish a robust overhead canopy. Crafted from impact-absorbing HDPE mesh, they catch falling debris, construction plaster, or dropped items, shielding your parked cars and parking bays with silent, structural vigilance.",
    ],
    images: ["/images/car-parking-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Density Polyethylene monofilament" },
      { label: "Mesh Configuration", value: "Dual-layer micro-pore mesh (catches concrete chips)" },
      { label: "Debris Containment", value: "Absorbs up to 80 kg debris falls" },
      { label: "Shading Properties", value: "50% UV Block (paint protection shading)" },
      { label: "Mounting Support", value: "Tensioned wire rope cable framework" },
    ],
  },
  "pigeon-safety-nets": {
    id: "pigeon-safety-nets",
    title: "Pigeon Safety Nets",
    category: "animal-bird-protection",
    description: "Translucent high-density mesh barriers designed to completely block bird access to balconies and windows.",
    detailParagraphs: [
      "Preserve the purity of your sanctuary. Pigeons bring life to the sky, but on your balcony or window sills, they bring health hazards, persistent noise, and acidic droppings that erode masonry. You deserve to enjoy your outdoor lounge without constant cleaning chores or health worries.",
      "Our Pigeon Safety Nets weave a translucent, high-density barrier. Custom-framed to your openings, they completely block bird access while remaining almost invisible to the eye, ensuring your terrace or balcony stays clean and sanitized.",
    ],
    images: ["/images/pigeon-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "UV-Stabilized High-Density Polyethylene (HDPE)" },
      { label: "Mesh Grid Spacing", value: "30 mm x 30 mm square mesh (small bird proof)" },
      { label: "Breaking Strength", value: "80 kg per mesh strand" },
      { label: "Color Profile", value: "Transparent monofilament / stone-gray mesh" },
      { label: "Attachment Hooks", value: "Premium polycarbonate wall hooks" },
    ],
  },
  "pigeons-bird-spikes": {
    id: "pigeons-bird-spikes",
    title: "Pigeons Bird Spikes",
    category: "animal-bird-protection",
    description: "Sleek polycarbonate and stainless steel spike tracks providing non-harmful deterrence for ledges.",
    detailParagraphs: [
      "Silent deterrence for architectural edges. Parapet walls, window ledges, and external air conditioning boxes are prime nesting spots. Blocking these specific ledges with netting can disrupt window sightlines. Our bird spikes offer a non-harmful, elegant alternative.",
      "Constructed from high-tensile stainless steel spikes mounted on a polycarbonate track, they modify ledges so birds cannot land or roost. Your building exterior remains clean, and the architectural lines stay razor-sharp and undisturbed.",
    ],
    images: ["/images/pigeons-bird-spikes.png"],
    specs: [
      { label: "Spike Material", value: "Marine Grade 316 Stainless Steel Spikes" },
      { label: "Base Track", value: "UV-Resistant Polycarbonate track" },
      { label: "Spike Density", value: "40 spikes per foot (multi-angle array)" },
      { label: "Installation Method", value: "High-tack outdoor structural adhesive" },
      { label: "Safety Rating", value: "Rounded tips (deters without injury)" },
    ],
  },
  "monkey-safety-nets": {
    id: "monkey-safety-nets",
    title: "Monkey Safety Nets",
    category: "animal-bird-protection",
    description: "Heavy-duty steel-reinforced safety nets designed to prevent animal intrusions.",
    detailParagraphs: [
      "Untearable perimeters for quiet peace of mind. In regions bordering forest reserves or green belts, monkey troops frequently move into balconies and open residential windows. Standard window screens are easily torn by sharp claws, leading to home invasions and danger to kids.",
      "Our Monkey Safety Nets are built to withstand physical force. Woven from heavy-duty, multi-strand steel-reinforced cores or thick-gauge HDPE monofilament, they create an untearable structural screen, keeping wild intruders outside while you relax inside.",
    ],
    images: ["/images/monkey-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-gauge HDPE (2.5 mm thread) or steel core" },
      { label: "Mesh Grid Spacing", value: "50 mm x 50 mm heavy-duty mesh" },
      { label: "Tensile Resistance", value: "Catches up to 300 kg physical force" },
      { label: "Anchoring System", value: "Heavy steel border ropes tensioned to walls" },
      { label: "Special Property", value: "Chew-proof and claw-resistant coating" },
    ],
  },
  "mosquito-safety-nets": {
    id: "mosquito-safety-nets",
    title: "Mosquito Safety Nets",
    category: "animal-bird-protection",
    description: "Breathable micro-pore fiberglass window frames blocking mosquitoes and vectors.",
    detailParagraphs: [
      "Natural ventilation, zero vectors. Sleeping under the constant threat of mosquitoes creates a restless home environment. Standard chemical coils are toxic to breathe, and heavy glass sashes cut off the cool evening breeze. We offer a breathable shield.",
      "Our Mosquito Safety Nets use high-definition micro-pore fiberglass meshes. Custom fitted to slide or hinge flush inside your window frames, they keep out even the smallest insect vectors while letting in 100% of the natural cool breeze.",
    ],
    images: ["/images/mosquito-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Definition Micro-pore Fiberglass mesh" },
      { label: "Mesh Grid Density", value: "18 x 16 threads per square inch" },
      { label: "Frame Track", value: "Extruded powder-coated aluminum track" },
      { label: "Hinges & Seals", value: "Magnetic strip seal / sliding track option" },
      { label: "Transparency", value: "High-transparency charcoal glare-free weave" },
    ],
  },
  "sports-practice-nets": {
    id: "sports-practice-nets",
    title: "Sports Practice Nets",
    category: "specialty-solutions",
    description: "High-impact nylon netting grids custom-tensioned to create private practice zones.",
    detailParagraphs: [
      "Unleash their energy, secure the surrounding. Play is a vital expression of freedom, but in compact urban layouts, a stray cricket shot or a soccer kick carries constant property risk. A broken window or a damaged vehicle shouldn't put an end to the game.",
      "Our Sports Practice Nets create a private, high-performance sports enclosure. Woven from impact-absorbing, high-tenacity nylon cords, they catch and contain high-velocity balls instantly, letting your family play freely while keeping your villa or compound perfectly safe.",
    ],
    images: ["/images/cricket-sports-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Tensile UV-Stabilized Nylon cords" },
      { label: "Mesh Grid Spacing", value: "20 mm / 40 mm custom sizing options" },
      { label: "Breaking Force Limit", value: "160 kg tensile load resistance" },
      { label: "Perimeter Borders", value: "Tensioned galvanized wire rope boundaries" },
      { label: "Visual Color Profile", value: "Charcoal-black glare-free landscaping weave" },
    ],
  },
  "coconut-safety-nets": {
    id: "coconut-safety-nets",
    title: "Coconut Safety Nets",
    category: "specialty-solutions",
    description: "Suspended heavy-duty net canopies catching falling coconuts to safeguard paths and cars.",
    detailParagraphs: [
      "Quiet vigilance for tropical spaces. Coconut palms define the natural, sun-drenched elegance of South Indian estates. Yet, a single mature coconut dropping from a high rafter falls with immense kinetic force—easily fracturing windshields, damaging panels, or causing severe head trauma.",
      "We preserve the palm trees while eradicating the danger. Our Coconut Safety Nets form a high-altitude suspended canopy. Woven from heavy-duty polymers, they catch falling coconuts silently, protecting pathways, cars, and family members without compromising your garden's aesthetic.",
    ],
    images: ["/images/coconut-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "100% Virgin HDPE heavy monofilament" },
      { label: "Mesh Grid Configuration", value: "50 mm x 50 mm reinforced diamond mesh" },
      { label: "Load Capacity", value: "Supports drops up to 100 kg from 40 ft height" },
      { label: "Border Anchoring", value: "8 mm heavy-duty braided perimeter cords" },
      { label: "Lifespan Rating", value: "Rot-resistant & completely waterproof build" },
    ],
  },
  "swimming-pool-nets": {
    id: "swimming-pool-nets",
    title: "Swimming Pool Nets",
    category: "specialty-solutions",
    description: "High-tension pool safety covers stretched flush across the water to prevent submersion.",
    detailParagraphs: [
      "Absolute pool safety, preserved view. A swimming pool is the cooling centerpiece of your villa architecture. But for parents of toddlers and pet owners, it can provoke constant anxiety. Traditional metal fences or glass gates block visual lines, ruining the open layout of your garden.",
      "Our Swimming Pool Nets provide a sleek, high-tension safety cover. Stretched flush across the pool surface and anchored to the deck, the net holds the weight of a child and adult, preventing accidental immersion while keeping the water view completely open.",
    ],
    images: ["/images/swimming-pool-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "4.0 mm UV-Treated Polyethylene cords" },
      { label: "Mesh Grid Spacing", value: "80 mm x 80 mm (blocks child crawling drops)" },
      { label: "Load Support Weight", value: "Holds up to 120 kg tension weight" },
      { label: "Deck Anchoring keys", value: "Flush brass key anchors (lies flat with deck)" },
      { label: "Tensioner Mechanism", value: "Central pulley system for quick removal" },
    ],
  },
  "cloth-drying-hangers": {
    id: "cloth-drying-hangers",
    title: "Cloth Drying Hangers",
    category: "specialty-solutions",
    description: "Ceiling-mounted pulley drying racks utilizing the overhead space to keep balconies clean.",
    detailParagraphs: [
      "Eradicate laundry clutter, reclaim your space. A luxurious balcony view shouldn't be spoiled by wet laundry draped over glass railings and bulky folding drying racks. Traditional floor racks take up valuable space, making a premium balcony look untidy.",
      "Our Ceiling-Mounted Cloth Drying Hangers offer an elegant solution. Engineered with a smooth pulley system, they let you dry your laundry in the unused ceiling zone. Crafted from rust-free anodized aluminum rods, they keep your clothes elevated and your balcony layout clean and open.",
    ],
    images: ["/images/cloth-drying-hangers.png"],
    specs: [
      { label: "Material Profile", value: "Rust-free anodized structural aluminum tubes" },
      { label: "Pulley System", value: "Dual-shaft nylon cord pulley blocks" },
      { label: "Max Load Limit", value: "Supports up to 25 kg wet laundry load weight" },
      { label: "Rods Count", value: "4 to 6 individual ceiling-suspended tubes" },
      { label: "Floor Space Saved", value: "Saves 100% balcony ground area" },
    ],
  },
};

export const categoriesData: Record<string, CategoryDetail> = {
  "invisible-grills": {
    id: "invisible-grills",
    title: "Invisible Grills",
    quote:
      "Minimalism meets absolute protection — structural lines that melt into the horizon.",
    heroImage:
      "/images/hero-invisible-grills.png",
    services: [
      "balcony-invisible-grills",
      "staircase-invisible-grills",
      "windows-invisible-grills",
      "child-safety-invisible-grills",
    ],
  },
  "core-safety-nets": {
    id: "core-safety-nets",
    title: "Core Safety Nets",
    quote:
      "A structural envelope of calm — defining the boundary between open space and absolute protection.",
    heroImage:
      "/images/hero-core-safety-nets.png",
    services: [
      "balcony-safety-nets",
      "children-safety-nets",
      "staircase-safety-nets",
      "building-safety-nets",
    ],
  },
  "construction-industrial": {
    id: "construction-industrial",
    title: "Construction & Industrial",
    quote:
      "Architectural integrity at every stage — structural perimeters designed to absorb forces and secure the void.",
    heroImage:
      "/images/hero-construction-industrial.png",
    services: [
      "construction-safety-nets",
      "industrial-safety-nets",
      "terrace-top-nets",
      "car-parking-safety-nets",
    ],
  },
  "animal-bird-protection": {
    id: "animal-bird-protection",
    title: "Animal & Bird Protection",
    quote:
      "Coexistence without intrusion — preserving the cleanliness of your architecture and the peace of your sanctuary.",
    heroImage:
      "/images/hero-animal-bird-protection.png",
    services: [
      "pigeon-safety-nets",
      "pigeons-bird-spikes",
      "monkey-safety-nets",
      "mosquito-safety-nets",
    ],
  },
  "specialty-solutions": {
    id: "specialty-solutions",
    title: "Specialty Solutions",
    quote:
      "Engineered convenience, tailored protection — securing the active dimensions of modern living.",
    heroImage:
      "/images/hero-specialty-solutions.png",
    services: [
      "sports-practice-nets",
      "coconut-safety-nets",
      "swimming-pool-nets",
      "cloth-drying-hangers",
    ],
  },
};
