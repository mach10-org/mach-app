export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getCurrentTimestamp = () => Date.now();
export const getTimestampInSeconds = () => Math.floor(Date.now() / 1000);

export const setSessionStartDate = () => sessionStorage.setItem('MACH10_SESSION_DATE', `${getCurrentTimestamp()}`);
export const getSessionStartDate = () => parseInt(sessionStorage.getItem('MACH10_SESSION_DATE') || '');
export const deleteSessionStartDate = () => sessionStorage.removeItem('MACH10_SESSION_DATE');

// Remove all saved data from sessionStorage
// sessionStorage.clear();
