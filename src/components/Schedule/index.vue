<template>
  <div class="p-4">
    <div class="mb-4 flex w-full flex-col last:mb-0 sm:flex-row sm:px-0">
      <div class="flex h-[36px] items-center justify-between sm:w-32">
        <div>
          <label class="text-default flex flex-row items-center space-x-2 rtl:space-x-reverse">
            <div>
              <div class="flex h-auto w-auto flex-row items-center">
                <button
                  type="button"
                  role="switch"
                  aria-checked="true"
                  data-state="checked"
                  value="on"
                  class="bg-brand-default h-5 w-[34px] rounded-full shadow-none focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                >
                  <span
                    data-state="checked"
                    id="radix-:r6p:"
                    class="block h-[14px] w-[14px] rounded-full transition will-change-transform ltr:translate-x-[4px] rtl:-translate-x-[4px] ltr:[&amp;[data-state='checked']]:translate-x-[17px] rtl:[&amp;[data-state='checked']]:-translate-x-[17px] bg-brand-accent shadow-inner"
                  ></span></button
                ><input
                  type="checkbox"
                  aria-hidden="true"
                  tabindex="-1"
                  value="on"
                  checked="false"
                  style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0px; width: 34px; height: 20px"
                />
              </div>
            </div>
            <span class="inline-block min-w-[88px] text-sm capitalize">Sunday</span>
            <div class="sm:hidden">
              <button
                class="items-center text-sm font-medium relative rounded-md transition-colors flex justify-center h-9 px-4 py-2.5 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis min-h-[36px] min-w-[36px] !p-2 text-default"
                tooltip="Copy times to …"
                id="radix-:r6q:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
              </button>
            </div>
          </label>
        </div>
      </div>
      <div class="flex sm:ml-2">
        <div>
          <div class="mb-2 flex last:mb-0">
            <div>
              <div class="inline-block w-[100px] css-b62m3t-container">
                <span id="react-select-2-live-region" class="css-1f43avz-a11yText-A11yText"></span
                ><span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="css-1f43avz-a11yText-A11yText"></span>
                <div
                  class="bg-default border-default !min-h-9 text-sm leading-4 placeholder:text-sm placeholder:font-normal dark:focus:border-emphasis focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-default hover:border-emphasis rounded-md border py-2 px-3 h-fit css-cp01gg-control"
                >
                  <div class="text-emphasis placeholder:text-muted flex gap-1 css-1qpkzkj-ValueContainer">
                    <div class="text-emphasis placeholder:text-muted css-w54w9q-singleValue">6:00am</div>
                    <div class="text-emphasis css-1q5atpo-Input" data-value="">
                      <input
                        class="focus:ring-0 focus:ring-offset-0 dark:!text-darkgray-900 !text-emphasis"
                        autocapitalize="none"
                        autocomplete="off"
                        autocorrect="off"
                        id="react-select-2-input"
                        spellcheck="false"
                        tabindex="0"
                        type="text"
                        aria-autocomplete="list"
                        aria-expanded="false"
                        aria-haspopup="true"
                        role="combobox"
                        value=""
                        style="
                          color: inherit;
                          background: 0px center;
                          opacity: 1;
                          width: 100%;
                          grid-area: 1 / 2 / auto / auto;
                          font: inherit;
                          min-width: 2px;
                          border: 0px;
                          margin: 0px;
                          outline: 0px;
                          padding: 0px;
                        "
                      />
                    </div>
                  </div>
                  <div class="text-default css-1hb7zxy-IndicatorsContainer"></div>
                </div>
              </div>
              <span class="text-default mx-2 w-2 self-center"> - </span>
              <div class="inline-block w-[100px] rounded-md css-b62m3t-container">
                <span id="react-select-3-live-region" class="css-1f43avz-a11yText-A11yText"></span
                ><span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="css-1f43avz-a11yText-A11yText"></span>
                <div
                  class="bg-default border-default !min-h-9 text-sm leading-4 placeholder:text-sm placeholder:font-normal dark:focus:border-emphasis focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-default hover:border-emphasis rounded-md border py-2 px-3 h-fit css-cp01gg-control"
                >
                  <div class="text-emphasis placeholder:text-muted flex gap-1 css-1qpkzkj-ValueContainer">
                    <div class="text-emphasis placeholder:text-muted css-w54w9q-singleValue">8:45am</div>
                    <div class="text-emphasis css-1q5atpo-Input" data-value="">
                      <input
                        class="focus:ring-0 focus:ring-offset-0 dark:!text-darkgray-900 !text-emphasis"
                        autocapitalize="none"
                        autocomplete="off"
                        autocorrect="off"
                        id="react-select-3-input"
                        spellcheck="false"
                        tabindex="0"
                        type="text"
                        aria-autocomplete="list"
                        aria-expanded="false"
                        aria-haspopup="true"
                        role="combobox"
                        value=""
                        style="
                          color: inherit;
                          background: 0px center;
                          opacity: 1;
                          width: 100%;
                          grid-area: 1 / 2 / auto / auto;
                          font: inherit;
                          min-width: 2px;
                          border: 0px;
                          margin: 0px;
                          outline: 0px;
                          padding: 0px;
                        "
                      />
                    </div>
                  </div>
                  <div class="text-default css-1hb7zxy-IndicatorsContainer"></div>
                </div>
              </div>
            </div>
            <button
              tooltip="Add new time slot"
              class="items-center text-sm font-medium relative rounded-md transition-colors flex justify-center h-9 px-4 py-2.5 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis min-h-[36px] min-w-[36px] !p-2 text-default mx-2"
              type="button"
              data-state="closed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="hidden sm:block">
          <button
            class="items-center text-sm font-medium relative rounded-md transition-colors flex justify-center h-9 px-4 py-2.5 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis min-h-[36px] min-w-[36px] !p-2 text-default"
            tooltip="Copy times to …"
            id="radix-:r6u:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="postcss"></style>
