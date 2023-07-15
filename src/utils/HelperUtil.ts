export const Pluralize = (count: number, noun: string, suffix: string = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const GetRandomColor = () => {
  var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
