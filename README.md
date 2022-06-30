# mestskakniznica.sk

What's here

🏡 `/next` city-library Nextjs web app

🗄️ `/strapi` Strapi CMS servers (in progress, not here yet)

---

🐳 `docker-compose.yml` - if you need to quickly setup postgres instance, run `docker compose up` in this directory (you need
docker installed) - will be relevant once strapi is available

You need the following installed locally:

- [docker](https://www.docker.com/)
- [node v16](https://nodejs.org/en/)

Afterward, install `node_modules` with

```bash
yarn install
```

## Editor setup

We recommend using [VS Code](https://code.visualstudio.com/) with the following extensions installed and formatting your code on save enabled (or, at minimum, formatting before commit):

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

To setup vscode, open settings.json and insert following lines.

The `organizeImports` will remove all unused imports, `formatDocument` will run prettier an `fixAll.eslint` will run eslint fix. The order of these commands is important.

The `files.insertFinalNewline` setting will add a new line at the end of the document.

```json
"editor.codeActionsOnSave": {
  "source.organizeImports": true,
  "source.formatDocument": true,
  "source.fixAll.eslint": true
},
"files.insertFinalNewline": true,

// this is optional but recommended
"typescript.preferences.importModuleSpecifier": "project-relative",
"files.autoSave": "onFocusChange",

```

If you prefer a different editor, it's completely fine. Still, you should find the counterparts of the extensions and setup mentioned above that help you with formatting and a suitable typescript integration (which is a part of default VS Code installation).

### Optional extensions

These are not needed but either nice to have or project-specific. Again listing VS Code extensions, users of different editors need to find their counterparts:

- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - for frontend devs
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) - for easier reading of .md files
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - for .env files syntax highlighting
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - for easier React and html tags renaming
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - for automatically inserting closing tag
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) - for backend devs using Prisma

## Git workflow (committing, submitting & reviewing pull requests)

### Commit message, branch and PR name formats

Preffered way of branch naming is `{issue-id}/{2-3 word summary}`, for example `MKB-460/form-captcha`.

Titles of pull requests should begin with issue id and one sentence description, for example "MKB-460: Add Google Recapcha to page forms".

For commit messages and pull request description please follow the conventions the way they are written here https://namingconvention.org/git/. If multiple options are provided (i.e. for commit message formatting), then all of them are ok.

### Labels & Assignees

We are using labels and assignees to navigate easily through the open pull requests. Labels should be self explanatory. **Assignee should always be the person whose action is required to move the PR forward.** That is, if the PR is waiting for review by someone, the reviewer should be an assignee. If a code change is expected by a person, or a question needs to be answered, assign the PR to the person making the change or capable of answering. This way you can easily see which PRs are waiting for your actions, request assistance, or know who should you bother if your PR is stuck 🙂.

The usual PR workflow involves assigning the PR between a selected reviewer and the author, while also swapping the `needs work` and `needs review` labels depending on the current state. Once the reviewer is satisfied, they'll assign a `fix & ship` label, leaving it up to the author to merge at his or hers convenience, optionally fixing some minor issues before doing so (without the need for a further review).

### Resolving conversations

It is helpful to resolve (github) conversations you have started if you feel the topic has been answered. This goes particularly for reviewers doing multiple passes on a single PR - try to resolve what you can before adding more comments on a subsequent pass.

### Merging & Rebasing

Before commiting and particularly before merging to master, you have to run `yarn build` locally to check if the app is buildable. We do not have pipelines for that yet, therefore is up to the pull request author.

Squash & merge into master. Liberal use of `rebase` for cleaning up your own feature branches (mainly if you tend to create and push work-in-progress commits) is encouraged. If your local commits are _way_ out of control, you might be required to do so before your PR is accepted (but this happens rarely).

_Still, be carefull_ if someone else branches off one of your feature branches - to make his life easier, you should avoid rebasing, if possible, past the point they've branched at - at least until your work is ready to become a part of master.

---
