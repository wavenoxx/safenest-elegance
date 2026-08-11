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
      "Architectural safety panels offering unobstructed skyline views with precision-engineered fall protection.",
    detailParagraphs: [
      "Your view is a luxury, not a vulnerability. A balcony should be a sanctuary of open horizons, not a source of constant anxiety. Traditional iron grates secure your space by enclosing it, cutting off the breeze and the skyline. We believe you shouldn't have to compromise on natural light or aesthetic calm.",
      "Using precision-engineered AISI 316 marine-grade stainless steel cables wrapped in a translucent nylon-12 protective sleeve, we install an architectural barrier. High tensile resistance paired with high transparency allows you to enjoy true peace of mind.",
    ],
    images: ["/images/balcony-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "AISI 316 Marine Grade Stainless Steel Core" },
      { label: "Cable Thickness", value: "2.5 mm / 3.0 mm calibrated options" },
      { label: "Tensile Resistance", value: "High-tensile structural breaking capacity" },
      { label: "Structural Profile", value: "6063-T6 Structural Aluminum Track" },
      {
        label: "Warranty Terms",
        value: "Warranty coverage varies by system; see written warranty terms",
      },
    ],
  },
  "staircase-invisible-grills": {
    id: "staircase-invisible-grills",
    title: "Staircase Invisible Grills",
    category: "invisible-grills",
    description:
      "Graceful vertical safety lines running along staircases, securing stairwells without compromising volume.",
    detailParagraphs: [
      "Open volume shouldn't carry hidden risks. Modern stairwells are architectural statements of light and geometry. Traditional railings feel heavy and intrusive, while open voids provoke anxiety for children and elders. We secure the space without closing in the air.",
      "Our staircase safety lines create a translucent architectural screen. It serves as a structural barrier that blends seamlessly with your handrails, maintaining the spatial elegance of your home's core.",
    ],
    images: ["/images/staircase-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "High-tension stainless steel safety cords" },
      { label: "Spacing Option", value: "3-inch gap density (stair void protection)" },
      { label: "Tensile Resistance", value: "High-tensile multi-point load resistance" },
      { label: "Mounting Sub-base", value: "Solid wood/marble anchor bolts" },
      {
        label: "Warranty Terms",
        value: "Warranty coverage varies by system; see written warranty terms",
      },
    ],
  },
  "windows-invisible-grills": {
    id: "windows-invisible-grills",
    title: "Windows Invisible Grills",
    category: "invisible-grills",
    description:
      "Ultra-sleek window safety grids designed to replace bulky, heavy metal iron bars.",
    detailParagraphs: [
      "Eradicate the cage. Traditional iron bars secure your windows but trap your mind, framing every window view with the aesthetics of confinement. Securing your family shouldn't mean living behind heavy grates.",
      "Our window-specific safety grids replace heavy bars with fine, high-tension lines. They fit neatly inside your existing window sash or sliding channels, maximizing natural daylight while safeguarding against accidental falls.",
    ],
    images: ["/images/windows-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "AISI 316 Stainless Steel Core" },
      { label: "Cable Gauge", value: "2.5 mm thin profile" },
      { label: "Tension System", value: "Internal tension lock" },
      { label: "Frame Integration", value: "Flush mounts for sliding/casement tracks" },
      {
        label: "Warranty Terms",
        value: "Warranty coverage varies by system; see written warranty terms",
      },
    ],
  },
  "child-safety-invisible-grills": {
    id: "child-safety-invisible-grills",
    title: "Child Safety Invisible Grills",
    category: "invisible-grills",
    description:
      "Enhanced safety grids featuring high-density micro-spacing and dual-key tension lockers.",
    detailParagraphs: [
      "Unseen vigilance for what you cherish most. Children explore the world with boundless curiosity and little hesitation. For a parent, this means constant vigilance near balconies and high windows. SafeNest provides an architectural safeguard.",
      "Our child-safety grids feature high-density 2-inch micro-spacing and dual-key tension lockers. It serves as a calm, protective boundary that watches over your toddlers and pets, letting you breathe easy in your own home.",
    ],
    images: ["/images/child-safety-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-duty 3.0 mm stainless steel cables" },
      { label: "Cable Spacing", value: "2-inch micro-gap child safety spacing" },
      { label: "Safety Locking", value: "Double-key manual tension lock" },
      { label: "Tensile Resistance", value: "High-tensile structural load rating" },
      {
        label: "Warranty Terms",
        value: "Warranty coverage varies by system; see written warranty terms",
      },
    ],
  },
  "balcony-safety-nets": {
    id: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    category: "core-safety-nets",
    description:
      "UV-stabilized mesh systems wrapping your balcony in a light, durable boundary of perimeter security.",
    detailParagraphs: [
      "Let the wind flow, without the fear. Balconies are where we connect with the open air, welcoming the breeze and the skyline. But in high-rise residences, that relaxation is often shadowed by subtle vertigo. A single gust of wind or an accidental slip shouldn't compromise peace of mind.",
      "Our Balcony Safety Nets wrap your outdoor space in a high-density mesh. Engineered with UV-stabilized, high-strength polymers, they remain almost weightless to your architecture while offering a durable perimeter boundary.",
    ],
    images: ["/images/balcony-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "UV-Stabilized High-Density Polyethylene (HDPE)" },
      { label: "Mesh Spacing", value: "40 mm x 40 mm square mesh" },
      { label: "Breaking Strength", value: "High-tensile polymer strand weave" },
      { label: "Installation Hardware", value: "Rust-resistant stainless steel wall anchors" },
      { label: "Durability Calibration", value: "Weather-resistant UV-stabilized finish" },
    ],
  },
  "children-safety-nets": {
    id: "children-safety-nets",
    title: "Children Safety Nets",
    category: "core-safety-nets",
    description:
      "Triple-strand safety nets engineered as a soft protective barrier to help absorb impact forces.",
    detailParagraphs: [
      "A safety net for their curiosity. Children explore with enthusiasm, viewing every balcony ledge, window sill, and open stairwell as an invitation to adventure. As parents, we want to give them freedom without constant worry near elevated edges.",
      "Our Children Safety Nets create an engineered perimeter barrier. Woven from triple-strand, high-impact polymers, this safety net acts as a soft protective cradle. It absorbs impact forces, guarding toddlers and pets without creating a dark, enclosed feeling.",
    ],
    images: ["/images/children-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Triple-strand braided HDPE mesh" },
      { label: "Mesh Spacing", value: "30 mm x 30 mm micro-gap configuration" },
      { label: "Breaking Strength", value: "Impact-absorbing multi-strand load resistance" },
      { label: "Color Profiles", value: "Translucent neutral or stone tone" },
      { label: "Safety System", value: "Double-lock perimeter border stitching" },
    ],
  },
  "staircase-safety-nets": {
    id: "staircase-safety-nets",
    title: "Staircase Safety Nets",
    category: "core-safety-nets",
    description:
      "High-tension safety screens bridging open staircase banisters without blocking light.",
    detailParagraphs: [
      "Secure the vertical void. Grand stairwells and open spiral staircases are the architectural highlights of modern duplexes and villas. Yet, open volumes present a real drop hazard for children and elders.",
      "We bridge the vertical gap without interrupting your home's geometric lines. Our Staircase Safety Nets form a structural, high-tension screen across banister voids, providing a lightweight safeguard that preserves natural light.",
    ],
    images: ["/images/staircase-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-grade virgin copolymer nylon cords" },
      { label: "Knotting profile", value: "Double-knotted non-slip mesh junctions" },
      { label: "Tensile Resistance", value: "High-load breaking threshold" },
      { label: "Perimeter Support", value: "Heavy border rope anchoring" },
      {
        label: "Warranty Terms",
        value: "Warranty coverage varies by system; see written warranty terms",
      },
    ],
  },
  "building-safety-nets": {
    id: "building-safety-nets",
    title: "Building Safety Nets",
    category: "core-safety-nets",
    description:
      "Industrial-grade perimeter mesh shields designed to contain falling debris and secure building perimeters.",
    detailParagraphs: [
      "An engineering shield for the vertical perimeter. High-rise structures and vertical maintenance require structured perimeter containment. Falling objects from height carry significant kinetic force, posing risks to pedestrians and property below.",
      "Our Building Safety Nets wrap the outer facade in heavy-duty industrial mesh. Engineered to catch falling tools and structural debris, this perimeter netting secures work zones and grounds below.",
    ],
    images: ["/images/building-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Heavy industrial-grade nylon/polypropylene" },
      { label: "Mesh Thickness", value: "4.0 mm heavy-gauge cord" },
      { label: "Containment Matrix", value: "Micro-liner backing for small debris containment" },
      { label: "Breaking Strength", value: "High-impact kinetic catch capacity" },
      { label: "Engineering Standard", value: "High-tenacity perimeter containment weave" },
    ],
  },
  "construction-safety-nets": {
    id: "construction-safety-nets",
    title: "Construction Safety Nets",
    category: "construction-industrial",
    description:
      "Heavy-duty perimeter safety netting designed to protect crews and contain falling structural debris.",
    detailParagraphs: [
      "Safeguarding the path of structural rise. High-altitude construction is a dynamic zone of progress, where gravity represents a continuous hazard at open slab edges, scaffolds, and elevator shafts.",
      "Our Construction Safety Nets provide a heavy-duty containment perimeter. Woven from high-tenacity industrial fibers, they absorb kinetic impacts, serving as a catch system that helps protect workers and contains falling debris.",
    ],
    images: ["/images/construction-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Tenacity Polypropylene (PP) / Nylon" },
      { label: "Mesh Diameter", value: "3.0 mm heavy-gauge cord" },
      { label: "Knot Construction", value: "Solid knotless weave (prevents strand slippage)" },
      { label: "Impact Capacity", value: "Engineered kinetic drop containment" },
      { label: "Engineering Standard", value: "Reinforced industrial debris catch matrix" },
    ],
  },
  "industrial-safety-nets": {
    id: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    category: "construction-industrial",
    description:
      "Horizontal safety netting layouts engineered for factories, warehouses, and overhead maintenance zones.",
    detailParagraphs: [
      "Engineered protection for high-altitude facilities. Modern industrial plants and warehouses feature overhead cranes, high rafters, and deep mezzanine configurations where dropped tools carry substantial risk.",
      "Our Industrial Safety Nets establish a structural horizontal canopy. Engineered with high-strength polymer netting, they form a protective catch layer below overhead work zones, allowing ground operations to proceed with greater security.",
    ],
    images: ["/images/industrial-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-strength polymer filaments" },
      { label: "Mesh Spacing", value: "25 mm x 25 mm square mesh" },
      { label: "Tensile Resistance", value: "High breaking force capacity" },
      { label: "Border Support", value: "10 mm heavy border cord with steel shackles" },
      { label: "Property Calibration", value: "High UV and environmental resistance" },
    ],
  },
  "terrace-top-nets": {
    id: "terrace-top-nets",
    title: "Terrace Top Nets",
    category: "construction-industrial",
    description:
      "High-tension perimeter nets extending rooftop borders to secure open sky terrace spaces.",
    detailParagraphs: [
      "Unbounded sky, secure boundaries. Terraces are the luxury crowns of residential structures—spaces of relaxation, rooftop gatherings, and starry nights. An open terrace perimeter on high floors can create subtle anxiety for parents and pet owners.",
      "Our Terrace Top Nets form an elegant, high-tension safety wall. By extending your terrace parapet with near-invisible, high-strength HDPE vertical lines, we secure the perimeter so you can enjoy open vertical vistas in comfort.",
    ],
    images: ["/images/terrace-top-nets.png"],
    specs: [
      { label: "Material Composition", value: "Monofilament UV-Stabilized Polyethylene" },
      { label: "Line Spacing", value: "1.5-inch grid layout (pet & bird barrier)" },
      { label: "Height Calibration", value: "Custom vertical spans from 5 ft to 12 ft" },
      { label: "Anchor Track", value: "Powder-coated structural steel anchor tracks" },
      { label: "Tension Limit", value: "Calibrated tension threshold" },
    ],
  },
  "car-parking-safety-nets": {
    id: "car-parking-safety-nets",
    title: "Car Parking Safety Nets",
    category: "construction-industrial",
    description:
      "Overhead safety mesh shields designed to protect parked vehicles from falling debris or objects.",
    detailParagraphs: [
      "Protection for your valuable assets. Multi-level parking blocks and open residential parking courts face exposure to debris, falling plaster, or objects accidentally dropped from balconies above.",
      "Our Car Parking Safety Nets establish a robust overhead canopy. Crafted from impact-absorbing HDPE mesh, they catch falling debris and dropped items, shielding vehicles and parking bays with silent vigilance.",
    ],
    images: ["/images/car-parking-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Density Polyethylene monofilament" },
      { label: "Mesh Configuration", value: "Dual-layer micro-pore mesh" },
      { label: "Debris Containment", value: "Absorbs small to medium debris falls" },
      { label: "Shading Properties", value: "Partial UV blocking shade" },
      { label: "Mounting Support", value: "Tensioned wire rope cable framework" },
    ],
  },
  "pigeon-safety-nets": {
    id: "pigeon-safety-nets",
    title: "Pigeon Safety Nets",
    category: "animal-bird-protection",
    description:
      "Translucent high-density mesh barriers designed to block bird access to balconies and windows.",
    detailParagraphs: [
      "Preserve the purity of your sanctuary. Pigeons bring health concerns, persistent noise, and acidic droppings that erode masonry. You deserve to enjoy your outdoor lounge without constant cleaning chores.",
      "Our Pigeon Safety Nets weave a translucent, high-density barrier. Custom-framed to your openings, they block bird access while remaining subtle to the eye, ensuring your terrace or balcony stays clean and sanitized.",
    ],
    images: ["/images/pigeon-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "UV-Stabilized High-Density Polyethylene (HDPE)" },
      { label: "Mesh Grid Spacing", value: "30 mm x 30 mm square mesh" },
      { label: "Breaking Strength", value: "High-tenacity polymer strand rating" },
      { label: "Color Profile", value: "Transparent monofilament / stone-gray mesh" },
      { label: "Attachment Hooks", value: "Durable polycarbonate wall hooks" },
    ],
  },
  "pigeons-bird-spikes": {
    id: "pigeons-bird-spikes",
    title: "Pigeons Bird Spikes",
    category: "animal-bird-protection",
    description:
      "Sleek polycarbonate and stainless steel spike tracks providing humane deterrence for ledges.",
    detailParagraphs: [
      "Silent deterrence for architectural edges. Parapet walls, window ledges, and external air conditioning boxes are common roosting spots. Our bird spikes offer a humane, elegant alternative to netting on narrow ledges.",
      "Constructed from high-tensile stainless steel spikes mounted on a polycarbonate track, they modify ledges so birds cannot land or roost. Your building exterior remains clean while architectural lines stay sharp.",
    ],
    images: ["/images/pigeons-bird-spikes.png"],
    specs: [
      { label: "Spike Material", value: "AISI 316 Stainless Steel Spikes" },
      { label: "Base Track", value: "UV-Resistant Polycarbonate track" },
      { label: "Spike Density", value: "Multi-angle array per linear foot" },
      { label: "Installation Method", value: "High-tack outdoor structural adhesive" },
      { label: "Safety Rating", value: "Rounded tips (deters without harming birds)" },
    ],
  },
  "monkey-safety-nets": {
    id: "monkey-safety-nets",
    title: "Monkey Safety Nets",
    category: "animal-bird-protection",
    description:
      "Heavy-duty reinforced safety nets designed to prevent animal intrusions into living spaces.",
    detailParagraphs: [
      "Durable perimeters for peaceful living. In areas bordering green belts or hillsides, wildlife intrusions into balconies and windows can pose real safety concerns for children and pets.",
      "Our Monkey Safety Nets are built with reinforced polymer cords. They create a strong structural screen that keeps wild animals outside while preserving natural ventilation.",
    ],
    images: ["/images/monkey-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-gauge HDPE (2.5 mm thread) or steel core" },
      { label: "Mesh Grid Spacing", value: "50 mm x 50 mm heavy-duty mesh" },
      { label: "Tensile Resistance", value: "High physical barrier load capacity" },
      { label: "Anchoring System", value: "Heavy steel border ropes tensioned to walls" },
      { label: "Special Property", value: "Reinforced tear-resistant construction" },
    ],
  },
  "mosquito-safety-nets": {
    id: "mosquito-safety-nets",
    title: "Mosquito Safety Nets",
    category: "animal-bird-protection",
    description:
      "Breathable micro-pore fiberglass window frames blocking mosquitoes and flying insects.",
    detailParagraphs: [
      "Natural ventilation, zero vectors. Sleeping under the threat of mosquitoes disrupts restful home life. Chemical repellents can irritate breathing, while closed glass sashes trap indoor air. We offer a breathable alternative.",
      "Our Mosquito Safety Nets use high-definition micro-pore fiberglass mesh. Custom-fitted to slide or hinge flush inside your window frames, they keep out flying insects while maximizing natural airflow.",
    ],
    images: ["/images/mosquito-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Definition Micro-pore Fiberglass mesh" },
      { label: "Mesh Grid Density", value: "18 x 16 threads per square inch" },
      { label: "Frame Track", value: "Extruded powder-coated aluminum track" },
      { label: "Hinges & Seals", value: "Magnetic strip seal / sliding track option" },
      { label: "Transparency", value: "High-transparency glare-free weave" },
    ],
  },
  "sports-practice-nets": {
    id: "sports-practice-nets",
    title: "Sports Practice Nets",
    category: "specialty-solutions",
    description:
      "High-impact nylon netting grids custom-tensioned to create private practice zones.",
    detailParagraphs: [
      "Unleash their energy, secure the surroundings. In residential communities, stray sports balls carry property and window damage risks. A broken window shouldn't halt healthy recreation.",
      "Our Sports Practice Nets create a private sports enclosure. Woven from high-tenacity nylon cords, they catch and contain high-velocity balls, letting your family play freely while keeping surroundings secure.",
    ],
    images: ["/images/cricket-sports-nets.png"],
    specs: [
      { label: "Material Composition", value: "High-Tensile UV-Stabilized Nylon cords" },
      { label: "Mesh Grid Spacing", value: "20 mm / 40 mm custom sizing options" },
      { label: "Breaking Force Limit", value: "High tensile load resistance" },
      { label: "Perimeter Borders", value: "Tensioned wire rope boundaries" },
      { label: "Visual Color Profile", value: "Charcoal-black glare-free weave" },
    ],
  },
  "coconut-safety-nets": {
    id: "coconut-safety-nets",
    title: "Coconut Safety Nets",
    category: "specialty-solutions",
    description:
      "Suspended heavy-duty net canopies catching falling coconuts to safeguard paths and vehicles.",
    detailParagraphs: [
      "Quiet vigilance for tropical spaces. Coconut palms define the natural elegance of South Indian estates. Yet, falling coconuts carry significant kinetic force that can damage cars or injure pedestrians.",
      "We preserve palm trees while mitigating falling fruit hazards. Our Coconut Safety Nets form a suspended canopy that catches falling coconuts, protecting pathways, cars, and residents without detracting from your landscape.",
    ],
    images: ["/images/coconut-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "Virgin HDPE heavy monofilament" },
      { label: "Mesh Grid Configuration", value: "50 mm x 50 mm reinforced mesh" },
      { label: "Load Capacity", value: "Engineered canopy drop containment" },
      { label: "Border Anchoring", value: "Heavy-duty braided perimeter cords" },
      { label: "Lifespan Rating", value: "Rot-resistant & weatherproof build" },
    ],
  },
  "swimming-pool-nets": {
    id: "swimming-pool-nets",
    title: "Swimming Pool Nets",
    category: "specialty-solutions",
    description:
      "High-tension pool safety covers stretched flush across the water to help prevent accidental submersion.",
    detailParagraphs: [
      "Pool perimeter security, preserved views. A swimming pool is the centerpiece of your villa architecture, but for parents of young children and pet owners, water voids require careful safeguarding.",
      "Our Swimming Pool Nets provide a sleek, high-tension safety cover. Stretched flush across the pool surface and anchored to the deck, the net creates a supportive physical barrier while keeping the water view open.",
    ],
    images: ["/images/swimming-pool-safety-nets.png"],
    specs: [
      { label: "Material Composition", value: "4.0 mm UV-Treated Polyethylene cords" },
      { label: "Mesh Grid Spacing", value: "80 mm x 80 mm crawl-resistant grid" },
      { label: "Load Support Weight", value: "High-tension surface load capacity" },
      { label: "Deck Anchoring keys", value: "Flush brass key anchors (lies flat with deck)" },
      { label: "Tensioner Mechanism", value: "Central pulley system for smooth handling" },
    ],
  },
  "cloth-drying-hangers": {
    id: "cloth-drying-hangers",
    title: "Cloth Drying Hangers",
    category: "specialty-solutions",
    description:
      "Ceiling-mounted pulley drying racks utilizing overhead space to keep balconies clean and spacious.",
    detailParagraphs: [
      "Reclaim your balcony floor space. A luxurious balcony view shouldn't be cluttered by wet laundry draped over glass railings and folding racks.",
      "Our Ceiling-Mounted Cloth Drying Hangers offer an architectural solution. Engineered with a smooth pulley system, they let you dry laundry in the overhead zone, preserving floor space and maintaining a tidy balcony.",
    ],
    images: ["/images/cloth-drying-hangers.png"],
    specs: [
      { label: "Material Profile", value: "Rust-free anodized structural aluminum tubes" },
      { label: "Pulley System", value: "Dual-shaft nylon cord pulley blocks" },
      { label: "Max Load Limit", value: "Supports standard domestic wet laundry loads" },
      { label: "Rods Count", value: "4 to 6 individual ceiling-suspended tubes" },
      { label: "Space Efficiency", value: "Preserves full balcony floor space" },
    ],
  },
};

export const categoriesData: Record<string, CategoryDetail> = {
  "invisible-grills": {
    id: "invisible-grills",
    title: "Invisible Grills",
    quote:
      "Minimalism meets engineered protection — structural lines that preserve your skyline views.",
    heroImage: "/images/hero-invisible-grills.png",
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
      "A structural envelope of calm — defining the boundary between open space and architectural safety.",
    heroImage: "/images/hero-core-safety-nets.png",
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
      "Integrity at every elevation — structural perimeters designed to absorb forces and secure elevated work zones.",
    heroImage: "/images/hero-construction-industrial.png",
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
    heroImage: "/images/hero-animal-bird-protection.png",
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
    heroImage: "/images/hero-specialty-solutions.png",
    services: [
      "sports-practice-nets",
      "coconut-safety-nets",
      "swimming-pool-nets",
      "cloth-drying-hangers",
    ],
  },
};
