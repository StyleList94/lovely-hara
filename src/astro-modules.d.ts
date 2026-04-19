declare module '*.astro' {
  const Component: (_props: Record<string, unknown>) => unknown;
  export default Component;
}
