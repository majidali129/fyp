export const formatedDuration = (seconds: number) => {

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600)/60);
  const remainingSeconds = Math.floor(seconds % 60);

  return hours > 0
    ? `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`

    : `${minutes < 10 ? "0" + minutes : minutes}:${
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
      }`;
};
