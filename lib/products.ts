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
}

export const products: Product[] = [
  {
    id: "1",
    name: "Double Chocolate",
    slug: "double-chocolate",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp",
    description:
      "Încântă-ți papilele gustative cu gogoașa Double Chocolate, o adevărată desfătare pentru iubitorii de ciocolată. Aluat pufos umplut cu cremă de ciocolată, glazurat cu ciocolată neagră premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 256,
    category: "classic",
  },
  {
    id: "2",
    name: "Vanillian",
    slug: "vanillian",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Vanillian.webp",
    description:
      "Descoperă rafinamentul simplu al gogoașei Vanillian, un desert care celebrează eleganța vaniliei clasice. Aluat pufos umplut cu cremă fină de vanilie, glazurat cu ciocolată cu lapte premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "cremă de vanilie", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 225,
    category: "classic",
  },
  {
    id: "3",
    name: "Orange Blossom",
    slug: "orange-blossom",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Orange-Blossom.webp",
    description:
      "Răsfață-ți simțurile cu gogoașa Orange Blossom, o delicatesă sofisticată cu aromă revigorantă de portocale. Glazură delicată de portocale, decorată cu coajă de portocală confiată și semințe de rodie.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de portocale", "cremă de ciocolată albă", "portocale confiate", "semințe de rodie"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 163,
    category: "fruity",
  },
  {
    id: "4",
    name: "Banana Fantasy",
    slug: "banana-fantasy",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Banana-Fantasy.webp",
    description:
      "Răsfață-te cu gogoașa Banana Fantasy, un desert visător care îmbină textura pufoasă cu aroma intensă de banană. Decorată cu chipsuri de banană crocante pentru un contrast de texturi irezistibil.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de banană", "cremă de ciocolată albă", "chipsuri de banană"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 174,
    category: "fruity",
  },
  {
    id: "5",
    name: "Coco Naughty",
    slug: "coco-naughty",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Coco-Naughty.webp",
    description:
      "Răsfață-ți papilele gustative cu gogoașa Coco Naughty, o combinație irezistibilă între textura pufoasă și aroma bogată a nucii de cocos. Glazură de ciocolată neagră cu fulgi de cocos crocant.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "fulgi de cocos"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 154,
    category: "classic",
  },
  {
    id: "6",
    name: "Almond Famous",
    slug: "almond-famous",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Almond-Famous-1.webp",
    description:
      "Încântă-ți simțurile cu gogoașa Almond Famous, o capodoperă delicioasă care combină textura pufoasă cu gustul rafinat și crocant al migdalelor. Glazură de ciocolată cu lapte și fulgi de migdale.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "fulgi de migdale"],
    allergens: ["Ouă", "Lapte", "Gluten", "Migdale"],
    calories: 178,
    category: "premium",
  },
  {
    id: "7",
    name: "Oreo Dream",
    slug: "oreo-dream",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
    description:
      "Intră în lumea viselor dulci cu gogoașa Oreo Dream, o combinație irezistibilă de textură pufoasă și aromă intensă de Oreo. Glazură de ciocolată albă, decorată generos cu biscuiți Oreo.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată albă", "biscuiți Oreo"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 173,
    category: "classic",
  },
  {
    id: "8",
    name: "Honey Buzz",
    slug: "honey-buzz",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Honey-Buzz.webp",
    description:
      "Descoperă deliciul natural al gogoașei Honey Buzz, o combinație perfectă de textură pufoasă și dulceața delicată a mierii. Glazurată generos cu miere poliflora aurie și decorată cu biscuiți.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "miere poliflora", "biscuiți"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 151,
    category: "classic",
  },
  {
    id: "9",
    name: "Blueberry Rush",
    slug: "blueberry-rush",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Blueberry-Rush-1.webp",
    description:
      "Descoperă explozia de savoare a gogoașei Blueberry Rush! Glazură dulce de afine cu afine confiate, oferind note proaspete și natural dulci. Ideală pentru iubitorii de fructe.",
    ingredients: ["Făină", "lapte integral 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de afine", "fondant", "afine confiate"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 156,
    category: "fruity",
  },
  {
    id: "10",
    name: "Pistachious",
    slug: "pistachious",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
    description:
      "Savurează deliciul autentic al gogoașei Pistachious, o combinație rafinată cu aromă distinctă de fistic. Glazură cremoasă cu gust intens de fistic și note subtil de nucă, decorată cu fistic verde proaspăt măcinat.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de fistic", "cremă de ciocolată albă", "fistic verde"],
    allergens: ["Ouă", "Lapte", "Gluten", "Fistic", "Alune", "Soia"],
    calories: 176,
    category: "premium",
  },
  {
    id: "11",
    name: "Caramel Dash",
    slug: "caramel-dash",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
    description:
      "Răsfață-ți papilele gustative cu gogoașa Caramel Dash! O adevărată capodoperă cu textură moale și pufoasă, glazurată generos cu caramel auriu și decorată cu bucăți de alune crocante.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "caramel", "alune de pădure"],
    allergens: ["Ouă", "Lapte", "Gluten", "Alune"],
    calories: 173,
    category: "premium",
  },
  {
    id: "12",
    name: "Coffeelicious",
    slug: "coffeelicious",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Coffeelicious.webp",
    description:
      "Bucură-te de rafinamentul cafelei în fiecare mușcătură cu gogoașa Coffeelicious! Îmbinând gustul intens al cafelei cu textura pufoasă a unui aluat proaspăt, această gogoașă oferă o experiență senzorială completă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "cafea"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 134,
    category: "premium",
  },
  {
    id: "13",
    name: "Raspberry Blast",
    slug: "raspberry-blast",
    price: 12,
    image: "https://www.donutstudio.ro/wp-content/uploads/2021/08/Raspberry-Blast.webp",
    description:
      "Descoperă explozia de arome oferită de gogoașa Raspberry Blast! Glazură de zmeură cu nuanță roz naturală, echilibrată de note ușor acrișoare de zmeură liofilizată. O experiență gustativă și vizuală deopotrivă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "extract de vanilie", "apă", "ulei vegetal", "pastă de zmeură", "fondant", "zmeură liofilizată"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 155,
    category: "fruity",
  },
];
