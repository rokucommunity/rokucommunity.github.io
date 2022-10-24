# What's new posts

These posts describe the monthly updates of the projects in our community.

- Each month must be created inside a `year` folder and named with a format that orders them in **ascending order**. For example:

```
whats-new/
├── 2022
│   ├── 09-september.mdx
│   ├── 10-october.mdx
│   ├── 11-november.mdx
│   └── 12-december.mdx
├── 2023
    └── 01-january.mdx
```

- Any post with a file name starting with `_` will be ignored. This is useful for keeping posts private. This `readme.md` file is also ignored.

- The posts require to be a `.mdx` file and to have a specific frontmatter at the beggining. Take `/src/pages/whats-new/_template.mdx` as a reference when starting a new post.

- The three most recent posts will be shown on the landing page in the What's new section. To properly show them make sure to implement each post's frontmatter as the template indicates.
