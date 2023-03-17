const { i18n, reloadOnPrerender } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'cdn-api.bratislava.sk', 'api.mapbox.com', 'coverlinker.biblib.net'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `${process.env.STRAPI_URL}/uploads/:file`,
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/sk/o-nas/dokumenty-a-zverejnovanie-informacii/dokumenty',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii/',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/about-us/documents-and-public-disclosure-of-information/documents',
        destination: '/en/about-us/documents-and-public-disclosure-of-information/',
        permanent: true,
        locale: false,
      },
      {
        source: '/sk/o-nas/dokumenty-a-zverejnovanie-informacii/zverejnovanie',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii/',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/about-us/documents-and-public-disclosure-of-information/disclosure',
        destination: '/en/about-us/documents-and-public-disclosure-of-information/',
        permanent: true,
        locale: false,
      },
      // Old localities --> New Branch URLs
      {
        source: '/navstivte/klariska',
        destination: '/navstivte/nase-lokality/klariska',
        permanent: true,
      },
      {
        source: '/navstivte/kapucinska',
        destination: '/navstivte/nase-lokality/kapucinska',
        permanent: true,
      },
      {
        source: '/navstivte/laurinska',
        destination: '/navstivte/nase-lokality/laurinska',
        permanent: true,
      },
      {
        source: '/navstivte/ostatne/galeria-artoteka',
        destination: '/navstivte/nase-lokality/galeria-artoteka',
        permanent: true,
      },
      {
        source: '/navstivte/letna-citaren-klariska',
        destination: '/navstivte/nase-lokality/letna-citaren-klariska',
        permanent: true,
      },
      {
        source: '/visit/klariska',
        destination: '/visit/our-locations/klariska-en',
        permanent: true,
      },
      {
        source: '/visit/kapucinska',
        destination: '/visit/our-locations/kapucinska-en',
        permanent: true,
      },
      {
        source: '/visit/laurinska',
        destination: '/visit/our-locations/laurinska-en',
        permanent: true,
      },
      {
        source: '/visit/other/artoteka-gallery',
        destination: '/visit/our-locations/artoteka-gallery',
        permanent: true,
      },
      {
        source: '/visit/summer-reading-room-klariska',
        destination: '/visit/our-locations/summer-reading-room-klariska',
        permanent: true,
      },
      // Old event slugs --> New event slugs
      {
        source: '/zazite/podujatia/Najvacsie-myty-o-vede',
        destination: '/zazite/podujatia/najvacsie-myty-o-vede',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/KLUBOVANIE-NA-CESTACH',
        destination: '/zazite/podujatia/klubovanie-na-cestach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Koncert-akustickeho-spevu-Moniky-Stanislavovej',
        destination: '/zazite/podujatia/koncert-akustickeho-spevu-moniky-stanislavovej',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Za-obrazkom-knizka',
        destination: '/zazite/podujatia/za-obrazkom-knizka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ivana-Havranova-Kaviarenske-tajomstva-krst-knihy',
        destination: '/zazite/podujatia/ivana-havranova-kaviarenske-tajomstva-krst-knihy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-jolana-havelkova,-citlive-datasensitive-data',
        destination: '/zazite/podujatia/1-jolana-havelkova-citlive-datasensitive-data',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Citame-s-Osmijankom',
        destination: '/zazite/podujatia/citame-s-osmijankom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/absolventska-vystava-zus-exnarova---vernisaz',
        destination: '/zazite/podujatia/absolventska-vystava-zus-exnarova-vernisaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mudrost-a-sucit-u-zvierat',
        destination: '/zazite/podujatia/mudrost-a-sucit-u-zvierat',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Cin-Cin',
        destination: '/zazite/podujatia/cin-cin',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-hrncek-hraj!',
        destination: '/zazite/podujatia/1-hrncek-hraj',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ZMENA-LITERARNE-UTORKY-17-a-58',
        destination: '/zazite/podujatia/zmena-literarne-utorky-17-a-58',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Muzeum-netrpezlivosti',
        destination: '/zazite/podujatia/muzeum-netrpezlivosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Co-skryva-vesmir',
        destination: '/zazite/podujatia/co-skryva-vesmir',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Filmovy-vecer-studentskych-filmov',
        destination: '/zazite/podujatia/filmovy-vecer-studentskych-filmov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Veterani-zo-Salon-Dore-a-Bluesraiders',
        destination: '/zazite/podujatia/veterani-zo-salon-dore-a-bluesraiders',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-utek-z-pekla',
        destination: '/zazite/podujatia/juraj-sebo-utek-z-pekla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/The-Hope-Gospel-Singers',
        destination: '/zazite/podujatia/the-hope-gospel-singers',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Silne-reci-U-cerveneho-raka',
        destination: '/zazite/podujatia/silne-reci-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/EBSCO-a-SpringerLink',
        destination: '/zazite/podujatia/ebsco-a-springerlink',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Krasa-a-kamuflaz',
        destination: '/zazite/podujatia/krasa-a-kamuflaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Dita-Kaplanova-The-Remains-of-the-Day',
        destination: '/zazite/podujatia/dita-kaplanova-the-remains-of-the-day',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Detska-fotografia',
        destination: '/zazite/podujatia/detska-fotografia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Martin-Geisberg',
        destination: '/zazite/podujatia/martin-geisberg',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Basnici-a-ich-lasky-rok-jubilantov',
        destination: '/zazite/podujatia/basnici-a-ich-lasky-rok-jubilantov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zahady-a-kuriozity-kozmu',
        destination: '/zazite/podujatia/zahady-a-kuriozity-kozmu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Filip-Puchert-Band',
        destination: '/zazite/podujatia/filip-puchert-band',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ako-zili-dinosaury',
        destination: '/zazite/podujatia/ako-zili-dinosaury',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Schӧne-Naci-sa-vracia',
        destination: '/zazite/podujatia/sch-ne-naci-sa-vracia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/patrik-garay\\:-hladanie',
        destination: '/zazite/podujatia/patrik-garay-hladanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Najvacsie-prirodne-katastrofy',
        destination: '/zazite/podujatia/najvacsie-prirodne-katastrofy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Irena-Brezna-Die-undankbare-FremdeNevdacnica',
        destination: '/zazite/podujatia/irena-brezna-die-undankbare-fremdenevdacnica',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kino-pre-nevidiacich-a-slabozrakych',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Maria-Razusova-Martakova-Jaroslava-Blazkova-Kozliatka',
        destination: '/zazite/podujatia/maria-razusova-martakova-jaroslava-blazkova-kozliatka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Cressida-Cowell-Ako-si-vycvicit-draka',
        destination: '/zazite/podujatia/cressida-cowell-ako-si-vycvicit-draka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bubnovacka-v-kniznici',
        destination: '/zazite/podujatia/bubnovacka-v-kniznici',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Pripravte-si-zivotopis',
        destination: '/zazite/podujatia/pripravte-si-zivotopis',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Literatura-y-demas-floritura',
        destination: '/zazite/podujatia/literatura-y-demas-floritura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Radikalne-reflexie',
        destination: '/zazite/podujatia/radikalne-reflexie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Katarina-Janosova-Safaladka-a-Spajdlicka',
        destination: '/zazite/podujatia/katarina-janosova-safaladka-a-spajdlicka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-mincikova\\:-kresby',
        destination: '/zazite/podujatia/kristina-mincikova-kresby',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vo-sne-a-umeni-je-vsetko-mozne',
        destination: '/zazite/podujatia/vo-sne-a-umeni-je-vsetko-mozne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Hudba-a-deti',
        destination: '/zazite/podujatia/hudba-a-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Grapefruit-Death',
        destination: '/zazite/podujatia/grapefruit-death',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jana-Juranova-Nevybavena-zalezitost',
        destination: '/zazite/podujatia/jana-juranova-nevybavena-zalezitost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vecer-fantastiky',
        destination: '/zazite/podujatia/vecer-fantastiky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jesenne-prazdniny-v-kniznici-OBSADENE',
        destination: '/zazite/podujatia/jesenne-prazdniny-v-kniznici-obsadene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Workshop-tvorcov-slovenskej-fantastiky',
        destination: '/zazite/podujatia/workshop-tvorcov-slovenskej-fantastiky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mymi-Doinet-Velke-starosti-malych-Zajacikov',
        destination: '/zazite/podujatia/mymi-doinet-velke-starosti-malych-zajacikov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/D-Blues-Band',
        destination: '/zazite/podujatia/d-blues-band',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vitanie-prvacikov-v-kniznici',
        destination: '/zazite/podujatia/vitanie-prvacikov-v-kniznici',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Tomas-Berka-Jan-Bahna-Vily-nad-Bratislavou',
        destination: '/zazite/podujatia/tomas-berka-jan-bahna-vily-nad-bratislavou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Koncert-studentov-Katedry-hudobnej-vychovy-PdF-UK-v-Bratislave',
        destination:
          '/zazite/podujatia/koncert-studentov-katedry-hudobnej-vychovy-pdf-uk-v-bratislave',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Satenove-ruky',
        destination: '/zazite/podujatia/satenove-ruky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pribehy-a-piesne-z-brehov-Gangy',
        destination: '/zazite/podujatia/pribehy-a-piesne-z-brehov-gangy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Sopky',
        destination: '/zazite/podujatia/sopky-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mudrost-a-sucit-zvierat',
        destination: '/zazite/podujatia/mudrost-a-sucit-zvierat',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Milos-Macourek-O-Konradovi-ktory-pisal-nosom',
        destination: '/zazite/podujatia/milos-macourek-o-konradovi-ktory-pisal-nosom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Preco-vidime-duchov',
        destination: '/zazite/podujatia/preco-vidime-duchov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Rut-Lichnerova-Vito-Staviarsky',
        destination: '/zazite/podujatia/rut-lichnerova-vito-staviarsky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zuzana-Tatarova-beseda-so-scenaristkou-filmu-Siesta-veta',
        destination: '/zazite/podujatia/zuzana-tatarova-beseda-so-scenaristkou-filmu-siesta-veta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Five-Gentlemen',
        destination: '/zazite/podujatia/five-gentlemen',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/V-krajine-maleho-princa',
        destination: '/zazite/podujatia/v-krajine-maleho-princa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Hamar-Veterankorps',
        destination: '/zazite/podujatia/hamar-veterankorps',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bratislava-mesto-ktore-cita-2',
        destination: '/zazite/podujatia/bratislava-mesto-ktore-cita-2',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Citajme-spolu-2014-Strom-ktory-dava-S-Silverstein',
        destination: '/zazite/podujatia/citajme-spolu-2014-strom-ktory-dava-s-silverstein',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/alan-hyza\\:-spis---tiene-a-ozveny-zrusene',
        destination: '/zazite/podujatia/alan-hyza-spis-tiene-a-ozveny-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ako-funguje-Zem-Trhanie-kontinentov-a-skutocne-Atlantidy',
        destination: '/zazite/podujatia/ako-funguje-zem-trhanie-kontinentov-a-skutocne-atlantidy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mona-Lisa-a-Hello-Kitty',
        destination: '/zazite/podujatia/mona-lisa-a-hello-kitty',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Daniela-Dvorakova-Barbora-Celjska',
        destination: '/zazite/podujatia/daniela-dvorakova-barbora-celjska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Beseda-s-reziserom-STANISLAVOM-PARNICKYM',
        destination: '/zazite/podujatia/beseda-s-reziserom-stanislavom-parnickym',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Prisery-z-praveku-I',
        destination: '/zazite/podujatia/prisery-z-praveku-i',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Emocna-inteligencia-a-jej-rozvoj-v-beznom-zivote',
        destination: '/zazite/podujatia/emocna-inteligencia-a-jej-rozvoj-v-beznom-zivote',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Petra-Nagyova-Dzerengova-Klara-a-iglu',
        destination: '/zazite/podujatia/petra-nagyova-dzerengova-klara-a-iglu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Deti-a-umenie',
        destination: '/zazite/podujatia/deti-a-umenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/O-deviatich-mesiacikoch',
        destination: '/zazite/podujatia/o-deviatich-mesiacikoch',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Moj-dedko-je-ceresna',
        destination: '/zazite/podujatia/moj-dedko-je-ceresna',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mimi-a-Liza-PODUJATIE-JE-ZRUSENE',
        destination: '/zazite/podujatia/mimi-a-liza-podujatie-je-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/johannes-jensen-ma-pocit,-ze-je-iny',
        destination: '/zazite/podujatia/johannes-jensen-ma-pocit-ze-je-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Najvacsie-krasy-Zeme',
        destination: '/zazite/podujatia/najvacsie-krasy-zeme',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zvieracie-kuriozity-2-Spravanie',
        destination: '/zazite/podujatia/zvieracie-kuriozity-2-spravanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zvieracie-kuriozity-I-Vzhlad-a-velkost',
        destination: '/zazite/podujatia/zvieracie-kuriozity-i-vzhlad-a-velkost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/koncert-venovany-k-200.-vyrociu-narodenia-l.-stura',
        destination: '/zazite/podujatia/koncert-venovany-k-200-vyrociu-narodenia-l-stura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Dinosaury-svet-obrov',
        destination: '/zazite/podujatia/dinosaury-svet-obrov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bluesweiser-koncert',
        destination: '/zazite/podujatia/bluesweiser-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/T´ga-za-jug',
        destination: '/zazite/podujatia/t-ga-za-jug',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zahoracky-tandem',
        destination: '/zazite/podujatia/zahoracky-tandem',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Citanie-pre-najmensich',
        destination: '/zazite/podujatia/citanie-pre-najmensich',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Beseda-s-Elenou-Podzamskou',
        destination: '/zazite/podujatia/beseda-s-elenou-podzamskou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vrbovski-vitazi',
        destination: '/zazite/podujatia/vrbovski-vitazi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/SLUK-vyber-z-tvorby',
        destination: '/zazite/podujatia/sluk-vyber-z-tvorby',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Workshop-autorov-slovenskej-literarnej-fantastiky',
        destination: '/zazite/podujatia/workshop-autorov-slovenskej-literarnej-fantastiky',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Slovenska-sucasna-proza-v-zajati-sucasnej-slovenskej-elektronickej-hudby',
        destination:
          '/zazite/podujatia/slovenska-sucasna-proza-v-zajati-sucasnej-slovenskej-elektronickej-hudby',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vstupenka-do-sucasnosti-rok-jubilantov',
        destination: '/zazite/podujatia/vstupenka-do-sucasnosti-rok-jubilantov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/130-vyrocie-pristahovalectva-Slovakov-do-Bulharska',
        destination: '/zazite/podujatia/130-vyrocie-pristahovalectva-slovakov-do-bulharska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/gabriela-birosova\\:-pisaci-st(roj)',
        destination: '/zazite/podujatia/gabriela-birosova-pisaci-st-roj',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Viera-Obuchova-Pribehy-z-dejin-Bratislavy',
        destination: '/zazite/podujatia/viera-obuchova-pribehy-z-dejin-bratislavy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Noc-s-Andersenom',
        destination: '/zazite/podujatia/noc-s-andersenom-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Peter-Gajdosik-Zverinec-na-siedmom-poschodi',
        destination: '/zazite/podujatia/peter-gajdosik-zverinec-na-siedmom-poschodi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Beseda-so-scenaristom-filmu-Zaciatok-sezony-Jozefom-Banasom',
        destination:
          '/zazite/podujatia/beseda-so-scenaristom-filmu-zaciatok-sezony-jozefom-banasom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mimi-a-Liza',
        destination: '/zazite/podujatia/mimi-a-liza',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kuriozity-zvierat-I-Vzhlad-a-velkost',
        destination: '/zazite/podujatia/kuriozity-zvierat-i-vzhlad-a-velkost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-tlmocnicka',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-tlmocnicka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Koncert',
        destination: '/zazite/podujatia/koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vyvoj-zivota',
        destination: '/zazite/podujatia/vyvoj-zivota',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/V-risi-tanca',
        destination: '/zazite/podujatia/v-risi-tanca',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Slovaci-v-prvej-svetovej-vojne',
        destination: '/zazite/podujatia/slovaci-v-prvej-svetovej-vojne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/David-Kicin-Zatrateni',
        destination: '/zazite/podujatia/david-kicin-zatrateni',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zvieracie-kuriozity-II-Spravanie',
        destination: '/zazite/podujatia/zvieracie-kuriozity-ii-spravanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zvieracie-kuriozity',
        destination: '/zazite/podujatia/zvieracie-kuriozity',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mirka-Abelova-Na',
        destination: '/zazite/podujatia/mirka-abelova-na',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kobylka',
        destination: '/zazite/podujatia/kobylka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Spevokol-BJB-Palisady',
        destination: '/zazite/podujatia/spevokol-bjb-palisady',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Stretnutie-Literarneho-klubu',
        destination: '/zazite/podujatia/stretnutie-literarneho-klubu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jan-Buzassy-Jan-Strasser',
        destination: '/zazite/podujatia/jan-buzassy-jan-strasser',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Arnold-Lobel-Kvak-a-clup-su-spolu',
        destination: '/zazite/podujatia/arnold-lobel-kvak-a-clup-su-spolu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Spolocna-storocnica',
        destination: '/zazite/podujatia/spolocna-storocnica',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-baluchova\\:-kapitan-padak-a-paseracka-spojka',
        destination: '/zazite/podujatia/kristina-baluchova-kapitan-padak-a-paseracka-spojka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Marta-Gergelyova-Most-nad-riekou-Liffey',
        destination: '/zazite/podujatia/marta-gergelyova-most-nad-riekou-liffey',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ukazky-vycviku-vodiacich-psov',
        destination: '/zazite/podujatia/ukazky-vycviku-vodiacich-psov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Uplne-od-zaciatku',
        destination: '/zazite/podujatia/uplne-od-zaciatku',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Petra-Nagyova-Dzerengova-a-Barbora-Pribylincova-Bancejova-Zeny-a-ich-svet',
        destination:
          '/zazite/podujatia/petra-nagyova-dzerengova-a-barbora-pribylincova-bancejova-zeny-a-ich-svet',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Lucia-Satinska-Listy-Olge',
        destination: '/zazite/podujatia/lucia-satinska-listy-olge',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Miriam-Kaiser-and-Band',
        destination: '/zazite/podujatia/miriam-kaiser-and-band',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Poleno',
        destination: '/zazite/podujatia/poleno',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-iam-silvia\\:-isi-masa',
        destination: '/zazite/podujatia/1-iam-silvia-isi-masa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bratislava-moje-mesto-vyhlasovanie-vitazov',
        destination: '/zazite/podujatia/bratislava-moje-mesto-vyhlasovanie-vitazov',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Marian-Hatala-Stryko-kvetovane-tetovany-tetou-Kvetou-a-ine-prihody',
        destination:
          '/zazite/podujatia/marian-hatala-stryko-kvetovane-tetovany-tetou-kvetou-a-ine-prihody',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Miluje-nemiluje-idem-krst-knihy-Martiny-Monosovej',
        destination: '/zazite/podujatia/miluje-nemiluje-idem-krst-knihy-martiny-monosovej',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Spomienky-na-pisara-Ladislav-Ballek-a-jeho-tvorba',
        destination: '/zazite/podujatia/spomienky-na-pisara-ladislav-ballek-a-jeho-tvorba',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ludovit-Haan',
        destination: '/zazite/podujatia/ludovit-haan',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/olga-belesova,-vladimir-balek-a-ivan-mizera-uvadzaju\\:-lahucko,-len-tak',
        destination:
          '/zazite/podujatia/olga-belesova-vladimir-balek-a-ivan-mizera-uvadzaju-lahucko-len-tak',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/detska-fotografia',
        destination: '/zazite/podujatia/detska-fotografia-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/istvan-bielik\\:-fotografie-z-maidanu',
        destination: '/zazite/podujatia/istvan-bielik-fotografie-z-maidanu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/alzbeta-malovcova\\:-moznosti-a-melodie',
        destination: '/zazite/podujatia/alzbeta-malovcova-moznosti-a-melodie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/andy-pheby\\:-on-the-freakshow',
        destination: '/zazite/podujatia/andy-pheby-on-the-freakshow',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-kudlicka\\:-hoka-no-haiku--total',
        destination: '/zazite/podujatia/jan-kudlicka-hoka-no-haiku-total',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislava,-moje-mesto---vystava',
        destination: '/zazite/podujatia/bratislava-moje-mesto-vystava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-stefan-orth\\:-betulaceae',
        destination: '/zazite/podujatia/1-stefan-orth-betulaceae',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/19.-citacka-so-sonou-borusovicovou',
        destination: '/zazite/podujatia/19-citacka-so-sonou-borusovicovou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/marek-jarotta\\:-cakanie',
        destination: '/zazite/podujatia/marek-jarotta-cakanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-peter-olejar\\:-jeden-clovek',
        destination: '/zazite/podujatia/1-peter-olejar-jeden-clovek',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zaklady-fotografovania\\:-v-terene',
        destination: '/zazite/podujatia/zaklady-fotografovania-v-terene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zaklady-fotografovania\\:-technicke-nastavenie-fotoaparatu',
        destination: '/zazite/podujatia/zaklady-fotografovania-technicke-nastavenie-fotoaparatu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trenig-pamati-(obsadeny)',
        destination: '/zazite/podujatia/trenig-pamati-obsadeny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jana-ilkova\\:-family-album',
        destination: '/zazite/podujatia/jana-ilkova-family-album',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/medicina-v-19-storoci-a',
        destination: '/zazite/podujatia/medicina-v-19-storoci-a-vznik-14-6',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-marianna-brinzova,-klaudia-korbelicova\\:-horizontaly-vertikal',
        destination:
          '/zazite/podujatia/1-marianna-brinzova-klaudia-korbelicova-horizontaly-vertikal',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/liteartura\\:-umenie-medzi-riadkami',
        destination: '/zazite/podujatia/liteartura-umenie-medzi-riadkami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-animaky-pre-deti--Мультфільми-для-дітей',
        destination: '/zazite/podujatia/2-animaky-pre-deti-',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citatelsky-klub\\:-dennik-odvazneho-bojka',
        destination: '/zazite/podujatia/1-citatelsky-klub-dennik-odvazneho-bojka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/cesta-svetla---jednodnova-fotograficka-vystava',
        destination: '/zazite/podujatia/cesta-svetla-jednodnova-fotograficka-vystava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-nastavenie-mysle',
        destination: '/zazite/podujatia/citatelsky-klub-nastavenie-mysle',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dolnozemski-slovaci-zrusene!',
        destination: '/zazite/podujatia/dolnozemski-slovaci-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-kralovic\\:-majstrovstva-za-dverami',
        destination: '/zazite/podujatia/jan-kralovic-majstrovstva-za-dverami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vernisaz-vystavy-pomimo\\:-ritual',
        destination: '/zazite/podujatia/vernisaz-vystavy-pomimo-ritual-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vladimir-Balco',
        destination: '/zazite/podujatia/vladimir-balco',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/diana-cizmarova\\:-ekotopia',
        destination: '/zazite/podujatia/diana-cizmarova-ekotopia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/9-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/9-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rozhybane-plagaty-(workshop-obsadeny)',
        destination: '/zazite/podujatia/rozhybane-plagaty-workshop-obsadeny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Po-prvej-a-poslednej-laske',
        destination: '/zazite/podujatia/po-prvej-a-poslednej-laske',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kviz\\:-zaujimavosti-zo-sveta-kniznic',
        destination: '/zazite/podujatia/kviz-zaujimavosti-zo-sveta-kniznic-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/seniorfest-2019---bezplatne-clenske-pre-seniorov',
        destination: '/zazite/podujatia/seniorfest-2019-bezplatne-clenske-pre-seniorov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-trhlina',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-trhlina',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pomimo\\:-komiksovy-workshop-pre-mladez-a-dospelych',
        destination: '/zazite/podujatia/pomimo-komiksovy-workshop-pre-mladez-a-dospelych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sevcik–makar–benca\\:-pavilion0---venice-gad-2021',
        destination: '/zazite/podujatia/sevcik-makar-benca-pavilion0-venice-gad-2021',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trojhlasne-(za)uzlenie',
        destination: '/zazite/podujatia/trojhlasne-za-uzlenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/poleno',
        destination: '/zazite/podujatia/poleno-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zdenka-wenzlova-svabekova\\:-naposledy-placem',
        destination: '/zazite/podujatia/zdenka-wenzlova-svabekova-naposledy-placem',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/joga-u-cerveneho-raka-25.8.-zrusene!',
        destination: '/zazite/podujatia/joga-u-cerveneho-raka-25-8-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stale-dobri-jun-Laurinska',
        destination: '/zazite/podujatia/stale-dobri-jun-laurinska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ucelny-dizajn-interierov-kniznic-–-priklady-z-praxe',
        destination: '/zazite/podujatia/ucelny-dizajn-interierov-kniznic-priklady-z-praxe',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maya-reyes\\:-exit-havana',
        destination: '/zazite/podujatia/maya-reyes-exit-havana',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/3-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stale-dobri-jun-Kapucinska',
        destination: '/zazite/podujatia/stale-dobri-jun-kapucinska',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/veronika-sikulova\\:-tremolo-ostinato.-weronika-gogola\\:-po-troskach',
        destination:
          '/zazite/podujatia/veronika-sikulova-tremolo-ostinato-weronika-gogola-po-troskach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/traja-kamosi...',
        destination: '/zazite/podujatia/traja-kamosi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/david-paska\\:-nomos-crepin-a-vrasok',
        destination: '/zazite/podujatia/david-paska-nomos-crepin-a-vrasok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-hodon-a-kolektiv\\:-pomaly-plynuce-dni',
        destination: '/zazite/podujatia/martin-hodon-a-kolektiv-pomaly-plynuce-dni',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citacka-s-dorotou-nvotovou-zrusene!',
        destination: '/zazite/podujatia/citacka-s-dorotou-nvotovou-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vesmir-1',
        destination: '/zazite/podujatia/vesmir-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pavel-malovic-a-peter-„punto“-remis',
        destination: '/zazite/podujatia/pavel-malovic-a-peter-punto-remis',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/anna-ivakova\\:-zvecerenie',
        destination: '/zazite/podujatia/anna-ivakova-zvecerenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/komiksovy-workshop-zrusene!',
        destination: '/zazite/podujatia/komiksovy-workshop-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/den-ludovej-rozpravky---podujatie-zrusene',
        destination: '/zazite/podujatia/den-ludovej-rozpravky-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kulturny-zivot-mesta-zrusene!',
        destination: '/zazite/podujatia/kulturny-zivot-mesta-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/letna-citaren-u-cerveneho-raka---otvorenie',
        destination: '/zazite/podujatia/letna-citaren-u-cerveneho-raka-otvorenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/cin-cin',
        destination: '/zazite/podujatia/cin-cin-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zborci.-koncert',
        destination: '/zazite/podujatia/zborci-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/labyrinty-literatury-i.',
        destination: '/zazite/podujatia/labyrinty-literatury-i',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michal-nagypal\\:-pole-(vernisaz-vystavy)-zrusene!',
        destination: '/zazite/podujatia/michal-nagypal-pole-vernisaz-vystavy-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-johannes-jensen-ma-pocit,-ze-je-iny',
        destination: '/zazite/podujatia/3-johannes-jensen-ma-pocit-ze-je-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/noc-s-andersenom---podujatie-zrusene',
        destination: '/zazite/podujatia/noc-s-andersenom-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-z-perloveho-ostrova-zrusene!',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-z-perloveho-ostrova-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mozu-sa-zvierata-spravat-ludsky-zrusene!',
        destination: '/zazite/podujatia/mozu-sa-zvierata-spravat-ludsky-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-janosova\\:-safaladka-a-spajdlicka',
        destination: '/zazite/podujatia/katarina-janosova-safaladka-a-spajdlicka-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/traja-kamosi',
        destination: '/zazite/podujatia/traja-kamosi-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/koncert-flauta-a-gitara---podujatie-zrusene',
        destination: '/zazite/podujatia/koncert-flauta-a-gitara-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamati-(nielen)-pre-seniorov',
        destination: '/zazite/podujatia/trening-pamati-nielen-pre-seniorov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/labyrinty-literatury-ii.',
        destination: '/zazite/podujatia/labyrinty-literatury-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/preco-potrebujeme-kulturu-zrusene-!',
        destination: '/zazite/podujatia/preco-potrebujeme-kulturu-zrusene-',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/barbora-hrinova\\:-jednorozce',
        destination: '/zazite/podujatia/barbora-hrinova-jednorozce',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/veronika-sikulova\\:-moyzesovo-kvarteto-40',
        destination: '/zazite/podujatia/veronika-sikulova-moyzesovo-kvarteto-40',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kviz-k-30.-vyrociu-neznej-revolucie',
        destination: '/zazite/podujatia/kviz-k-30-vyrociu-neznej-revolucie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-olejar\\:-jeden-clovek',
        destination: '/zazite/podujatia/peter-olejar-jeden-clovek',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamati-zrusene!',
        destination: '/zazite/podujatia/trening-pamati-zrusene-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/9-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/iam-silvia\\:-isi-masa',
        destination: '/zazite/podujatia/iam-silvia-isi-masa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamati---ukazkova-hodina-zrusene!',
        destination: '/zazite/podujatia/trening-pamati-ukazkova-hodina-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-vlcata-prirodovedny-kruzok---podujatie-zrusene',
        destination: '/zazite/podujatia/1-vlcata-prirodovedny-kruzok-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata---prirodovedny-kruzok---podujatie-zrusene',
        destination: '/zazite/podujatia/vlcata-prirodovedny-kruzok-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lucia-vesela\\:-miesto-stretavania',
        destination: '/zazite/podujatia/lucia-vesela-miesto-stretavania',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ocna-joga-zrusene!',
        destination: '/zazite/podujatia/ocna-joga-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/praca-s-pocitacom-zrusene!',
        destination: '/zazite/podujatia/praca-s-pocitacom-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata-zrusene!',
        destination: '/zazite/podujatia/vlcata-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/opice-z-nasej-kniznice-–-medovnikovy-domcek',
        destination: '/zazite/podujatia/opice-z-nasej-kniznice-medovnikovy-domcek',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/inka-vybohova\\:-phabulous-phobias',
        destination: '/zazite/podujatia/inka-vybohova-phabulous-phobias',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ukazkova-hodina-ocnej-jogy---podujatie-zrusene',
        destination: '/zazite/podujatia/ukazkova-hodina-ocnej-jogy-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-kochan-(sk)',
        destination: '/zazite/podujatia/martin-kochan-sk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/8-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/8-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/beseda-s-lenkou-kujovou,-miroslavom-buranom,-ruzenkou-sipkovou-a-ivonou-duricovou',
        destination:
          '/zazite/podujatia/beseda-s-lenkou-kujovou-miroslavom-buranom-ruzenkou-sipkovou-a-ivonou-duricovou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/medved,-ktory-tam-nebol',
        destination: '/zazite/podujatia/medved-ktory-tam-nebol',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-zivocichy-a-rastliny,-ktore-menili-svet',
        destination: '/zazite/podujatia/1-zivocichy-a-rastliny-ktore-menili-svet',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-hodon-a-kolektiv\\:-negativ_egotrip',
        destination: '/zazite/podujatia/martin-hodon-a-kolektiv-negativ-egotrip',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tona-revajova\\:-rok-sivka-ohnivaka',
        destination: '/zazite/podujatia/tona-revajova-rok-sivka-ohnivaka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/3-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/klubovanie-na-cestach',
        destination: '/zazite/podujatia/klubovanie-na-cestach-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/svet-zvukov---podujatie-zrusene',
        destination: '/zazite/podujatia/svet-zvukov-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zivocichy-a-rastliny,-ktore-menili-svet',
        destination: '/zazite/podujatia/zivocichy-a-rastliny-ktore-menili-svet',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/performance\\:-centralny-register-umeleckej-cinnosti',
        destination: '/zazite/podujatia/performance-centralny-register-umeleckej-cinnosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kolektiv-podla-f.-durrenmatta\\:-romulus-v.',
        destination: '/zazite/podujatia/kolektiv-podla-f-durrenmatta-romulus-v',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/komunikacne-strategie-kniznice-21.-storocia',
        destination: '/zazite/podujatia/komunikacne-strategie-kniznice-21-storocia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/8-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-2',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-gerbel\\:-otoc-sa',
        destination: '/zazite/podujatia/juraj-gerbel-otoc-sa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stryko-kvetovane-tetovany-tetou-kvetou-ii.',
        destination: '/zazite/podujatia/stryko-kvetovane-tetovany-tetou-kvetou-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vianocny-koncert-–-janickovic',
        destination: '/zazite/podujatia/vianocny-koncert-janickovic',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/divadlo-m.\\:-hodon,-ciripova,-tilajcik\\:-eva',
        destination: '/zazite/podujatia/divadlo-m-hodon-ciripova-tilajcik-eva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislavske-korzo---podujatie-zrusene!',
        destination: '/zazite/podujatia/bratislavske-korzo-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/hodon,-koltes\\:-v-samote',
        destination: '/zazite/podujatia/hodon-koltes-v-samote',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/mesiac-fotografie-2016---agnieszka-rayss-(pl)\\:-tu-sa-zacina-koniec-miest',
        destination:
          '/zazite/podujatia/mesiac-fotografie-2016-agnieszka-rayss-pl-tu-sa-zacina-koniec-miest',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/100.-vyrocie-zalozenia-gymnazia-v-bacskom-petrovci',
        destination: '/zazite/podujatia/100-vyrocie-zalozenia-gymnazia-v-bacskom-petrovci',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-misak\\:-rut',
        destination: '/zazite/podujatia/peter-misak-rut',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maly-keres-(kiskorӦs)',
        destination: '/zazite/podujatia/maly-keres-kiskor-s',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/divadlo-m.\\:-p.-galdik,-f.-durrenmatt\\:-romulus-v',
        destination: '/zazite/podujatia/divadlo-m-p-galdik-f-durrenmatt-romulus-v',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-janosova\\:-snehova-kralovna-zmena-programu!!!',
        destination: '/zazite/podujatia/katarina-janosova-snehova-kralovna-zmena-programu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/co-vieme-o-bratislave---meste-korunovacii',
        destination: '/zazite/podujatia/co-vieme-o-bratislave-meste-korunovacii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stastie-je...-o-podobach-priatelstva',
        destination: '/zazite/podujatia/stastie-je-o-podobach-priatelstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/7-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/7-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vyberovy-vecer-prednesov-ii.',
        destination: '/zazite/podujatia/vyberovy-vecer-prednesov-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/styri-damy,-jeden-pan',
        destination: '/zazite/podujatia/styri-damy-jeden-pan',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slovaci-v-nadlaku-na-zaciatku-20.-storocia-ocami-kremnicana',
        destination: '/zazite/podujatia/slovaci-v-nadlaku-na-zaciatku-20-storocia-ocami-kremnicana',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/selma-lagerlofova\\:-nils-alebo-podivuhodna-cesta',
        destination: '/zazite/podujatia/selma-lagerlofova-nils-alebo-podivuhodna-cesta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lucia-horvatova\\:-invisible-insights',
        destination: '/zazite/podujatia/lucia-horvatova-invisible-insights',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/TS-pARTia',
        destination: '/zazite/podujatia/ts-partia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Hladanie-rozpravaca-Vincenta-Sikulu-Prozy-Vincenta-Sikulu',
        destination: '/zazite/podujatia/hladanie-rozpravaca-vincenta-sikulu-prozy-vincenta-sikulu',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/women-in-business-leadership\\:-an-ambition-gap-or-an-opportunity-gap',
        destination:
          '/zazite/podujatia/women-in-business-leadership-an-ambition-gap-or-an-opportunity-gap',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vyberovy-vecer-prednesov-i.',
        destination: '/zazite/podujatia/vyberovy-vecer-prednesov-i',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/world-music-festival-–-diskusia',
        destination: '/zazite/podujatia/world-music-festival-diskusia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ronaldo,-cesta-na-vrchol',
        destination: '/zazite/podujatia/ronaldo-cesta-na-vrchol',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lubo-stacho\\:-obchodna-(1984-–-2014)',
        destination: '/zazite/podujatia/lubo-stacho-obchodna-1984-2014',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lubomir-paulovic---beseda',
        destination: '/zazite/podujatia/lubomir-paulovic-beseda',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pentcho.-pribeh-parnika',
        destination: '/zazite/podujatia/pentcho-pribeh-parnika',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tatiana-jaglova\\:-strach-zo-zrkadla',
        destination: '/zazite/podujatia/tatiana-jaglova-strach-zo-zrkadla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-stryko-kvetovane-tetovany-tetou-kvetou-ii.',
        destination: '/zazite/podujatia/1-stryko-kvetovane-tetovany-tetou-kvetou-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/krakov\\:-kamaratstva,-kaskaderske-kusky-a-kalamity',
        destination: '/zazite/podujatia/krakov-kamaratstva-kaskaderske-kusky-a-kalamity',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/velka-zachrana-kralika---podujatie-zrusene!',
        destination: '/zazite/podujatia/velka-zachrana-kralika-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/barbora-skovierova\\:-dobrodruzstvi-pod-pantografem',
        destination: '/zazite/podujatia/barbora-skovierova-dobrodruzstvi-pod-pantografem',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kam-z-kanapy,-nezvratna-spoved',
        destination: '/zazite/podujatia/kam-z-kanapy-nezvratna-spoved',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/world-music-festival-–-konferencia',
        destination: '/zazite/podujatia/world-music-festival-konferencia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/traja-cajakovci,-traja-spisovatelia',
        destination: '/zazite/podujatia/traja-cajakovci-traja-spisovatelia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/6-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/6-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/7-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/7-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislavska-burza-knih---13.-rocnik',
        destination: '/zazite/podujatia/bratislavska-burza-knih-13-rocnik',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/podujatie-zrusene---beseda-s-danielou-kapitanovou',
        destination: '/zazite/podujatia/podujatie-zrusene-beseda-s-danielou-kapitanovou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-anjel-milosrdenstva',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-anjel-milosrdenstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-srank\\:-muzofil',
        destination: '/zazite/podujatia/peter-srank-muzofil',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Maria-Durickova-Gulko-Bombulko',
        destination: '/zazite/podujatia/maria-durickova-gulko-bombulko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Prazdniny-v-kniznici',
        destination: '/zazite/podujatia/prazdniny-v-kniznici',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/konzultacie-–-praca-s-pocitacom',
        destination: '/zazite/podujatia/konzultacie-praca-s-pocitacom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kurz-kresby---ukazkova-hodina',
        destination: '/zazite/podujatia/kurz-kresby-ukazkova-hodina',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/literarne-vecery-u-cerveneho-raka\\:-2018---1968-=-50,-50-rokov-od-augusta-1968',
        destination:
          '/zazite/podujatia/literarne-vecery-u-cerveneho-raka-2018-1968-50-50-rokov-od-augusta-1968',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/literarne-vecery-u-cerveneho-raka\\:-dialog-s-basnou-iii',
        destination: '/zazite/podujatia/literarne-vecery-u-cerveneho-raka-dialog-s-basnou-iii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slovensko-madarska-etnicka-hranica-1880-–-2011',
        destination: '/zazite/podujatia/slovensko-madarska-etnicka-hranica-1880-2011',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-alnis-staklelt,-utulok-shelter',
        destination: '/zazite/podujatia/1-alnis-staklelt-utulok-shelter',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mimi-a-liza-–-zahada-vianocneho-svetla',
        destination: '/zazite/podujatia/mimi-a-liza-zahada-vianocneho-svetla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata---podujatie-je-zrusene!',
        destination: '/zazite/podujatia/vlcata-podujatie-je-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/samuel-carnoky\\:-historia-a-dizajn-pisma-na-slovensku',
        destination: '/zazite/podujatia/samuel-carnoky-historia-a-dizajn-pisma-na-slovensku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zoltan-agocz\\:-zasah-–-presah',
        destination: '/zazite/podujatia/zoltan-agocz-zasah-presah',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/2-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-kde-bolo,-tam-bolo...',
        destination: '/zazite/podujatia/2-kde-bolo-tam-bolo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/debutový-klub',
        destination: '/zazite/podujatia/debutov-klub',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jolana-havelkova,-citlive-datasensitive-data',
        destination: '/zazite/podujatia/jolana-havelkova-citlive-datasensitive-data',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/csr-1918---1938',
        destination: '/zazite/podujatia/csr-1918-1938',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/knihoplavci-–-seria-citani-detom\\:-rozpravky-zo-srdca-stareho-kontinentu',
        destination:
          '/zazite/podujatia/knihoplavci-seria-citani-detom-rozpravky-zo-srdca-stareho-kontinentu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/usain-bolt\\:-muj-pribeh-9,58',
        destination: '/zazite/podujatia/usain-bolt-muj-pribeh-9-58',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lukas-figel\\:-astronomicon',
        destination: '/zazite/podujatia/lukas-figel-astronomicon',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zuzana-horvathova\\:-rodinne-pribehy',
        destination: '/zazite/podujatia/zuzana-horvathova-rodinne-pribehy',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/anita-bartos\\:-racte-vstoupit-do-me-boudy,-podivat-se-na-velbloudy...',
        destination:
          '/zazite/podujatia/anita-bartos-racte-vstoupit-do-me-boudy-podivat-se-na-velbloudy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-dennik-odvazneho-bojka-1.-diel',
        destination: '/zazite/podujatia/citatelsky-klub-dennik-odvazneho-bojka-1-diel',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcie-mlieko.-koncert',
        destination: '/zazite/podujatia/vlcie-mlieko-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub---young-adults',
        destination: '/zazite/podujatia/citatelsky-klub-young-adults',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/five-gentlemen---koncert',
        destination: '/zazite/podujatia/five-gentlemen-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-kolarikova\\:-na-periferii-priatelstva',
        destination: '/zazite/podujatia/katarina-kolarikova-na-periferii-priatelstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-dennik-odvazneho-bojka-1.diel',
        destination: '/zazite/podujatia/citatelsky-klub-dennik-odvazneho-bojka-1-diel-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stare,-ale-jare!',
        destination: '/zazite/podujatia/stare-ale-jare',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych,-wilsonov-(rezia\\:-tomas-masin,-2015)',
        destination:
          '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych-wilsonov-rezia-tomas-masin-2015',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/wendy-mass\\:-konecne-dvanastrocna',
        destination: '/zazite/podujatia/wendy-mass-konecne-dvanastrocna',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/svet-medzi-riadkami-ii.',
        destination: '/zazite/podujatia/svet-medzi-riadkami-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bloody-sonnets--krvave-sonety',
        destination: '/zazite/podujatia/bloody-sonnets-krvave-sonety',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/magdalena-markus\\:-modriny',
        destination: '/zazite/podujatia/magdalena-markus-modriny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/becher-garden-party-je-opat-tu.',
        destination: '/zazite/podujatia/becher-garden-party-je-opat-tu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/veterani-zo-salon-dore.-koncert',
        destination: '/zazite/podujatia/veterani-zo-salon-dore-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/literarne-vecery-u-cerveneho-raka\\:-exil-a-domov',
        destination: '/zazite/podujatia/literarne-vecery-u-cerveneho-raka-exil-a-domov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jazz-pops-up.-koncert',
        destination: '/zazite/podujatia/jazz-pops-up-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dura-and-friends.-koncert',
        destination: '/zazite/podujatia/dura-and-friends-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/6-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/6-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kreativne-popoludnie-pre-všetky-deti-19-5-22',
        destination: '/zazite/podujatia/kreativne-popoludnie-pre-v-etky-deti-19-5-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-oh,-hi-adam',
        destination: '/zazite/podujatia/4-oh-hi-adam',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/roald-dahl\\:-carodejnice',
        destination: '/zazite/podujatia/roald-dahl-carodejnice',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sue-townsendova\\:-tajny-dennik-adriana-mola',
        destination: '/zazite/podujatia/sue-townsendova-tajny-dennik-adriana-mola',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ludmila-pillmayerova\\:-promeny',
        destination: '/zazite/podujatia/ludmila-pillmayerova-promeny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citanie-na-zastavke,-vladimir-kobielksy-cita-dominika-dana',
        destination: '/zazite/podujatia/citanie-na-zastavke-vladimir-kobielksy-cita-dominika-dana',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/daniella-ferkova\\:-laska-a-ine-poblaznenia',
        destination: '/zazite/podujatia/daniella-ferkova-laska-a-ine-poblaznenia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stefan-orth\\:-betulaceae',
        destination: '/zazite/podujatia/stefan-orth-betulaceae',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/wilsonov---beseda-s-michalom-hvoreckym',
        destination: '/zazite/podujatia/wilsonov-beseda-s-michalom-hvoreckym',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citanie-pre-deti,-co-cely-rok-posluchali',
        destination: '/zazite/podujatia/1-citanie-pre-deti-co-cely-rok-posluchali',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/nesiem-vam-novinu...',
        destination: '/zazite/podujatia/nesiem-vam-novinu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citanie-pre-deti,-co-cely-rok-posluchali',
        destination: '/zazite/podujatia/citanie-pre-deti-co-cely-rok-posluchali',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citatelsky-klub\\:-dennik-odvazneho-bojka-1.-diel',
        destination: '/zazite/podujatia/1-citatelsky-klub-dennik-odvazneho-bojka-1-diel',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dano-veselsky\\:-kusky-mojich-muz',
        destination: '/zazite/podujatia/dano-veselsky-kusky-mojich-muz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-dennik-odvazneho-bojka',
        destination: '/zazite/podujatia/citatelsky-klub-dennik-odvazneho-bojka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-baluchova\\:-kapitan-padak---termin-podujatia-zruseny',
        destination: '/zazite/podujatia/kristina-baluchova-kapitan-padak-termin-podujatia-zruseny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-johannes-jensen-ma-pocit,-ze-je-iny',
        destination: '/zazite/podujatia/2-johannes-jensen-ma-pocit-ze-je-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slnecna-sustava\\:-prekvapive-fakty-o-nasom-kozmickom-domove',
        destination: '/zazite/podujatia/slnecna-sustava-prekvapive-fakty-o-nasom-kozmickom-domove',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych---zmena-miesta-konania',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych-zmena-miesta-konania',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-citatelsky-klub\\:-dennik-odvazneho-bojka',
        destination: '/zazite/podujatia/2-citatelsky-klub-dennik-odvazneho-bojka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mark-e.-pocha\\:-krajina-kanibalov',
        destination: '/zazite/podujatia/mark-e-pocha-krajina-kanibalov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vyvoj-zivota',
        destination: '/zazite/podujatia/vyvoj-zivota-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/den-otvorenych-dveri-v-ons---z-technickych-pricin-zrusene',
        destination: '/zazite/podujatia/den-otvorenych-dveri-v-ons-z-technickych-pricin-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-5',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milan-tittel\\:-karantena',
        destination: '/zazite/podujatia/milan-tittel-karantena',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/dr.-juraj-porubsky-a-jeho-dielo-o-historii-slovakov-z-oblasti-sedmohradska-–-rumunska',
        destination:
          '/zazite/podujatia/dr-juraj-porubsky-a-jeho-dielo-o-historii-slovakov-z-oblasti-sedmohradska-rumunska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/anton-uherik-\\:-dotyk-s-vedou',
        destination: '/zazite/podujatia/anton-uherik-dotyk-s-vedou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/komentovane-citanie-(a.-balaz,-i.-balaz)',
        destination: '/zazite/podujatia/komentovane-citanie-a-balaz-i-balaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-fest-anca\\:-najlepsie-animovane-filmy-pre-deti',
        destination: '/zazite/podujatia/kino-fest-anca-najlepsie-animovane-filmy-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/matej-myslovic\\:-„ked-vodu-na-vino,-tak-ruku-na-srdce“',
        destination: '/zazite/podujatia/matej-myslovic-ked-vodu-na-vino-tak-ruku-na-srdce',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/der-rabe-der-anders-war-(havran,-ktory-bol-iny)',
        destination: '/zazite/podujatia/der-rabe-der-anders-war-havran-ktory-bol-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-6',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/beseda-s-tomasom-mastalirom-–-hlavnym-predstavitelom-filmu-ciara',
        destination:
          '/zazite/podujatia/beseda-s-tomasom-mastalirom-hlavnym-predstavitelom-filmu-ciara',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych-(s-titulkami-aj-pre-nepocujucich)',
        destination:
          '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych-s-titulkami-aj-pre-nepocujucich',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/seniorfest-v-mestskej-kniznici-v-bratislave\\:-trening-pamati',
        destination: '/zazite/podujatia/seniorfest-v-mestskej-kniznici-v-bratislave-trening-pamati',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/branislav-jobus\\:-zubrienky-instalaterky',
        destination: '/zazite/podujatia/branislav-jobus-zubrienky-instalaterky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/daisy-mrazkova\\:-halo,-hopkacik!',
        destination: '/zazite/podujatia/daisy-mrazkova-halo-hopkacik',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/4-pribeh-jedneho-domu-–-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        destination:
          '/zazite/podujatia/4-pribeh-jedneho-domu-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-7',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/novy-duchovny-most-novy-sad---bratislava',
        destination: '/zazite/podujatia/novy-duchovny-most-novy-sad-bratislava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/elisabeth-stahl-(at)-a-tomas-lukac-(sk)',
        destination: '/zazite/podujatia/elisabeth-stahl-at-a-tomas-lukac-sk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ponte-pardo.-flamenco.',
        destination: '/zazite/podujatia/ponte-pardo-flamenco',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/martin-kubus\\:-ani-ryba,-asi-rak;-terezia-simova\\:-smiesna-osobna-drama',
        destination:
          '/zazite/podujatia/martin-kubus-ani-ryba-asi-rak-terezia-simova-smiesna-osobna-drama',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/naucne-prednasky-dusana-valenta---podujatie-zrusene',
        destination: '/zazite/podujatia/naucne-prednasky-dusana-valenta-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jan-valastan-Dolinsky',
        destination:
          '/zazite/podujatia/jan-valastan-dolinsky-zakladatel-hudobnej-kultury-na-slovensku-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/seniorfest\\:-pocitacovy-kurz-pre-seniorov-–-zaciatocnikov',
        destination: '/zazite/podujatia/seniorfest-pocitacovy-kurz-pre-seniorov-zaciatocnikov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Workshop-linorytu',
        destination: '/zazite/podujatia/workshop-linorytu',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/martin-kotucek\\:-j.k.huysmans_naopak-(babky,-nadbabky,-rekvizity)',
        destination:
          '/zazite/podujatia/martin-kotucek-j-k-huysmans-naopak-babky-nadbabky-rekvizity',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/iran-after-elections\\:-what-next',
        destination: '/zazite/podujatia/iran-after-elections-what-next',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/venussha-(tazky-tyzden)',
        destination: '/zazite/podujatia/venussha-tazky-tyzden',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kino-pre-nevidiacich-letni-rebeli',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-letni-rebeli',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/den-sklamania,-zrady-a-hnevu',
        destination: '/zazite/podujatia/den-sklamania-zrady-a-hnevu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/summer-night-hafla-2017---oriental-garden-party',
        destination: '/zazite/podujatia/summer-night-hafla-2017-oriental-garden-party',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebesta\\:-bajky--phure-vakeribena---o-bajki',
        destination: '/zazite/podujatia/juraj-sebesta-bajky-phure-vakeribena-o-bajki',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/postoj-chvila...',
        destination: '/zazite/podujatia/postoj-chvila',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/josef-capek\\:-o-psikovi-a-macicke',
        destination: '/zazite/podujatia/josef-capek-o-psikovi-a-macicke',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Tetovanie-zvyk-dávnoveku',
        destination: '/zazite/podujatia/tetovanie-zvyk-d-vnoveku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Pripravte-sa-na-pohovor',
        destination: '/zazite/podujatia/pripravte-sa-na-pohovor',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Stefan-Paulik-1903-1989-prvy-architekt-z-Kolmosa',
        destination: '/zazite/podujatia/stefan-paulik-1903-1989-prvy-architekt-z-kolmosa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jana-benkovska\\:-do-zahrady',
        destination: '/zazite/podujatia/jana-benkovska-do-zahrady',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/marilyn-a-kafka---hrdinovia-dramy',
        destination: '/zazite/podujatia/marilyn-a-kafka-hrdinovia-dramy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vladimir-skalsky\\:-z-dvoch-brehov',
        destination: '/zazite/podujatia/vladimir-skalsky-z-dvoch-brehov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ronaldo-–-cesta-na-vrchol',
        destination: '/zazite/podujatia/ronaldo-cesta-na-vrchol-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ako-knihy-menia-nas-zivot\\:-ludmila-podjavorinska',
        destination: '/zazite/podujatia/ako-knihy-menia-nas-zivot-ludmila-podjavorinska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dokonala-modra--a-tokeletes-kek',
        destination: '/zazite/podujatia/dokonala-modra-a-tokeletes-kek',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/70.-vyrocie-navratu-slovakov-do-csr',
        destination: '/zazite/podujatia/70-vyrocie-navratu-slovakov-do-csr',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/poetry-opposite-(poezia-opaku)',
        destination: '/zazite/podujatia/poetry-opposite-poezia-opaku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/6-bratia.-a-sestry',
        destination: '/zazite/podujatia/6-bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-lucia-vesela\\:-miesto-stretavania',
        destination: '/zazite/podujatia/1-lucia-vesela-miesto-stretavania',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/martin-jurik\\:-2084-(svet-sa-prebudza-do-pochmurnej-kazdodennosti)',
        destination:
          '/zazite/podujatia/martin-jurik-2084-svet-sa-prebudza-do-pochmurnej-kazdodennosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/schӧne-naci-sa-opat-vracia',
        destination: '/zazite/podujatia/sch-ne-naci-sa-opat-vracia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vitanie-prvacikov-v-kniznici',
        destination: '/zazite/podujatia/vitanie-prvacikov-v-kniznici-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-vanek\\:-opera-nehryzie',
        destination: '/zazite/podujatia/martin-vanek-opera-nehryzie',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/lokality,-kde-nasli-svoj-novy-domov-dolnozemski-slovaci-po-navrate-do-csr',
        destination:
          '/zazite/podujatia/lokality-kde-nasli-svoj-novy-domov-dolnozemski-slovaci-po-navrate-do-csr',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/znacka\\:-homosexualita',
        destination: '/zazite/podujatia/znacka-homosexualita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-kathy-kacer\\:-kuzelnik-z-auschwitzu',
        destination: '/zazite/podujatia/2-kathy-kacer-kuzelnik-z-auschwitzu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ondrej-achim-liker,-sedliacky-kral-z-dolnej-zeme',
        destination: '/zazite/podujatia/ondrej-achim-liker-sedliacky-kral-z-dolnej-zeme',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/robert-pospis-a-martin-sillay\\:-balady',
        destination: '/zazite/podujatia/robert-pospis-a-martin-sillay-balady',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/kukurica,-jej-univerzalna-uzitocnost-u-slovakov-na-dolnej-zemi-----podujatie-zrusene',
        destination:
          '/zazite/podujatia/kukurica-jej-univerzalna-uzitocnost-u-slovakov-na-dolnej-zemi-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/linkedIn-profil',
        destination: '/zazite/podujatia/linkedin-profil',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-u-cerveneho-raka\\:-animovany-film',
        destination: '/zazite/podujatia/kino-u-cerveneho-raka-animovany-film',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-kristufek\\:-tela',
        destination: '/zazite/podujatia/peter-kristufek-tela',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/v-samote--in-the-solitude',
        destination: '/zazite/podujatia/v-samote-in-the-solitude',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ked-hviezdy-mlcia...',
        destination: '/zazite/podujatia/ked-hviezdy-mlcia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-u-cerveneho-raka\\:-dokumentarny-film',
        destination: '/zazite/podujatia/kino-u-cerveneho-raka-dokumentarny-film',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/nebe-v-pronajmu\\:-andele-zazraku',
        destination: '/zazite/podujatia/nebe-v-pronajmu-andele-zazraku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-kolarikova-konarikova\\:-medzi-riadkami',
        destination: '/zazite/podujatia/katarina-kolarikova-konarikova-medzi-riadkami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/hrncek-hraj!',
        destination: '/zazite/podujatia/hrncek-hraj',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/200.-vyrocie-narodenia-ludovita-stura',
        destination: '/zazite/podujatia/200-vyrocie-narodenia-ludovita-stura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-kristufek\\:-lady-xanax,-pan-snehulienka-a-ja',
        destination: '/zazite/podujatia/peter-kristufek-lady-xanax-pan-snehulienka-a-ja',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tomas-lintner\\:-sheldon-vidi-nebo',
        destination: '/zazite/podujatia/tomas-lintner-sheldon-vidi-nebo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-po-cem-muzi-touzi',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-po-cem-muzi-touzi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erik-markovic\\:-ikonickost.-prestupovanie-slnka.',
        destination: '/zazite/podujatia/erik-markovic-ikonickost-prestupovanie-slnka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/o-deviatich-mesiacikoch',
        destination: '/zazite/podujatia/o-deviatich-mesiacikoch-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/65.-vyrocie-navratu-slovakov-z-bulharska-do-csr',
        destination: '/zazite/podujatia/65-vyrocie-navratu-slovakov-z-bulharska-do-csr',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ja-nic,-ja-muzikant',
        destination: '/zazite/podujatia/ja-nic-ja-muzikant',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-povod-cloveka\\:-kto-boli-nasi-prapredkovia',
        destination: '/zazite/podujatia/2-povod-cloveka-kto-boli-nasi-prapredkovia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/grapefruit-death',
        destination: '/zazite/podujatia/grapefruit-death-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/2-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/krista-bendova\\:-osmijankove-rozpravky-o-princeznach',
        destination: '/zazite/podujatia/krista-bendova-osmijankove-rozpravky-o-princeznach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sylvia-bystricanova\\:-a-vrat-sa-po-slabsich',
        destination: '/zazite/podujatia/sylvia-bystricanova-a-vrat-sa-po-slabsich',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/270.-vyrocie-zalozenia-slovenskeho-komlosa',
        destination: '/zazite/podujatia/270-vyrocie-zalozenia-slovenskeho-komlosa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/70.-vyrocie-zalozenia-1.-strednej-slovenskej-skoly-v-nadlaku',
        destination: '/zazite/podujatia/70-vyrocie-zalozenia-1-strednej-slovenskej-skoly-v-nadlaku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ludmila-machova\\:-kde-slnko-nezapada-a-trava-je-stale-zelena',
        destination: '/zazite/podujatia/ludmila-machova-kde-slnko-nezapada-a-trava-je-stale-zelena',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/krasa-a-kamuflaz',
        destination: '/zazite/podujatia/krasa-a-kamuflaz-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/denisa-dobrovodova\\:-rodinu-si-nevyberies',
        destination: '/zazite/podujatia/denisa-dobrovodova-rodinu-si-nevyberies',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miro-malis\\:-same-dobre-spravy',
        destination: '/zazite/podujatia/miro-malis-same-dobre-spravy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pes-pri(tulak)',
        destination: '/zazite/podujatia/pes-pri-tulak',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-krizove-30.-roky',
        destination: '/zazite/podujatia/juraj-sebo-krizove-30-roky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jerome-david-salinger\\:-kto-chyta-v-zite',
        destination: '/zazite/podujatia/jerome-david-salinger-kto-chyta-v-zite',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kobylka',
        destination: '/zazite/podujatia/kobylka-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/barbara-kardosova\\:-traja-kamosi-a-fakticky-fantasticky-bunker',
        destination:
          '/zazite/podujatia/barbara-kardosova-traja-kamosi-a-fakticky-fantasticky-bunker',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maria-mikitova-janoskova\\:-vyhorena-duha',
        destination: '/zazite/podujatia/maria-mikitova-janoskova-vyhorena-duha',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/prisery-praveku-i.',
        destination: '/zazite/podujatia/prisery-praveku-i',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sviezi-mlady-film--mladi-tvorcovia-do-18-rokov',
        destination: '/zazite/podujatia/sviezi-mlady-film-mladi-tvorcovia-do-18-rokov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/amnestia,-ktora-rozputala-peklo',
        destination: '/zazite/podujatia/amnestia-ktora-rozputala-peklo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slovenske-dejiny-–-zname-nezname',
        destination: '/zazite/podujatia/slovenske-dejiny-zname-nezname',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kde-bolo,-tam-bolo...',
        destination: '/zazite/podujatia/kde-bolo-tam-bolo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcie-mlieko-–-litecki',
        destination: '/zazite/podujatia/vlcie-mlieko-litecki',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stretnutie-literarneho-klubu',
        destination: '/zazite/podujatia/stretnutie-literarneho-klubu-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/povod-cloveka\\:-kto-boli-nasi-prapredkovia',
        destination: '/zazite/podujatia/povod-cloveka-kto-boli-nasi-prapredkovia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/gabriella-parcova,-marcello-argilli\\:-srofikove-dobrodruzstva',
        destination: '/zazite/podujatia/gabriella-parcova-marcello-argilli-srofikove-dobrodruzstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/cerveny-(b)rak',
        destination: '/zazite/podujatia/cerveny-b-rak',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jozef-medard-slovik\\:-psie-modre-nebo',
        destination: '/zazite/podujatia/jozef-medard-slovik-psie-modre-nebo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/koncert\\:-marian-greksa',
        destination: '/zazite/podujatia/koncert-marian-greksa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jar,-leto,-jesen,-agata',
        destination: '/zazite/podujatia/jar-leto-jesen-agata',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lucia-siposova\\:-s-laskou-anca-pagacova',
        destination: '/zazite/podujatia/lucia-siposova-s-laskou-anca-pagacova',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-a-slabozrakych-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-kristufek\\:-atlas-zabudania',
        destination: '/zazite/podujatia/peter-kristufek-atlas-zabudania-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-korzo',
        destination: '/zazite/podujatia/juraj-sebo-korzo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slavnostne-odovzdavanie-cien\\:-bratislava,-moje-mesto-2015',
        destination: '/zazite/podujatia/slavnostne-odovzdavanie-cien-bratislava-moje-mesto-2015',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zlo-(spomienky-sudneho-znalca)',
        destination: '/zazite/podujatia/zlo-spomienky-sudneho-znalca',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/preco-vidime-duchov',
        destination: '/zazite/podujatia/preco-vidime-duchov-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ukazky-vycviku-vodiacich-psov',
        destination: '/zazite/podujatia/ukazky-vycviku-vodiacich-psov-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tajomstva-najvacsich-zahad',
        destination: '/zazite/podujatia/tajomstva-najvacsich-zahad-2',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/roman-martinsky\\:-nebasne',
        destination: '/zazite/podujatia/roman-martinsky-nebasne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-hudba-–-zvuk-–-ticho-–-hluk',
        destination: '/zazite/podujatia/2-hudba-zvuk-ticho-hluk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/prisery-praveku-ii.',
        destination: '/zazite/podujatia/prisery-praveku-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ivan-cicmanec\\:-bratislavsky-satyr',
        destination: '/zazite/podujatia/ivan-cicmanec-bratislavsky-satyr',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mimi-a-liza',
        destination: '/zazite/podujatia/mimi-a-liza-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sluk\\:-vyber-z-tvorby',
        destination: '/zazite/podujatia/sluk-vyber-z-tvorby-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/deti-a-umenie',
        destination: '/zazite/podujatia/deti-a-umenie-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mudrost-a-sucit-zvierat',
        destination: '/zazite/podujatia/mudrost-a-sucit-zvierat-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-zvieracie-kuriozity-i.\\:-vzhlad-a-velkost',
        destination: '/zazite/podujatia/2-zvieracie-kuriozity-i-vzhlad-a-velkost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-zvieracie-kuriozity-I-vzhlad-a-velkost',
        destination: '/zazite/podujatia/1-zvieracie-kuriozity-i-vzhlad-a-velkost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zvieracie-kuriozity-i.',
        destination: '/zazite/podujatia/zvieracie-kuriozity-i',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/hudba-–-zvuk-–-ticho-–-hluk',
        destination: '/zazite/podujatia/hudba-zvuk-ticho-hluk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/prisery-z-praveku-i.',
        destination: '/zazite/podujatia/prisery-z-praveku-i-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dinosaury\\:-svet-obrov',
        destination: '/zazite/podujatia/dinosaury-svet-obrov-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zvieracie-kuriozity-i.\\:-vzhlad-a-velkost',
        destination: '/zazite/podujatia/zvieracie-kuriozity-i-vzhlad-a-velkost-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mudrost-a-sucit-u-zvierat',
        destination: '/zazite/podujatia/mudrost-a-sucit-u-zvierat-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mona-lisa-a-hello-kitty',
        destination: '/zazite/podujatia/mona-lisa-a-hello-kitty-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bubnovacka-v-kniznici',
        destination: '/zazite/podujatia/bubnovacka-v-kniznici-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ako-zili-dinosaury',
        destination: '/zazite/podujatia/ako-zili-dinosaury-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/d-blues-band',
        destination: '/zazite/podujatia/d-blues-band-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ludovit-haan',
        destination: '/zazite/podujatia/ludovit-haan-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/beatrix-poter\\:-o-zajacikovi-petrovi',
        destination: '/zazite/podujatia/beatrix-poter-o-zajacikovi-petrovi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-dano-veselsky\\:-kusky-mojich-muz',
        destination: '/zazite/podujatia/1-dano-veselsky-kusky-mojich-muz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-bears-don´t-read-(medvede-necitaju)',
        destination: '/zazite/podujatia/1-bears-don-t-read-medvede-necitaju',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-brano-jobus\\:-ja-nic,-ja-muzikant',
        destination: '/zazite/podujatia/1-brano-jobus-ja-nic-ja-muzikant',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zahady-a-kuriozity-kozmu',
        destination: '/zazite/podujatia/zahady-a-kuriozity-kozmu-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-geisberg',
        destination: '/zazite/podujatia/martin-geisberg-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zvieracie-kuriozity-ii.\\:-spravanie',
        destination: '/zazite/podujatia/zvieracie-kuriozity-ii-spravanie-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ako-funguje-zem\\:-trhanie-kontinentov-a-skutocne-atlantidy',
        destination: '/zazite/podujatia/ako-funguje-zem-trhanie-kontinentov-a-skutocne-atlantidy-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/filmovy-vecer-studentskych-filmov',
        destination: '/zazite/podujatia/filmovy-vecer-studentskych-filmov-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/najvacsie-prirodne-katastrofy',
        destination: '/zazite/podujatia/najvacsie-prirodne-katastrofy-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/radikalne-reflexie',
        destination: '/zazite/podujatia/radikalne-reflexie-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-chamtrul-rinpoche\\:-mudrost-a-sucit',
        destination: '/zazite/podujatia/1-chamtrul-rinpoche-mudrost-a-sucit',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citatelsky-klub-deti-a-mladeze\\:-zaciname-sami-citat',
        destination: '/zazite/podujatia/1-citatelsky-klub-deti-a-mladeze-zaciname-sami-citat',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sleep-out-vol.-4\\:-vecer-venovany-ludom-bez-domova',
        destination: '/zazite/podujatia/sleep-out-vol-4-vecer-venovany-ludom-bez-domova',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citanie-na-zastavke-(kapucinska)',
        destination: '/zazite/podujatia/1-citanie-na-zastavke-kapucinska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ludovit-micatek---vyznamny-dolnozemsky-slovak',
        destination: '/zazite/podujatia/ludovit-micatek-vyznamny-dolnozemsky-slovak',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-zoltan-agocz\\:-zasah-–-presah',
        destination: '/zazite/podujatia/1-zoltan-agocz-zasah-presah',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-sue-townsendova\\:-tajny-dennik-adriana-mola',
        destination: '/zazite/podujatia/1-sue-townsendova-tajny-dennik-adriana-mola',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-danka-gregova\\:-vrstvenie',
        destination: '/zazite/podujatia/1-danka-gregova-vrstvenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/marcel-sefcik\\:-vatikan-mojimi-ocami',
        destination: '/zazite/podujatia/marcel-sefcik-vatikan-mojimi-ocami',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/3-pribeh-jedneho-domu-–-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        destination:
          '/zazite/podujatia/3-pribeh-jedneho-domu-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/velky-knizny-kviz\\:-10-otazok,-10-vyhercov',
        destination: '/zazite/podujatia/velky-knizny-kviz-10-otazok-10-vyhercov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-ivan-dudas\\:-centralny-register-umeleckej-cinnosti',
        destination: '/zazite/podujatia/1-ivan-dudas-centralny-register-umeleckej-cinnosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-martin-hodon-a-kolektiv\\:-pomaly-plynuce-dni',
        destination: '/zazite/podujatia/1-martin-hodon-a-kolektiv-pomaly-plynuce-dni',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-lukas-figel\\:-astronomicon',
        destination: '/zazite/podujatia/1-lukas-figel-astronomicon',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-juraj-sebo\\:-utek-do-pekla',
        destination: '/zazite/podujatia/1-juraj-sebo-utek-do-pekla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/monika-oremusova\\:-cesta-cielom-test',
        destination: '/zazite/podujatia/monika-oremusova-cesta-cielom-test',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-erika-miklosova\\:-zatisie-s-draperiami',
        destination: '/zazite/podujatia/1-erika-miklosova-zatisie-s-draperiami',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-gabriella-parcova,-marcello-argilli\\:-srofikove-dobrodruzstva',
        destination:
          '/zazite/podujatia/1-gabriella-parcova-marcello-argilli-srofikove-dobrodruzstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-hudba-–-zvuk-–-ticho-–-hluk',
        destination: '/zazite/podujatia/1-hudba-zvuk-ticho-hluk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-johannes-jensen-ma-pocit,-ze-je-iny',
        destination: '/zazite/podujatia/1-johannes-jensen-ma-pocit-ze-je-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-kde-bolo,-tam-bolo...',
        destination: '/zazite/podujatia/1-kde-bolo-tam-bolo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-kviz\\:-knihy,-ktore-boli-sfilmovane',
        destination: '/zazite/podujatia/1-kviz-knihy-ktore-boli-sfilmovane',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zivocichy-a-rastliny,-ktore-„menili-svet“',
        destination: '/zazite/podujatia/zivocichy-a-rastliny-ktore-menili-svet-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/workshop-tvorcov-slovenskej-fantastiky',
        destination: '/zazite/podujatia/workshop-tvorcov-slovenskej-fantastiky-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/7-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-3',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/alena-sabuchova\\:-zadne-izby',
        destination: '/zazite/podujatia/alena-sabuchova-zadne-izby',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-martin-hodon-a-kolektiv\\:-negativ_egotrip',
        destination: '/zazite/podujatia/1-martin-hodon-a-kolektiv-negativ-egotrip',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-mesiac-fotografie-2016-agnieszka-rayss-(pl)\\:-tu-sa-zacina-koniec-miest',
        destination:
          '/zazite/podujatia/1-mesiac-fotografie-2016-agnieszka-rayss-pl-tu-sa-zacina-koniec-miest',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-bratislavske-korzo',
        destination: '/zazite/podujatia/juraj-sebo-bratislavske-korzo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-lubo-stacho\\:-obchodna-(1984-–-2014)',
        destination: '/zazite/podujatia/1-lubo-stacho-obchodna-1984-2014',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-ludmila-pillmayerova\\:-promeny',
        destination: '/zazite/podujatia/1-ludmila-pillmayerova-promeny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-johannes-jensen-ma-pocit,-ze-je-iny',
        destination: '/zazite/podujatia/4-johannes-jensen-ma-pocit-ze-je-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/5-bratia.-a-sestry',
        destination: '/zazite/podujatia/5-bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dramaticka-hra-–-pribeh-maugliho',
        destination: '/zazite/podujatia/dramaticka-hra-pribeh-maugliho',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kino-pre-nevidiacich-26-9',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-26-9',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-martin-kochan-(sk)',
        destination: '/zazite/podujatia/1-martin-kochan-sk',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-medved,-ktory-tam-nebol',
        destination: '/zazite/podujatia/1-medved-ktory-tam-nebol',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-seniorfest\\:-pocitacovy-kurz-pre-seniorov-–-zaciatocnikov',
        destination: '/zazite/podujatia/1-seniorfest-pocitacovy-kurz-pre-seniorov-zaciatocnikov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-mozu-sa-zvierata-spravat-ludsky-zrusene!',
        destination: '/zazite/podujatia/1-mozu-sa-zvierata-spravat-ludsky-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-naucne-prednasky-dusana-valenta---podujatie-zrusene',
        destination: '/zazite/podujatia/1-naucne-prednasky-dusana-valenta-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Tajomstva-najvacsich-zahad',
        destination: '/zazite/podujatia/tajomstva-najvacsich-zahad',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/indonezia\\:-iskrenie-iluzii',
        destination: '/zazite/podujatia/indonezia-iskrenie-iluzii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-povod-cloveka\\:-kto-boli-nasi-prapredkovia',
        destination: '/zazite/podujatia/1-povod-cloveka-kto-boli-nasi-prapredkovia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-selma-lagerlofova\\:-nils-alebo-podivuhodna-cesta',
        destination: '/zazite/podujatia/1-selma-lagerlofova-nils-alebo-podivuhodna-cesta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-svet-zvukov---podujatie-zrusene',
        destination: '/zazite/podujatia/1-svet-zvukov-podujatie-zrusene',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/knihoplavci---seria-citani-detom\\:-rozpravky-z-kralovstva-leg-godt',
        destination:
          '/zazite/podujatia/knihoplavci-seria-citani-detom-rozpravky-z-kralovstva-leg-godt',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/thurzova-ludmila-a-kolektiv\\:-maly-atlas-liecivych-rastlin',
        destination: '/zazite/podujatia/thurzova-ludmila-a-kolektiv-maly-atlas-liecivych-rastlin',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-trening-pamati-(nielen)-pre-seniorov',
        destination: '/zazite/podujatia/1-trening-pamati-nielen-pre-seniorov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milos-macourek\\:-o-konradovi,-ktory-pisal-nosom',
        destination: '/zazite/podujatia/milos-macourek-o-konradovi-ktory-pisal-nosom-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-citatelsky-klub\\:-dennik-odvazneho-bojka',
        destination: '/zazite/podujatia/3-citatelsky-klub-dennik-odvazneho-bojka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Petra-Nagyova-Dzerengova-Chcem-len-tvoje-dobro',
        destination: '/zazite/podujatia/petra-nagyova-dzerengova-chcem-len-tvoje-dobro',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-aulitisova,-peter-tilajcik\\:-cholstomer',
        destination: '/zazite/podujatia/katarina-aulitisova-peter-tilajcik-cholstomer',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/autorske-citanie\\:-marius-kopcsay,-viliam-nadaskay',
        destination: '/zazite/podujatia/autorske-citanie-marius-kopcsay-viliam-nadaskay',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/viera-lukackova---minarikova\\:-za-ciarou',
        destination: '/zazite/podujatia/viera-lukackova-minarikova-za-ciarou',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/zuzana-bakosova-hlavenkova\\:-cas-cinohry-nasich-cias;-martin-vlado\\:-zvacsovanie-priestoru',
        destination:
          '/zazite/podujatia/zuzana-bakosova-hlavenkova-cas-cinohry-nasich-cias-martin-vlado-zvacsovanie-priestoru',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-pionierske-50.-roky',
        destination: '/zazite/podujatia/juraj-sebo-pionierske-50-roky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-online\\:-rozpravky-ovencene-vavrinom',
        destination: '/zazite/podujatia/knihoplavci-online-rozpravky-ovencene-vavrinom',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/richard-pietrass\\:-odlahla-poloha.-martin-rodan\\:-nasa-neznama-europska-kultura',
        destination:
          '/zazite/podujatia/richard-pietrass-odlahla-poloha-martin-rodan-nasa-neznama-europska-kultura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Genuine-Transformer-ZRUSENE',
        destination: '/zazite/podujatia/genuine-transformer-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erik-ondrejicka\\:-krajina-diamantovland-of-diamonds',
        destination: '/zazite/podujatia/erik-ondrejicka-krajina-diamantovland-of-diamonds',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rozhodovanie-–-zazitkovy-workshop-o-druhej-svetovej-vojne',
        destination: '/zazite/podujatia/rozhodovanie-zazitkovy-workshop-o-druhej-svetovej-vojne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ponte-Pardo-flamenco-hudba-a-tanec',
        destination: '/zazite/podujatia/ponte-pardo-flamenco-hudba-a-tanec',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/nekosene-luky-(koncert)',
        destination: '/zazite/podujatia/nekosene-luky-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Poviedky-o-laske',
        destination: '/zazite/podujatia/poviedky-o-laske-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/SwinGang',
        destination: '/zazite/podujatia/swingang-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vrbovski-vitazi.-koncert-priemyselneho-folkloru',
        destination: '/zazite/podujatia/vrbovski-vitazi-koncert-priemyselneho-folkloru',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/5-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/5-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peggy,-jana-a-ja---sen-o-stasti',
        destination: '/zazite/podujatia/peggy-jana-a-ja-sen-o-stasti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/literarny-kviz-s-dadom-nagyom-podujatie-je-zrusene!',
        destination: '/zazite/podujatia/literarny-kviz-s-dadom-nagyom-podujatie-je-zrusene-1',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Anton-Heretik-Humor-je-vazna-vec-psychologia-a-psychopatologia-komiky',
        destination:
          '/zazite/podujatia/anton-heretik-humor-je-vazna-vec-psychologia-a-psychopatologia-komiky',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Jan-Comaj-a-Jozef-Leikert-Velke-veci-su-malokedy-vyslovene-tie-sa-musia-vykonat',
        destination:
          '/zazite/podujatia/jan-comaj-a-jozef-leikert-velke-veci-su-malokedy-vyslovene-tie-sa-musia-vykonat',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dana-hlavata\\:-nasej-mame-hrabe',
        destination: '/zazite/podujatia/dana-hlavata-nasej-mame-hrabe',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maria-lubova-benova\\:-dom,-ktory-ozil',
        destination: '/zazite/podujatia/maria-lubova-benova-dom-ktory-ozil',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Brano-Jobus-Ja-nic-ja-muzikant',
        destination: '/zazite/podujatia/brano-jobus-ja-nic-ja-muzikant-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tvoriva-dielna\\:-velkonocna-dekoracia',
        destination: '/zazite/podujatia/tvoriva-dielna-velkonocna-dekoracia-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-rozpravky-na-pomedzi-mori',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-na-pomedzi-mori',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Darina-Mikolasova-Simon',
        destination: '/zazite/podujatia/darina-mikolasova-simon',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/2-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/eva-ucnova\\:-island-–-zivot-s-nadychom-ladu',
        destination: '/zazite/podujatia/eva-ucnova-island-zivot-s-nadychom-ladu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-strasser\\:-frantisek-miklosko',
        destination: '/zazite/podujatia/jan-strasser-frantisek-miklosko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Tolkien-reading-day',
        destination: '/zazite/podujatia/tolkien-reading-day-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/nina-rosa.-koncert',
        destination: '/zazite/podujatia/nina-rosa-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katka-aulitisova\\:-rozkravka',
        destination: '/zazite/podujatia/katka-aulitisova-rozkravka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Perlicky-na-dne-a-jine-radosti-zivota',
        destination: '/zazite/podujatia/perlicky-na-dne-a-jine-radosti-zivota',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Mestska-kniznica-na-cestach',
        destination: '/zazite/podujatia/mestska-kniznica-na-cestach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Koncert-ku-Dnu-ucitelov',
        destination: '/zazite/podujatia/koncert-ku-dnu-ucitelov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Shisha-wars-Festival-vodnych-fajok',
        destination: '/zazite/podujatia/shisha-wars-festival-vodnych-fajok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/chamtrul-rinpoche\\:-mudrost-a-sucit',
        destination: '/zazite/podujatia/chamtrul-rinpoche-mudrost-a-sucit',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Osmijankovo-velke-literarne-stopovanie-vernisaz',
        destination: '/zazite/podujatia/osmijankovo-velke-literarne-stopovanie-vernisaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/balla\\:-velka-laska',
        destination: '/zazite/podujatia/balla-velka-laska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ondrej-Francisci-1914-1985',
        destination: '/zazite/podujatia/ondrej-francisci-1914-1985',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Stretnutie-na-dobrej-adrese',
        destination: '/zazite/podujatia/stretnutie-na-dobrej-adrese',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/opera-pre-deti\\:-predana-nevesta',
        destination: '/zazite/podujatia/opera-pre-deti-predana-nevesta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Masahiko-Shiraki-Masahikovymi-ocami',
        destination: '/zazite/podujatia/masahiko-shiraki-masahikovymi-ocami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Adela-Banasova-Zabudnute-slovenske-rozpravky',
        destination: '/zazite/podujatia/adela-banasova-zabudnute-slovenske-rozpravky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bratislavska-burza-knih',
        destination: '/zazite/podujatia/bratislavska-burza-knih-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Trio-Fatal',
        destination: '/zazite/podujatia/trio-fatal',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Ucast-Slovakov-zijucich-v-Bulharsku-v-protifasistickom-odboji',
        destination:
          '/zazite/podujatia/ucast-slovakov-zijucich-v-bulharsku-v-protifasistickom-odboji',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Velke-zahady-historie',
        destination: '/zazite/podujatia/velke-zahady-historie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-maria-lubova-benova\\:-dom,-ktory-ozil',
        destination: '/zazite/podujatia/1-maria-lubova-benova-dom-ktory-ozil',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Bratislava-mesto-ktore-cita-1',
        destination: '/zazite/podujatia/bratislava-mesto-ktore-cita-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/filip-bandurcin\\:-z-hlbky-a-vysky',
        destination: '/zazite/podujatia/filip-bandurcin-z-hlbky-a-vysky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/schӧne-naci-sa-vracia',
        destination: '/zazite/podujatia/schne-naci-sa-vracia-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-8',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/gabriel-jonas-trio.-koncert',
        destination: '/zazite/podujatia/gabriel-jonas-trio-koncert',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/jarny-maraton-s-knihou.-podujatie-presunute-na-april.-datum-upresnime.',
        destination:
          '/zazite/podujatia/jarny-maraton-s-knihou-podujatie-presunute-na-april-datum-upresnime',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Maros-Krajnak-Informacia',
        destination: '/zazite/podujatia/maros-krajnak-informacia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miroslav-zolobanic\\:-homo-desiderans',
        destination: '/zazite/podujatia/miroslav-zolobanic-homo-desiderans',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/filip-bandurcin\\:-z-hlbky-a-vysky-(vernisaz)',
        destination: '/zazite/podujatia/filip-bandurcin-z-hlbky-a-vysky-vernisaz',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/ivica-ruttkayova\\:-matematicky-model-vecnosti-a-ine-nocne-kratochvile',
        destination:
          '/zazite/podujatia/ivica-ruttkayova-matematicky-model-vecnosti-a-ine-nocne-kratochvile',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/6-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/6-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Verse-v-notach-noty-vo-versoch',
        destination: '/zazite/podujatia/verse-v-notach-noty-vo-versoch',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/freska-v-dome,-medzerovy-plod',
        destination: '/zazite/podujatia/freska-v-dome-medzerovy-plod',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/opice-z-nasej-police-pozor-zmena-casu!-10:00-a-14:00',
        destination: '/zazite/podujatia/opice-z-nasej-police-pozor-zmena-casu-10-00-a-14-00',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia/4-bratislava-mesto-ktore-cita',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/17-slabik-v-hajku-(ako-sa-pise-japonske-haiku-na-slovensku)',
        destination: '/zazite/podujatia/17-slabik-v-hajku-ako-sa-pise-japonske-haiku-na-slovensku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/alan-hyza\\:-spis-–-tiene-a-ozveny.-vernisaz-vystavy',
        destination: '/zazite/podujatia/alan-hyza-spis-tiene-a-ozveny-vernisaz-vystavy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ja-je-niekto-iny-(nielen-o-maskach-a-divadle)',
        destination: '/zazite/podujatia/ja-je-niekto-iny-nielen-o-maskach-a-divadle',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-10-1-23',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-seria-citani-detom',
        destination: '/zazite/podujatia/knihoplavci-seria-citani-detom-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-young-adults',
        destination: '/zazite/podujatia/citatelsky-klub-young-adults-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Literarny-kviz-s-Dadom-Nagyom-14-10',
        destination: '/zazite/podujatia/literarny-kviz-s-dadom-nagyom-14-10',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tara-westover-vzdelaná',
        destination: '/zazite/podujatia/tara-westover-vzdelan',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich-jana-eyrová',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-jana-eyrov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/spoznaj',
        destination: '/zazite/podujatia/spoznaj-suseda-20-10',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-25-10',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Kino-pre-nevidiacich-5-12-22',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-5-12-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Pribehy-z-luk-a-mokradi',
        destination: '/zazite/podujatia/pribehy-z-luk-a-mokradi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vymyslam-sa-zo-dna-na-den',
        destination: '/zazite/podujatia/vymyslam-sa-zo-dna-na-den',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Metodicke-stretnutie-knihovnikov',
        destination: '/zazite/podujatia/metodicke-stretnutie-knihovnikov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Sladky-kviz',
        destination: '/zazite/podujatia/sladky-kviz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/agape,-o-bozska-agape',
        destination: '/zazite/podujatia/agape-o-bozska-agape',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vyzdobte-s-nami-kniznicu',
        destination: '/zazite/podujatia/vyzdobte-s-nami-kniznicu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vianocna-tvoriva-dielna',
        destination: '/zazite/podujatia/vianocna-tvoriva-dielna',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Blizke-aj-vzdialene-adventne-inspiracie',
        destination: '/zazite/podujatia/blizke-aj-vzdialene-adventne-inspiracie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Palickovana-cipka-22',
        destination: '/zazite/podujatia/palickovana-cipka-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub-Vianocne-pribehy',
        destination: '/zazite/podujatia/citatelsky-klub-vianocne-pribehy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/',
        destination: '/zazite/podujatia/ako-citat-svajciarsko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/premeny-mesta\\:-bratislavske-vydanie-19-1',
        destination: '/zazite/podujatia/premeny-mesta-bratislavske-vydanie-19-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Literarny-kviz-15-12-22',
        destination: '/zazite/podujatia/literarny-kviz-15-12-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-17-1-23',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Peter-Kristufek-Atlas-zabudania',
        destination: '/zazite/podujatia/peter-kristufek-atlas-zabudania',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/karierny-pondelok-linkedIn-profil',
        destination: '/zazite/podujatia/karierny-pondelok-linkedin-profil',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Juraj-Sebo-Tehelne-pole-chram-futbalu',
        destination: '/zazite/podujatia/juraj-sebo-tehelne-pole-chram-futbalu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/robert-pospis\\:-sme-to-my',
        destination: '/zazite/podujatia/robert-pospis-sme-to-my',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/5-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/5-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Letne-folkovanie',
        destination: '/zazite/podujatia/letne-folkovanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Denisa-and-Kamila',
        destination: '/zazite/podujatia/denisa-and-kamila',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Desatoro',
        destination: '/zazite/podujatia/desatoro',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Opera-nas-zabava-Napoj-lasky',
        destination: '/zazite/podujatia/opera-nas-zabava-napoj-lasky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/andrea-ondis\\:-historaevernisaz',
        destination: '/zazite/podujatia/andrea-ondis-historaevernisaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michal-nagypal\\:-pole',
        destination: '/zazite/podujatia/michal-nagypal-pole',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-vlcata---prirodovedny-kruzok',
        destination: '/zazite/podujatia/4-vlcata-prirodovedny-kruzok',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/treningy-pamati-(ukazkove-hodiny)',
        destination: '/zazite/podujatia/treningy-pamati-ukazkove-hodiny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/paralely---starojaponska-lyrika',
        destination: '/zazite/podujatia/paralely-starojaponska-lyrika',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-michaela-suranska---myty-a-nehody',
        destination: '/zazite/podujatia/1-michaela-suranska-myty-a-nehody',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Slovenske-ochotnicke-divadlo-v-Slovenskom-Komlosi-1907-1947',
        destination:
          '/zazite/podujatia/slovenske-ochotnicke-divadlo-v-slovenskom-komlosi-1907-1947',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/animaky-pre-deti--Мультфільми-для-дітей',
        destination: '/zazite/podujatia/animaky-pre-deti-',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/danka-gregova\\:-vrstvenie',
        destination: '/zazite/podujatia/danka-gregova-vrstvenie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/BRAK-3D',
        destination: '/zazite/podujatia/brak-3d',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/solamente-naturali,-musica-di-tavola-(hudba-pri-stole)',
        destination: '/zazite/podujatia/solamente-naturali-musica-di-tavola-hudba-pri-stole',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/marian-pauer\\:-karol-plicka',
        destination: '/zazite/podujatia/marian-pauer-karol-plicka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-martin-vanek\\:-opera-nehryzie',
        destination: '/zazite/podujatia/2-martin-vanek-opera-nehryzie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-barenyi\\:-strach-v-ociach',
        destination: '/zazite/podujatia/peter-barenyi-strach-v-ociach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-knihy,-ktore-ovplyvnili-dejiny',
        destination: '/zazite/podujatia/citatelsky-klub-knihy-ktore-ovplyvnili-dejiny-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bessa-illustration---life-is-juicy!',
        destination: '/zazite/podujatia/bessa-illustration-life-is-juicy',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/fenomen-vakcinacie.-prednaska-spojena-s-prehliadkou-lekarne-u-cerveneho-raka',
        destination:
          '/zazite/podujatia/fenomen-vakcinacie-prednaska-spojena-s-prehliadkou-lekarne-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-bratia.-a-sestry',
        destination: '/zazite/podujatia/4-bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-cicvak\\:-kukura',
        destination: '/zazite/podujatia/martin-cicvak-kukura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bystrik-sikula,-martin-chudik',
        destination: '/zazite/podujatia/bystrik-sikula-martin-chudik',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/9-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/9-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/shady\\:-koncert-tradicnej-keltskej-hudby-v-originalnych-aranzmanoch',
        destination:
          '/zazite/podujatia/shady-koncert-tradicnej-keltskej-hudby-v-originalnych-aranzmanoch',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/co-potrebuju-ludia-bez-domova-najviac-koniec-bezdomovectva.',
        destination: '/zazite/podujatia/co-potrebuju-ludia-bez-domova-najviac-koniec-bezdomovectva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-online\\:-rozpravky-z-herbara',
        destination: '/zazite/podujatia/knihoplavci-online-rozpravky-z-herbara',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci---seria-citani-detom',
        destination: '/zazite/podujatia/knihoplavci-seria-citani-detom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislava,-moje-mesto-2018',
        destination: '/zazite/podujatia/bratislava-moje-mesto-2018',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citanie-na-zastavke-(na-kapucinskej)',
        destination: '/zazite/podujatia/citanie-na-zastavke-na-kapucinskej',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/andrea-boknikova\\:-potopene-duse',
        destination: '/zazite/podujatia/andrea-boknikova-potopene-duse',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tvoriva-dielna\\:-vytvor-si-svoj-vlastny-obal-na-knihu',
        destination: '/zazite/podujatia/tvoriva-dielna-vytvor-si-svoj-vlastny-obal-na-knihu-1',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/janette-simkova\\:-takto-sa-to-podari!-recepty-na-dusevnu-pohodu',
        destination:
          '/zazite/podujatia/janette-simkova-takto-sa-to-podari-recepty-na-dusevnu-pohodu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/inspiracie-z-nemecka-(nielen)-pre-verejne-kniznice',
        destination: '/zazite/podujatia/inspiracie-z-nemecka-nielen-pre-verejne-kniznice',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michaela-thanova\\:-blaznovstvo',
        destination: '/zazite/podujatia/michaela-thanova-blaznovstvo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/beseda-s-evou-rysovou-a-evou-landlovou---zmena-miesta-konania',
        destination:
          '/zazite/podujatia/beseda-s-evou-rysovou-a-evou-landlovou-zmena-miesta-konania',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/katarina-aulitisova\\:-babicka-z-vajicka',
        destination: '/zazite/podujatia/katarina-aulitisova-babicka-z-vajicka',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/zuzana-grochalova\\:-cestopis---tropicka-java,-kde-je-usmev-povinny',
        destination:
          '/zazite/podujatia/zuzana-grochalova-cestopis-tropicka-java-kde-je-usmev-povinny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/silvester-lavrik\\:-nedelne-sachy-s-tisom',
        destination: '/zazite/podujatia/silvester-lavrik-nedelne-sachy-s-tisom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-lukas-freytag\\:-od-znaku-k-celku',
        destination: '/zazite/podujatia/1-lukas-freytag-od-znaku-k-celku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/genius-loci.-lucia-holinova-(sk)\\:-the-other-side',
        destination: '/zazite/podujatia/genius-loci-lucia-holinova-sk-the-other-side',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamati-–-2.-cyklus-(obsadeny)',
        destination: '/zazite/podujatia/trening-pamati-2-cyklus-obsadeny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-objavil-som-ameriku',
        destination: '/zazite/podujatia/juraj-sebo-objavil-som-ameriku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/laureati-ceny-jana-johanidesa-2016\\:-alta-vasova-a-peter-balko',
        destination:
          '/zazite/podujatia/laureati-ceny-jana-johanidesa-2016-alta-vasova-a-peter-balko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-rozpravky-zo-zidovskej-ulice-pozor!-zmena-miesta',
        destination:
          '/zazite/podujatia/knihoplavci-rozpravky-zo-zidovskej-ulice-pozor-zmena-miesta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/hackujeme-v-kniznici-podujatie-presunute-na-2.10.2019',
        destination: '/zazite/podujatia/hackujeme-v-kniznici-podujatie-presunute-na-2-10-2019',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sona-bulbeck-lucinova\\:-pustne-srdce',
        destination: '/zazite/podujatia/sona-bulbeck-lucinova-pustne-srdce',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/4-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/4-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-salner\\:-zidovska-bratislava',
        destination: '/zazite/podujatia/peter-salner-zidovska-bratislava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-rozpravky-spod-rozkvitnutej-sakury',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-spod-rozkvitnutej-sakury',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/monika-kompanikova\\:-na-sutoku',
        destination: '/zazite/podujatia/monika-kompanikova-na-sutoku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/gustav-murin\\:-v-tieni-cernobyla',
        destination: '/zazite/podujatia/gustav-murin-v-tieni-cernobyla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/5-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/5-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miriam-virsinska,-peter-podolan\\:-slovenske-dejiny-iii',
        destination: '/zazite/podujatia/miriam-virsinska-peter-podolan-slovenske-dejiny-iii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci---podujatie-zrusene',
        destination: '/zazite/podujatia/knihoplavci-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/alnis-staklelt,-utulok-shelter',
        destination: '/zazite/podujatia/alnis-staklelt-utulok-shelter',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/den-martina-razusa-v-bratislave\\:-hoj,-zem-draha',
        destination: '/zazite/podujatia/den-martina-razusa-v-bratislave-hoj-zem-draha',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/b.-dvorakova-hatrakova\\:-tatove-odkryte-dejiny',
        destination: '/zazite/podujatia/b-dvorakova-hatrakova-tatove-odkryte-dejiny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/dana-podracka\\:-kubus--jan-zambor\\:-dom-plny-nevidetelnych',
        destination: '/zazite/podujatia/dana-podracka-kubus-jan-zambor-dom-plny-nevidetelnych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-zivocichy-a-rastliny,-ktore-„menili-svet“',
        destination: '/zazite/podujatia/zivocichy-a-rastliny-ktore-menili-svet-2',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/70.-vyrocie-navratu-slovakov-z-bulharska-do-csr',
        destination: '/zazite/podujatia/70-vyrocie-navratu-slovakov-z-bulharska-do-csr',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/juraj-sebo\\:-nevsedne-myslienky',
        destination: '/zazite/podujatia/juraj-sebo-nevsedne-myslienky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rumunske-rozpravania---rady,-rizika,-romantika',
        destination: '/zazite/podujatia/rumunske-rozpravania-rady-rizika-romantika',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/ako-prezit-v-krajine-buducnosti-a-zakazov-(cestopis-o-singapure)',
        destination:
          '/zazite/podujatia/ako-prezit-v-krajine-buducnosti-a-zakazov-cestopis-o-singapure',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/beseda-so-zuzanou-kronerovou---podujatie-zrusene',
        destination: '/zazite/podujatia/beseda-so-zuzanou-kronerovou-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/cary-a-vestby--cim-zila-slovenska-rodina',
        destination: '/zazite/podujatia/cary-a-vestby-cim-zila-slovenska-rodina',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rastislav-pisko\\:-stano-radic-–-majster-nenapadnej-pointy',
        destination: '/zazite/podujatia/rastislav-pisko-stano-radic-majster-nenapadnej-pointy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/www.facebrak.com',
        destination: '/zazite/podujatia/www-facebrak-com',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kviz-o-literature,-s-ktorou-si-oddychnete',
        destination: '/zazite/podujatia/kviz-o-literature-s-ktorou-si-oddychnete',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/anton-srholec---pozor-zmena\\:-podujatie-zacina-o-18:00,-nie-o-17:00',
        destination:
          '/zazite/podujatia/anton-srholec-pozor-zmena-podujatie-zacina-o-18-00-nie-o-17-00',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/oh,-hi-adam-podujatie-je-zrusene!',
        destination: '/zazite/podujatia/oh-hi-adam-podujatie-je-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-z-nekonecnej-zeme-zrusene',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-z-nekonecnej-zeme-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zelene-popoludnie-13-6',
        destination: '/zazite/podujatia/zelene-popoludnie-13-6',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/den-otvorenych-dveri-v-oddeleni-pre-nevidiacich-a-slabozrakych',
        destination:
          '/zazite/podujatia/den-otvorenych-dveri-v-oddeleni-pre-nevidiacich-a-slabozrakych-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-z-lekarne',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-z-lekarne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pribeh-jedneho-domu\\:-rodina-ullmannova',
        destination: '/zazite/podujatia/pribeh-jedneho-domu-rodina-ullmannova',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/roald-dahl\\:-hastrosovci',
        destination: '/zazite/podujatia/roald-dahl-hastrosovci',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/emilia-vasaryova\\:-pr(a)va-dama',
        destination: '/zazite/podujatia/emilia-vasaryova-pr-a-va-dama',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/prisery-z-praveku-ii.',
        destination: '/zazite/podujatia/prisery-z-praveku-ii',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/literarne-mosty-slovensko-–-srbsko',
        destination: '/zazite/podujatia/literarne-mosty-slovensko-srbsko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Pripravte-si-motivacny-list',
        destination: '/zazite/podujatia/pripravte-si-motivacny-list',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/napatie,-krimi,-thriller,-detektivky-v-sucasnej-slovenskej-literature',
        destination:
          '/zazite/podujatia/napatie-krimi-thriller-detektivky-v-sucasnej-slovenskej-literature',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/roman-harvan,-robert-pospis\\:-ukazujes-do-tmy,-vidim-svetlo',
        destination: '/zazite/podujatia/roman-harvan-robert-pospis-ukazujes-do-tmy-vidim-svetlo',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/jana-hirnerova,-marian-vredik\\:-za-zatvorenymi-vieckami-su-oci-stale-otvorene',
        destination:
          '/zazite/podujatia/jana-hirnerova-marian-vredik-za-zatvorenymi-vieckami-su-oci-stale-otvorene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-baluchova\\:-kapitan-padak-(straty-a-nalezy)',
        destination: '/zazite/podujatia/kristina-baluchova-kapitan-padak-straty-a-nalezy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jeden-z-nadlackych-fenomenov---stefan-doval',
        destination: '/zazite/podujatia/jeden-z-nadlackych-fenomenov-stefan-doval',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/beseda---po-kine-pre-nevidiacich-a-slabozrakych',
        destination: '/zazite/podujatia/beseda-po-kine-pre-nevidiacich-a-slabozrakych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tunde-lengyelova,-geza-palffy\\:-korunovacie-a-pohreby',
        destination: '/zazite/podujatia/tunde-lengyelova-geza-palffy-korunovacie-a-pohreby',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislava---moje-mesto-2017\\:-slavnostne-vyhlasenie-vitazov',
        destination: '/zazite/podujatia/bratislava-moje-mesto-2017-slavnostne-vyhlasenie-vitazov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maros-m.-bancej\\:-opici-cirkus',
        destination: '/zazite/podujatia/maros-m-bancej-opici-cirkus',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-z-perloveho-ostrova-online',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-z-perloveho-ostrova-online',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michal-hustaty,-eva-skrovinova\\:-ch---vernisaz',
        destination: '/zazite/podujatia/michal-hustaty-eva-skrovinova-ch-vernisaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-horrorozpravky-zo-zahrobia-online',
        destination: '/zazite/podujatia/knihoplavci-horrorozpravky-zo-zahrobia-online',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pomimo\\:-sedem-hriechov',
        destination: '/zazite/podujatia/pomimo-sedem-hriechov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-zuzana-horvathova\\:-rodinne-pribehy',
        destination: '/zazite/podujatia/1-zuzana-horvathova-rodinne-pribehy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/barbora-kardosova\\:-traja-kamosi-a-fakticky-fantasticky-bunker',
        destination:
          '/zazite/podujatia/barbora-kardosova-traja-kamosi-a-fakticky-fantasticky-bunker',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/emil-babin\\:-pil-na-sekeru',
        destination: '/zazite/podujatia/emil-babin-pil-na-sekeru',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamäti-registrácia',
        destination: '/zazite/podujatia/trening-pam-ti-registr-cia',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/katarina-aulitisova\\:-pribehy-z-konca-predmestia---babicka-z-vajicka',
        destination:
          '/zazite/podujatia/katarina-aulitisova-pribehy-z-konca-predmestia-babicka-z-vajicka',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/tri-podoby-slobody...-folk-talk-alebo-neobycajne-o-obycajnych-veciach',
        destination:
          '/zazite/podujatia/tri-podoby-slobody-folk-talk-alebo-neobycajne-o-obycajnych-veciach',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/2-gabriella-parcova,-marcello-argilli\\:-srofikove-dobrodruzstva',
        destination:
          '/zazite/podujatia/2-gabriella-parcova-marcello-argilli-srofikove-dobrodruzstva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/perlicky-na-slniecku-lutujeme,-ale-podujatie-je-zrusene',
        destination: '/zazite/podujatia/perlicky-na-slniecku-lutujeme-ale-podujatie-je-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Branislav-Jobus-Ja-nic-ja-muzikant',
        destination: '/zazite/podujatia/branislav-jobus-ja-nic-ja-muzikant',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/3-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stare,-ale-jare\\:-five-gentlemen-a-jaroslav-rozsival',
        destination: '/zazite/podujatia/stare-ale-jare-five-gentlemen-a-jaroslav-rozsival',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-lucia-horvatova\\:-invisible-insights',
        destination: '/zazite/podujatia/1-lucia-horvatova-invisible-insights',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/silne-reci-u-cerveneho-raka',
        destination: '/zazite/podujatia/silne-reci-u-cerveneho-raka-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/v-krajine-maleho-princa',
        destination: '/zazite/podujatia/v-krajine-maleho-princa-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/moj-dedko-je-ceresna',
        destination: '/zazite/podujatia/moj-dedko-je-ceresna-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zvieracie-kuriozity-ii\\:-spravanie',
        destination: '/zazite/podujatia/zvieracie-kuriozity-ii-spravanie-2',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erika-miklosova\\:-majstrovstva-za-dverami-galerie',
        destination: '/zazite/podujatia/erika-miklosova-majstrovstva-za-dverami-galerie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zazite/podujatie/jan-m-bahna-tomas-berka-vily-nad-hradom',
        destination: '/zazite/podujatia/zazite-podujatie-jan-m-bahna-tomas-berka-vily-nad-hradom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-jana-ilkova\\:-family-album',
        destination: '/zazite/podujatia/1-jana-ilkova-family-album',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-kolektiv-podla-f.-durrenmatta\\:-romulus-v.',
        destination: '/zazite/podujatia/1-kolektiv-podla-f-durrenmatta-romulus-v',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miramundo---world-music-from-brazil-zmena!!!',
        destination: '/zazite/podujatia/miramundo-world-music-from-brazil-zmena',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-bratia.-a-sestry',
        destination: '/zazite/podujatia/1-bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-ivan-szabo\\:-presporsko-bratislavske-strasidla',
        destination: '/zazite/podujatia/1-ivan-szabo-presporsko-bratislavske-strasidla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-poetry-opposite-(poezia-opaku)',
        destination: '/zazite/podujatia/1-poetry-opposite-poezia-opaku',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Katarina-Kerekesova-Katarina-Molakova-Alexandra-Salmela-Mimi-a-Liza',
        destination:
          '/zazite/podujatia/katarina-kerekesova-katarina-molakova-alexandra-salmela-mimi-a-liza',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata\\:-milan-labuda\\:-zivi-proti-zivym',
        destination: '/zazite/podujatia/vlcata-milan-labuda-zivi-proti-zivym',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-michaela-thanova\\:-blaznovstvo',
        destination: '/zazite/podujatia/1-michaela-thanova-blaznovstvo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-seria-citani-detom\\:-rozpravky-z-ukradnutej-zeme',
        destination: '/zazite/podujatia/knihoplavci-seria-citani-detom-rozpravky-z-ukradnutej-zeme',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/posavje---znesitelna-lahkost-bytia-medzi-slovincami',
        destination: '/zazite/podujatia/posavje-znesitelna-lahkost-bytia-medzi-slovincami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/m.-musilova,-l.-lackovicova\\:-zena-z-marsu',
        destination: '/zazite/podujatia/m-musilova-l-lackovicova-zena-z-marsu',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/leonardove-cisla\\:-cesta-do-minulosti-matematiky,-astronomie-a-umenia',
        destination:
          '/zazite/podujatia/leonardove-cisla-cesta-do-minulosti-matematiky-astronomie-a-umenia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Michal-Czinege-Rekonstrukcie',
        destination: '/zazite/podujatia/michal-czinege-rekonstrukcie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Faktor-Merde',
        destination: '/zazite/podujatia/faktor-merde',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martina-simkovicova\\:-mimoriadne',
        destination: '/zazite/podujatia/martina-simkovicova-mimoriadne',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/stefan-patrik-kovac,-marian-meciar',
        destination: '/zazite/podujatia/stefan-patrik-kovac-marian-meciar',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miroslav-saniga\\:-rozpravky-prababicky-prirody',
        destination: '/zazite/podujatia/miroslav-saniga-rozpravky-prababicky-prirody',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pozor-!-vystava',
        destination: '/zazite/podujatia/pozor-vystava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slovenska-poezia-v-podani-polskej-pesnickarky-issy-conar.',
        destination: '/zazite/podujatia/slovenska-poezia-v-podani-polskej-pesnickarky-issy-conar',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/milan-rufus\\:-pramen;-studna;-dielo-v-martin-rodan\\:-nasa-neznama-europska-kultura',
        destination:
          '/zazite/podujatia/milan-rufus-pramen-studna-dielo-v-martin-rodan-nasa-neznama-europska-kultura',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/robo-pospis\\:-v-tichu',
        destination: '/zazite/podujatia/robo-pospis-v-tichu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-kristufek\\:-tela-podujatie-zrusene!',
        destination: '/zazite/podujatia/peter-kristufek-tela-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lubo-burgr\\:-za-nasim-blokom,-daniel-majling\\:-zona',
        destination: '/zazite/podujatia/lubo-burgr-za-nasim-blokom-daniel-majling-zona',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-ludmila-machova\\:-kde-slnko-nezapada-a-trava-je-stale-zelena',
        destination:
          '/zazite/podujatia/1-ludmila-machova-kde-slnko-nezapada-a-trava-je-stale-zelena',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zeleny-workshop-pre-deti-eko',
        destination: '/zazite/podujatia/zeleny-workshop-pre-deti-eko-zahrada-babky-klary',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/renata-pinterova\\:-metafluids-–-splash-–-e-xotik',
        destination: '/zazite/podujatia/renata-pinterova-metafluids-splash-e-xotik',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vianoce---vystava-detskych-prac',
        destination: '/zazite/podujatia/vianoce-vystava-detskych-prac',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/anita-bartos\\:-vidiet-zivot-v-kolazach',
        destination: '/zazite/podujatia/anita-bartos-vidiet-zivot-v-kolazach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/eva-umlauf\\:-cislo-na-tvojom-predlakti-je-modre-ako-tvoje-oci',
        destination:
          '/zazite/podujatia/eva-umlauf-cislo-na-tvojom-predlakti-je-modre-ako-tvoje-oci',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pomimo\\:-ritual',
        destination: '/zazite/podujatia/pomimo-ritual-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-bratislava,-moje-mesto---vystava',
        destination: '/zazite/podujatia/1-bratislava-moje-mesto-vystava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tie,-na-ktore-sme-cakali',
        destination: '/zazite/podujatia/tie-na-ktore-sme-cakali',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/karimunjawa---tropicke-ostrovy,-kde-sa-lahko-zabuda-na-cas',
        destination: '/zazite/podujatia/karimunjawa-tropicke-ostrovy-kde-sa-lahko-zabuda-na-cas',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kreativne-popoludnie-pre-všetky-deti-12-5-22',
        destination: '/zazite/podujatia/kreativne-popoludnie-pre-v-etky-deti-12-5-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kreativne-popoludnie-pre-všetky-deti-26-5-22',
        destination: '/zazite/podujatia/kreativne-popoludnie-pre-v-etky-deti-26-5-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kreativne-popoludnie-pre-všetky-deti-5-5-22',
        destination: '/zazite/podujatia/kreativne-popoludnie-pre-v-etky-deti-5-5-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/peter-toth\\:-kauza-cervanova',
        destination: '/zazite/podujatia/peter-toth-kauza-cervanova',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme-po-anglicky-13-12-22',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-13-12-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Nakupujeme-ekologicky',
        destination: '/zazite/podujatia/nakupujeme-ekologicky',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/veda-a-umenie-videnia-a-vnimania...-sucasny-pohlad-na-umelecke-kompozicie',
        destination:
          '/zazite/podujatia/veda-a-umenie-videnia-a-vnimania-sucasny-pohlad-na-umelecke-kompozicie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/diana-cizmarova\\:-gps-antropocenu',
        destination: '/zazite/podujatia/diana-cizmarova-gps-antropocenu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Muzikoterapia-alebo-ked-hudba-lieci',
        destination: '/zazite/podujatia/muzikoterapia-alebo-ked-hudba-lieci',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme-po-anglicky',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/opera-nas-zabava\\:-carovna-flauta',
        destination: '/zazite/podujatia/opera-nas-zabava-carovna-flauta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Havran',
        destination: '/zazite/podujatia/havran',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-animaky-pre-deti--Мультфільми-для-дітей',
        destination: '/zazite/podujatia/1-animaky-pre-deti-',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-ako-funguje-zem\\:-trhanie-kontinentov-a-skutocne-atlantidy',
        destination: '/zazite/podujatia/1-ako-funguje-zem-trhanie-kontinentov-a-skutocne-atlantidy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-andy-pheby\\:-on-the-freakshow',
        destination: '/zazite/podujatia/1-andy-pheby-on-the-freakshow',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Sol-nad-zlato-interaktivne-citanie-a-vystava',
        destination: '/zazite/podujatia/sol-nad-zlato-interaktivne-citanie-a-vystava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-michalek,-katarina-nadaska\\:-v-choci-je-naisto-cosi',
        destination: '/zazite/podujatia/jan-michalek-katarina-nadaska-v-choci-je-naisto-cosi',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Svet-zblizka',
        destination: '/zazite/podujatia/svet-zblizka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Alzbeta-Verespejova-Neplechy-skolnicky-Agnese',
        destination: '/zazite/podujatia/alzbeta-verespejova-neplechy-skolnicky-agnese',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Bohdan-Telgarsky-Cerveny-kriz-na-Slovensku-v-rokoch-1989-1992-Miroslav-Danaj-Ratanie-ran',
        destination:
          '/zazite/podujatia/bohdan-telgarsky-cerveny-kriz-na-slovensku-v-rokoch-1989-1992-miroslav-danaj-ratanie-ran',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Den-otvorenych-dveri-v-Oddeleni-pre-nevidiacich-a-slabozrakych',
        destination:
          '/zazite/podujatia/den-otvorenych-dveri-v-oddeleni-pre-nevidiacich-a-slabozrakych',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/Istvan-Bielik-Fotografie-z-Maidanu-vernisaz-v-ramci-Mesiaca-fotografie-2014',
        destination:
          '/zazite/podujatia/istvan-bielik-fotografie-z-maidanu-vernisaz-v-ramci-mesiaca-fotografie-2014',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jan-Radomil-Kvacal',
        destination: '/zazite/podujatia/jan-radomil-kvacal',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Sylvia-Bystricanova-Stastie-prislo-v-sobotu',
        destination: '/zazite/podujatia/sylvia-bystricanova-stastie-prislo-v-sobotu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Otvorenie-letnej-citarne-U-cerveneho-raka',
        destination: '/zazite/podujatia/otvorenie-letnej-citarne-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Vecer-plazovej-literatury-Karin-a-Jebi-ga',
        destination: '/zazite/podujatia/vecer-plazovej-literatury-karin-a-jebi-ga',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub-deti-a-mladeze\\:-zaciname-sami-citat',
        destination: '/zazite/podujatia/citatelsky-klub-deti-a-mladeze-zaciname-sami-citat',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/brano-jobus\\:-ja-nic,-ja-muzikant',
        destination: '/zazite/podujatia/brano-jobus-ja-nic-ja-muzikant',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratislava,-moje-mesto',
        destination: '/zazite/podujatia/bratislava-moje-mesto',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/workshop-s-ilustrátorom-Petrom-Horackom',
        destination: '/zazite/podujatia/workshop-s-ilustr-torom-petrom-horackom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Jan-Gerci-cabiansky-rodak',
        destination: '/zazite/podujatia/jan-gerci-cabiansky-rodak',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ocami-okoloiduceho---plagaty-bab',
        destination: '/zazite/podujatia/ocami-okoloiduceho-plagaty-bab',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme-po-anglicky-31-5',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-31-5',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milan-kalis\\:-kupil-som-si-bodrel',
        destination: '/zazite/podujatia/milan-kalis-kupil-som-si-bodrel',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Pavel-Ondrus-1919-1980',
        destination: '/zazite/podujatia/pavel-ondrus-1919-1980',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Letne-folkovanie-2',
        destination: '/zazite/podujatia/letne-folkovanie-2',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-mesiac-fotografie-2016---dusan-kochol\\:-autoportret-s-kladivom-zvestovania',
        destination:
          '/zazite/podujatia/1-mesiac-fotografie-2016-dusan-kochol-autoportret-s-kladivom-zvestovania',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-martin-kotucek\\:-j.k.huysmans_naopak-(babky,-nadbabky,-rekvizity)',
        destination:
          '/zazite/podujatia/1-martin-kotucek-j-k-huysmans-naopak-babky-nadbabky-rekvizity',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michal-hustaty,-eva-skrovinova\\:-ch',
        destination: '/zazite/podujatia/michal-hustaty-eva-skrovinova-ch',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/oddelenie-pre-nevidiacich-a-slabozrakych\\:-den-otvorenych-dveri',
        destination:
          '/zazite/podujatia/oddelenie-pre-nevidiacich-a-slabozrakych-den-otvorenych-dveri',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Magicka-sila-bylin',
        destination: '/zazite/podujatia/magicka-sila-bylin',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/david-ursiny\\:-strom-zivota\\:-rozpravky-velkej-amazonie.-marian-hatala\\:-sviatocne-obycajne-dni',
        destination:
          '/zazite/podujatia/david-ursiny-strom-zivota-rozpravky-velkej-amazonie-marian-hatala-sviatocne-obycajne-dni',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-jana-hirnerova,-marian-vredik\\:-za-zatvorenymi-vieckami-su-oci-stale-otvorene',
        destination:
          '/zazite/podujatia/1-jana-hirnerova-marian-vredik-za-zatvorenymi-vieckami-su-oci-stale-otvorene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/gyula-sopronyi\\:-plavajuci-aspekt--floating-aspect',
        destination: '/zazite/podujatia/gyula-sopronyi-plavajuci-aspekt-floating-aspect',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Utiste-svetlo-rozsviette-slova',
        destination: '/zazite/podujatia/utiste-svetlo-rozsviette-slova',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milan-pavlik\\:-zaklady-financneho-zdravia',
        destination: '/zazite/podujatia/milan-pavlik-zaklady-financneho-zdravia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zelene-popoludnie\\:-vymena-rastlin,-rad-a-skusenosti',
        destination: '/zazite/podujatia/zelene-popoludnie-vymena-rastlin-rad-a-skusenosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-citanie-na-zastavke-(na-kapucinskej)',
        destination: '/zazite/podujatia/2-citanie-na-zastavke-na-kapucinskej',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/hudobno-literarne-soiree\\:-usvit-snov',
        destination: '/zazite/podujatia/hudobno-literarne-soiree-usvit-snov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erik-ondrejicka\\:-volanie',
        destination: '/zazite/podujatia/erik-ondrejicka-volanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-diana-cizmarova\\:-ekotopia',
        destination: '/zazite/podujatia/1-diana-cizmarova-ekotopia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/talianske-tulacky-a-tajomstva---podujatie-zrusene',
        destination: '/zazite/podujatia/talianske-tulacky-a-tajomstva-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michaela-suranska---myty-a-nehody',
        destination: '/zazite/podujatia/michaela-suranska-myty-a-nehody',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Slovencina-pre-Ukrajincov',
        destination: '/zazite/podujatia/slovencina-pre-ukrajincov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-posledna-aristokratka',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-posledna-aristokratka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-martin-vanek\\:-opera-nehryzie',
        destination: '/zazite/podujatia/1-martin-vanek-opera-nehryzie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ivana-ecetova-quartet.-koncert',
        destination: '/zazite/podujatia/ivana-ecetova-quartet-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/trening-pamati-(obsadeny)---podujatie-zrusene',
        destination: '/zazite/podujatia/trening-pamati-obsadeny-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bears-don´t-read-(medvede-necitaju)',
        destination: '/zazite/podujatia/bears-don-t-read-medvede-necitaju',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vitanie-prvacikov-zrusene!',
        destination: '/zazite/podujatia/vitanie-prvacikov-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/strom,-ktory-dava',
        destination: '/zazite/podujatia/strom-ktory-dava',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-obchod-na-korze---podujatie-zrusene',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-obchod-na-korze-podujatie-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-hodon,-dasa-ciripova,-peter-tilajcik\\:-eva',
        destination: '/zazite/podujatia/martin-hodon-dasa-ciripova-peter-tilajcik-eva',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-–-rozpravky-jednej-bosorky',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-jednej-bosorky',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/katarina-nadaska,-jan-michalek\\:-certi,-bosorky-a-ine-strasidla',
        destination:
          '/zazite/podujatia/katarina-nadaska-jan-michalek-certi-bosorky-a-ine-strasidla',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/marianna-brinzova,-klaudia-korbelicova\\:-horizontaly-vertikal',
        destination: '/zazite/podujatia/marianna-brinzova-klaudia-korbelicova-horizontaly-vertikal',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milan-richter\\:-storocie,-krute-storocie,-nadhera-a-bolest',
        destination: '/zazite/podujatia/milan-richter-storocie-krute-storocie-nadhera-a-bolest',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-bella-a-sebastian',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-bella-a-sebastian',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/divadlo-m.\\:-hodon-a-kolektiv\\:-negativ_egotrip',
        destination: '/zazite/podujatia/divadlo-m-hodon-a-kolektiv-negativ-egotrip',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/konferencia-k-70.-vyrociu-prichodu-slovakov-z-bulharska',
        destination: '/zazite/podujatia/konferencia-k-70-vyrociu-prichodu-slovakov-z-bulharska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-nezname-rozpravky-znamych-bratov',
        destination: '/zazite/podujatia/knihoplavci-nezname-rozpravky-znamych-bratov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/karel-klatt\\:-kvet-se-vetrem-uklani-vcelam',
        destination: '/zazite/podujatia/karel-klatt-kvet-se-vetrem-uklani-vcelam',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-bratia.-a-sestry',
        destination: '/zazite/podujatia/3-bratia-a-sestry',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/mesiac-fotografie-2016---dusan-kochol\\:-autoportret-s-kladivom-zvestovania',
        destination:
          '/zazite/podujatia/mesiac-fotografie-2016-dusan-kochol-autoportret-s-kladivom-zvestovania',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/oh,-hi-adam',
        destination: '/zazite/podujatia/oh-hi-adam',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata.-emil-topercer\\:-sondy-do-sukromia-prirody',
        destination: '/zazite/podujatia/vlcata-emil-topercer-sondy-do-sukromia-prirody',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/velky-knizny-kviz\\:-5-knih,-5-otazok,-5-vyhier',
        destination: '/zazite/podujatia/velky-knizny-kviz-5-knih-5-otazok-5-vyhier',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-baluchova\\:-kapitan-padak-a-lietajuce-auto',
        destination: '/zazite/podujatia/kristina-baluchova-kapitan-padak-a-lietajuce-auto',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rachel-noa\\:-havran-v-kavomate',
        destination: '/zazite/podujatia/rachel-noa-havran-v-kavomate',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-zaciname!',
        destination: '/zazite/podujatia/citatelsky-klub-zaciname',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/albansko---bunkre,-baziny-a-bujarost',
        destination: '/zazite/podujatia/albansko-bunkre-baziny-a-bujarost',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/robert-pospis,-martin-sillay\\:-doba.-koncert.',
        destination: '/zazite/podujatia/robert-pospis-martin-sillay-doba-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tolstoys.-koncert',
        destination: '/zazite/podujatia/tolstoys-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/queer-jane.-koncert',
        destination: '/zazite/podujatia/queer-jane-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/rytier-bez-kona---jubilant-milan-richter',
        destination: '/zazite/podujatia/rytier-bez-kona-jubilant-milan-richter',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tyzden-mozgu\\:-trening-pamati-online',
        destination: '/zazite/podujatia/tyzden-mozgu-trening-pamati-online',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/irena-brezna\\:-postrehy-emigrantky',
        destination: '/zazite/podujatia/irena-brezna-postrehy-emigrantky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-johny-petko\\:-demon-chlast',
        destination: '/zazite/podujatia/jan-johny-petko-demon-chlast',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/spovedanie-(zo-snov)',
        destination: '/zazite/podujatia/spovedanie-zo-snov',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/o-slimacikovi-filipkovi,-trpaslickovi-imriskovi-a-neposednom-dienku',
        destination:
          '/zazite/podujatia/o-slimacikovi-filipkovi-trpaslickovi-imriskovi-a-neposednom-dienku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-milcak\\:-levocske-povesti,-juraj-sebesta\\:-bajky',
        destination: '/zazite/podujatia/jan-milcak-levocske-povesti-juraj-sebesta-bajky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/sona-hornakova\\:-medzi-mnou-a-mnou',
        destination: '/zazite/podujatia/sona-hornakova-medzi-mnou-a-mnou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-der-rabe-der-anders-war-(havran-ktory-bol-iny)',
        destination: '/zazite/podujatia/1-der-rabe-der-anders-war-havran-ktory-bol-iny',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-inka-vybohova\\:-phabulous-phobias',
        destination: '/zazite/podujatia/1-inka-vybohova-phabulous-phobias',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-kino-u-cerveneho-raka\\:-dokumentarny-film',
        destination: '/zazite/podujatia/1-kino-u-cerveneho-raka-dokumentarny-film',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-patrik-garay\\:-hladanie',
        destination: '/zazite/podujatia/1-patrik-garay-hladanie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-monika-oremusova\\:-cesta-cielom',
        destination: '/zazite/podujatia/1-monika-oremusova-cesta-cielom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/lukas-freytag\\:-od-znaku-k-celku',
        destination: '/zazite/podujatia/lukas-freytag-od-znaku-k-celku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/space-recorder.-koncert',
        destination: '/zazite/podujatia/space-recorder-koncert',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/1-pribeh-jedneho-domu-–-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        destination:
          '/zazite/podujatia/1-pribeh-jedneho-domu-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/literarny-kviz-s-dadom-nagyom-(a-silvia-speaks-ako-hudobny-host)',
        destination:
          '/zazite/podujatia/literarny-kviz-s-dadom-nagyom-a-silvia-speaks-ako-hudobny-host',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mirka-abelova\\:-basnicky-pre-domace-panicky',
        destination: '/zazite/podujatia/mirka-abelova-basnicky-pre-domace-panicky',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/svet-medzi-riadkami-i.',
        destination: '/zazite/podujatia/svet-medzi-riadkami-i',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/knihoplavci---seria-citani-detom\\:-rozpravky-zo-studeneho-severu',
        destination:
          '/zazite/podujatia/knihoplavci-seria-citani-detom-rozpravky-zo-studeneho-severu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Marketa-Novakova-Ingredience',
        destination: '/zazite/podujatia/marketa-novakova-ingredience',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/martin-kucera\\:-laska-k-mudrosti',
        destination: '/zazite/podujatia/martin-kucera-laska-k-mudrosti',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/daniela-dvorakova-a-kolektiv\\:-clovek-a-svet-zvierat-v-stredoveku',
        destination:
          '/zazite/podujatia/daniela-dvorakova-a-kolektiv-clovek-a-svet-zvierat-v-stredoveku',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-z-ciernej-afriky',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-z-ciernej-afriky',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/historicky-kviz-pri-prilezitosti-119.-vyrocia-vzniku-mestskej-kniznice',
        destination:
          '/zazite/podujatia/historicky-kviz-pri-prilezitosti-119-vyrocia-vzniku-mestskej-kniznice',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/SARRO',
        destination: '/zazite/podujatia/sarro',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kristina-minarickova\\:-waiting-for...-cakanie-na...',
        destination: '/zazite/podujatia/kristina-minarickova-waiting-for-cakanie-na',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Milos-Karasek-Cicmany-proti-srsti',
        destination: '/zazite/podujatia/milos-karasek-cicmany-proti-srsti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/afonso-cruz\\:-maliar-pod-kuchynskym-drezom',
        destination: '/zazite/podujatia/afonso-cruz-maliar-pod-kuchynskym-drezom',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/monika-kapralikova\\:-za-hranice-provincie',
        destination: '/zazite/podujatia/monika-kapralikova-za-hranice-provincie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/eva-maliti-franova\\:-kustodiarianina-kniha',
        destination: '/zazite/podujatia/eva-maliti-franova-kustodiarianina-kniha',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/autorske-citanie-antona-balaza\\:-povedat-slova-ciste',
        destination: '/zazite/podujatia/autorske-citanie-antona-balaza-povedat-slova-ciste',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ivan-dudas\\:-centralny-register-umeleckej-cinnosti',
        destination: '/zazite/podujatia/ivan-dudas-centralny-register-umeleckej-cinnosti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/',
        destination: '/zazite/podujatia/knihoplavci-27-10',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Konverzujme-po-anglicky-20-12-22',
        destination: '/zazite/podujatia/konverzujme-po-anglicky-20-12-22',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Stare-a-nove',
        destination: '/zazite/podujatia/stare-a-nove',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-sipӧcz\\:-volne-dni',
        destination: '/zazite/podujatia/jan-sip-cz-volne-dni',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/ivana-kvetanova,-margareta-musilova\\:-veduta-bratislavy-vo-florencii.-miroslav-musil\\:-m.-r.-stefanik-a-vznik-cesko-slovenska-v-dokumentoch-piatich-kontinentov.',
        destination:
          '/zazite/podujatia/ivana-kvetanova-margareta-musilova-veduta-bratislavy-vo-florencii-miroslav-musil-m-r-stefanik-a-vznik-cesko-slovenska-v-dokumentoch-piatich-kontinentov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-erika-miklosova\\:-majstrovstva-za-dverami-galerie',
        destination: '/zazite/podujatia/1-erika-miklosova-majstrovstva-za-dverami-galerie',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bessa-illustration\\:-life-is-juicy!-vernisaz',
        destination: '/zazite/podujatia/bessa-illustration-life-is-juicy-vernisaz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/adela-rezna\\:-knizna-ilustracia',
        destination: '/zazite/podujatia/adela-rezna-knizna-ilustracia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-vyzva-miesta-mojho-mesta',
        destination: '/zazite/podujatia/knihoplavci-vyzva-miesta-mojho-mesta',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/beseda-s-koproducentkami-filmu-posledna-aristokratka-len-online!',
        destination:
          '/zazite/podujatia/beseda-s-koproducentkami-filmu-posledna-aristokratka-len-online',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milan-kalis\\:-hviezdy,-ktore-sme-znicili',
        destination: '/zazite/podujatia/milan-kalis-hviezdy-ktore-sme-znicili',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zborci-–-koncert-podujatie-je-zrusene!',
        destination: '/zazite/podujatia/zborci-koncert-podujatie-je-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citatelsky-klub\\:-to-najlepsie-z-non-fiction-2021',
        destination: '/zazite/podujatia/citatelsky-klub-to-najlepsie-z-non-fiction-2021',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vernisaz-vystavy-gabriela-birosova\\:-pisaci-st(roj)',
        destination: '/zazite/podujatia/vernisaz-vystavy-gabriela-birosova-pisaci-st-roj',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/spiaci-aj-soptiaci---vulkanicki-velikani',
        destination: '/zazite/podujatia/spiaci-aj-soptiaci-vulkanicki-velikani',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-pre-nevidiacich\\:-posledna-aristokratka-len-online-!',
        destination: '/zazite/podujatia/kino-pre-nevidiacich-posledna-aristokratka-len-online-',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/2-pribeh-jedneho-domu-–-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        destination:
          '/zazite/podujatia/2-pribeh-jedneho-domu-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/software-testing-beer-vol.-8',
        destination: '/zazite/podujatia/software-testing-beer-vol-8',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Krv-prvorodenych-Kapitan-Stein-a-notar-Barbaric',
        destination: '/zazite/podujatia/krv-prvorodenych-kapitan-stein-a-notar-barbaric',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/finalisti-ceny-anasoft-litera\\:-etela-farkasova-a-dusan-vicen',
        destination:
          '/zazite/podujatia/finalisti-ceny-anasoft-litera-etela-farkasova-a-dusan-vicen',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vyhlasenie-vysledkov-bratislava,-moje-mesto-2019',
        destination: '/zazite/podujatia/vyhlasenie-vysledkov-bratislava-moje-mesto-2019',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci-online\\:-rozpravky,-na-ktore-svietilo-slnko',
        destination: '/zazite/podujatia/knihoplavci-online-rozpravky-na-ktore-svietilo-slnko',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/milena-fucimanova,-etela-farkasova\\:-cesty-(sersum)',
        destination: '/zazite/podujatia/milena-fucimanova-etela-farkasova-cesty-sersum',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/podujatie-zrusene---diskusia-s-autorkami-linou-frankovou-a-danielou-slavik-o-ich-novych-knihach-maj-pekny-den-a-laska-je-laska',
        destination:
          '/zazite/podujatia/podujatie-zrusene-diskusia-s-autorkami-linou-frankovou-a-danielou-slavik-o-ich-novych-knihach-maj-pekny-den-a-laska-je-laska',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erika-miklosova\\:-zatisie-s-draperiami',
        destination: '/zazite/podujatia/erika-miklosova-zatisie-s-draperiami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kafka.-dreaming---z-technickych-pricin-zrusene',
        destination: '/zazite/podujatia/kafka-dreaming-z-technickych-pricin-zrusene',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/festival-jana-smreka-–-pen-poetry-festival-2018',
        destination: '/zazite/podujatia/festival-jana-smreka-pen-poetry-festival-2018',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/3-oh,-hi-adam',
        destination: '/zazite/podujatia/3-oh-hi-adam',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/elektronicke-a-zvukove-knihy-v-knizniciach---seminar-pre-knihovnikov',
        destination:
          '/zazite/podujatia/elektronicke-a-zvukove-knihy-v-knizniciach-seminar-pre-knihovnikov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/inovacie-pre-buducnost-verejnych-kniznic---odborny-seminar',
        destination: '/zazite/podujatia/inovacie-pre-buducnost-verejnych-kniznic-odborny-seminar',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/andrea-ondis\\:-historiae',
        destination: '/zazite/podujatia/andrea-ondis-historiae',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/miesto-m---podujatia',
        destination: '/zazite/podujatia/miesto-m-podujatia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/tomas-cernak,-martin-mocko\\:-husak-v-odboji-a-snp-1938-1945',
        destination: '/zazite/podujatia/tomas-cernak-martin-mocko-husak-v-odboji-a-snp-1938-1945',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ivana-ecetova-trio.-koncert',
        destination: '/zazite/podujatia/ivana-ecetova-trio-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/maros-hecko\\:-dalej-na-zapad-sa-da-ist-len-na-vychod',
        destination: '/zazite/podujatia/maros-hecko-dalej-na-zapad-sa-da-ist-len-na-vychod',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/polajka.-koncert',
        destination: '/zazite/podujatia/polajka-koncert',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ondrej-stefanik\\:-som-paula',
        destination: '/zazite/podujatia/ondrej-stefanik-som-paula',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jan-buzassy\\:-nabrezie',
        destination: '/zazite/podujatia/jan-buzassy-nabrezie',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/od-modrej-k-cervenej,-alebo-ked-pride-koniec-sveta-a-najdem-godota',
        destination:
          '/zazite/podujatia/od-modrej-k-cervenej-alebo-ked-pride-koniec-sveta-a-najdem-godota',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/mark-e.-pocha\\:-kontakt\\:-zahuba-prichadza-z-nebies',
        destination: '/zazite/podujatia/mark-e-pocha-kontakt-zahuba-prichadza-z-nebies',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata.-bohumil-skarka\\:-sest-svetov-ziveho-sveta',
        destination: '/zazite/podujatia/vlcata-bohumil-skarka-sest-svetov-ziveho-sveta',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/2-bratia.-a-sestry',
        destination: '/zazite/podujatia/2-bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/aliza-orlan-venus\\:-fluidita---rodtelo',
        destination: '/zazite/podujatia/aliza-orlan-venus-fluidita-rodtelo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/slavnostne-vyhlasenie-vysledkov-sutaze-bratislava,-moje-mesto',
        destination:
          '/zazite/podujatia/slavnostne-vyhlasenie-vysledkov-sutaze-bratislava-moje-mesto',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/bratia.-a-sestry',
        destination: '/zazite/podujatia/bratia-a-sestry',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/kino-u-cerveneho-raka\\:-experiment-a-videoart',
        destination: '/zazite/podujatia/kino-u-cerveneho-raka-experiment-a-videoart',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/8-vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/8-vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/petronela-krizanova\\:-pribeh-zabudnuteho-knihkupectva.-anton-lowe',
        destination:
          '/zazite/podujatia/petronela-krizanova-pribeh-zabudnuteho-knihkupectva-anton-lowe',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/jozef-medard-slovik\\:-stretnutia-naslepo',
        destination: '/zazite/podujatia/jozef-medard-slovik-stretnutia-naslepo',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-daniella-ferkova\\:-laska-a-ine-poblaznenia',
        destination: '/zazite/podujatia/1-daniella-ferkova-laska-a-ine-poblaznenia',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/listovani.cz-tomas-polacek\\:-stop',
        destination: '/zazite/podujatia/listovani-cz-tomas-polacek-stop',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/michal-hvorecky\\:-trol',
        destination: '/zazite/podujatia/michal-hvorecky-trol',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erik-rothenstein-trio---klezmer-goes-swing',
        destination: '/zazite/podujatia/erik-rothenstein-trio-klezmer-goes-swing',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-citanie-na-zastavke-(na-kapucinskej)',
        destination: '/zazite/podujatia/1-citanie-na-zastavke-na-kapucinskej',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-katarina-janosova\\:-safaladka-a-spajdlicka',
        destination: '/zazite/podujatia/1-katarina-janosova-safaladka-a-spajdlicka',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-seniorfest-v-mestskej-kniznici-v-bratislave\\:-trening-pamati',
        destination:
          '/zazite/podujatia/1-seniorfest-v-mestskej-kniznici-v-bratislave-trening-pamati',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/pribeh-jedneho-domu-–-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        destination:
          '/zazite/podujatia/pribeh-jedneho-domu-zazitkovy-workshop-pre-teenegerov-a-mladych-dospelych',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/erik-ondrejicka\\:-happygramy',
        destination: '/zazite/podujatia/erik-ondrejicka-happygramy',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/etela-farkasova\\:-hodiny-lietania.-milena-fucimanova\\:-hnizda-v-octu',
        destination:
          '/zazite/podujatia/etela-farkasova-hodiny-lietania-milena-fucimanova-hnizda-v-octu',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Tajomstva-najvacsich-zahad-1',
        destination: '/zazite/podujatia/tajomstva-najvacsich-zahad-1',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/najlepsia-slovenska-proza-podla-anasoft-litera-2020-–-online-kviz',
        destination:
          '/zazite/podujatia/najlepsia-slovenska-proza-podla-anasoft-litera-2020-online-kviz',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/pavol-weiss\\:-tajomny-mlyn-v-karpatoch',
        destination: '/zazite/podujatia/pavol-weiss-tajomny-mlyn-v-karpatoch',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/1-peter-barenyi\\:-strach-v-ociach',
        destination: '/zazite/podujatia/1-peter-barenyi-strach-v-ociach',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Lubomir-Longauer-Vyzliekanie-z-kroja',
        destination: '/zazite/podujatia/lubomir-longauer-vyzliekanie-z-kroja',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/knihoplavci\\:-rozpravky-v-slzach-zabudnutych-ladovcov',
        destination: '/zazite/podujatia/knihoplavci-rozpravky-v-slzach-zabudnutych-ladovcov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/ako-citat-(post)kolonialnu-literaturu',
        destination: '/zazite/podujatia/ako-citat-post-kolonialnu-literaturu',
        permanent: true,
      },
      {
        source:
          '/zazite/podujatia/sukromie-a-jeho-ochrana\\:-technologie,-sucasnost-a-totalitne-rezimy',
        destination:
          '/zazite/podujatia/sukromie-a-jeho-ochrana-technologie-sucasnost-a-totalitne-rezimy',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/vlcata-–-prirodovedny-kruzok-pre-deti',
        destination: '/zazite/podujatia/vlcata-prirodovedny-kruzok-pre-deti',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/citanie-s-porozumením-domov',
        destination: '/zazite/podujatia/citanie-s-porozumen-m-domov',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Zlate-prasa',
        destination: '/zazite/podujatia/zlate-prasa',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Za-siedmymi-horami',
        destination: '/zazite/podujatia/za-siedmymi-horami',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Spoznaj-suseda-13-12',
        destination: '/zazite/podujatia/spoznaj-suseda-13-12',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/Inspirovane-príiodou',
        destination: '/zazite/podujatia/inspirovane-pr-iodou',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/zaklady-fotografovania\\:-kompozicia',
        destination: '/zazite/podujatia/zaklady-fotografovania-kompozicia-1',
        permanent: true,
      },
      {
        source: '/zazite/podujatia/6-vlcata-–-prirodovedny-kruzok',
        destination: '/zazite/podujatia/vcata-prirodovedny-kruzok-4',
        permanent: true,
      },
      {
        source: '/en/experience/events/pomimo-ritual',
        destination: '/en/experience/events/pomimo-ritual-2',
        locale: false,
        permanent: true,
      },
      {
        source: '/online-katalog',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/vypozicny-cas',
        destination: '/navstivte/ostatne/otvaracie-hodiny',
        permanent: true,
      },
      {
        source: '/kontakty',
        destination: '/o-nas/kontakty',
        permanent: true,
      },
      {
        source: '/e-knihy-ereading',
        destination: '/sluzby/citanie/e-knihy-a-e-casopisy',
        permanent: true,
      },
      {
        source: '/oznamy',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/registracia-citatela',
        destination: '/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
        permanent: true,
      },
      {
        source: '/aktualne-podujatia',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/poplatky',
        destination: '/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
        permanent: true,
      },
      {
        source: '/usek-krasnej-a-cudzojazycnej-literatury',
        destination: '/navstivte/laurinska',
        permanent: true,
      },
      {
        source: '/usek-literatury-pre-deti-a-mladez',
        destination: '/navstivte/kapucinska',
        permanent: true,
      },
      {
        source: '/2-letny-vypozicny-cas',
        destination: '/navstivte/ostatne/otvaracie-hodiny',
        permanent: true,
      },
      {
        source: '/pracoviska-kniznice',
        destination: '/navstivte/nase-lokality',
        permanent: true,
      },
      {
        source: '/11-trening-pamati',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/letna-citaren-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      { source: '/o-kniznici', destination: '/o-nas/vizia', permanent: true },
      {
        source: '/kniznica-je-od-25.-11.-zatvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/cyklodonaska-pre-vsetkych',
        destination: '/sluzby/citanie/cyklodonaska',
        permanent: true,
      },
      {
        source: '/elektronicka-prihlaska',
        destination: '/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
        permanent: true,
      },
      {
        source: '/databazy-a-bezplatne-e-zdroje',
        destination: '/sluzby/citanie/e-knihy-a-e-casopisy',
        permanent: true,
      },
      {
        source: '/usek-naucnej-literatury-–-oddelenie-odbornej-literatury',
        destination: '/navstivte/klariska',
        permanent: true,
      },
      {
        source: '/spytajte-sa-kniznice',
        destination: '/sluzby/dalsie-informacie/napiste-nam',
        permanent: true,
      },
      {
        source: '/the-bratislava-city-library',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/podujatia-a-vystavy',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/7-bratislavska-burza-knih',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/kniharska-dielna',
        destination: '/nastroje/kniharska-dielna',
        permanent: true,
      },
      {
        source: '/burza-platni',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/3-kniznica-je-otvorena',
        destination: '/navstivte/ostatne/otvaracie-hodiny',
        permanent: true,
      },
      {
        source: '/verejne-kniznice-v-bratislave',
        destination: '/o-nas/verejne-kniznice-a-metodika',
        permanent: true,
      },
      {
        source: '/navsteva-kniznice---covid-19-opatrenia',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/knizne-novinky',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/od-pondelka-19.-4.-je-kniznica-otvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/5-kniznica-je-otvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/dokumenty-kniznice',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/kniznica-bude-od-20.-12.-otvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/opatrenia-pri-navsteve-kniznice-od-19.-1.-2022',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      { source: '/fotogaleria', destination: '/navstivte', permanent: true },
      {
        source: '/tyzden-mozgu-v-kniznici',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/usek-naucnej-literatury-–-oddelenie-hudobnej-a-umenovednej-literatury',
        destination: '/navstivte/kapucinska',
        permanent: true,
      },
      {
        source: '/kniznica-od-20.-12.-otvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/navsteva-kniznice-od-20.-9.-2021',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/mesacne-programy-v-pdf',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/historia',
        destination: '/o-nas/z-historie',
        permanent: true,
      },
      {
        source: '/galeria-artoteka',
        destination: '/navstivte/ostatne/galeria-artoteka',
        permanent: true,
      },
      {
        source: '/1-trening-pamati-online',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/kniha,-ktora-mi-chyba---anketa',
        destination: '/sluzby/citanie/aka-kniha-v-kniznici-chyba',
        permanent: true,
      },
      {
        source: '/zmena---online-katalog',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/objednavanie-knih-na-dialku',
        destination: '/sluzby/citanie/objednavka-a-rezervacia-knih',
        permanent: true,
      },
      {
        source: '/1-kniznica-je-otvorena-v-obmedzenom-rezime',
        destination: '/navstivte/ostatne/otvaracie-hodiny',
        permanent: true,
      },
      {
        source: '/venujte-knihy-kniznici',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/transparentna-kniznica',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/zoznamy-casopisov',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/usek-naucnej-literatury-–-oddelenie-pre-nevidiacich-a-slabozrakych',
        destination: '/navstivte/klariska',
        permanent: true,
      },
      {
        source: '/archiv-podujati',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/bratislava,-moje-mesto---sutaz-pre-deti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vysledky-2.-kola-sutaze-o-vizualnu-identitu-mestskej-kniznice-v-bratislave',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/2-kniznica-je-zatvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/ako-citat-prinasame-videonavody,-tipy-a-odporucania.',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/opatrenia-pri-navsteve-kniznice',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/aktualne-vystavy',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/2-kratkodobe-prenajmy-priestorov',
        destination: '/zazite/prenajmite-si-priestor',
        permanent: true,
      },
      {
        source: '/ucelny-dizajn-interierov-kniznic-–-priklady-z-praxe',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/donaska-knih-cyklokurierom',
        destination: '/sluzby/citanie/cyklodonaska',
        permanent: true,
      },
      {
        source: '/zmluvy',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/vysledky-1.-kola-sutaznej-vyzvy-vizualna-identita-mestskej-kniznice-v-bratislave',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/oddelenie-pre-nevidiacich-a-slabozrakych',
        destination: '/navstivte/klariska',
        permanent: true,
      },
      {
        source: '/knizne-novinky/2',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/spravy-o-cinnosti',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/formulare-mvs',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/oslavujeme-121-rokov-a-odpustame-pokuty',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/knizne-novinky---januar-2021',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/napisali-o-nas',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/ucelny-dizajn-interierov-kniznic',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/plany-cinnosti',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      { source: '/home', destination: '/en', permanent: true },
      {
        source: '/otvarame-letnu-citaren-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/knizne-novinky/3',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/knizne-novinky/4',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/zazitky-v-kniznici-pre-skolakov',
        destination: '/zazite/pre-skoly',
        permanent: true,
      },
      {
        source: '/bibliografie',
        destination: '/sluzby/citanie/bibliografia-a-resers',
        permanent: true,
      },
      {
        source: '/1-poplatky-za-oneskorene-vratenie-knih',
        destination: '/file/cennik-poplatkov-a-sluzieb',
        permanent: true,
      },
      {
        source: '/objednavky',
        destination: '/sluzby/citanie/objednavka-a-rezervacia-knih',
        permanent: true,
      },
      {
        source: '/fotogaleria-podujati',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/knizne-novinky/5',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/bratislavske-mestske-dni-v-mestskej-kniznici-v-bratislave',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/novy-online-katalog',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/oddelenie-odbornej-literatury',
        destination: '/navstivte/klariska',
        permanent: true,
      },
      {
        source: '/verejne-obstaravanie',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/graficky-dizajn-pre-mestsku-kniznicu-v-bratislave',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/granty-a-projekty-kniznice',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/cyklodonaska',
        destination: '/sluzby/citanie/cyklodonaska',
        permanent: true,
      },
      {
        source: '/sms-upozornenie---nova-sluzba',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/ukoncenie-letnej-prevadzky-v-citarni-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/1-darcekova-poukazka-do-mestskej-kniznice-v-bratislave',
        destination: '/sluzby/nastroje/darcekova-poukazka',
        permanent: true,
      },
      {
        source: '/spoznajte-svety-ukryte-v-knihach',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/1-usek-literatury-pre-deti-a-mladez',
        destination: '/navstivte/kapucinska',
        permanent: true,
      },
      {
        source: '/novy-riaditel-mkb',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/generovanie-upomienok-od-1.-2.-2022-obnovene',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/1-venujte-knihy-kniznici',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/bezplatna-registracia-pre-zdravotnikov',
        destination: '/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
        permanent: true,
      },
      {
        source: '/1-usek-krasnej-a-cudzojazycnej-literatury',
        destination: '/navstivte/laurinska',
        permanent: true,
      },
      {
        source: '/faktury',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/pomozte-kniznici-pomahat',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/spolupraca-—-vrakuna,-vajnory,-karlova-ves,-devinska-nova-ves,-zahorska-bystrica',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/1-bratislavska-burza-knih',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/vypocujte-si-podcast-o-knihach,-ktore-cita-cela-rodina',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/napiste-odkaz-do-knihy',
        destination: '/sluzby/dalsie-informacie/napiste-nam',
        permanent: true,
      },
      {
        source: '/objednavanierezervovanie-knih',
        destination: '/sluzby/citanie/objednavka-a-rezervacia-knih',
        permanent: true,
      },
      {
        source: '/bratislavska-burza-knih---13.-rocnik',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/2-praca-s-pocitacom',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/komunikacia-bez-barier-v-mestskej-kniznici-v-bratislave',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/1-kniha,-ktora-mi-chyba-—-anketa',
        destination: '/sluzby/citanie/aka-kniha-v-kniznici-chyba',
        permanent: true,
      },
      {
        source: '/deti-potrebuju-knihy',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source:
          '/ochrana-osobnych-udajov-v-zmysle-zakona-c.-182018-v-podmienkach-mestskej-kniznice-v-bratislave',
        destination: '/o-nas/ochrana-osobnych-udajov',
        permanent: true,
      },
      {
        source: '/odborny-seminar-mkb',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/archiv-vystav',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/odpustanie-pokut-za-neskore-vratenie-knih',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/oddelenie-hudobnej-a-umenovednej-literatury-s-galeriou-artoteka',
        destination: '/navstivte/kapucinska',
        permanent: true,
      },
      {
        source: '/zimny-kviz',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/oznamy/2',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/bratislavske-mestske-dni',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/zaner/podujatia-pre-deti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-letna-citaren-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/7-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/partneri-kniznice',
        destination: '/o-nas/partneri-a-spoluprace',
        permanent: true,
      },
      {
        source: '/joga-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/spolupraca-kniznic',
        destination: '/o-nas/partneri-a-spoluprace',
        permanent: true,
      },
      {
        source: '/1-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/4-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/knizny-lov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/pomoc-pri-stahovani-covid-preukazu',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/zelene-popoludnie',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/5-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/nase-online-sluzby',
        destination: '/sluzby',
        permanent: true,
      },
      {
        source: '/1-joga-u-cerveneho-raka',
        destination: '/navstivte/letna-citaren-u-cerveneho-raka',
        permanent: true,
      },
      {
        source: '/aktualne-opatrenia-pri-navsteve-kniznice',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/10-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/3-citanie-na-zastavke',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/6-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/locations-and-services-in-detail',
        destination: '/en/visit/our-localities',
        permanent: true,
      },
      {
        source: '/zaznam-zo-seminara-funkcny-dizajn-a-moderna-architektura-kniznic.',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/funkcny-dizajn-a-moderna-architektura-kniznic',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      { source: '/regionalny-fond', destination: '/o-nas', permanent: true },
      {
        source: '/darcekova-poukazka-do-mestskej-kniznice-v-bratislave',
        destination: '/sluzby/nastroje/darcekova-poukazka',
        permanent: true,
      },
      {
        source: '/kniznicne-patranie',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/software-testing-beer-vol.-8',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      { source: '/2020', destination: '/zazite/aktuality', permanent: true },
      {
        source: '/konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/pocta-hane-hegerovej',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/8-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/rozhybane-plagaty',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/16-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/diplomovky-—-tlac-a-vazba-vyhodne',
        destination: '/sluzby/nastroje/kniharska-dielna',
        permanent: true,
      },
      {
        source: '/membership-costs-and-fees',
        destination: '/en/services/reading/how-to-register-at-the-library',
        permanent: true,
      },
      {
        source: '/zmluvy/2',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/17-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zaner/prednasky-a-ine-odborne-podujatia',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/fenomen-vakcinacie.-prednaska-spojena-s-prehliadkou-lekarne-u-cerveneho-raka',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/pozrite-si-zaznamy-zo-seminara-ucelny-dizajn-interierov-kniznic',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/zmena-ucelu-priestorov-a-anketa',
        destination: '/sluzby/dalsie-informacie/napiste-nam',
        permanent: true,
      },
      {
        source: '/obchodna-verejna-sutaz',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/trojhlasne-(za)uzlenie',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/9-poviedky-o-laske',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-kniharska-dielna',
        destination: '/sluzby/nastroje/kniharska-dielna',
        permanent: true,
      },
      {
        source: '/detske-e-knihy-v-mestskej-kniznici',
        destination: '/sluzby/citanie/e-knihy-a-e-casopisy',
        permanent: true,
      },
      { source: '/sitemap', destination: '/sk', permanent: true },
      {
        source: '/biblioboxy-zatvorene-od-16.-3.-2020',
        destination: '/sluzby/citanie/knizne-boxy',
        permanent: true,
      },
      {
        source: '/oslavujeme-120-rokov-od-zalozenia',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/2-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/3-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/e-knihy-aj-na-pocuvanie',
        destination: '/sluzby/citanie/e-knihy-a-e-casopisy',
        permanent: true,
      },
      {
        source: '/nakresli-si-haiku-svetlom',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/novy-duchovny-most-novy-sad---bratislava',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/12-trening-pamati',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/letny-detsky-tabor',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/11-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/detske-e-knihy-aj-v-mestskej-kniznici',
        destination: '/sluzby/citanie/e-knihy-a-e-casopisy',
        permanent: true,
      },
      {
        source: '/zaner/literatura',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/literarno-filmovy-workshop-pre-deti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-vianocna-burza-grafik',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/nekosene-luky-(koncert)',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/oboe-trio-and-duo-ex-animo',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/prihlasovanie-na-trening-pamati',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/12-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/ako-citat-madarsko',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/bessa-illustration---life-is-juicy!',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/historia-podujati-do-2013',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/poviedky-o-laske-online',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/archiv-podujati/3',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/mestska-kniznica-v-roku-2020',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/vynimocne-zmysly-u-zvierat',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/2-veterani-zo-salon-dore',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/22-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/bloomsday-u-cerveneho-raka',
        destination: '/en/visit/summer-reading-room-u-cerveneho-rak',
        permanent: true,
      },
      {
        source: '/komiksovy-workshop-pre-deti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/konverzujme-po-anglicky-online',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zlatenie-kniznych-inicial',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zsuzsa-szunyog',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/archiv-podujati/2',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/14-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-verejne-obstaravanie',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/2-noc-s-andersenom',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zbierka-notebookov-a-tabletov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-metodika',
        destination: '/o-nas/verejne-kniznice-a-metodika',
        permanent: true,
      },
      {
        source: '/ako-citat-(post)kolonialnu-literaturu',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/historia-podujati-2014',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/videozaznamy---besedy-s-tvorcami-filmov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/workshop-tvorby-komiksov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zmluvy/3',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/15-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/9-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/komunikacne-strategie-kniznice-21.-storocia',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/3-spolocenstvo-hier',
        destination: '/sluzby/citanie/online-katalog',
        permanent: true,
      },
      {
        source: '/nezbednickovia',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/peggy,-jana-a-ja---sen-o-stasti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/zasady-pouzivania-suborov-cookie',
        destination: '/o-nas/ochrana-osobnych-udajov',
        permanent: true,
      },
      {
        source: '/21-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/harry-potter-a-kamen-mudrcov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/najlaskyplnejsia-pohladnica',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/ako-citat-japonsko',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/19-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/klub-spolocenskych-hier',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/studovne-su-znovu-otvorene',
        destination: '/zazite/studujte-v-kniznici',
        permanent: true,
      },
      {
        source: '/archiv---november-2014-a-starsie',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/pocitacove-kurzy-pre-seniorov',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/6-bratislava-–-mesto,-ktore-cita',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/3-praca-s-pocitacom',
        destination: '/sluzby/vzdelavanie/clanky',
        permanent: true,
      },
      {
        source: '/knizne-novinky/1',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/mikulassky-kviz',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/traja-kamosi...',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/waiting-for...-cakanie-na…',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/archiv-podujati/20',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/podujatia-v-kniznici-prebiehaju-v-rezime-op',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/solamente-naturali,-koncert',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/18-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/archiv-podujati/24',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/co-potrebuju-ludia-bez-domova-najviac-koniec-bezdomovectva.',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/fotografie',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/sviatok-hudby',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/2-bratislavska-burza-knih',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/box',
        destination: '/sluzby/citanie/knizne-boxy',
        permanent: true,
      },
      {
        source: '/zborci-–-koncert-podujatie-je-zrusene!',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/2-rozhybane-plagaty',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/prihlásenie',
        destination: '/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
        permanent: true,
      },
      {
        source: '/letna-citaren-bude-zatvorena',
        destination: '/zazite/aktuality',
        permanent: true,
      },
      {
        source: '/pestovanie-konope',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/vyhladavanie/vrátenie',
        destination: 'kníh',
        permanent: true,
      },
      {
        source: '/y2b-festival',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/1-spolupraca-kniznic',
        destination: '/o-nas/partneri-a-spoluprace',
        permanent: true,
      },
      {
        source: '/2-cyklodonaska',
        destination: '/sluzby/citanie/cyklodonaska',
        permanent: true,
      },
      {
        source: '/20-konverzujme-po-anglicky',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/detska-tvorba',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/prisery-z-praveku-i.',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/risografia-so-studiom-hibernant',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/otvaracie',
        destination: 'hodiny',
        permanent: true,
      },
      {
        source: '/vyhladavanie/Otváracie',
        destination: 'hodiny',
        permanent: true,
      },
      {
        source: '/4-v-krajine-maleho-princa',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/archiv-podujati/32',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/poplatky',
        destination: '/sluzby/dalsie-informacie/casto-kladene-otazky',
        permanent: true,
      },
      {
        source: '/zmluvy/4',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/10-mrtve-duse',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/27-literarny-kviz-s-dadom-nagyom',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/denisa-fulmekova-a-veronika-sikulova',
        destination: '/sluzby/citanie/knizne-novinky',
        permanent: true,
      },
      {
        source: '/inovacie-pre-buducnost-verejnych-kniznic---odborny-seminar',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/noc-s-andersenom-aj-pre-vase-deti',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/odborny-seminar-udrzatelnost-v-knizniciach',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/verejne-obstaravanie/2',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/vyhladavanie/otváracie',
        destination: 'hodiny',
        permanent: true,
      },
      {
        source: '/zaner/vystava',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/9-komiksovy-workshop',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/fotogaleria-podujati/3',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vianocny-workshop',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/cennik',
        destination: '/sluzby/dalsie-informacie/casto-kladene-otazky',
        permanent: true,
      },
      {
        source: '/absolventska-vystava-zus-exnarova',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/animaky-pre-deti--Мультфільми-для-дітей',
        destination: '/en/experience/events',
        permanent: true,
      },
      {
        source: '/der-rabe-der-anders-war-(havran,-ktory-bol-iny)',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/moznost-objednat-si-knihy',
        destination: '/sluzby/citanie/objednavka-a-rezervacia-knih',
        permanent: true,
      },
      {
        source: '/prednaska-o-komikse',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/slovenska-poezia-v-podani-polskej-pesnickarky-issy-conar.',
        destination: '/zazite/podujatia',
        permanent: true,
      },
      {
        source: '/vyhladavanie/Box',
        destination: '/sluzby/citanie/knizne-boxy',
        permanent: true,
      },
      {
        source: '/vyhladavanie/poriadok',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii',
        permanent: true,
      },
      {
        source: '/vyhladavanie/predĺženie',
        destination: '/sluzby/dalsie-informacie/casto-kladene-otazky',
        permanent: true,
      },
    ]
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
  env: {
    reactStrictMode: true,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
    MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
    ORIGIN_ROOT_URL: process.env.ORIGIN_ROOT_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    })

    return config
  },
}

module.exports = nextConfig
