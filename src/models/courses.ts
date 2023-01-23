import { MarkdownHeading } from 'astro';
import { AstroComponentFactory } from 'astro/dist/runtime/server';

export interface CoursesDirectory {
  [key: string]: string[];
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
  props: { slugs: string[] };
}
