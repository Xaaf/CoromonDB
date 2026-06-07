<center>

# CoromonDB
![GitHub License](https://img.shields.io/github/license/:Xaaf/:CoromonDB)
![Vercel Deploy Stable](https://deploy-badge.vercel.app/vercel/coromon-db?name=stable)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> A web-app made with the goal of providing useful information about **Coromon** in a clean way!

</center>

<hr />

Currently, there are two branches -- `stable` and `dev`. As the names imply, `stable` is supposed to hold only a stable version of the web-app, which is viewable on the  [live website](https://coromondb.xaaf.dev/). The `dev` branch contains the latest additions, and is prone to bugs and other issues. Those interested can view this live as well, on the [preview website](https://preview.coromondb.xaaf.dev/) Only use this branch if you know what you're doing!

> [!WARNING]
> The preview website pulls from the `dev` branch. Every so often I tend to create a clean branch from `stable`, leading to the preview page being down for a minute. When this happens, it leads to a Vercel login screen. Feel free to contact me on Discord (`xaaf`) when this happens!

<hr />

## Installation
The project is easy to run, as it is based on the NextJS framework. Make sure that you have all the dependencies installed, a supplied `.env` file, then simply run the server.
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://mycooldatabase.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=SomeCoolKey
```

```bash
# Install dependencies (e.g. with npm)
npm install
# Run the server (e.g. with npm)
npm run dev
```

After starting the server, we can view the site locally at [http://localhost:3000](http://localhost:3000).

<hr />

## Contributing
First of all, thank you for taking an interest in contributing to the project! It really means a lot to me! I welcome any and all contributions to the project, so feel free to make a fork and pull request! For a little more guidance on contributing, read along.

1. Fork the repository
2. Create a feature branch
    - Please try to follow the naming convention for PRs for this. I.e. `feat/added-pokemon` for a feature or `fix/added-swurmy-titan` for fixes.
3. Commit your changes with sensible commit messages. Personally, I try to stick to a format that I borrow from [this cheatsheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).
4. Push to the branch (using your forked repo).
5. Create a pull request.

I'll try to be fast in responding to pull requests, however since I am a fulltime student with a part time job, please bear in mind that I also have responsibilities! If you think your PR is an important change/addition and needs to be integrated ASAP, don't hesitate to reach out on Discord (`xaaf`).

<hr />

## Note on AI Usage
As an observant person might've already noticed, there are some AI-related files here, namely `AGENTS.md` and `CLAUDE.md`. **CoromonDB** started out for me as a passion project to delve into web development and learn more about it. Because of this, the code quality is most likely all over the place! One thing you will *not* see though, is AI-written code. I am using AI in a purely analytical sense, as well as a brainstorming tool. I'd like to preserve my critical thinking capability, so I prefer to look at docs and forums over an AI chat.

To elaborate a bit for those curious, this means that I sometimes ask an LLM to go through the project and point out things that could or should be changed. Think architectural decisions, naming conventions and code quality. Like I said before, I do prefer to write my code by hand, so this really is a passion project and a testament to my current level of web-dev skills.

<hr />

## Useful Links
- [Coromon Wiki.gg](https://coromon.wiki.gg/) - the original Coromon wiki, maintained by the community.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
