import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import chalk from 'chalk';

const dev = process.env.NODE_ENV !== 'production';
const protocol = process.env.PROTOCOL ?? 'http';
const hostname = process.env.HOSTNAME ?? 'localhost';
const port = process.env.PORT ?? 3000;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${hostname}:${port}`;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error(
        `${chalk.redBright('error')} - Error occurred handling ${req.url} ${err}`
      );
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(
      `${chalk.blueBright('info')}  - Server started on ${chalk.blueBright(siteUrl)}`
    );
  });
});
