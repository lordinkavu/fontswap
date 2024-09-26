document.addEventListener("DOMContentLoaded", function () {
  const fontSelect = document.getElementById("fontSelect");
  const applyButton = document.getElementById("applyFont");
  const resetButton = document.getElementById("resetFont");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const currentDomain = new URL(currentTab.url).hostname;

    // Load previously selected font
    chrome.storage.sync.get(`selectedFont_${currentDomain}`, function (data) {
      const selectedFont = data[`selectedFont_${currentDomain}`];
      if (selectedFont) {
        fontSelect.value = selectedFont;
      }
    });

    applyButton.addEventListener("click", function () {
      const selectedFont = fontSelect.value;
      if (selectedFont) {
        try {
          chrome.tabs.sendMessage(currentTab.id, {
            action: "changeFont",
            font: selectedFont,
          });
        } catch (error) {
          console.error("Error sending message to content script:", error);
        }

        chrome.storage.sync.set({
          [`selectedFont_${currentDomain}`]: selectedFont,
        });
      }
    });

    resetButton.addEventListener("click", function () {
      chrome.tabs.sendMessage(currentTab.id, { action: "resetFont" });
      chrome.storage.sync.remove(`selectedFont_${currentDomain}`);
      fontSelect.value = "";
    });
  });

  fonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
  });
});

const fonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Raleway",
  "Poppins",
  "Merriweather",
  "Nunito",
  "Ubuntu",
  "PT Sans",
  "Playfair Display",
  "Noto Sans",
  "Roboto Condensed",
  "Rubik",
  "Work Sans",
  "Inter",
  "Quicksand",
  "Fira Sans",
  "Inconsolata",
  "Josefin Sans",
  "Bebas Neue",
  "Dancing Script",
  "Pacifico",
  "Muli",
  "Titillium Web",
  "Arimo",
  "Cabin",
  "Exo 2",
  "Karla",
  "Libre Baskerville",
  "Lora",
  "Merriweather Sans",
  "Mukta",
  "Nanum Gothic",
  "Noto Serif",
  "PT Serif",
  "Quattrocento",
  "Quattrocento Sans",
  "Raleway Dots",
  "Roboto Slab",
  "Slabo 27px",
  "Spectral",
  "Teko",
  "Varela Round",
  "Zilla Slab",
  "ABeeZee",
  "ADLaM Display",
  "AR One Sans",
  "Abel",
  "Abhaya Libre",
  "Aboreto",
  "Abril Fatface",
  "Abyssinica SIL",
  "Aclonica",
  "Acme",
  "Actor",
  "Adamina",
  "Advent Pro",
  "Agdasima",
  "Aguafina Script",
  "Akatab",
  "Akaya Kanadaka",
  "Akaya Telivigala",
  "Akronim",
  "Akshar",
  "Aladin",
  "Alata",
  "Alatsi",
  "Albert Sans",
  "Aldrich",
  "Alef",
  "Alegreya",
  "Alegreya SC",
  "Alegreya Sans",
  "Alegreya Sans SC",
  "Aleo",
  "Alex Brush",
  "Alexandria",
  "Alfa Slab One",
  "Alice",
  "Alike",
  "Alike Angular",
  "Alkalami",
  "Alkatra",
  "Allan",
  "Allerta",
  "Allerta Stencil",
  "Allison",
  "Allura",
  "Almarai",
  "Almendra",
  "Almendra Display",
  "Almendra SC",
  "Alumni Sans",
  "Alumni Sans Collegiate One",
  "Alumni Sans Inline One",
  "Alumni Sans Pinstripe",
  "Amarante",
  "Amaranth",
  "Amatic SC",
  "Amethysta",
  "Amiko",
  "Amiri",
  "Amiri Quran",
  "Amita",
  "Anaheim",
  "Andada Pro",
  "Andika",
  "Anek Bangla",
  "Anek Devanagari",
  "Anek Gujarati",
  "Anek Gurmukhi",
  "Anek Kannada",
  "Anek Latin",
  "Anek Malayalam",
  "Anek Odia",
  "Anek Tamil",
  "Anek Telugu",
  "Angkor",
  "Annie Use Your Telescope",
  "Anonymous Pro",
  "Antic",
  "Antic Didone",
  "Antic Slab",
  "Anton",
  "Antonio",
  "Anuphan",
  "Anybody",
  "Aoboshi One",
  "Arapey",
  "Arbutus",
  "Arbutus Slab",
  "Architects Daughter",
  "Archivo",
  "Archivo Black",
  "Archivo Narrow",
  "Are You Serious",
  "Aref Ruqaa",
  "Aref Ruqaa Ink",
  "Arima",
  "Arima Madurai",
  "Arizonia",
  "Armata",
  "Arsenal",
  "Artifika",
  "Arvo",
  "Arya",
  "Asap",
  "Asap Condensed",
  "Asar",
  "Asset",
  "Assistant",
  "Astloch",
  "Asul",
  "Athiti",
  "Atkinson Hyperlegible",
  "Atma",
  "Atomic Age",
  "Aubrey",
  "Audiowide",
  "Autour One",
  "Average",
  "Average Sans",
  "Averia Gruesa Libre",
  "Averia Libre",
  "Averia Sans Libre",
  "Averia Serif Libre",
  "Azeret Mono",
  "B612",
  "B612 Mono",
  "BIZ UDGothic",
  "BIZ UDMincho",
  "BIZ UDPGothic",
  "BIZ UDPMincho",
  "Babylonica",
  "Bacasime Antique",
  "Bad Script",
  "Bagel Fat One",
  "Bahiana",
  "Bahianita",
  "Bai Jamjuree",
  "Bakbak One",
  "Ballet",
  "Baloo 2",
  "Baloo Bhai 2",
  "Baloo Bhaijaan 2",
  "Baloo Bhaina 2",
  "Baloo Chettan 2",
  "Baloo Da 2",
  "Baloo Paaji 2",
  "Baloo Tamma 2",
  "Baloo Tammudu 2",
  "Baloo Thambi 2",
  "Balsamiq Sans",
  "Balthazar",
  "Bangers",
  "Barlow",
  "Barlow Condensed",
  "Barlow Semi Condensed",
  "Barriecito",
  "Barrio",
  "Basic",
  "Baskervville",
  "Battambang",
  "Baumans",
  "Bayon",
  "Be Vietnam Pro",
  "Beau Rivage",
  "Belanosima",
  "Belgrano",
  "Bellefair",
  "Belleza",
  "Bellota",
  "Bellota Text",
  "BenchNine",
  "Benne",
  "Bentham",
  "Berkshire Swash",
  "Besley",
  "Beth Ellen",
  "Bevan",
  "BhuTuka Expanded One",
  "Big Shoulders Display",
  "Big Shoulders Inline Display",
  "Big Shoulders Inline Text",
  "Big Shoulders Stencil Display",
  "Big Shoulders Stencil Text",
  "Big Shoulders Text",
  "Bigelow Rules",
  "Bigshot One",
  "Bilbo",
  "Bilbo Swash Caps",
  "BioRhyme",
  "BioRhyme Expanded",
  "Birthstone",
  "Birthstone Bounce",
  "Biryani",
  "Bitter",
  "Black And White Picture",
  "Black Han Sans",
  "Black Ops One",
  "Blaka",
  "Blaka Hollow",
  "Blaka Ink",
  "Blinker",
  "Bodoni Moda",
  "Bokor",
  "Bona Nova",
  "Bonbon",
  "Bonheur Royale",
  "Boogaloo",
  "Borel",
  "Bowlby One",
  "Bowlby One SC",
  "Braah One",
  "Brawler",
  "Bree Serif",
  "Bricolage Grotesque",
  "Bruno Ace",
  "Bruno Ace SC",
  "Brygada 1918",
  "Bubblegum Sans",
  "Bubbler One",
  "Buda",
  "Buenard",
  "Bungee",
  "Bungee Hairline",
  "Bungee Inline",
  "Bungee Outline",
  "Bungee Shade",
  "Bungee Spice",
  "Butcherman",
  "Butterfly Kids",
  "Cabin Condensed",
  "Cabin Sketch",
  "Caesar Dressing",
  "Cagliostro",
  "Cairo",
  "Cairo Play",
  "Caladea",
  "Calistoga",
  "Calligraffitti",
  "Cambay",
  "Cambo",
  "Candal",
  "Cantarell",
  "Cantata One",
  "Cantora One",
  "Caprasimo",
  "Capriola",
  "Caramel",
  "Carattere",
  "Cardo",
  "Carlito",
  "Carme",
  "Carrois Gothic",
  "Carrois Gothic SC",
  "Carter One",
  "Castoro",
  "Castoro Titling",
  "Catamaran",
  "Caudex",
  "Caveat",
  "Caveat Brush",
  "Cedarville Cursive",
  "Ceviche One",
  "Chakra Petch",
  "Changa",
  "Changa One",
  "Chango",
  "Charis SIL",
  "Charm",
  "Charmonman",
  "Chathura",
  "Chau Philomene One",
  "Chela One",
  "Chelsea Market",
  "Chenla",
  "Cherish",
  "Cherry Bomb One",
  "Cherry Cream Soda",
  "Cherry Swash",
  "Chewy",
  "Chicle",
  "Chilanka",
  "Chivo",
  "Chivo Mono",
  "Chokokutai",
  "Chonburi",
  "Cinzel",
  "Cinzel Decorative",
  "Clicker Script",
  "Climate Crisis",
  "Coda",
  "Coda Caption",
  "Codystar",
  "Coiny",
  "Combo",
  "Comfortaa",
  "Comforter",
  "Comforter Brush",
  "Comic Neue",
  "Coming Soon",
  "Comme",
  "Commissioner",
  "Concert One",
  "Condiment",
  "Content",
  "Contrail One",
  "Convergence",
  "Cookie",
  "Copse",
  "Corben",
  "Corinthia",
  "Cormorant",
  "Cormorant Garamond",
  "Cormorant Infant",
  "Cormorant SC",
  "Cormorant Unicase",
  "Cormorant Upright",
  "Courgette",
  "Courier Prime",
  "Cousine",
  "Coustard",
  "Covered By Your Grace",
  "Crafty Girls",
  "Creepster",
  "Crete Round",
  "Crimson Pro",
  "Crimson Text",
  "Croissant One",
  "Crushed",
  "Cuprum",
  "Cute Font",
  "Cutive",
  "Cutive Mono",
  "DM Mono",
  "DM Sans",
  "DM Serif Display",
  "DM Serif Text",
  "Dai Banna SIL",
  "Damion",
  "Dangrek",
  "Darker Grotesque",
  "Darumadrop One",
  "David Libre",
  "Dawning of a New Day",
  "Days One",
  "Dekko",
  "Dela Gothic One",
  "Delicious Handrawn",
  "Delius",
  "Delius Swash Caps",
  "Delius Unicase",
  "Della Respira",
  "Denk One",
  "Devonshire",
  "Dhurjati",
  "Didact Gothic",
  "Diphylleia",
  "Diplomata",
  "Diplomata SC",
  "Do Hyeon",
  "Dokdo",
  "Domine",
  "Donegal One",
  "Dongle",
  "Doppio One",
  "Dorsa",
  "Dosis",
  "DotGothic16",
  "Dr Sugiyama",
  "Duru Sans",
  "DynaPuff",
  "Dynalight",
  "EB Garamond",
  "Eagle Lake",
  "East Sea Dokdo",
  "Eater",
  "Economica",
  "Eczar",
  "Edu NSW ACT Foundation",
  "Edu QLD Beginner",
  "Edu SA Beginner",
  "Edu TAS Beginner",
  "Edu VIC WA NT Beginner",
  "El Messiri",
  "Electrolize",
  "Elsie",
  "Elsie Swash Caps",
  "Emblema One",
  "Emilys Candy",
  "Encode Sans",
  "Encode Sans Condensed",
  "Encode Sans Expanded",
  "Encode Sans SC",
  "Encode Sans Semi Condensed",
  "Encode Sans Semi Expanded",
  "Engagement",
  "Englebert",
  "Enriqueta",
  "Ephesis",
  "Epilogue",
  "Erica One",
  "Esteban",
  "Estonia",
  "Euphoria Script",
  "Ewert",
  "Exo",
  "Expletus Sans",
  "Explora",
  "Fahkwang",
  "Familjen Grotesk",
  "Fanwood Text",
  "Farro",
  "Farsan",
  "Fascinate",
  "Fascinate Inline",
  "Faster One",
  "Fasthand",
  "Fauna One",
  "Faustina",
  "Federant",
  "Federo",
  "Felipa",
  "Fenix",
  "Festive",
  "Figtree",
  "Finger Paint",
  "Finlandica",
  "Fira Code",
  "Fira Mono",
  "Fira Sans Condensed",
  "Fira Sans Extra Condensed",
  "Fjalla One",
  "Fjord One",
  "Flamenco",
  "Flavors",
  "Fleur De Leah",
  "Flow Block",
  "Flow Circular",
  "Flow Rounded",
  "Foldit",
  "Fondamento",
  "Fontdiner Swanky",
  "Forum",
  "Fragment Mono",
  "Francois One",
  "Frank Ruhl Libre",
  "Fraunces",
  "Freckle Face",
  "Fredericka the Great",
  "Fredoka",
  "Freehand",
  "Fresca",
  "Frijole",
  "Fruktur",
  "Fugaz One",
  "Fuggles",
  "Fuzzy Bubbles",
  "GFS Didot",
  "GFS Neohellenic",
  "Gabarito",
  "Gabriela",
  "Gaegu",
  "Gafata",
  "Gajraj One",
  "Galada",
  "Galdeano",
  "Galindo",
  "Gamja Flower",
  "Gantari",
  "Gasoek One",
  "Gayathri",
  "Gelasio",
  "Gemunu Libre",
  "Genos",
  "Gentium Book Plus",
  "Gentium Plus",
  "Geo",
  "Geologica",
  "Georama",
  "Geostar",
  "Geostar Fill",
  "Germania One",
  "Gideon Roman",
  "Gidugu",
  "Gilda Display",
  "Girassol",
  "Give You Glory",
  "Glass Antiqua",
  "Glegoo",
  "Gloock",
  "Gloria Hallelujah",
  "Glory",
  "Gluten",
  "Goblin One",
  "Gochi Hand",
  "Goldman",
  "Golos Text",
  "Gorditas",
  "Gothic A1",
  "Gotu",
  "Goudy Bookletter 1911",
  "Gowun Batang",
  "Gowun Dodum",
  "Graduate",
  "Grand Hotel",
  "Grandiflora One",
  "Grandstander",
  "Grape Nuts",
  "Gravitas One",
  "Great Vibes",
  "Grechen Fuemen",
  "Grenze",
  "Grenze Gotisch",
  "Grey Qo",
  "Griffy",
  "Gruppo",
  "Gudea",
  "Gugi",
  "Gulzar",
  "Gupter",
  "Gurajada",
  "Gwendolyn",
  "Habibi",
  "Hachi Maru Pop",
  "Hahmlet",
  "Halant",
  "Hammersmith One",
  "Hanalei",
  "Hanalei Fill",
  "Handjet",
  "Handlee",
  "Hanken Grotesk",
  "Hanuman",
  "Happy Monkey",
  "Harmattan",
  "Headland One",
  "Heebo",
  "Henny Penny",
  "Hepta Slab",
  "Herr Von Muellerhoff",
  "Hi Melody",
  "Hina Mincho",
  "Hind",
  "Hind Guntur",
  "Hind Madurai",
  "Hind Siliguri",
  "Hind Vadodara",
  "Holtwood One SC",
  "Homemade Apple",
  "Homenaje",
  "Hubballi",
  "Hurricane",
  "IBM Plex Mono",
  "IBM Plex Sans",
  "IBM Plex Sans Arabic",
  "IBM Plex Sans Condensed",
  "IBM Plex Sans Devanagari",
  "IBM Plex Sans Hebrew",
  "IBM Plex Sans JP",
  "IBM Plex Sans KR",
  "IBM Plex Sans Thai",
  "IBM Plex Sans Thai Looped",
  "IBM Plex Serif",
  "IM Fell DW Pica",
  "IM Fell DW Pica SC",
  "IM Fell Double Pica",
  "IM Fell Double Pica SC",
  "IM Fell English",
  "IM Fell English SC",
  "IM Fell French Canon",
  "IM Fell French Canon SC",
  "IM Fell Great Primer",
  "IM Fell Great Primer SC",
  "Ibarra Real Nova",
  "Iceberg",
  "Iceland",
  "Imbue",
  "Imperial Script",
  "Imprima",
  "Inclusive Sans",
  "Inder",
  "Indie Flower",
  "Ingrid Darling",
  "Inika",
  "Inknut Antiqua",
  "Inria Sans",
  "Inria Serif",
  "Inspiration",
  "Instrument Sans",
  "Instrument Serif",
  "Inter Tight",
  "Irish Grover",
  "Island Moments",
  "Istok Web",
  "Italiana",
  "Italianno",
  "Itim",
  "Jacques Francois",
  "Jacques Francois Shadow",
  "Jaldi",
  "JetBrains Mono",
  "Jim Nightshade",
  "Joan",
  "Jockey One",
  "Jolly Lodger",
  "Jomhuria",
  "Jomolhari",
  "Josefin Slab",
  "Jost",
  "Joti One",
  "Jua",
  "Judson",
  "Julee",
  "Julius Sans One",
  "Junge",
  "Jura",
  "Just Another Hand",
  "Just Me Again Down Here",
  "K2D",
  "Kablammo",
  "Kadwa",
  "Kaisei Decol",
  "Kaisei HarunoUmi",
  "Kaisei Opti",
  "Kaisei Tokumin",
  "Kalam",
  "Kameron",
  "Kanit",
  "Kantumruy Pro",
  "Karantina",
  "Karma",
  "Katibeh",
  "Kaushan Script",
  "Kavivanar",
  "Kavoon",
  "Kdam Thmor Pro",
  "Keania One",
  "Kelly Slab",
  "Kenia",
  "Khand",
  "Khmer",
  "Khula",
  "Kings",
  "Kirang Haerang",
  "Kite One",
  "Kiwi Maru",
  "Klee One",
  "Knewave",
  "KoHo",
  "Kodchasan",
  "Koh Santepheap",
  "Kolker Brush",
  "Konkhmer Sleokchher",
  "Kosugi",
  "Kosugi Maru",
  "Kotta One",
  "Koulen",
  "Kranky",
  "Kreon",
  "Kristi",
  "Krona One",
  "Krub",
  "Kufam",
  "Kulim Park",
  "Kumar One",
  "Kumar One Outline",
  "Kumbh Sans",
  "Kurale",
  "La Belle Aurore",
  "Labrada",
  "Lacquer",
  "Laila",
  "Lakki Reddy",
  "Lalezar",
  "Lancelot",
  "Langar",
  "Lateef",
  "Lavishly Yours",
  "League Gothic",
  "League Script",
  "League Spartan",
  "Leckerli One",
  "Ledger",
  "Lekton",
  "Lemon",
  "Lemonada",
  "Lexend",
  "Lexend Deca",
  "Lexend Exa",
  "Lexend Giga",
  "Lexend Mega",
  "Lexend Peta",
  "Lexend Tera",
  "Lexend Zetta",
  "Libre Barcode 128",
  "Libre Barcode 128 Text",
  "Libre Barcode 39",
  "Libre Barcode 39 Extended",
  "Libre Barcode 39 Extended Text",
  "Libre Barcode 39 Text",
  "Libre Barcode EAN13 Text",
  "Libre Bodoni",
  "Libre Caslon Display",
  "Libre Caslon Text",
  "Libre Franklin",
  "Licorice",
  "Life Savers",
  "Lilita One",
  "Lily Script One",
  "Limelight",
  "Linden Hill",
  "Lisu Bosa",
  "Literata",
  "Liu Jian Mao Cao",
  "Livvic",
  "Lobster",
  "Lobster Two",
  "Londrina Outline",
  "Londrina Shadow",
  "Londrina Sketch",
  "Londrina Solid",
  "Long Cang",
  "Love Light",
  "Love Ya Like A Sister",
  "Loved by the King",
  "Lovers Quarrel",
  "Luckiest Guy",
  "Lugrasimo",
  "Lumanosimo",
  "Lunasima",
  "Lusitana",
  "Lustria",
  "Luxurious Roman",
  "Luxurious Script",
  "M PLUS 1",
  "M PLUS 1 Code",
  "M PLUS 1p",
  "M PLUS 2",
  "M PLUS Code Latin",
  "M PLUS Rounded 1c",
  "Ma Shan Zheng",
  "Macondo",
  "Macondo Swash Caps",
  "Mada",
  "Magra",
  "Maiden Orange",
  "Maitree",
  "Major Mono Display",
  "Mako",
  "Mali",
  "Mallanna",
  "Mandali",
  "Manjari",
  "Manrope",
  "Mansalva",
  "Manuale",
  "Marcellus",
  "Marcellus SC",
  "Marck Script",
  "Margarine",
  "Marhey",
  "Markazi Text",
  "Marko One",
  "Marmelad",
  "Martel",
  "Martel Sans",
  "Martian Mono",
  "Marvel",
  "Mate",
  "Mate SC",
  "Material Icons",
  "Material Icons Outlined",
  "Material Icons Round",
  "Material Icons Sharp",
  "Material Icons Two Tone",
  "Material Symbols Outlined",
  "Material Symbols Rounded",
  "Material Symbols Sharp",
  "Maven Pro",
  "McLaren",
  "Mea Culpa",
  "Meddon",
  "MedievalSharp",
  "Medula One",
  "Meera Inimai",
  "Megrim",
  "Meie Script",
  "Meow Script",
  "Merienda",
  "Metal",
  "Metal Mania",
  "Metamorphous",
  "Metrophobic",
  "Michroma",
  "Milonga",
  "Miltonian",
  "Miltonian Tattoo",
  "Mina",
  "Mingzat",
  "Miniver",
  "Miriam Libre",
  "Mirza",
  "Miss Fajardose",
  "Mitr",
  "Mochiy Pop One",
  "Mochiy Pop P One",
  "Modak",
  "Modern Antiqua",
  "Mogra",
  "Mohave",
  "Moirai One",
  "Molengo",
  "Molle",
  "Monda",
  "Monofett",
  "Monomaniac One",
  "Monoton",
  "Monsieur La Doulaise",
  "Montaga",
  "Montagu Slab",
  "MonteCarlo",
  "Montez",
  "Montserrat Alternates",
  "Montserrat Subrayada",
  "Moo Lah Lah",
  "Mooli",
  "Moon Dance",
  "Moul",
  "Moulpali",
  "Mountains of Christmas",
  "Mouse Memoirs",
  "Mr Bedfort",
  "Mr Dafoe",
  "Mr De Haviland",
  "Mrs Saint Delafield",
  "Mrs Sheppards",
  "Ms Madi",
  "Mukta Mahee",
  "Mukta Malar",
  "Mukta Vaani",
  "Mulish",
  "Murecho",
  "MuseoModerno",
  "My Soul",
  "Mynerve",
  "Mystery Quest",
  "NTR",
  "Nabla",
  "Nanum Brush Script",
  "Nanum Gothic Coding",
  "Nanum Myeongjo",
  "Nanum Pen Script",
  "Narnoor",
  "Neonderthaw",
  "Nerko One",
  "Neucha",
  "Neuton",
  "New Rocker",
  "New Tegomin",
  "News Cycle",
  "Newsreader",
  "Niconne",
  "Niramit",
  "Nixie One",
  "Nobile",
  "Nokora",
  "Norican",
  "Nosifer",
  "Notable",
  "Nothing You Could Do",
  "Noticia Text",
  "Noto Color Emoji",
  "Noto Emoji",
  "Noto Kufi Arabic",
  "Noto Music",
  "Noto Naskh Arabic",
  "Noto Nastaliq Urdu",
  "Noto Rashi Hebrew",
  "Noto Sans Adlam",
  "Noto Sans Adlam Unjoined",
  "Noto Sans Anatolian Hieroglyphs",
  "Noto Sans Arabic",
  "Noto Sans Armenian",
  "Noto Sans Avestan",
  "Noto Sans Balinese",
  "Noto Sans Bamum",
  "Noto Sans Bassa Vah",
  "Noto Sans Batak",
  "Noto Sans Bengali",
  "Noto Sans Bhaiksuki",
  "Noto Sans Brahmi",
  "Noto Sans Buginese",
  "Noto Sans Buhid",
  "Noto Sans Canadian Aboriginal",
  "Noto Sans Carian",
  "Noto Sans Caucasian Albanian",
  "Noto Sans Chakma",
  "Noto Sans Cham",
  "Noto Sans Cherokee",
  "Noto Sans Chorasmian",
  "Noto Sans Coptic",
  "Noto Sans Cuneiform",
  "Noto Sans Cypriot",
  "Noto Sans Cypro Minoan",
  "Noto Sans Deseret",
  "Noto Sans Devanagari",
  "Noto Sans Display",
  "Noto Sans Duployan",
  "Noto Sans Egyptian Hieroglyphs",
  "Noto Sans Elbasan",
  "Noto Sans Elymaic",
  "Noto Sans Ethiopic",
  "Noto Sans Georgian",
  "Noto Sans Glagolitic",
  "Noto Sans Gothic",
  "Noto Sans Grantha",
  "Noto Sans Gujarati",
  "Noto Sans Gunjala Gondi",
  "Noto Sans Gurmukhi",
  "Noto Sans HK",
  "Noto Sans Hanifi Rohingya",
  "Noto Sans Hanunoo",
  "Noto Sans Hatran",
  "Noto Sans Hebrew",
  "Noto Sans Imperial Aramaic",
  "Noto Sans Indic Siyaq Numbers",
  "Noto Sans Inscriptional Pahlavi",
  "Noto Sans Inscriptional Parthian",
  "Noto Sans JP",
  "Noto Sans Javanese",
  "Noto Sans KR",
  "Noto Sans Kaithi",
  "Noto Sans Kannada",
  "Noto Sans Kayah Li",
  "Noto Sans Kharoshthi",
  "Noto Sans Khmer",
  "Noto Sans Khojki",
  "Noto Sans Khudawadi",
  "Noto Sans Lao",
  "Noto Sans Lao Looped",
  "Noto Sans Lepcha",
  "Noto Sans Limbu",
  "Noto Sans Linear A",
  "Noto Sans Linear B",
  "Noto Sans Lisu",
  "Noto Sans Lycian",
  "Noto Sans Lydian",
  "Noto Sans Mahajani",
  "Noto Sans Malayalam",
  "Noto Sans Mandaic",
  "Noto Sans Manichaean",
  "Noto Sans Marchen",
  "Noto Sans Masaram Gondi",
  "Noto Sans Math",
  "Noto Sans Mayan Numerals",
  "Noto Sans Medefaidrin",
  "Noto Sans Meetei Mayek",
  "Noto Sans Mende Kikakui",
  "Noto Sans Meroitic",
  "Noto Sans Miao",
  "Noto Sans Modi",
  "Noto Sans Mongolian",
  "Noto Sans Mono",
  "Noto Sans Mro",
  "Noto Sans Multani",
  "Noto Sans Myanmar",
  "Noto Sans NKo",
  "Noto Sans NKo Unjoined",
  "Noto Sans Nabataean",
  "Noto Sans Nag Mundari",
  "Noto Sans Nandinagari",
  "Noto Sans New Tai Lue",
  "Noto Sans Newa",
  "Noto Sans Nushu",
  "Noto Sans Ogham",
  "Noto Sans Ol Chiki",
  "Noto Sans Old Hungarian",
  "Noto Sans Old Italic",
  "Noto Sans Old North Arabian",
  "Noto Sans Old Permic",
  "Noto Sans Old Persian",
  "Noto Sans Old Sogdian",
  "Noto Sans Old South Arabian",
  "Noto Sans Old Turkic",
  "Noto Sans Oriya",
  "Noto Sans Osage",
  "Noto Sans Osmanya",
  "Noto Sans Pahawh Hmong",
  "Noto Sans Palmyrene",
  "Noto Sans Pau Cin Hau",
  "Noto Sans Phags Pa",
  "Noto Sans Phoenician",
  "Noto Sans Psalter Pahlavi",
  "Noto Sans Rejang",
  "Noto Sans Runic",
  "Noto Sans SC",
  "Noto Sans Samaritan",
  "Noto Sans Saurashtra",
  "Noto Sans Sharada",
  "Noto Sans Shavian",
  "Noto Sans Siddham",
  "Noto Sans SignWriting",
  "Noto Sans Sinhala",
  "Noto Sans Sogdian",
  "Noto Sans Sora Sompeng",
  "Noto Sans Soyombo",
  "Noto Sans Sundanese",
  "Noto Sans Syloti Nagri",
  "Noto Sans Symbols",
  "Noto Sans Symbols 2",
  "Noto Sans Syriac",
  "Noto Sans Syriac Eastern",
  "Noto Sans TC",
  "Noto Sans Tagalog",
  "Noto Sans Tagbanwa",
  "Noto Sans Tai Le",
  "Noto Sans Tai Tham",
  "Noto Sans Tai Viet",
  "Noto Sans Takri",
  "Noto Sans Tamil",
  "Noto Sans Tamil Supplement",
  "Noto Sans Tangsa",
  "Noto Sans Telugu",
  "Noto Sans Thaana",
  "Noto Sans Thai",
  "Noto Sans Thai Looped",
  "Noto Sans Tifinagh",
  "Noto Sans Tirhuta",
  "Noto Sans Ugaritic",
  "Noto Sans Vai",
  "Noto Sans Vithkuqi",
  "Noto Sans Wancho",
  "Noto Sans Warang Citi",
  "Noto Sans Yi",
  "Noto Sans Zanabazar Square",
  "Noto Serif Ahom",
  "Noto Serif Armenian",
  "Noto Serif Balinese",
  "Noto Serif Bengali",
  "Noto Serif Devanagari",
  "Noto Serif Display",
  "Noto Serif Dogra",
  "Noto Serif Ethiopic",
  "Noto Serif Georgian",
  "Noto Serif Grantha",
  "Noto Serif Gujarati",
  "Noto Serif Gurmukhi",
  "Noto Serif HK",
  "Noto Serif Hebrew",
  "Noto Serif JP",
  "Noto Serif KR",
  "Noto Serif Kannada",
  "Noto Serif Khitan Small Script",
  "Noto Serif Khmer",
  "Noto Serif Khojki",
  "Noto Serif Lao",
  "Noto Serif Makasar",
  "Noto Serif Malayalam",
  "Noto Serif Myanmar",
  "Noto Serif NP Hmong",
  "Noto Serif Oriya",
  "Noto Serif Ottoman Siyaq",
  "Noto Serif SC",
  "Noto Serif Sinhala",
  "Noto Serif TC",
  "Noto Serif Tamil",
  "Noto Serif Tangut",
  "Noto Serif Telugu",
  "Noto Serif Thai",
  "Noto Serif Tibetan",
  "Noto Serif Toto",
  "Noto Serif Vithkuqi",
  "Noto Serif Yezidi",
  "Noto Traditional Nushu",
  "Nova Cut",
  "Nova Flat",
  "Nova Mono",
  "Nova Oval",
  "Nova Round",
  "Nova Script",
  "Nova Slim",
  "Nova Square",
  "Numans",
  "Nunito Sans",
  "Nuosu SIL",
  "Odibee Sans",
  "Odor Mean Chey",
  "Offside",
  "Oi",
  "Old Standard TT",
  "Oldenburg",
  "Ole",
  "Oleo Script",
  "Oleo Script Swash Caps",
  "Onest",
  "Oooh Baby",
  "Oranienbaum",
  "Orbit",
  "Orbitron",
  "Oregano",
  "Orelega One",
  "Orienta",
  "Original Surfer",
  "Outfit",
  "Over the Rainbow",
  "Overlock",
  "Overlock SC",
  "Overpass",
  "Overpass Mono",
  "Ovo",
  "Oxanium",
  "Oxygen",
  "Oxygen Mono",
  "PT Mono",
  "PT Sans Caption",
  "PT Sans Narrow",
  "PT Serif Caption",
  "Padauk",
  "Padyakke Expanded One",
  "Palanquin",
  "Palanquin Dark",
  "Palette Mosaic",
  "Pangolin",
  "Paprika",
  "Parisienne",
  "Passero One",
  "Passion One",
  "Passions Conflict",
  "Pathway Extreme",
  "Pathway Gothic One",
  "Patrick Hand",
  "Patrick Hand SC",
  "Pattaya",
  "Patua One",
  "Pavanam",
  "Paytone One",
  "Peddana",
  "Peralta",
  "Permanent Marker",
  "Petemoss",
  "Petit Formal Script",
  "Petrona",
  "Philosopher",
  "Phudu",
  "Piazzolla",
  "Piedra",
  "Pinyon Script",
  "Pirata One",
  "Pixelify Sans",
  "Plaster",
  "Play",
  "Playball",
  "Playfair",
  "Playfair Display SC",
  "Playpen Sans",
  "Plus Jakarta Sans",
  "Podkova",
  "Poiret One",
  "Poller One",
  "Poltawski Nowy",
  "Poly",
  "Pompiere",
  "Pontano Sans",
  "Poor Story",
  "Port Lligat Sans",
  "Port Lligat Slab",
  "Potta One",
  "Pragati Narrow",
  "Praise",
  "Prata",
  "Preahvihear",
  "Press Start 2P",
  "Pridi",
  "Princess Sofia",
  "Prociono",
  "Prompt",
  "Prosto One",
  "Proza Libre",
  "Public Sans",
  "Puppies Play",
  "Puritan",
  "Purple Purse",
  "Qahiri",
  "Quando",
  "Quantico",
  "Questrial",
  "Quintessential",
  "Qwigley",
  "Qwitcher Grypen",
  "REM",
  "Racing Sans One",
  "Radio Canada",
  "Radley",
  "Rajdhani",
  "Rakkas",
  "Ramabhadra",
  "Ramaraja",
  "Rambla",
  "Rammetto One",
  "Rampart One",
  "Ranchers",
  "Rancho",
  "Ranga",
  "Rasa",
  "Rationale",
  "Ravi Prakash",
  "Readex Pro",
  "Recursive",
  "Red Hat Display",
  "Red Hat Mono",
  "Red Hat Text",
  "Red Rose",
  "Redacted",
  "Redacted Script",
  "Redressed",
  "Reem Kufi",
  "Reem Kufi Fun",
  "Reem Kufi Ink",
  "Reenie Beanie",
  "Reggae One",
  "Revalia",
  "Rhodium Libre",
  "Ribeye",
  "Ribeye Marrow",
  "Righteous",
  "Risque",
  "Road Rage",
  "Roboto Flex",
  "Roboto Mono",
  "Roboto Serif",
  "Rochester",
  "Rock 3D",
  "Rock Salt",
  "RocknRoll One",
  "Rokkitt",
  "Romanesco",
  "Ropa Sans",
  "Rosario",
  "Rosarivo",
  "Rouge Script",
  "Rowdies",
  "Rozha One",
  "Rubik 80s Fade",
  "Rubik Beastly",
  "Rubik Bubbles",
  "Rubik Burned",
  "Rubik Dirt",
  "Rubik Distressed",
  "Rubik Gemstones",
  "Rubik Glitch",
  "Rubik Iso",
  "Rubik Marker Hatch",
  "Rubik Maze",
  "Rubik Microbe",
  "Rubik Mono One",
  "Rubik Moonrocks",
  "Rubik Pixels",
  "Rubik Puddles",
  "Rubik Spray Paint",
  "Rubik Storm",
  "Rubik Vinyl",
  "Rubik Wet Paint",
  "Ruda",
  "Rufina",
  "Ruge Boogie",
  "Ruluko",
  "Rum Raisin",
  "Ruslan Display",
  "Russo One",
  "Ruthie",
  "Ruwudu",
  "Rye",
  "STIX Two Text",
  "Sacramento",
  "Sahitya",
  "Sail",
  "Saira",
  "Saira Condensed",
  "Saira Extra Condensed",
  "Saira Semi Condensed",
  "Saira Stencil One",
  "Salsa",
  "Sanchez",
  "Sancreek",
  "Sansita",
  "Sansita Swashed",
  "Sarabun",
  "Sarala",
  "Sarina",
  "Sarpanch",
  "Sassy Frass",
  "Satisfy",
  "Sawarabi Gothic",
  "Sawarabi Mincho",
  "Scada",
  "Scheherazade New",
  "Schibsted Grotesk",
  "Schoolbell",
  "Scope One",
  "Seaweed Script",
  "Secular One",
  "Sedgwick Ave",
  "Sedgwick Ave Display",
  "Sen",
  "Send Flowers",
  "Sevillana",
  "Seymour One",
  "Shadows Into Light",
  "Shadows Into Light Two",
  "Shalimar",
  "Shantell Sans",
  "Shanti",
  "Share",
  "Share Tech",
  "Share Tech Mono",
  "Shippori Antique",
  "Shippori Antique B1",
  "Shippori Mincho",
  "Shippori Mincho B1",
  "Shizuru",
  "Shojumaru",
  "Short Stack",
  "Shrikhand",
  "Siemreap",
  "Sigmar",
  "Sigmar One",
  "Signika",
  "Signika Negative",
  "Silkscreen",
  "Simonetta",
  "Single Day",
  "Sintony",
  "Sirin Stencil",
  "Six Caps",
  "Skranji",
  "Slabo 13px",
  "Slackey",
  "Slackside One",
  "Smokum",
  "Smooch",
  "Smooch Sans",
  "Smythe",
  "Sniglet",
  "Snippet",
  "Snowburst One",
  "Sofadi One",
  "Sofia",
  "Sofia Sans",
  "Sofia Sans Condensed",
  "Sofia Sans Extra Condensed",
  "Sofia Sans Semi Condensed",
  "Solitreo",
  "Solway",
  "Sometype Mono",
  "Song Myung",
  "Sono",
  "Sonsie One",
  "Sora",
  "Sorts Mill Goudy",
  "Source Code Pro",
  "Source Sans 3",
  "Source Serif 4",
  "Space Grotesk",
  "Space Mono",
  "Special Elite",
  "Spectral SC",
  "Spicy Rice",
  "Spinnaker",
  "Spirax",
  "Splash",
  "Spline Sans",
  "Spline Sans Mono",
  "Squada One",
  "Square Peg",
  "Sree Krushnadevaraya",
  "Sriracha",
  "Srisakdi",
  "Staatliches",
  "Stalemate",
  "Stalinist One",
  "Stardos Stencil",
  "Stick",
  "Stick No Bills",
  "Stint Ultra Condensed",
  "Stint Ultra Expanded",
  "Stoke",
  "Strait",
  "Style Script",
  "Stylish",
  "Sue Ellen Francisco",
  "Suez One",
  "Sulphur Point",
  "Sumana",
  "Sunflower",
  "Sunshiney",
  "Supermercado One",
  "Sura",
  "Suranna",
  "Suravaram",
  "Suwannaphum",
  "Swanky and Moo Moo",
  "Syncopate",
  "Syne",
  "Syne Mono",
  "Syne Tactile",
  "Tai Heritage Pro",
  "Tajawal",
  "Tangerine",
  "Tapestry",
  "Taprom",
  "Tauri",
  "Taviraj",
  "Tektur",
  "Telex",
  "Tenali Ramakrishna",
  "Tenor Sans",
  "Text Me One",
  "Texturina",
  "Thasadith",
  "The Girl Next Door",
  "The Nautigal",
  "Tienne",
  "Tillana",
  "Tilt Neon",
  "Tilt Prism",
  "Tilt Warp",
  "Timmana",
  "Tinos",
  "Tiro Bangla",
  "Tiro Devanagari Hindi",
  "Tiro Devanagari Marathi",
  "Tiro Devanagari Sanskrit",
  "Tiro Gurmukhi",
  "Tiro Kannada",
  "Tiro Tamil",
  "Tiro Telugu",
  "Titan One",
  "Tomorrow",
  "Tourney",
  "Trade Winds",
  "Train One",
  "Trirong",
  "Trispace",
  "Trocchi",
  "Trochut",
  "Truculenta",
  "Trykker",
  "Tsukimi Rounded",
  "Tulpen One",
  "Turret Road",
  "Twinkle Star",
  "Ubuntu Condensed",
  "Ubuntu Mono",
  "Uchen",
  "Ultra",
  "Unbounded",
  "Uncial Antiqua",
  "Underdog",
  "Unica One",
  "UnifrakturCook",
  "UnifrakturMaguntia",
  "Unkempt",
  "Unlock",
  "Unna",
  "Updock",
  "Urbanist",
  "VT323",
  "Vampiro One",
  "Varela",
  "Varta",
  "Vast Shadow",
  "Vazirmatn",
  "Vesper Libre",
  "Viaoda Libre",
  "Vibes",
  "Vibur",
  "Victor Mono",
  "Vidaloka",
  "Viga",
  "Vina Sans",
  "Voces",
  "Volkhov",
  "Vollkorn",
  "Vollkorn SC",
  "Voltaire",
  "Vujahday Script",
  "Waiting for the Sunrise",
  "Wallpoet",
  "Walter Turncoat",
  "Warnes",
  "Water Brush",
  "Waterfall",
  "Wavefont",
  "Wellfleet",
  "Wendy One",
  "Whisper",
  "WindSong",
  "Wire One",
  "Wix Madefor Display",
  "Wix Madefor Text",
  "Xanh Mono",
  "Yaldevi",
  "Yanone Kaffeesatz",
  "Yantramanav",
  "Yatra One",
  "Yellowtail",
  "Yeon Sung",
  "Yeseva One",
  "Yesteryear",
  "Yomogi",
  "Young Serif",
  "Yrsa",
  "Ysabeau",
  "Ysabeau Infant",
  "Ysabeau Office",
  "Ysabeau SC",
  "Yuji Boku",
  "Yuji Hentaigana Akari",
  "Yuji Hentaigana Akebono",
  "Yuji Mai",
  "Yuji Syuku",
  "Yusei Magic",
  "ZCOOL KuaiLe",
  "ZCOOL QingKe HuangYou",
  "ZCOOL XiaoWei",
  "Zen Antique",
  "Zen Antique Soft",
  "Zen Dots",
  "Zen Kaku Gothic Antique",
  "Zen Kaku Gothic New",
  "Zen Kurenaido",
  "Zen Loop",
  "Zen Maru Gothic",
  "Zen Old Mincho",
  "Zen Tokyo Zoo",
  "Zeyada",
  "Zhi Mang Xing",
  "Zilla Slab Highlight",
];
