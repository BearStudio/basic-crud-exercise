import { Prisma } from '@prisma/client';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

export const handlePrismaErrors = (err: unknown) => {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
    return;
  }
  // Prisma Not Found
  if (err.code === 'P2001' || err.code === 'P2025') {
    throw new HTTPException(404, {
      message: err.message,
    });
  }
  // Prisma Conflict
  if (err.code === 'P2002') {
    throw new HTTPException(409, {
      message: err.message,
    });
  }
  // Unhandled Prisma error
  throw new HTTPException(500, {
    message: err.message,
  });
};

export const zPaginationQuery = () =>
  z.object({
    page: z.coerce.number().optional().default(1),
    pageSize: z.coerce.number().optional().default(20),
  });
