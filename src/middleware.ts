import { defineMiddleware } from 'astro:middleware';

const ASCII_ART = `
   _____ __        __     __    _      __  _____ __ __
  / ___// /___  __/ /__  / /   (_)____/ /_/ __ \\/ // /
  \\__ \\/ __/ / / / / _ \\/ /   / / ___/ __/ /_/ / // /_
 ___/ / /_/ /_/ / /  __/ /___/ (__  ) /_/\\__, /__  __/
/____/\\__/\\__, /_/\\___/_____/_/____/\\__/  /_/   /_/
          /____/

  Lovely Frontend

  GitHub  5k.gg/s94
  Blog    blog.styleli.sh
`;

export const onRequest = defineMiddleware(({ request }, next) => {
  const ua = request.headers.get('user-agent') ?? '';

  if (ua.toLowerCase().includes('curl')) {
    return new Response(ASCII_ART, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return next();
});
