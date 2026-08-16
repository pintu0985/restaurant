// Centralized Restaurant Data for "Desi Tadka" (Pure Veg Restaurant & Authentic Indian Taste)
export const restaurantData = {
  name: "Desi Tadka",
  subTitle: "Pure Veg Restaurant • Authentic Indian Taste",
  logoText: "Desi Tadka",
  tagline: "Pure Veg Restaurant | Authentic Indian Taste",
  description: "Authentic Indian heritage blended with modern artisan gastronomy. Hand-crushed aromatic spices, slow-simmered rich dal makhani, wood-fired tandoori naans, and legendary Patiala lassi crafted with love at Desi Tadka.",
  
  contact: {
    address: "Ajmer, Rajasthan",
    phone: "+91 9799313525",
    phoneSecondary: "+91 9799313525",
    email: "info@growthifydigital.online",
    reservationsEmail: "info@growthifydigital.online",
    hours: "Monday – Sunday: 11:30 AM – 11:30 PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d74.6399!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6d836e59441%3A0xe108d85f1c93a027!2sAjmer%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
  },

  social: {
    instagram: "https://instagram.com/desitadka",
    facebook: "https://facebook.com/desitadka",
    youtube: "https://youtube.com/desitadka",
    whatsapp: "https://wa.me/919799313525"
  },

  razorpay: {
    keyId: "rzp_test_TQMktiRSesZE2N",
    keySecret: "oCfJbvE3OyUML30NeIXz6axF",
    merchantName: "Desi Tadka"
  },

  googleSheetsApi: {
    apiUrl: "https://script.google.com/macros/s/AKfycbwkZdVBRcEIguMXWo69nvzBna5eOQ_fklnkDilKg5D3KO7jroQQMXP0dY8GrN-P7L3A/exec",
    enabled: true
  },

  tables: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Table ${i + 1}`,
    capacity: i % 2 === 0 ? 4 : (i % 3 === 0 ? 6 : 2),
    location: i <= 8 ? "Main Punjabi Dining Hall" : (i <= 14 ? "Courtyard Garden" : "Family Lounge")
  })),

  categories: [
    { id: "all", name: "All Dishes", icon: "🍽️" },
    { id: "chef-specials", name: "Chef Specials", icon: "👑" },
    { id: "tandoori-platter", name: "Tandoori Platter", icon: "🍱" },
    { id: "kabab-specials", name: "Kabab Specials", icon: "🍢" },
    { id: "mushroom-specials", name: "Mushroom Specials", icon: "🍄" },
    { id: "paneer-tikka", name: "Paneer Tikka", icon: "🧀" },
    { id: "stuffed-soya-chaap", name: "Stuffed Soya Chaap", icon: "🌯" },
    { id: "tandoori-sizzlers", name: "Tandoori Sizzlers", icon: "🔥" },
    { id: "punjab-special", name: "Punjab Special", icon: "✨" },
    { id: "paneer-special", name: "Paneer Special", icon: "🥘" },
    { id: "vegetables", name: "Vegetables", icon: "🍲" },
    { id: "soya-chaap-gravy", name: "Soya Chaap Gravy", icon: "🍛" },
    { id: "pulses-from-punjab", name: "Pulses & Lentils", icon: "🥣" },
    { id: "desi-special-kulche-naan", name: "Amritsari Kulche & Naan", icon: "🫓" },
    { id: "desi-special-thali", name: "Punjabi Thalis", icon: "🍱" },
    { id: "desi-special-combos", name: "Special Combos", icon: "🍽️" },
    { id: "breads-rotis-naan", name: "Breads, Rotis & Naan", icon: "🍞" },
    { id: "parathas", name: "Stuffed Parathas", icon: "🥞" },
    { id: "rice-pulao-biryani", name: "Rice, Pulao & Biryani", icon: "🍚" },
    { id: "chinese", name: "Chinese & Snacks", icon: "🍜" },
    { id: "soups-salads", name: "Soups & Salads", icon: "🥗" },
    { id: "papad-raita-dahi", name: "Papad, Raita & Chutney", icon: "🥣" },
    { id: "cold-beverages", name: "Cold Beverages & Lassi", icon: "🥛" },
    { id: "mocktails-shakes", name: "Mocktails & Shakes", icon: "🍹" },
    { id: "desserts", name: "Desserts & Sweets", icon: "🍰" },
    { id: "balle-balle-feast", name: "Balle-Balle Feast", icon: "🎉" }
  ],

  dietaryFilters: [
    { id: "veg", name: "Vegetarian", icon: "🥬" },
    { id: "spicy", name: "Spicy", icon: "🌶️" },
    { id: "bestseller", name: "Bestseller", icon: "⭐" },
    { id: "new", name: "New", icon: "🆕" }
  ],

  // Balle-Balle Feast Offer Details
  balleBalleFeast: {
    title: "BALLE-BALLE FEAST",
    subtitle: "Unlimited Table Feast @ ₹599/- + GST (Child upto 5 Yrs @ ₹249/-)",
    mocktail: "Masala Lemonade (Single Serving)",
    starters: ["Paneer Tikka", "Soya Chaap", "Mushroom Tandoori", "Veg. Seekh Kabab", "Hara Bhara Kabab", "Dahi Kabab", "Crispy Corn"],
    soups: ["Tomato Soup", "Hot 'N' Sour Soup"],
    mains: ["Paneer Sabji", "Mix Veg / Seasonal Veg", "Dal Makhani / Dal Ambarsari", "Dal Tadka / Dal Fry", "Dum Biryani / Hyderabadi Veg. Biryani", "Butter Naan", "Tandoori Roti (Plain / Butter)"],
    accompaniments: ["Green Salad", "Kachumber Salad", "Fried Masala Green Chilly", "Roasted Papad", "Fried Punjabi Kheecha", "Mint Chutney", "Garlic Chutney", "2 Variety of Pickles", "Boondi Raita"],
    desserts: ["Angoori Gulab Jamun (Single Serving)", "Brownie (Single Serving)"],
    iceCream: ["Butter Scotch / Chocolate Scoop (Single Serving)"]
  },

  menuTerms: [
    "Minimum serving time 20 minutes after placing order.",
    "Order once placed cannot be cancelled or changed.",
    "Please consume food parcel within 4 hours of purchase.",
    "Parcel charges extra as applicable.",
    "Free home delivery within 1 km radius for orders above ₹500/-.",
    "All prices are subject to GST extra.",
    "Prices are subject to change without prior notice.",
    "Alcohol consumption is strictly prohibited on restaurant premises.",
    "Management reserves all rights of admission.",
    "100% Pure Veg. Family Restaurant."
  ],

  menuItems: [
    /* ================= CHEF SPECIALS ================= */
    {
      id: "cs-1",
      name: "Dum Biryani",
      category: "chef-specials",
      price: 379,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Fragrant long grain basmati rice slow-cooked in handi with saffron, vegetables, and aromatic Punjabi spices. Served with Boondi Raita.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cs-2",
      name: "Paneer Lajawab Tikka (Rich & Creamy)",
      category: "chef-specials",
      price: 369,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Cottage cheese (8 Pcs) drenched in rich cashew cream marinade, charcoal grilled to smoky perfection.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cs-3",
      name: "Lazeez Soya Kabab",
      category: "chef-specials",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Tender soya kababs (8 Pcs) infused with ginger, garlic, and special tandoori masala.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cs-4",
      name: "Veg. Seekh Kabab",
      category: "chef-specials",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Minced garden vegetables and paneer (8 Pcs) skewer-roasted over open charcoal flames.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cs-5",
      name: "Chef Special Thali",
      category: "chef-specials",
      price: 439,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Grand Royal Feast: Sabji Meloni, Chana Masala, Paneer Sabji, Dal Tadka, Dum Biryani, Mix Veg Raita, 1 Missi Roti, 1 Lachchha Paratha, 2 Tandoori Butter Roti, Salad, Papad & Sweet.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= TANDOORI PLATTER ================= */
    {
      id: "tp-1",
      name: "Tandoori Platter (10 Pcs)",
      category: "tandoori-platter",
      price: 429,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Assorted 10 Pcs platter featuring Veg Seekh Kabab, Hara Bhara Kabab, Mushroom Tikka, Haryali Tikka, and Malai Tikka.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tp-2",
      name: "Tandoori Family Platter (14 Pcs)",
      category: "tandoori-platter",
      price: 459,
      rating: 5.0,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Grand 14 Pcs Family Platter: Veg Seekh Kabab, Hara Bhara Kabab, Dahi Kabab, Malai Kabab, Mushroom Tikka, Paneer Tikka, and Soya Chaap.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= KABAB SPECIALS ================= */
    {
      id: "ks-1",
      name: "Lazeez Soya Kabab (8 Pcs)",
      category: "kabab-specials",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Richly spiced soya kebabs flame roasted with aromatic spices.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ks-2",
      name: "Veg Seekh Kabab (8 Pcs)",
      category: "kabab-specials",
      price: 369,
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Delicately seasoned vegetable kebabs grilled on skewers.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ks-3",
      name: "Dahi Kabab (8 Pcs)",
      category: "kabab-specials",
      price: 339,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Crispy outer shell filled with spiced hung curd and paneer.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ks-4",
      name: "Hara Bhara Kabab (8 Pcs)",
      category: "kabab-specials",
      price: 349,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Spinach, green peas, and potato patties seasoned with royal herbs.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ks-5",
      name: "Malai Seekh Kabab (8 Pcs)",
      category: "kabab-specials",
      price: 349,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: true,
      description: "Creamy cardamom-flavored vegetable kebabs roasted in tandoor.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= MUSHROOM SPECIALS ================= */
    {
      id: "ms-1",
      name: "Mushroom Punch (Assorted 5 Flavours - 10 Pcs)",
      category: "mushroom-specials",
      price: 389,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "Chef's special 10 Pcs mushroom platter featuring 5 distinct marinades.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-2",
      name: "Mushroom Classic (Tangy Flavour - 8 Pcs)",
      category: "mushroom-specials",
      price: 309,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Fresh button mushrooms marinated in classic tangy tandoori masala.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-3",
      name: "Mushroom Achari (Tangy Flavour - 8 Pcs)",
      category: "mushroom-specials",
      price: 309,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Button mushrooms coated in achari pickling spices and charcoal grilled.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-4",
      name: "Mushroom Haryali (Green Chilly-Garlic - 8 Pcs)",
      category: "mushroom-specials",
      price: 319,
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Fresh green mint, chilly, garlic, and ginger infused mushroom tikka.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-5",
      name: "Mushroom Podina (Mint Flavour - 8 Pcs)",
      category: "mushroom-specials",
      price: 329,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Refreshing mint-marinated mushrooms clay-roasted in tandoor.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-6",
      name: "Mushroom Malai (Rich n Creamy - 8 Pcs)",
      category: "mushroom-specials",
      price: 359,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Button mushrooms steeped in cashew cream, white pepper, and butter.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ms-7",
      name: "Mushroom Kashmiri (Enriched with Dry Fruits - 8 Pcs)",
      category: "mushroom-specials",
      price: 379,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: true,
      description: "Royal Kashmiri style mushroom tikka enriched with almonds, cashews, and raisins.",
      image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PANEER TIKKA ================= */
    {
      id: "pt-1",
      name: "Paneer Lajawab Tikka (Rich & Creamy - 8 Pcs)",
      category: "paneer-tikka",
      price: 369,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Creamy marinated paneer blocks roasted to perfection.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-2",
      name: "Tikka Punch (Assorted 5 Flavours - 10 Pcs)",
      category: "paneer-tikka",
      price: 379,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Combination platter of 5 paneer tikka marinades (10 Pcs).",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-3",
      name: "Paneer Tikka Classic (8 Pcs)",
      category: "paneer-tikka",
      price: 289,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Traditional hung-curd marinated cottage cheese with onions & capsicum.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-4",
      name: "Achari Tikka (Tangy Flavour - 8 Pcs)",
      category: "paneer-tikka",
      price: 289,
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Tangy pickled-spice marinated cottage cheese roasted in tandoor.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-5",
      name: "Haryali Tikka (Green Chilly-Garlic - 8 Pcs)",
      category: "paneer-tikka",
      price: 299,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Mint, coriander, green chili, and garlic spiced paneer tikka.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-6",
      name: "Podina Paneer Tikka (Mint Flavour - 8 Pcs)",
      category: "paneer-tikka",
      price: 309,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Fresh garden mint infused tandoori paneer tikka.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-7",
      name: "Malai Tikka (Rich n Creamy - 8 Pcs)",
      category: "paneer-tikka",
      price: 349,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Cashew, malai, and cardamom marinated velvet paneer tikka.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pt-8",
      name: "Kashmiri Tikka (Enriched with Dry Fruits - 8 Pcs)",
      category: "paneer-tikka",
      price: 359,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: true,
      description: "Royal dry fruit, saffron, and cream paneer tikka.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= STUFFED TANDOORI SOYA CHAAP ================= */
    {
      id: "sc-1",
      name: "Chaap Punch (Assorted 5 Flavours - 10 Pcs)",
      category: "stuffed-soya-chaap",
      price: 379,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "10 Pcs assorted soya chaap platter with 5 distinct marinades.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-2",
      name: "Soya Chaap Classic (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 289,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Classic spiced tandoori soya chaap grilled over coals.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-3",
      name: "Achari Chaap (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 289,
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Tangy pickled spiced stuffed soya chaap.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-4",
      name: "Haryali Chaap (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 299,
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Green chili, garlic, and mint marinated soya chaap.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-5",
      name: "Podina Chaap (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 309,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Mint infused tandoori stuffed soya chaap.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-6",
      name: "Malai Chaap (Rich n Creamy - 8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 349,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Melt-in-mouth soya chaap in heavy cream and cashew marinade.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-7",
      name: "Kashmiri Chaap (Enriched with Dry Fruits - 8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 359,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: true,
      description: "Enriched with almonds, cashews, saffron, and cream.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-8",
      name: "Tandoori Aloo (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 259,
      rating: 4.6,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      isNew: false,
      description: "Whole potatoes stuffed with dry fruits & cottage cheese. [Min. serving time: 20 min]",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sc-9",
      name: "Tandoori Aloo Ki Nazakat (8 Pcs)",
      category: "stuffed-soya-chaap",
      price: 289,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "Special rich stuffed tandoori potatoes roasted in tandoor. [Min. serving time: 20 min]",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= TANDOORI SIZZLERS ================= */
    {
      id: "ts-1",
      name: "Jalandhari Tikka Sizzler",
      category: "tandoori-sizzlers",
      price: 369,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "Piping hot sizzler plate with Garlic Rice, Rich Gravy, and Charcoal Grilled Paneer Tikka.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ts-2",
      name: "Patiala Chaap Sizzler",
      category: "tandoori-sizzlers",
      price: 369,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "Sizzling platter loaded with Garlic Rice, Spicy Curry Gravy, and Soya Chaap Tikka.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PUNJAB SPECIAL ================= */
    {
      id: "ps-1",
      name: "Punjabi Chhole Bhature (SPECIAL)",
      category: "punjab-special",
      price: 209,
      rating: 5.0,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Signature Punjabi dish! 2 oversized paneer-stuffed fluffy bhaturas served with spicy dark Pindi Chhole, pickled chillies & onions.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PANEER SPECIAL ================= */
    {
      id: "pns-1",
      name: "Kadhai Paneer",
      category: "paneer-special",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Fresh cottage cheese cooked with bell peppers, onions, and coarse-ground coriander spices in wok.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-2",
      name: "Handi Paneer",
      category: "paneer-special",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Slow-cooked cottage cheese in a rich clay pot tomato-cashew gravy.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-3",
      name: "Matar Paneer",
      category: "paneer-special",
      price: 369,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Sweet green peas and fresh paneer in traditional onion tomato gravy.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-4",
      name: "Paneer Takatak",
      category: "paneer-special",
      price: 369,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Spicy tawa-style paneer cooked with chopped tomatoes, green chillies, and chatpata spices.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-5",
      name: "Shahi Paneer (Red Gravy)",
      category: "paneer-special",
      price: 369,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Velvety red tomato-cashew cream gravy with soft cottage cheese.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-6",
      name: "Shahi Paneer (Brown Gravy)",
      category: "paneer-special",
      price: 399,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Rich caramelised onion and khoya brown gravy with paneer.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-7",
      name: "Shahi Paneer (White Gravy)",
      category: "paneer-special",
      price: 419,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Mughlai style white cashew and cream gravy infused with cardamom & mace.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-8",
      name: "Punjabi Palak Paneer",
      category: "paneer-special",
      price: 389,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Fresh spinach puree tempered with garlic, butter, and paneer cubes.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-9",
      name: "Paneer Toofani",
      category: "paneer-special",
      price: 389,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Fiery spicy gravy with paneer cubes and tossed whole spices.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-10",
      name: "Paneer Butter Masala",
      category: "paneer-special",
      price: 409,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Classic creamy tomato sauce with chunks of paneer and white butter.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pns-11",
      name: "Desi Special Paneer",
      category: "paneer-special",
      price: 489,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Chef's secret signature paneer preparation enriched with dry fruits, saffron, and triple gravy layers.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= VEGETABLES ================= */
    {
      id: "veg-1",
      name: "Jeera Aaloo",
      category: "vegetables",
      price: 269,
      rating: 4.6,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Diced potatoes tossed with roasted cumin seeds, turmeric, and green coriander.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-2",
      name: "Sev Tamatar",
      category: "vegetables",
      price: 299,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Spicy tomato curry topped with crispy spicy gram flour sev.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-3",
      name: "Dum Aaloo",
      category: "vegetables",
      price: 299,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Stuffed baby potatoes simmered in rich gravy.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-4",
      name: "Aaloo Pyaj Paneer (Desi Ghee)",
      category: "vegetables",
      price: 339,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Potatoes, shallow fried whole onions, and paneer cooked in pure Desi Ghee.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-5",
      name: "Sarson Da Saag",
      category: "vegetables",
      price: 349,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Authentic Punjabi green mustard saag slow cooked and topped with white looni makkhan.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-6",
      name: "Gulab Jamun Sabji (Desi Ghee)",
      category: "vegetables",
      price: 359,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Unique Royal Rajasthani specialty: unsweetened fried dumplings simmered in rich cashew curry with Desi Ghee.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "veg-7",
      name: "Kaju Curry",
      category: "vegetables",
      price: 429,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Whole roasted cashews cooked in a rich, buttery tomato cream gravy.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= SOYA CHAAP SPECIALS WITH GRAVY ================= */
    {
      id: "scg-1",
      name: "Ra-Ra Classic Soya Masala",
      category: "soya-chaap-gravy",
      price: 379,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Rich minced soya gravy loaded with tandoori soya chaap pieces.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "scg-2",
      name: "Ra-Ra Malai Soya Masala",
      category: "soya-chaap-gravy",
      price: 439,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Creamy cashew and malai gravy with tandoori soya chaap pieces.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PULSES & LENTILS FROM PUNJAB ================= */
    {
      id: "pl-1",
      name: "Jeera Dal",
      category: "pulses-from-punjab",
      price: 249,
      rating: 4.6,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Yellow arhar dal tempered with ghee and roasted cumin.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pl-2",
      name: "Dal Tadka",
      category: "pulses-from-punjab",
      price: 279,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Yellow lentils tempered with garlic, whole red chillies, and pure ghee.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pl-3",
      name: "Dal Makhani",
      category: "pulses-from-punjab",
      price: 309,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Legendary slow-cooked black lentils simmered overnight with white butter & cream.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pl-4",
      name: "Punjabi Rajma",
      category: "pulses-from-punjab",
      price: 319,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Red kidney beans cooked in rich onion-tomato gravy Punjabi style.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "pl-5",
      name: "Pindi Chhole",
      category: "pulses-from-punjab",
      price: 329,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Traditional Rawalpindi style spicy dark chickpea curry.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= AMRITSARI KULCHE & CHOOR-CHOOR NAAN ================= */
    {
      id: "kn-1",
      name: "Lahori Kulcha (Jumbo, Combination of all stuffing)",
      category: "desi-special-kulche-naan",
      price: 389,
      rating: 5.0,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: true,
      description: "Jumbo tandoori kulcha loaded with paneer, aloo, pyaj, gobhi, & spices. Served with Pindi Chhole.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kn-2",
      name: "Aaloo Kulcha (2 Pcs with Chhole)",
      category: "desi-special-kulche-naan",
      price: 299,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "2 Pcs crisp potato-stuffed tandoori kulchas served with spicy Amritsari Chhole.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kn-3",
      name: "Paneer Kulcha (2 Pcs with Chhole)",
      category: "desi-special-kulche-naan",
      price: 329,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "2 Pcs cottage cheese stuffed crispy kulchas served with chhole.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kn-4",
      name: "Peshawari Choor-Choor Naan (Jumbo)",
      category: "desi-special-kulche-naan",
      price: 399,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Jumbo crushed flaky naan brushed with white butter & rich stuffing.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kn-5",
      name: "Paneer De Choor-Choor Naan (2 Pcs)",
      category: "desi-special-kulche-naan",
      price: 349,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "2 Pcs flaky crushed paneer naan with white butter.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PUNJABI THALIS ================= */
    {
      id: "st-1",
      name: "Aaloo Pyaj Paneer Sabji with Tikkad",
      category: "desi-special-thali",
      price: 389,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Aaloo Pyaj Paneer cooked in Desi Ghee along with Tikkad baked in tandoor & Lehsun Chutney.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-2",
      name: "Dal Baati Chhoorma",
      category: "desi-special-thali",
      price: 419,
      rating: 5.0,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Baati baked in Desi Ghee, Spicy Dal, Besan Gatta, Lehsun Chutney, Masala Chhach, Papad, Sweet Chhoorma prepared in Desi Ghee & Kachumbar Salad.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-3",
      name: "Makki Di Roti with Sarson Da Saag",
      category: "desi-special-thali",
      price: 389,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Punjabi delight: mustard greens saag with Makki di Roti infused with a dollop of Looni Makkhan.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-4",
      name: "King Ambarsari Thali",
      category: "desi-special-thali",
      price: 389,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Dal Makhani, Pindi Chhole, Paneer Sabji, Jeera Rice, 2 Tandoori Butter Roti, 1 Butter Naan, Boondi Raita, Salad, Papad & Sweet.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "st-5",
      name: "Queen Ambarsari Thali",
      category: "desi-special-thali",
      price: 309,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Dal Makhani, Paneer Sabji, Jeera Rice, 2 Tandoori Butter Roti, Podina Chutney, Salad & Sweet.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= SPECIAL COMBOS ================= */
    {
      id: "cmb-1",
      name: "Ra-Ra Classic Soya Masala with Garlic Naan",
      category: "desi-special-combos",
      price: 439,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Spicy Ra-Ra Soya Masala curry served with a warm crisp Garlic Naan.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cmb-2",
      name: "Paneer Tikka Masala with Butter Naan",
      category: "desi-special-combos",
      price: 429,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Tandoori paneer tikka gravy paired with fresh Butter Naan.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= BREADS, ROTIS & NAAN ================= */
    {
      id: "brd-1",
      name: "Bread Basket (6 Assorted Breads)",
      category: "breads-rotis-naan",
      price: 419,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "1 Butter Naan, 1 Plain Naan, 1 Missi Roti, 1 Lachchha Paratha, 1 Tandoori Butter Roti, 1 Mix Veg Kulcha.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brd-2",
      name: "Garlic Naan",
      category: "breads-rotis-naan",
      price: 109,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Tandoori naan topped with roasted garlic and coriander.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brd-3",
      name: "Butter Naan",
      category: "breads-rotis-naan",
      price: 79,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Leavened refined flour bread baked in tandoor and brushed with butter.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brd-4",
      name: "Tandoori Roti Butter",
      category: "breads-rotis-naan",
      price: 29,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Whole wheat flour bread baked in tandoor with melted butter.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brd-5",
      name: "Lachchha Paratha",
      category: "breads-rotis-naan",
      price: 89,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Multi-layered flaky whole wheat paratha baked in clay tandoor.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brd-6",
      name: "Missi Roti",
      category: "breads-rotis-naan",
      price: 79,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Gram flour and wheat flour bread tempered with ajwain and herbs.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= PARATHAS ================= */
    {
      id: "prt-1",
      name: "Aaloo Paratha (Tandoor Baked)",
      category: "parathas",
      price: 99,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Spiced potato stuffed whole wheat paratha baked in tandoor.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "prt-2",
      name: "Paneer Paratha (Tandoor Baked)",
      category: "parathas",
      price: 129,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Grated paneer stuffed whole wheat paratha with butter.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= RICE, PULAO & BIRYANI ================= */
    {
      id: "rpb-1",
      name: "Hyderabadi Veg Biryani (with Raita)",
      category: "rice-pulao-biryani",
      price: 309,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Spicy Dum cooked Hyderabadi veg biryani served with Boondi Raita.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rpb-2",
      name: "Punjabi Chhole Chawal Combo",
      category: "rice-pulao-biryani",
      price: 289,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Steamed basmati rice served with rich dark Pindi Chhole.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rpb-3",
      name: "Punjabi Rajma Chawal Combo",
      category: "rice-pulao-biryani",
      price: 289,
      rating: 4.9,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Comfort bowl: Steamed basmati rice with spicy Punjabi Rajma curry.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= CHINESE ================= */
    {
      id: "chn-1",
      name: "Chilli Paneer (Gravy / Dry)",
      category: "chinese",
      price: 289,
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      isNew: false,
      description: "Crispy paneer cubes tossed in soy-garlic chili sauce.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "chn-2",
      name: "Chinese Fried Rice",
      category: "chinese",
      price: 269,
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Wok-tossed rice with shredded vegetables and white pepper.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= BEVERAGES & LASSI ================= */
    {
      id: "bev-1",
      name: "Makhaniya Lassi",
      category: "cold-beverages",
      price: 159,
      rating: 5.0,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Authentic thick churned Punjabi sweet lassi topped with fresh butter & cream.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bev-2",
      name: "Mango Lassi",
      category: "cold-beverages",
      price: 169,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Thick curd blended with sweet mango pulp.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bev-3",
      name: "Makhaniya Chhach",
      category: "cold-beverages",
      price: 119,
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isNew: false,
      description: "Spiced buttermilk topped with fresh butter.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    },

    /* ================= DESSERTS ================= */
    {
      id: "dst-1",
      name: "Kesar Gulkandi Kheer",
      category: "desserts",
      price: 189,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: true,
      description: "Slow-cooked rice pudding enriched with saffron strands, rose gulkand, and pistachios.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dst-2",
      name: "Shahi Gulabjamun (2 Pcs)",
      category: "desserts",
      price: 149,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Hot melt-in-mouth gulab jamuns prepared in Desi Ghee.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dst-3",
      name: "Brownie With Ice Cream",
      category: "desserts",
      price: 199,
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      isNew: false,
      description: "Sizzling chocolate brownie topped with vanilla ice cream and fudge syrup.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    }
  ],

  whyChooseUs: [
    {
      title: "100% Pure Veg",
      description: "Dedicated 100% vegetarian kitchen adhering to strict quality and cleanliness.",
      icon: "🥬"
    },
    {
      title: "Desi Ghee Cooking",
      description: "Slow-cooked dishes enriched with pure cow ghee and hand-ground spices.",
      icon: "🧈"
    },
    {
      title: "Fast Delivery & Table QR",
      description: "Piping hot delivery in 30 minutes or seamless table ordering.",
      icon: "⚡"
    },
    {
      title: "Made With Love",
      description: "Generous Punjabi warmth, rich portions, and authentic hospitality.",
      icon: "❤️"
    }
  ],

  chef: {
    name: "Master Chef Gurpreet Singh",
    title: "Head Culinary Master",
    bio: "Carrying forward 3 generations of Punjabi culinary wisdom, Chef Gurpreet prepares slow-cooked dal makhani, handmade rotis, and authentic kadhai curries that capture the true soul of Dhaba cooking.",
    experience: "22+ Years Experience | Master of Authentic Punjabi & Tandoori Gastronomy",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
  },

  testimonials: [
    {
      id: 1,
      name: "Harpreet Kaur",
      role: "Food Critic & Blogger",
      rating: 5,
      comment: "Desi Tadka serves the best Dal Makhani and Garlic Naan in the entire city! The Patiala Sweet Lassi is pure bliss.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Gurdeep Singh",
      role: "Regular Guest",
      rating: 5,
      comment: "We love ordering at Table 12 via the QR code! Hot Paneer Tikka and Amritsari Chole Bhature arrived in 15 minutes. Outstanding!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Simran & Jasmeet",
      role: "Family Dining Guests",
      rating: 5,
      comment: "Pure veg heaven! Authentic Punjabi taste, huge portions, and lovely hospitality. Gulab Jamun with Rabri is a must try.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    }
  ],

  gallery: [
    {
      id: 1,
      title: "Traditional Dhaba Ambience",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Wood-Fired Tandoori Naan & Rotis",
      category: "Food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Charcoal Clay Tandoor Station",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Special Patiala Lassi Counter",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Live Soya Chaap & Tikka Grill",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Courtyard Family Dining",
      category: "Ambience",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

