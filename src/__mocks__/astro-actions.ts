export const actions = new Proxy(
  {},
  {
    get: () => () => Promise.resolve({ data: null, error: null }),
  },
);

export type SafeResult<TInput, TOutput> = {
  data: TOutput | null;
  error: TInput | null;
};
