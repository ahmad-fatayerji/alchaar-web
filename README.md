This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Compose (development)

Run the development server in Docker with live source mounting:

```bash
docker compose up --build
```

The application is available at [http://localhost:3000](http://localhost:3000). Stop it with `docker compose down`.

## Production deployment

Pushing to `staging` runs the production deployment workflow. It connects using the existing `SSH_HOST`, `SSH_USER`, and `SSH_PRIVATE_KEY` GitHub repository secrets, then builds and starts the application through a rootless Podman Quadlet.

Before the first deployment, clone this repository at `/opt/alchaar-web` on the production host as the SSH user, install Podman with user systemd support, and enable that user's lingering session:

```bash
sudo loginctl enable-linger <ssh-user>
```

The app listens on port 3000. Configure the host reverse proxy to forward production traffic to that port. Add application environment variables to `/opt/alchaar-web/shared/.env.production`; the file is mounted read-only into the container and is never committed.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
