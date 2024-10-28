import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import projects from './projects.js';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

const prefix = '/api/v1';
app.get(`${prefix}`, (c) => c.text('API is running'));
app.route(`${prefix}/projects`, projects);

const port = 4000;
console.log(`Server is running on http://localhost:${port}${prefix}`);

serve({
  fetch: app.fetch,
  port,
});
