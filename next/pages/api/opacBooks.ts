import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { newBookOpac } from '../../utils/types';

const opacBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  //TODO: caching

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      'https://opac.mestskakniznica.sk/opac?fn=searchform&extSrchNews=30',
      { waitUntil: 'networkidle0' }
    );

    const newBooks: newBookOpac[] = await page.evaluate(
      async (): Promise<newBookOpac[]> => {
        try {
          return await new Promise((resolve) => {
            const books = Array.from(
              document.getElementsByClassName('col-12 border-top-default')
            )
              .slice(0, 6)
              .filter((book) => !!book)
              .map((book) => {
                let title =
                  book.querySelector('div .header-default')?.textContent || '';
                if (title && title.length > 15)
                  title = title.substring(0, 20) + '...';

                const imgSrc = book.querySelector('img')?.src || '';
                const authors: string[] = [];
                const aTags = book.querySelectorAll('a');
                aTags.forEach((a) => {
                  if (a.href.includes('author')) authors.push(a.text);
                });

                return {
                  title,
                  imgSrc,
                  authors,
                };
              });
            resolve(books);
          });
        } catch {
          return [];
        }
      }
    );

    await browser.close();

    return res.status(201).json({
      newBooks,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default opacBooks;
