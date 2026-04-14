export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: Section[];
};

type Section = {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "povestea-doamnelor-gogosilor-din-primul-razboi-mondial",
    title: "Povestea \"Doamnelor Gogoșilor\" din Primul Război Mondial",
    date: "10 ianuarie 2025",
    category: "Donuts",
    readTime: "4 min",
    excerpt:
      "Istoria emoționantă a voluntarelor Armatei Salvării care au pregătit gogoși pe front pentru soldații americani, dând naștere unei tradiții ce dăinuie până azi.",
    coverImage: "/donuts/double-chocolate.webp",
    content: [
      {
        type: "paragraph",
        text: "În timpul Primului Război Mondial, mii de soldați americani au descoperit o clipă de normalitate și confort pe câmpul de luptă european — nu printr-o armistice, ci printr-o gogoașă caldă, oferită de mâini generoase.",
      },
      {
        type: "heading",
        text: "Misiunea",
      },
      {
        type: "paragraph",
        text: 'Voluntarele Armatei Salvării au fost trimise în Europa pentru a oferi soldaților americani un gust de acasă prin gogoși proaspăt pregătite. Aceste femei curajoase, supranumite "Doughnut Lassies" (Doamnele Gogoșilor), au mers direct pe front, aducând nu doar mâncare, ci și un suflu de speranță și normalitate în mijlocul ororilor războiului.',
      },
      {
        type: "heading",
        text: "Condiții extreme, voință neînduplecată",
      },
      {
        type: "paragraph",
        text: 'Lucrând în condiții de-a dreptul extreme, voluntarele au improvizat cu resursele disponibile: "capace de oale drept tigăi și cutii de muniție drept tăvi". Pregăteau sute de gogoși zilnic, în ciuda lipsei acute de materiale și a pericolelor constante ale frontului.',
      },
      {
        type: "heading",
        text: "Helen Purviance — Mama Gogoșilor",
      },
      {
        type: "paragraph",
        text: 'Helen Purviance a devenit cel mai celebrat chip al programului. Ea a rămas în istorie ca "mama gogoșilor" și a povestit cum îngenunchea pentru a prăji câte șapte gogoși odată în tigăile mici, în primele zile ale inițiativei. Dedicarea ei a inspirat zeci de alte voluntare să urmeze același drum.',
      },
      {
        type: "heading",
        text: "Impact și amploare",
      },
      {
        type: "paragraph",
        text: "Primele eforturi au produs aproximativ 150 de gogoși pe zi. Cu timpul, numărul a crescut spectaculos, ajungând la între 2.500 și 9.000 de gogoși zilnic. Servite calde alături de cafea sau ceai, aceste delicii au oferit soldaților momente prețioase de alinare și bucurie.",
      },
      {
        type: "heading",
        text: "Moștenirea: Ziua Gogoșii",
      },
      {
        type: "paragraph",
        text: 'Gestul umanitar a fost atât de profund, încât "Ziua Gogoșii" a fost stabilită oficial în 1938 pentru a onora contribuția voluntarelor. Sărbătorită în prima vineri din iunie, această zi a consacrat gogoașa drept simbol durabil al confortului american și al solidarității umane.',
      },
      {
        type: "paragraph",
        text: "La Donut Studio, fiecare gogoașă pe care o pregătim poartă în ea ecoul acestei povești frumoase — că un lucru simplu, făcut cu drag, poate schimba ziua cuiva.",
      },
    ],
  },
  {
    slug: "magia-rotunda-tot-ce-nu-stiai-despre-gogosi",
    title: "Magia rotundă: tot ce nu știai despre gogoși",
    date: "10 ianuarie 2025",
    category: "Donuts",
    readTime: "5 min",
    excerpt:
      "Etimologie, recorduri mondiale, tradiții globale și curiozități fascinante despre cel mai iubit desert rotund din lume.",
    coverImage: "/donuts/oreo-dream.webp",
    content: [
      {
        type: "paragraph",
        text: 'Gogoașa — simplă, rotundă, irezistibilă. Dar în spatele acestui desert aparent banal se ascunde o istorie bogată, tradiții surprinzătoare și recorduri greu de imaginat. Hai să descoperim împreună "magia rotundă".',
      },
      {
        type: "heading",
        text: "De unde vine cuvântul «gogoașă»?",
      },
      {
        type: "paragraph",
        text: 'Cuvântul "gogoașă" are origini slave și înseamnă "rotund" sau "minge". O denumire perfectă pentru această bucată de aluat auriu, care ne-a cucerit gusturile de secole.',
      },
      {
        type: "heading",
        text: "Cine a inventat gaura?",
      },
      {
        type: "paragraph",
        text: "Hanson Gregory, un marinar american, este creditat cu invenția gogoșii cu gaură în 1847. Motivul? Practic: gogoșile fără gaură rămâneau neprăjite la mijloc. Soluția sa ingenioasă a rezolvat problema și a dat naștere formei iconice pe care o cunoaștem azi.",
      },
      {
        type: "heading",
        text: "Recorduri de proporții",
      },
      {
        type: "paragraph",
        text: "În 1998, în Statele Unite, a fost preparată cea mai mare gogoașă din lume: peste 3,5 tone și un diametru de 4,8 metri. Un record greu de bătut — și și mai greu de mâncat!",
      },
      {
        type: "heading",
        text: "Ziua Internațională a Gogoșii",
      },
      {
        type: "paragraph",
        text: "«Ziua Internațională a Gogoșii» se celebrează în prima vineri din luna iunie. Originile sale datează din 1938 și sunt legate de voluntarele care distribuiau gogoși soldaților în Primul Război Mondial — un omagiu gustos adus curajului lor.",
      },
      {
        type: "heading",
        text: "Gogoșile lumii",
      },
      {
        type: "list",
        items: [
          "Italia — zeppole cu cremă de vanilie",
          "Germania — berlineri umpluți cu gem, fără gaură",
          "Spania — churros prăjiți și pudraţi cu zahăr",
          "Japonia — mochi donuts, moi și colorați",
        ],
      },
      {
        type: "heading",
        text: "Tradiții și superstiții",
      },
      {
        type: "paragraph",
        text: 'În Polonia, tradiția spune că mâncatul de gogoși aduce noroc în "Joia Grasă" (ultima joi înainte de Postul Mare). Echipele de hochei canadiene oferă gogoși gratuite fanilor după victorii acasă. Și nu în ultimul rând, campionatele de mâncat gogoși din Japonia și SUA au atins recorduri de peste 50 de gogoși consumate în câteva minute!',
      },
      {
        type: "heading",
        text: "Industria gogoșilor în cifre",
      },
      {
        type: "paragraph",
        text: "Dunkin' Donuts produce peste 3 miliarde de gogoși pe an la nivel global. La polul opus al spectrului, restaurante de lux servesc gogoși acoperite cu foiță de aur, la prețuri de sute de dolari bucata.",
      },
      {
        type: "paragraph",
        text: "La Donut Studio, noi credem că magia nu stă în preț sau în dimensiune, ci în ingrediente naturale de calitate și în dragostea cu care fiecare gogoașă este pregătită.",
      },
    ],
  },
  {
    slug: "alchimia-gogosilor-procesul-de-transformare-al-simplitatii-in-deliciu",
    title: "Alchimia Gogoșilor: procesul de transformare al simplității în deliciu",
    date: "1 august 2024",
    category: "Donuts",
    readTime: "4 min",
    excerpt:
      "De la aluatul simplu la deliciul artizanal: o călătorie prin istoria și procesul fascinant care transformă ingrediente de bază în gogoși de excepție.",
    coverImage: "/donuts/vanillian.webp",
    content: [
      {
        type: "paragraph",
        text: "Există ceva aproape magic în procesul prin care o mână de ingrediente simple — făină, zahăr, ouă — se transformă într-una dintre cele mai iubite delicii ale lumii. Aceasta este alchimia gogoșilor.",
      },
      {
        type: "heading",
        text: "Origini antice",
      },
      {
        type: "paragraph",
        text: "Povestea gogoșilor începe cu mii de ani în urmă. În Grecia și Roma antică, bucătarii pregăteau deserturi prăjite îndulcite cu miere — precursorii îndepărtați ai gogoșii moderne. Coloniștii olandezi au adus în America rețeta lor de \"olykoeks\" (prăjituri în ulei), care au evoluat treptat în desertul pe care îl știm azi.",
      },
      {
        type: "heading",
        text: "Inovația care a schimbat totul",
      },
      {
        type: "paragraph",
        text: "Un moment definitoriu a venit atunci când un marinar american a perforat centrul gogoșii pentru a asigura o prăjire uniformă — eliminând astfel interiorul crud care strica experiența. Această invenție simplă a dat naștere formei iconice și a deschis calea către nenumărate variante și arome.",
      },
      {
        type: "heading",
        text: "Procesul de preparare",
      },
      {
        type: "paragraph",
        text: "Secretul unei gogoși desăvârșite stă în fiecare etapă a procesului:",
      },
      {
        type: "list",
        items: [
          "Frământarea — aluatul trebuie lucrat cu răbdare pentru a dezvolta glutenul",
          "Dospirea — aluatul «respiră» și capătă aerul care îl face pufos",
          "Modelarea — fiecare gogoașă primește forma ei perfectă",
          "Prăjirea — scufundată în uleiul la temperatura exactă, gogoașa capătă coaja aurie",
          "Glazurarea — stratul final de glaze sau topping transformă simplul în spectaculos",
        ],
      },
      {
        type: "heading",
        text: "Semnificație culturală",
      },
      {
        type: "paragraph",
        text: "Gogoșile au dobândit o semnificație culturală aparte în timpul Primului Război Mondial, când voluntarele le serveau soldaților — un eveniment comemorat acum ca Ziua Națională a Gogoșii. Mari lanțuri precum Dunkin' Donuts și Krispy Kreme au revoluționat ulterior industria, introducând arome și umpluturi diverse pentru toate gusturile.",
      },
      {
        type: "heading",
        text: "Mai mult decât un desert",
      },
      {
        type: "paragraph",
        text: "Astăzi, gogoșile reprezintă mai mult decât simple dulciuri. Ele simbolizează confortul și nostalgia, apărând frecvent în media și cultura populară. De la Homer Simpson la cafenelele artizanale din București, gogoașa a traversat timpurile și tendințele rămânând mereu relevantă.",
      },
      {
        type: "paragraph",
        text: "La Donut Studio, onorăm această moștenire la fiecare lot pe care îl pregătim. Ingrediente naturale premium, rețete originale și multă dragoste — aceasta este alchimia noastră.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
