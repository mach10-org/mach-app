import { MarkdownHeading } from 'astro';
import { AstroComponentFactory } from 'astro/dist/runtime/server';
import { CollectionEntry } from 'astro:content';

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

export type RenderPromise = {
  render(): Promise<Render>;
};
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
