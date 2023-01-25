// @component ./Question.astro
// import { default as Option } from './Option.astro';
import { default as Option } from './Option.vue';
import { default as Quiz } from './Question.vue';
Quiz.Option = Option;

export { Quiz };
