export const Pluralize = (count: number, noun: string, suffix: string = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;
