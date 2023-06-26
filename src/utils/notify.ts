import Notify from 'simple-notify';
import { notifyPosition, notifyStatus } from 'simple-notify/dist/types';
import { isIOS } from './index';

type ToastProps = {
  status?: notifyStatus;
  autoclose?: boolean;
  title?: string;
  text?: string;
  autotimeout?: number;
  position?: notifyPosition;
  iconName?: notifyStatus | 'bookmark';
};

let toast: Notify;

const closeIcon =
  'svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
const customIcon = {
  success:
    '<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>',
  error:
    '<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></div>',
  warning:
    '<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>',
  info: '<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg></div>',
  bookmark:
    '<div class="bg-blue-100  text-blue-500 dark:bg-blue-900 dark:text-blue-300 flex-shrink-0 h-8 inline-flex items-center justify-center rounded-lg w-8"><svg class="h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path  stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"></path></svg></div>'
};
const showToast = ({ status = 'success', autoclose = true, title = '', text = '', autotimeout = 3500, position = 'right bottom', iconName }: ToastProps) => {
  return (toast = new Notify({
    status,
    title,
    text,
    effect: isIOS() ? 'fade' : 'slide',
    speed: 500,
    customClass: `toast-mach${iconName ? '-' + iconName : ''}`,
    customIcon: customIcon[iconName || status],
    showIcon: true,
    showCloseButton: true,
    autoclose: typeof autoclose !== 'undefined' ? autoclose : status === 'success' ? true : false,
    autotimeout: !!autotimeout ? autotimeout : status === 'success' ? 3500 : 10000,
    gap: 20,
    distance: 20,
    type: 1,
    position
  }));
};

const closeToast = () => {
  return toast?.close();
};

export { toast, showToast, closeToast };
export type { notifyStatus, notifyPosition, ToastProps };

export const notifyConfirm = (ok: string, cancel: string, url: string) =>
  `<div class="grid grid-cols-2 gap-2 pt-2">` +
  `<div>` +
  `<a href="${url}" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">${ok}</a>` +
  `</div>` +
  `<div>` +
  `<a href="javascript:void(0);" id="close-toast" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">${cancel}</a>` +
  `</div>` +
  `</div>`;
