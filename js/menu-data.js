/**
 * Balcos.co by Sebelas Coffee - Menu Data Catalog
 * Prices in IDR (Indonesian Rupiah)
 */

const BALCOS_MENU = [
  // --- SIGNATURE & COFFEE ---
  {
    id: "c-1",
    name: "Es Kopi Susu Sebelas",
    category: "coffee",
    price: 18000,
    rating: 4.9,
    reviews: 142,
    badge: "Best Seller",
    tag: "Signature",
    description: "Espresso khas Sebelas Coffee dengan susu segar creamy dan gula aren organik pilihan. Creamy, smooth & rich.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    dietary: ["Iced", "Sweet", "Creamy"],
    available: true
  },
  {
    id: "c-2",
    name: "Basic Latte (Large)",
    category: "coffee",
    price: 24000,
    rating: 4.8,
    reviews: 98,
    badge: "Popular",
    tag: "Espresso Bar",
    description: "Double shot espresso house blend 100% Arabica dengan steamed fresh milk bertekstur silky microfoam.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot/Iced", "Silky", "Unsweetened"],
    available: true
  },
  {
    id: "c-3",
    name: "Balcos Cloud Caramel",
    category: "coffee",
    price: 23000,
    rating: 4.9,
    reviews: 76,
    badge: "Staff Pick",
    tag: "Signature",
    description: "Espresso dingin dengan lapisan salted caramel cream foam yang tebal dan taburan crumble biskuit renyah.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    dietary: ["Iced", "Sweet", "Decadent"],
    available: true
  },
  {
    id: "c-4",
    name: "Manual Brew V60 (Specialty Beans)",
    category: "coffee",
    price: 22000,
    rating: 4.9,
    reviews: 64,
    badge: "Specialty",
    tag: "Filter Bar",
    description: "Seduhan manual dengan pilihan biji single origin lokal nusantara (Gayo, Sunda Aromanis, Ijen Anaerob). Floral, fruity & clean note.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot/Iced", "Light Body", "Fruity Notes"],
    available: true
  },
  {
    id: "c-5",
    name: "Americano / Long Black",
    category: "coffee",
    price: 16000,
    rating: 4.7,
    reviews: 55,
    tag: "Espresso Bar",
    description: "Ekstraksi espresso murni dengan air mineral jernih. Notes dark chocolate & roasted hazelnut yang tegas.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot/Iced", "0 Sugar", "Strong"],
    available: true
  },
  {
    id: "c-6",
    name: "Dirty Spanish Latte",
    category: "coffee",
    price: 22000,
    rating: 4.8,
    reviews: 81,
    tag: "Specialty",
    description: "Perpaduan kental condensed milk premium, fresh milk dingin, dan ristretto floating di atasnya.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    dietary: ["Iced", "Sweet", "Layered"],
    available: true
  },

  // --- REFRESHING MOCKTAILS & NON-COFFEE ---
  {
    id: "m-1",
    name: "Sunset Kedawung Mocktail",
    category: "mocktail",
    price: 21000,
    rating: 4.9,
    reviews: 110,
    badge: "Compound Favorite",
    tag: "Signature Mocktail",
    description: "Campuran sari markisa segar, peach puree, cold infused butterfly pea tea, dan soda sparkling yang menyegarkan.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    dietary: ["Sparkling", "Fruity", "Non-Coffee"],
    available: true
  },
  {
    id: "m-2",
    name: "Yuzu Berry Blossom",
    category: "mocktail",
    price: 22000,
    rating: 4.8,
    reviews: 62,
    tag: "Signature Mocktail",
    description: "Yuzu extract Jepang berpadu dengan muddled strawberry fresh dan sparkling botanicals.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    dietary: ["Citrus", "Sparkling", "Refreshing"],
    available: true
  },
  {
    id: "m-3",
    name: "Kyoto Uji Matcha Latte",
    category: "non-coffee",
    price: 22000,
    rating: 4.9,
    reviews: 89,
    badge: "Must Try",
    tag: "Tea & Artisanal",
    description: "Bubuk matcha murni asal Kyoto yang di-whisk tradisional, dipadu fresh milk creamy dan sentuhan vanilla bean.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot/Iced", "Umami", "Rich"],
    available: true
  },
  {
    id: "m-4",
    name: "Artisan Chocolate Choco Berry",
    category: "non-coffee",
    price: 21000,
    rating: 4.8,
    reviews: 44,
    tag: "Artisanal",
    description: "Cokelat Belgian dark ganache kental dipadukan dengan raspberry compote dan susu lembut.",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot/Iced", "Sweet", "Rich Chocolate"],
    available: true
  },
  {
    id: "m-5",
    name: "Lychee Jasmine Breeze",
    category: "non-coffee",
    price: 18000,
    rating: 4.7,
    reviews: 58,
    tag: "Iced Tea",
    description: "Teh melati wangi khas Jawa diseduh dingin dengan buah leci utuh manis dan aroma mint.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    dietary: ["Iced", "Floral", "Sweet Fruit"],
    available: true
  },

  // --- BALCOS KITCHEN & COMFORT MEALS ---
  {
    id: "f-1",
    name: "Balcos Special Buryam (Bubur Ayam)",
    category: "meals",
    price: 18000,
    rating: 4.9,
    reviews: 184,
    badge: "24-Hr Legend",
    tag: "Comfort Food",
    description: "Bubur gurih kental berkaldu kuning kaya rempah dengan topping ayam suwir melimpah, cakwe garing, telur mata sapi, krupuk, dan emping.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    dietary: ["Warm", "Savory", "Best at Night/Morning"],
    available: true
  },
  {
    id: "f-2",
    name: "Lunch Box Balcos: Ayam Cabe Garam",
    category: "meals",
    price: 25000,
    rating: 4.8,
    reviews: 95,
    badge: "Popular Lunch",
    tag: "Rice Box",
    description: "Nasi pulen hangat dengan potongan fillet ayam renyah ditumis cabai rawit merah, bawang putih wangi, dan scramble egg lembut.",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
    dietary: ["Spicy", "Savory", "Filling"],
    available: true
  },
  {
    id: "f-3",
    name: "Nasi Dori Sambal Matah Bali",
    category: "meals",
    price: 25000,
    rating: 4.9,
    reviews: 80,
    tag: "Rice Box",
    description: "Ikan dori krispi keemasan disiram racikan sambal matah serai segar dengan perasan jeruk limau harum.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    dietary: ["Fresh & Spicy", "High Protein", "Crispy"],
    available: true
  },
  {
    id: "f-4",
    name: "Mie Nyemek Balcos Sambal Roa",
    category: "meals",
    price: 20000,
    rating: 4.8,
    reviews: 112,
    badge: "Midnight Favorite",
    tag: "Late Night Bites",
    description: "Mie kuah kental gurih dimasak dengan telur bebek, sayuran segar, dan sambal roa asap khas yang pedas nagih.",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    dietary: ["Hot & Spicy", "Comfort Food", "24 Hours"],
    available: true
  },

  // --- BITES & ARTISAN PASTRIES ---
  {
    id: "p-1",
    name: "Truffle Cheese French Fries",
    category: "bites",
    price: 18000,
    rating: 4.8,
    reviews: 73,
    badge: "Great to Share",
    tag: "Snack Platter",
    description: "Kentang goreng renyah beralur dengan aroma minyak truffle harum dan taburan parmesan cheese halus.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    dietary: ["Vegetarian", "Savory", "Crunchy"],
    available: true
  },
  {
    id: "p-2",
    name: "Crispy Cireng Bumbu Rujak",
    category: "bites",
    price: 15000,
    rating: 4.9,
    reviews: 88,
    tag: "Indonesian Snack",
    description: "Cireng kenyal gurih dengan kulit luar krispi, disajikan dengan cocolan saus rujak asam manis pedas gula aren.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    dietary: ["Sweet & Spicy Sauce", "Vegan Friendly", "Crispy"],
    available: true
  },
  {
    id: "p-3",
    name: "Butter Croissant by Artisanal Baker",
    category: "pastry",
    price: 19000,
    rating: 4.8,
    reviews: 52,
    tag: "Bakery",
    description: "Croissant Prancis klasik berlapis butter impor, dipanggang fresh tiap hari. Flaky dan harum.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    dietary: ["Flaky", "Golden Baked", "Fresh Daily"],
    available: true
  },
  {
    id: "p-4",
    name: "Pain Au Chocolat Melted",
    category: "pastry",
    price: 22000,
    rating: 4.9,
    reviews: 49,
    tag: "Bakery",
    description: "Pastry pastry puff berlapis dengan isian double stick dark chocolate couverture yang meleleh saat dipanaskan.",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=80",
    dietary: ["Chocolatey", "Sweet", "Oven Warm"],
    available: true
  }
];

// Highlight Stories Data from Instagram screenshot
const BALCOS_STORIES = [
  {
    id: "space",
    title: "space",
    icon: "bi-building",
    cover: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    headline: "24/7 Compound & Working Space",
    content: "Balcos Compound menyediakan area indoor ber-AC sejuk, meja bar komunal, area outdoor asri, dan stop kontak di setiap sudut. Tempat ideal buat WFC (Work from Cafe), nugas malam, hingga santai subuh.",
    tags: ["24 Jam", "AC Sejuk", "High-speed Wi-Fi", "Pet Allowed 🐶🐱"]
  },
  {
    id: "promo",
    title: "promo",
    icon: "bi-tag",
    cover: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    headline: "Happy Hours & Student Combo",
    content: "Nikmati promo spesial Early Morning Coffee & Buryam combo, Paket Nugas 24 Jam, dan diskon komunitas kreatif setiap minggunya.",
    tags: ["Early Bird Special", "Student Discount", "Combo Nugas", "Loyalty Rewards"]
  },
  {
    id: "activity",
    title: "Activity",
    icon: "bi-palette",
    cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    headline: "Creative Workshops & Community Art",
    content: "Balcos rutin mengadakan workshop melukis kanvas, pottery, journaling, dan kelas barista bareng para profesional kreatif lokal Jogja.",
    tags: ["Art Workshop", "Canvas Painting", "Coffee Tasting", "Creative Network"]
  },
  {
    id: "event",
    title: "event",
    icon: "bi-music-note-beamed",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    headline: "Host of FESMO 2026 & Creative Gatherings",
    content: "Balcos menjadi wadah beragam festival kreatif, talkshow inspiratif (seperti FESMO 2026), live acoustic sessions, dan pop-up art market bagi komunitas kreatif Jogja.",
    tags: ["FESMO 2026", "Live Music", "Creative Talkshow", "Pop-up Booth"]
  },
  {
    id: "rent",
    title: "rent",
    icon: "bi-shop",
    cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    headline: "Compound Tenant & Space Rental",
    content: "Mau bikin workshop, launching produk, bazaar, atau sewa booth tenant kreatif di compound Balcos? Kami menyediakan paket rental fleksibel dengan traffic pengunjung aktif 24 jam.",
    tags: ["Tenant Booth", "Workshop Venue", "Photo Shoot", "Community Gathering"]
  },
  {
    id: "meeting-room",
    title: "Meeting Room",
    icon: "bi-display",
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    headline: "Private Meeting & Focus Hub",
    content: "Ruang rapat privat berkapasitas 6-12 orang. Dilengkapi Smart TV 55 inch untuk presentasi, Glassboard, AC dingin terpisah, power strips terdedikasi, dan free high speed internet.",
    tags: ["Smart TV 55\"", "Private AC", "Glassboard", "Capacity 12 pax"]
  },
  {
    id: "wazfun",
    title: "Wazfun",
    icon: "bi-controller",
    cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80",
    headline: "Play, Chill, & Connect",
    content: "Koleksi board games seru, card games, dan area santai untuk hang out bareng teman komunitas atau me-time santai.",
    tags: ["Board Games", "Pet Play Area", "Chill Vibe", "Community Connect"]
  }
];

// Verified Google Reviews data from Google Maps
const BALCOS_REVIEWS = [
  {
    author: "Laksita Rosa",
    badge: "Local Guide · 152 ulasan",
    rating: 5,
    date: "10 bulan lalu",
    comment: "tempatnya ramai bgt sering ga kebagian tempat:(( kecil jugaa huhu tapi kopinya enakkkkk!! ada di dalam balcos compound gituu kakanya jg baikkk dan ramah banget!",
    ownerReply: "Halo kak Laksita Rosa, terima kasih banyak atas ulasan positifnya! Kami sangat senang kakak menikmati pengalaman di Sebelas Coffee - Balcos Compound. Kami tunggu kedatangannya kembali ya! ^^"
  },
  {
    author: "Ony Hansyah",
    badge: "Local Guide · 186 ulasan",
    rating: 5,
    date: "6 tahun lalu",
    comment: "Rasa kopi yg mantap dg harga yg terjangkau, tempat nyaman utk nongkrong krn dilengkapi AC sehingga bikin betah, pelayanan baristanya ramah memuaskan, ditambah lagi akses tempat yg mudah dijangkau. Pokoknya recommended coffee shop 👍👍👍",
    ownerReply: null
  },
  {
    author: "Farhan Ardiansyah",
    badge: "Creative Worker & Remote Dev",
    rating: 5,
    date: "1 bulan lalu",
    comment: "Buka 24 jam beneran penyelamat deadline! Wi-Fi kenceng, colokan melimpah di setiap meja, dan yang paling penting: Pet-friendly 🐶🐱 jadi bisa bawa anabul ngopi bareng.",
    ownerReply: null
  },
  {
    author: "Annisa Permata",
    badge: "Mahasiswa Sleman",
    rating: 5,
    date: "3 minggu lalu",
    comment: "Pagi-pagi cari tempat kerja sambil sarapan Bubur Ayam Balcos + Es Kopi Susu Sebelas, combo paling mantap! Meeting room-nya juga cozy dan harganya ramah kantong mahasiswa.",
    ownerReply: null
  }
];
