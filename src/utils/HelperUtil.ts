export const Pluralize = (
  count: number | undefined = 0,
  noun: string,
  showNumber: boolean = true,
  suffix: string = "s"
) => {
  return !showNumber
    ? `${noun}${count !== 1 ? suffix : ""}`
    : `${count} ${noun}${count !== 1 ? suffix : ""}`;
};  // Todo: Make it a Component

export const GetRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const GetRandomDarkColor = () => {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
};
