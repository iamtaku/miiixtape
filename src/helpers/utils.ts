export const timeConversion = (duration: number) => {
  const portions: string[] = [];
  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + "h");
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + "m");
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + "s");
  }

  return portions.join(" ");
};

export const parseYoutubeTime = (duration: string): number => {
  var matches = duration.match(/[0-9]+[HMS]/g);

  var seconds = 0;
  if (!matches) return 0;
  matches.forEach(function (part) {
    var unit = part.charAt(part.length - 1);
    var amount = parseInt(part.slice(0, -1));

    switch (unit) {
      case "H":
        seconds += amount * 60 * 60;
        break;
      case "M":
        seconds += amount * 60;
        break;
      case "S":
        seconds += amount;
        break;
      default:
      // noop
    }
  });

  return seconds * 1000;
};

export const convertMilliSecondstoSeconds = (duration: number) =>
  duration / 1000;
export const isAuthenticated = (): boolean => !!localStorage.getItem("token");
