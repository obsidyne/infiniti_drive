export const bikes = [
  {
    id: 1,
    name: "Kawasaki Z900",
    brand: "Kawasaki",
    price: 952000, // Rs. 9,52,000 ex-showroom India, 2025 launch. :contentReference[oaicite:0]{index=0}
    year: 2025,
    owner: "New / 1st Owner",
    kmDriven: 0,
    image: "z900.jpg",
    specs: {
      engine: "948 cc, 4-cylinder, liquid-cooled",     // typical Z900 spec
      power: "~125 hp",                                // approximate
      torque: "~98 Nm",
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈240 km/h",
      mileage: "≈15-20 kmpl (city / mixed, India conditions estimate)"
    },
    description: "Kawasaki Z900 – Middleweight naked streetfighter with strong performance, modern electronics, aggressive styling. Newly launched in India 2025 with ex-showroom ~₹9.52 lakh."
  },
  {
    id: 2,
    name: "Triumph Street Triple RS",
    brand: "Triumph",
    price: 1209900, // Rs. 12,09,900 ex-showroom for RS variant. :contentReference[oaicite:1]{index=1}
    year: 2023,
    owner: "New / 1st Owner",
    kmDriven: 0,
    image: "street_tripple.jpg",
    specs: {
      engine: "765 cc, 3-cylinder, liquid-cooled",             // “Triple” engine
      power: "128.2 bhp @ ~11,500 rpm",                        // RS spec in India. :contentReference[oaicite:2]{index=2}
      torque: "80 Nm",                                         // RS spec. :contentReference[oaicite:3]{index=3}
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈220 km/h",                                   // as reported. :contentReference[oaicite:4]{index=4}
      mileage: "19.2 kmpl (claimed)"                           // :contentReference[oaicite:5]{index=5}
    },
    description: "Triumph Street Triple RS – sporty naked roadster with good power, sharp handling, premium build and electronics. Great for both city and spirited rides."
  },
  {
    id: 3,
    name: "BMW S1000RR",
    brand: "BMW",
    price: 2075000, // Rs. 20,75,000 ex-showroom for standard variant. :contentReference[oaicite:6]{index=6}
    year: 2025,
    owner: "New / 1st Owner",
    kmDriven: 0,
    image: "s1000rr.jpg",
    specs: {
      engine: "999 cc, inline-4, liquid-cooled, ShiftCam",       // updated engine with variable cam etc. :contentReference[oaicite:7]{index=7}
      power: "≈ 206.5 bhp @ 13,750 rpm",                       // :contentReference[oaicite:8]{index=8}
      torque: "113 Nm @ 11,000 rpm",                           // :contentReference[oaicite:9]{index=9}
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈ 303 km/h",                                   // claimed. :contentReference[oaicite:10]{index=10}
      mileage: "≈15.6 kmpl (claimed)"                           // :contentReference[oaicite:11]{index=11}
    },
    description: "BMW S1000RR – flagship superbike, track capable with high tech features and performance. Powerful inline-4, premium brakes/suspension etc."
  },
  {
    id: 4,
    name: "Ducati Panigale V4",
    brand: "Ducati",
    price: 2999000, // Rs. 29,99,000 ex-showroom standard variant. :contentReference[oaicite:12]{index=12}
    year: 2025,
    owner: "New / 1st Owner",
    kmDriven: 0,
    image: "panigale.jpg",
    specs: {
      engine: "1103 cc V4, liquid-cooled",                       // :contentReference[oaicite:13]{index=13}
      power: "≈ 213-216 bhp @ ~13,500 rpm",                     // :contentReference[oaicite:14]{index=14}
      torque: "≈ 120.9 Nm @ ~11,250 rpm",                       // :contentReference[oaicite:15]{index=15}
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈ 299 km/h",                                   // claimed. :contentReference[oaicite:16]{index=16}
      mileage: "≈ 15.38 kmpl (claimed)"                          // :contentReference[oaicite:17]{index=17}
    },
    description: "Ducati Panigale V4 – Superbike from Italian marque, track and road beast with advanced electronics, high power, premium components."
  },
  {
    id: 5,
    name: "Harley-Davidson Street Rod",
    brand: "Harley-Davidson",
    price: 599000, // Rs. 5,99,000 ex-showroom. :contentReference[oaicite:18]{index=18}
    year: 2020,
    owner: "1st Owner",
    kmDriven: 8000,  // approximate / example, you can adjust
    image: "street_rod.jpg",
    specs: {
      engine: "749 cc, Revolution X V-Twin, liquid-cooled",        // :contentReference[oaicite:19]{index=19}
      power: "≈ 70 bhp @ 7,250 rpm",                               // older spec. :contentReference[oaicite:20]{index=20}
      torque: "≈ 60-65 Nm @ ~4,000 rpm",                            // around that. :contentReference[oaicite:21]{index=21}
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈ 180-190 km/h",                                   // rough estimate from power
      mileage: "≈ 20-25 kmpl city / mixed conditions"              // estimate
    },
    description: "Harley-Davidson Street Rod – cruiser / muscle V-Twin with street-oriented setup, decent performance, Harley character."
  },
  {
    id: 6,
    name: "Royal Enfield Himalayan 411",
    brand: "Royal Enfield",
    price: 191000, // Rs. 1,91,000 approx ex-showroom for this model. :contentReference[oaicite:22]{index=22}
    year: 2023,
    owner: "1st Owner",
    kmDriven: 5000,    // example
    image: "himalayan.jpg",
    specs: {
      engine: "411 cc, single-cylinder, air-cooled",                  // :contentReference[oaicite:23]{index=23}
      power: "≈ 24.3 bhp @ 6,500 rpm",                               // :contentReference[oaicite:24]{index=24}
      torque: "32 Nm @ 4,000-4,500 rpm",                            // :contentReference[oaicite:25]{index=25}
      fuelType: "Petrol",
      transmission: "5-Speed Manual",
      maxSpeed: "≈ 134 km/h",                                       // measured spec. :contentReference[oaicite:26]{index=26}
      mileage: "≈ 30-32 kmpl (ARAI / owner-reported)"                 // :contentReference[oaicite:27]{index=27}
    },
    description: "Royal Enfield Himalayan 411 – purpose-built adventure touring motorcycle, good for off-road and long rides, rugged build and RE support."
  },
  {
    id: 7,
    name: "BMW GS 310",
    brand: "BMW",
    price: 239990, // Rs. 2,39,990 ex-showroom base variant. :contentReference[oaicite:28]{index=28}
    year: 2025,
    owner: "New / 1st Owner",
    kmDriven: 0,
    image: "gs310.jpg",
    specs: {
      engine: "312.12 cc, single-cylinder, liquid-cooled",           // :contentReference[oaicite:29]{index=29}
      power: "≈ 35.6 PS @ 9,700 rpm",                               // :contentReference[oaicite:30]{index=30}
      torque: "≈ 28.7 Nm @ 6,650 rpm",                               // :contentReference[oaicite:31]{index=31}
      fuelType: "Petrol",
      transmission: "6-Speed Manual",
      maxSpeed: "≈ 150 km/h",                                       // claimed. :contentReference[oaicite:32]{index=32}
      mileage: "≈ 30-35 kmpl (ARAI / mixed use)"                      // :contentReference[oaicite:33]{index=33}
    },
    description: "TVS Apache RTR 310 – updated naked / street bike with strong mid-capacity performance, modern tech, good styling, value for money."
  }
];
