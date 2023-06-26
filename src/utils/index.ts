import moment from 'moment';

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getCurrentTimestamp = () => Date.now();
export const getTimestampInSeconds = () => Math.floor(Date.now() / 1000);

export const setSessionStartDate = () => sessionStorage.setItem('MACH10_SESSION_DATE', `${getCurrentTimestamp()}`);
export const getSessionStartDate = () => {
  const start = parseInt(sessionStorage.getItem('MACH10_SESSION_DATE') || '');

  if (start) {
    const duration = moment.duration(moment().diff(start)).asMinutes();

    return {
      start,
      duration
    };
  }
  return false;
};
export const deleteSessionStartDate = () => sessionStorage.removeItem('MACH10_SESSION_DATE');

export const isRecentSessionStartDate = () => {
  const hasValue = getSessionStartDate();
};
// Remove all saved data from sessionStorage
// sessionStorage.clear();

export const normalizer = (str: string) =>
  str
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '');

export const isIOS = () => {
  return !!['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].filter((u) => navigator?.userAgent?.includes(u))?.length;
};
