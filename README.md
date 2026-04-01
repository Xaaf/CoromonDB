# CoromonDB
> A web-app made with the goal of providing useful information in a clean way!

<hr />

Currently, there are two branches -- `stable` and `dev`. As the names imply, `stable` is supposed to hold only a stable version of the web-app. This is also the version that is being deployed to the [live website](https://coromondb.xaaf.dev/). The `dev` branch contains the latest additions, and is prone to bugs and other issues. Only use this branch if you know what you're doing!

## Running the Development Server
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

## Useful Links
- [Coromon Wiki.gg](https://coromon.wiki.gg/) - the original Coromon wiki, maintained by the community.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
