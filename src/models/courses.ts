import { MarkdownHeading } from 'astro';
import { AstroComponentFactory } from 'astro/dist/runtime/server';
import { CollectionEntry } from 'astro:content';

export interface CoursesInfos {
  title: string;
  quantity: number;
  duration: number;
}

export interface CoursesDirectoryProp {
  slugs?: string[];
  courses?: CollectionEntry<Collection>[];
  entry: CollectionEntry<Collection> | null;
}
export interface CoursesDirectory {
  [key: string]: CoursesDirectoryProp;
}

export type Collection = 'courses';

export type Render = {
  Content: AstroComponentFactory;
  headings: MarkdownHeading[];
  remarkPluginFrontmatter: Record<string, any>;
};
export type CourseParams = {
  course: string;
  slug: string;
};

// export type RenderPromise = {
//   render(): Promise<Render>;
// };
export type Params = { [key: string]: string };
export interface CollectionStaticProps {
  params: Params;
  props: CoursesDirectoryProp;
}

export interface QuizOption {
  label: string;
  isAnswer?: boolean;
  xp?: string;
  explain?: string;
  id: string;
}

export interface CourseProps {
  href?: string;
  course: CollectionEntry<Collection>;
}

export interface CourseDataProps {
  title: string;
  description: string;
  lastmod: Date;
  section?: string;
  preview: string;
  previewRatio: `${number}:${number}`;
  tags: string[];
}
export interface MinutesRead {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface CourseRender extends Render {
  remarkPluginFrontmatter: CourseDataProps & {
    minutesRead: MinutesRead;
  };
}
export type GroupCourse = {
  [key: string]: CollectionEntry<Collection>[];
};
