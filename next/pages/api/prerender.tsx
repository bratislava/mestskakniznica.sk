import { NextApiRequest, NextApiResponse } from 'next';

const prerender = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Init calling whole sitemap after server restart.');
    console.log(`Ping /sluzby`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby`);
    console.log(`Ping /sluzby/citanie`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/citanie`);
    console.log(`Ping /sluzby/citanie/ako-sa-prihlasit-do-kniznice`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/ako-sa-prihlasit-do-kniznice`
    );
    console.log(`Ping /sluzby/citanie/online-katalog`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/online-katalog`);
    console.log(`Ping /sluzby/citanie/e-knihy-a-e-casopisy`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/e-knihy-a-e-casopisy`
    );
    console.log(`Ping /sluzby/citanie/e-knihy-a-e-casopisy/palmknihy`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/e-knihy-a-e-casopisy/palmknihy`
    );
    console.log(`Ping /sluzby/citanie/e-knihy-a-e-casopisy/pressreader`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/e-knihy-a-e-casopisy/pressreader`
    );
    console.log(
      `Ping /sluzby/citanie/e-knihy-a-e-casopisy/ebscoebookpubliclibrarycollection`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/e-knihy-a-e-casopisy/ebscoebookpubliclibrarycollection`
    );
    console.log(`Ping /sluzby/citanie/e-knihy-a-e-casopisy/kubo`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/e-knihy-a-e-casopisy/kubo`
    );
    console.log(`Ping /sluzby/citanie/prezencne-zdroje`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/prezencne-zdroje`
    );
    console.log(`Ping /sluzby/citanie/bibliografia-a-resers`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/bibliografia-a-resers`
    );
    console.log(`Ping /sluzby/citanie/medzikniznicna-vypozicna-sluzba`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/medzikniznicna-vypozicna-sluzba`
    );
    console.log(`Ping /sluzby/citanie/objednavka-a-rezervacia-knih`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/objednavka-a-rezervacia-knih`
    );
    console.log(`Ping /sluzby/citanie/cyklodonaska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/cyklodonaska`);
    console.log(`Ping /sluzby/citanie/knizne-boxy`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/knizne-boxy`);
    console.log(`Ping /sluzby/citanie/knizne-novinky`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/knizne-novinky`);
    console.log(`Ping /sluzby/citanie/aka-kniha-v-kniznici-chyba`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/aka-kniha-v-kniznici-chyba`
    );
    console.log(`Ping /sluzby/nastroje`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje`);
    console.log(`Ping /sluzby/nastroje/pristup-na-internet`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/pristup-na-internet`
    );
    console.log(`Ping /sluzby/nastroje/tlaciaren`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/tlaciaren`);
    console.log(`Ping /sluzby/nastroje/kniharska-dielna`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/kniharska-dielna`
    );
    console.log(`Ping /sluzby/nastroje/pomocky-na-citanie`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/pomocky-na-citanie`
    );
    console.log(`Ping /sluzby/nastroje/tablety-a-citacky`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/tablety-a-citacky`
    );
    console.log(`Ping /sluzby/nastroje/darcekova-poukazka`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/darcekova-poukazka`
    );
    console.log(`Ping /sluzby/nastroje/hra-na-hudobne-nastroje`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/hra-na-hudobne-nastroje`
    );
    console.log(`Ping /sluzby/nastroje/divadelna-technika`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/nastroje/divadelna-technika`
    );
    console.log(`Ping /sluzby/vzdelavanie`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/vzdelavanie`);
    console.log(`Ping /sluzby/vzdelavanie/clanky`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/vzdelavanie/clanky`);
    console.log(`Ping /sluzby/dalsie-informacie`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/sluzby/dalsie-informacie`);
    console.log(`Ping /sluzby/dalsie-informacie/casto-kladene-otazky`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/dalsie-informacie/casto-kladene-otazky`
    );
    console.log(`Ping /sluzby/dalsie-informacie/napiste-nam`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/sluzby/dalsie-informacie/napiste-nam`
    );
    console.log(`Ping /zazite`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite`);
    console.log(`Ping /zazite/podujatia`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite/podujatia`);
    console.log(`Ping /zazite/aktuality`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite/aktuality`);
    console.log(`Ping /zazite/pre-skoly`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite/pre-skoly`);
    console.log(`Ping /zazite/studujte-v-kniznici`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite/studujte-v-kniznici`);
    console.log(`Ping /zazite/prenajmite-si-priestor`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/zazite/prenajmite-si-priestor`);
    console.log(`Ping /zazite/prenajmite-si-priestor/galeria-artoteka`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/zazite/prenajmite-si-priestor/galeria-artoteka`
    );
    console.log(`Ping /zazite/prenajmite-si-priestor/pod-kniznicou`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/zazite/prenajmite-si-priestor/pod-kniznicou`
    );
    console.log(`Ping /zazite/prenajmite-si-priestor/hudobne-studio`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/zazite/prenajmite-si-priestor/hudobne-studio`
    );
    console.log(`Ping /navstivte`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte`);
    console.log(`Ping /navstivte/nase-lokality`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte/nase-lokality`);
    console.log(`Ping /navstivte/klariska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte/klariska`);
    console.log(`Ping /navstivte/kapucinska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte/kapucinska`);
    console.log(`Ping /navstivte/letna-citaren-klariska`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/navstivte/letna-citaren-klariska`
    );
    console.log(`Ping /navstivte/laurinska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte/laurinska`);
    console.log(`Ping /navstivte/letna-citaren-u-cerveneho-raka`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/navstivte/letna-citaren-u-cerveneho-raka`
    );
    console.log(`Ping /navstivte/ostatne/galeria-artoteka`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/navstivte/ostatne/galeria-artoteka`
    );
    console.log(`Ping /navstivte/ostatne`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/navstivte/ostatne`);
    console.log(`Ping /navstivte/ostatne/otvaracie-hodiny`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/navstivte/ostatne/otvaracie-hodiny`
    );
    console.log(`Ping /navstivte/ostatne/kde-nas-najdete`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/navstivte/ostatne/kde-nas-najdete`
    );
    console.log(`Ping /o-nas`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas`);
    console.log(`Ping /o-nas/kontakty`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/kontakty`);
    console.log(`Ping /o-nas/z-historie`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/z-historie`);
    console.log(`Ping /o-nas/vizia`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/vizia`);
    console.log(`Ping /o-nas/organizacna-struktura`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/organizacna-struktura`);
    console.log(`Ping /o-nas/dokumenty-a-zverejnovanie-informacii`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/o-nas/dokumenty-a-zverejnovanie-informacii`
    );
    console.log(`Ping /o-nas/verejne-kniznice-a-metodika`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/o-nas/verejne-kniznice-a-metodika`
    );
    console.log(`Ping /o-nas/partneri-a-spoluprace`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/partneri-a-spoluprace`);
    console.log(`Ping /o-nas/ochrana-osobnych-udajov`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/o-nas/ochrana-osobnych-udajov`);
    console.log(`Ping /en/services`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services`);
    console.log(`Ping /en/services//reading`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services//reading`);
    console.log(`Ping /en/services/reading/how-to-register-at-the-library`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/how-to-register-at-the-library`
    );
    console.log(`Ping /en/services/reading/online-catalog`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/online-catalog`
    );
    console.log(`Ping /en/services/reading/e-books-and-e-maganizes`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/e-books-and-e-maganizes`
    );
    console.log(`Ping /en/services/reading/e-books-and-e-maganizes/palmknihy`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/e-books-and-e-maganizes/palmknihy`
    );
    console.log(
      `Ping /en/services/reading/e-books-and-e-maganizes/pressreader`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/e-books-and-e-maganizes/pressreader`
    );
    console.log(
      `Ping /en/services/reading/e-books-and-e-maganizes/ebsco-ebook-public-library-collection`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/e-books-and-e-maganizes/ebsco-ebook-public-library-collection`
    );
    console.log(`Ping /en/services/reading/e-books-and-e-maganizes/kubo`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/e-books-and-e-maganizes/kubo`
    );
    console.log(`Ping /en/services/reading/on-site-resources`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/on-site-resources`
    );
    console.log(`Ping /en/services/reading/bibliography-and-library-research`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/bibliography-and-library-research`
    );
    console.log(`Ping /en/services/reading/interlibrary-loan-service`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/interlibrary-loan-service`
    );
    console.log(`Ping /en/services/reading/orders-and-reservations`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/orders-and-reservations`
    );
    console.log(`Ping /en/services/reading/bicycle-delivery`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/bicycle-delivery`
    );
    console.log(`Ping /en/services/reading/book-boxes`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/book-boxes`
    );
    console.log(`Ping /en/services/reading/new-additions`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/new-additions`
    );
    console.log(
      `Ping /en/services/reading/a-book-that-is-missing-in-the-library`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/reading/a-book-that-is-missing-in-the-library`
    );
    console.log(`Ping /en/services/tools`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services/tools`);
    console.log(`Ping /en/services/tools/internet-access`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/internet-access`
    );
    console.log(`Ping /en/services/tools/printing`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services/tools/printing`);
    console.log(`Ping /en/services/tools/bookbinding-workshop`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/bookbinding-workshop`
    );
    console.log(`Ping /en/services/tools/reading-aids`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/reading-aids`
    );
    console.log(`Ping /en/services/tools/tablets-and-readers`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/tablets-and-readers`
    );
    console.log(`Ping /en/services/tools/gift-certificate`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/gift-certificate`
    );
    console.log(`Ping /en/services/tools/musical-instruments`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/musical-instruments`
    );
    console.log(`Ping /en/services/tools/theater-technology`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/tools/theater-technology`
    );
    console.log(`Ping /en/services/education`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services/education`);
    console.log(`Ping /en/services/education/articles`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/education/articles`
    );
    console.log(`Ping /en/services/other-information`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/services/other-information`);
    console.log(
      `Ping /en/services/other-information/frequently-asked-questions`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/other-information/frequently-asked-questions`
    );
    console.log(`Ping /en/services/other-information/contact-us`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/services/other-information/contact-us`
    );
    console.log(`Ping /en/experience`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/experience`);
    console.log(`Ping /en/experience/events`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/experience/events`);
    console.log(`Ping /en/experience/news`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/experience/news`);
    console.log(`Ping /en/experience/for-schools`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/experience/for-schools`);
    console.log(`Ping /en/experience/study-in-the-library`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/experience/study-in-the-library`
    );
    console.log(`Ping /en/experience/rent-a-space`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/experience/rent-a-space`);
    console.log(`Ping /en/experience/rent-a-space/artoteka-gallery`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/experience/rent-a-space/artoteka-gallery`
    );
    console.log(`Ping /en/experience/rent-a-space/under-the-library`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/experience/rent-a-space/under-the-library`
    );
    console.log(`Ping /en/experience/rent-a-space/music-studio`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/experience/rent-a-space/music-studio`
    );
    console.log(`Ping /en/visit`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit`);
    console.log(`Ping /en/visit/our-locations`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/our-locations`);
    console.log(`Ping /en/visit/klariska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/klariska`);
    console.log(`Ping /en/visit/kapucinska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/kapucinska`);
    console.log(`Ping /en/visit/summer-reading-room-klariska`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/visit/summer-reading-room-klariska`
    );
    console.log(`Ping /en/visit/laurinska`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/laurinska`);
    console.log(`Ping /en/visit/summer-reading-room-u-cerveneho-raka`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/visit/summer-reading-room-u-cerveneho-raka`
    );
    console.log(`Ping /en/visit/others`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/others`);
    console.log(`Ping /en/visit/other/artoteka-gallery`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/visit/other/artoteka-gallery`
    );
    console.log(`Ping /en/visit/other/opening-hours`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/other/opening-hours`);
    console.log(`Ping /en/visit/other/find-us`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/visit/other/find-us`);
    console.log(`Ping /en/about-us`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/about-us`);
    console.log(`Ping /en/about-us/contacts`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/about-us/contacts`);
    console.log(`Ping /en/about-us/history`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/about-us/history`);
    console.log(`Ping /en/about-us/vision`);
    await fetch(`${process.env.ORIGIN_ROOT_URL}/en/about-us/vision`);
    console.log(`Ping /en/about-us/organizational-structure`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/about-us/organizational-structure`
    );
    console.log(
      `Ping /en/about-us/documents-and-public-disclosure-of-information`
    );
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/about-us/documents-and-public-disclosure-of-information`
    );
    console.log(`Ping /en/about-us/public-libraries-and-methodology`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/about-us/public-libraries-and-methodology`
    );
    console.log(`Ping /en/about-us/partners-and-cooperation`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/about-us/partners-and-cooperation`
    );
    console.log(`Ping /en/about-us/privacy-terms-and-conditions`);
    await fetch(
      `${process.env.ORIGIN_ROOT_URL}/en/about-us/privacy-terms-and-conditions`
    );
    console.log('Done calling whole sitemap after server restart.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Prerender fialed, continuing');
      console.log(error.message || error.toString());
    }
  }
  return res.status(200).json({});
};

export default prerender;
