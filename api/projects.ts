import { Hono } from 'hono';
import { db } from './db.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { handlePrismaErrors, zPaginationQuery } from './utils.js';

const app = new Hono();

const zProjectInput = () =>
  z.object({
    name: z.string(),
    description: z.string().nullish(),
  });

app.get('/', zValidator('query', zPaginationQuery()), async (c) => {
  const query = c.req.valid('query');
  const [projects, total] = await Promise.all([
    db.project.findMany({
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    db.project.count(),
  ]);
  return c.json({
    data: projects,
    total,
    page: query.page,
    pageSize: query.pageSize,
  });
});

app.post('/', zValidator('json', zProjectInput()), async (c) => {
  try {
    const input = c.req.valid('json');
    const project = await db.project.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });
    return c.json({ data: project }, 201);
  } catch (err) {
    handlePrismaErrors(err);
    throw err;
  }
});

app.get('/:id', async (c) => {
  const project = await db.project.findUnique({
    where: {
      id: c.req.param().id,
    },
  });
  return c.json({ data: project });
});

app.put('/:id', zValidator('json', zProjectInput()), async (c) => {
  try {
    const input = c.req.valid('json');
    const project = await db.project.update({
      where: {
        id: c.req.param().id,
      },
      data: {
        name: input.name,
        description: input.description,
      },
    });
    return c.json({ data: project });
  } catch (err) {
    handlePrismaErrors(err);
    throw err;
  }
});

app.delete('/:id', async (c) => {
  try {
    const project = await db.project.delete({
      where: {
        id: c.req.param().id,
      },
    });
    return c.json({ data: project });
  } catch (err) {
    handlePrismaErrors(err);
    throw err;
  }
});

export default app;
