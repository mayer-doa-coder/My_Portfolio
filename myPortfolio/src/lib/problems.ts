import { ProjectsList } from "./ProjectsList";

// Projects presented as a contest problemset: A, B, C, ...
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const Problems = ProjectsList.filter((p) => !p.hideProject).map(
  (project, i) => ({
    ...project,
    letter: String.fromCharCode(65 + i),
    slug: slugify(project.Name),
    hasSource: project.Source !== "#",
  }),
);

export type Problem = (typeof Problems)[number];
