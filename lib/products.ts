export interface Nutrition {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  calories: number;
  category: "classic" | "fruity" | "premium";
  nutrition: {
    perServing: Nutrition;
    per100g: Nutrition;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Double Chocolate",
    slug: "double-chocolate",
    price: 12,
    image: "/donuts/double-chocolate.webp",
    description:
      "Încântă-ți papilele gustative cu gogoașa Double Chocolate, o adevărată desfătare pentru iubitorii de ciocolată. Aluat pufos umplut cu cremă de ciocolată, glazurat cu ciocolată neagră premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 256,
    category: "classic",
    nutrition: {
      perServing: { kcal: 256, fat: 13.44, carbs: 29.03, protein: 4.28 },
      per100g: { kcal: 427, fat: 22.4, carbs: 48.38, protein: 7.13 },
    },
  },
  {
    id: "2",
    name: "Vanillian",
    slug: "vanillian",
    price: 12,
    image: "/donuts/vanillian.webp",
    description:
      "Descoperă rafinamentul simplu al gogoașei Vanillian, un desert care celebrează eleganța vaniliei clasice. Aluat pufos umplut cu cremă fină de vanilie, glazurat cu ciocolată cu lapte premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "cremă de vanilie", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 225,
    category: "classic",
    nutrition: {
      perServing: { kcal: 225, fat: 8.37, carbs: 35.26, protein: 3.18 },
      per100g: { kcal: 375, fat: 13.95, carbs: 58.77, protein: 5.3 },
    },
  },
  {
    id: "3",
    name: "Orange Blossom",
    slug: "orange-blossom",
    price: 12,
    image: "/donuts/orange-blossom.webp",
    description:
      "Răsfață-ți simțurile cu gogoașa Orange Blossom, o delicatesă sofisticată cu aromă revigorantă de portocale. Glazură delicată de portocale, decorată cu coajă de portocală confiată și semințe de rodie.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de portocale", "cremă de ciocolată albă", "portocale confiate", "semințe de rodie"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 163,
    category: "fruity",
    nutrition: {
      perServing: { kcal: 163, fat: 7.39, carbs: 21.48, protein: 2.4 },
      per100g: { kcal: 354, fat: 16.07, carbs: 46.7, protein: 5.22 },
    },
  },
  {
    id: "4",
    name: "Banana Fantasy",
    slug: "banana-fantasy",
    price: 12,
    image: "/donuts/banana-fantasy.webp",
    description:
      "Răsfață-te cu gogoașa Banana Fantasy, un desert visător care îmbină textura pufoasă cu aroma intensă de banană. Decorată cu chipsuri de banană crocante pentru un contrast de texturi irezistibil.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de banană", "cremă de ciocolată albă", "chipsuri de banană"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 174,
    category: "fruity",
    nutrition: {
      perServing: { kcal: 174, fat: 8.46, carbs: 21.52, protein: 2.4 },
      per100g: { kcal: 395, fat: 19.23, carbs: 48.91, protein: 5.45 },
    },
  },
  {
    id: "5",
    name: "Coco Naughty",
    slug: "coco-naughty",
    price: 12,
    image: "/donuts/coco-naughty.webp",
    description:
      "Răsfață-ți papilele gustative cu gogoașa Coco Naughty, o combinație irezistibilă între textura pufoasă și aroma bogată a nucii de cocos. Glazură de ciocolată neagră cu fulgi de cocos crocant.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "fulgi de cocos"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 154,
    category: "classic",
    nutrition: {
      perServing: { kcal: 154, fat: 7.95, carbs: 17.01, protein: 2.68 },
      per100g: { kcal: 384, fat: 19.87, carbs: 42.53, protein: 6.7 },
    },
  },
  {
    id: "6",
    name: "Almond Famous",
    slug: "almond-famous",
    price: 12,
    image: "/donuts/almond-famous.webp",
    description:
      "Încântă-ți simțurile cu gogoașa Almond Famous, o capodoperă delicioasă care combină textura pufoasă cu gustul rafinat și crocant al migdalelor. Glazură de ciocolată cu lapte și fulgi de migdale.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "fulgi de migdale"],
    allergens: ["Ouă", "Lapte", "Gluten", "Migdale"],
    calories: 178,
    category: "premium",
    nutrition: {
      perServing: { kcal: 178, fat: 9.95, carbs: 17.87, protein: 4.11 },
      per100g: { kcal: 405, fat: 22.61, carbs: 40.61, protein: 9.34 },
    },
  },
  {
    id: "7",
    name: "Oreo Dream",
    slug: "oreo-dream",
    price: 12,
    image: "/donuts/oreo-dream.webp",
    description:
      "Intră în lumea viselor dulci cu gogoașa Oreo Dream, o combinație irezistibilă de textură pufoasă și aromă intensă de Oreo. Glazură de ciocolată albă, decorată generos cu biscuiți Oreo.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată albă", "biscuiți Oreo"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 173,
    category: "classic",
    nutrition: {
      perServing: { kcal: 173, fat: 8.73, carbs: 20.75, protein: 2.93 },
      per100g: { kcal: 392, fat: 19.84, carbs: 47.16, protein: 6.66 },
    },
  },
  {
    id: "8",
    name: "Honey Buzz",
    slug: "honey-buzz",
    price: 12,
    image: "/donuts/honey-buzz.webp",
    description:
      "Descoperă deliciul natural al gogoașei Honey Buzz, o combinație perfectă de textură pufoasă și dulceața delicată a mierii. Glazurată generos cu miere poliflora aurie și decorată cu biscuiți.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "miere poliflora", "biscuiți"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 151,
    category: "classic",
    nutrition: {
      perServing: { kcal: 151, fat: 4.61, carbs: 23.85, protein: 2.36 },
      per100g: { kcal: 342, fat: 10.48, carbs: 54.2, protein: 5.36 },
    },
  },
  {
    id: "9",
    name: "Blueberry Rush",
    slug: "blueberry-rush",
    price: 12,
    image: "/donuts/blueberry-rush.webp",
    description:
      "Descoperă explozia de savoare a gogoașei Blueberry Rush! Glazură dulce de afine cu afine confiate, oferind note proaspete și natural dulci. Ideală pentru iubitorii de fructe.",
    ingredients: ["Făină", "lapte integral 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de afine", "fondant", "afine confiate"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 156,
    category: "fruity",
    nutrition: {
      perServing: { kcal: 156, fat: 4.47, carbs: 26.05, protein: 2.18 },
      per100g: { kcal: 279, fat: 7.98, carbs: 46.52, protein: 3.89 },
    },
  },
  {
    id: "10",
    name: "Pistachious",
    slug: "pistachious",
    price: 12,
    image: "/donuts/pistachious.webp",
    description:
      "Savurează deliciul autentic al gogoașei Pistachious, o combinație rafinată cu aromă distinctă de fistic. Glazură cremoasă cu gust intens de fistic și note subtil de nucă, decorată cu fistic verde proaspăt măcinat.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de fistic", "cremă de ciocolată albă", "fistic verde"],
    allergens: ["Ouă", "Lapte", "Gluten", "Fistic", "Alune", "Soia"],
    calories: 176,
    category: "premium",
    nutrition: {
      perServing: { kcal: 176, fat: 9.03, carbs: 20.74, protein: 2.8 },
      per100g: { kcal: 400, fat: 20.52, carbs: 47.14, protein: 6.36 },
    },
  },
  {
    id: "11",
    name: "Caramel Dash",
    slug: "caramel-dash",
    price: 12,
    image: "/donuts/caramel-dash.webp",
    description:
      "Răsfață-ți papilele gustative cu gogoașa Caramel Dash! O adevărată capodoperă cu textură moale și pufoasă, glazurată generos cu caramel auriu și decorată cu bucăți de alune crocante.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "caramel", "alune de pădure"],
    allergens: ["Ouă", "Lapte", "Gluten", "Alune"],
    calories: 173,
    category: "premium",
    nutrition: {
      perServing: { kcal: 173, fat: 6.55, carbs: 25.32, protein: 3 },
      per100g: { kcal: 346, fat: 13.1, carbs: 50.64, protein: 6 },
    },
  },
  {
    id: "12",
    name: "Coffeelicious",
    slug: "coffeelicious",
    price: 12,
    image: "/donuts/coffeelicious.webp",
    description:
      "Bucură-te de rafinamentul cafelei în fiecare mușcătură cu gogoașa Coffeelicious! Îmbinând gustul intens al cafelei cu textura pufoasă a unui aluat proaspăt, această gogoașă oferă o experiență senzorială completă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "cafea"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 134,
    category: "premium",
    nutrition: {
      perServing: { kcal: 134, fat: 6.43, carbs: 16.7, protein: 2.42 },
      per100g: { kcal: 352, fat: 16.93, carbs: 43.95, protein: 6.38 },
    },
  },
  {
    id: "13",
    name: "Raspberry Blast",
    slug: "raspberry-blast",
    price: 12,
    image: "/donuts/raspberry-blast.webp",
    description:
      "Descoperă explozia de arome oferită de gogoașa Raspberry Blast! Glazură de zmeură cu nuanță roz naturală, echilibrată de note ușor acrișoare de zmeură liofilizată. O experiență gustativă și vizuală deopotrivă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "extract de vanilie", "apă", "ulei vegetal", "pastă de zmeură", "fondant", "zmeură liofilizată"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 155,
    category: "fruity",
    nutrition: {
      perServing: { kcal: 155, fat: 4.49, carbs: 25.91, protein: 2.25 },
      per100g: { kcal: 309, fat: 8.98, carbs: 51.82, protein: 4.5 },
    },
  },
];
