// TODO use @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['en', 'sk'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost', 'cdn-api.bratislava.sk'],
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
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
        {
          source: '/opacBookNews',
          destination:
            'https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=60&rtrnxml=true',
        },
        /**
         * Rewrites to make the translation of URL work. Based on an approached outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */
        {
          source: '/sluzby/vzdelavanie/clanky/:slug',
          destination: '/blog/:slug',
        },
        {
          source: '/services/education/articles/:slug',
          destination: '/blog/:slug',
        },
        {
          source: '/o-nas/dokumenty-a-zverejnovanie-informacii/:slug',
          destination: '/basic-document/:slug',
        },
        {
          source: '/about-us/documents-and-public-disclosure-of-information/:slug',
          destination: '/basic-document/:slug',
        },
        {
          source: '/zazite/podujatia/:slug',
          destination: '/event/:slug',
        },
        {
          source: '/experience/events/:slug',
          destination: '/event/:slug',
        },
        {
          source: '/vyhladavanie',
          destination: '/search',
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/sk/o-nas/dokumenty-a-zverejnovanie-informacii/:categorySlug/:slug',
        destination: '/o-nas/dokumenty-a-zverejnovanie-informacii/:slug',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/o-nas/dokumenty-a-zverejnovanie-informacii/:categorySlug/:slug',
        destination: '/en/about-us/documents-and-public-disclosure-of-information/:slug',
        permanent: true,
        locale: false,
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
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
}

module.exports = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
