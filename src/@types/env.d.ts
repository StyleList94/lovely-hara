interface EnvVariables {
  NEXT_PUBLIC_ENV: string | undefined;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvVariables {}
}
