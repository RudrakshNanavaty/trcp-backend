import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './presentation/trpc/appRouter';
import { createContext } from './presentation/trpc/context';
import { renderTrpcPanel } from 'trpc-panel';  // This is correct

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.PORT || 8081;
const apiRoute = `http://localhost:${port}`;

// Create and render the panel
const panelHtml = renderTrpcPanel(appRouter, {
  url: `${apiRoute}/trpc`,
});

// Serve the panel HTML
app.use('/panel', (_, res) => {
  res.send(panelHtml);  // Send the HTML as response
});

app.listen(port, () => {
  console.log(`Server running on ${apiRoute}`);
});