export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const duration = {
  micro: 0.2,
  standard: 0.4,
  image: 0.7,
  hero: 1.2,
} as const;
