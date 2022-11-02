# What's new posts

These posts describe the monthly updates of the projects in our community.

-   Each file must have the file format `YYYY-MM-MonthName`. Examples:

    ```graphql
    whats-new/
    ├── 2022-11-november.mdx
    └── 2022-12-december.mdx
    └── 2023-01-january.mdx
    ```

    `MonthName` should be the month that the work occurred in. So for example `2022-10-October.mdx` will include all changes that occured between October 1 - October 31, regardless of when the document is actually published to the website.

-   Any post with a file name starting with `_` will be ignored. This is useful for keeping posts private. This `readme.md` file is also ignored.

-   The posts require to be a `.mdx` file and to have a specific frontmatter at the beggining. Take `/src/pages/whats-new/_template.mdx` as a reference when starting a new post.

-   The three most recent posts will be shown on the landing page in the What's new section. To properly show them make sure to implement each post's frontmatter as the template indicates.
