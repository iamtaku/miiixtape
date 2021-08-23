export const timeConversion = (duration: number): string => {
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
  const matches = duration.match(/[0-9]+[HMS]/g);

  let seconds = 0;
  if (!matches) return 0;
  matches.forEach(function (part) {
    const unit = part.charAt(part.length - 1);
    const amount = parseInt(part.slice(0, -1));

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

export const convertMilliSecondstoSeconds = (duration?: number): number =>
  duration ? duration / 1000 : 0;

export const isAuthenticated = (): boolean => !!localStorage.getItem("token");

export const pluralize = (word: string, data: unknown[]): string => {
  if (data.length === 1) {
    return data.length.toString() + " " + word;
  }

  return data.length.toString() + " " + word + "s";
};

export const insertItemsToArray = <T>(
  arr: T[],
  index: number,
  newItem: T[]
): T[] => [...arr.slice(0, index), ...newItem, ...arr.slice(index)];

export const reorderList = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
