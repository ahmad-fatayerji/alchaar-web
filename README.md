# Al-Chaar Pharmacy

Static site. No Node, no build step. The pages live in `site/`.

## Run it locally

Pick either.

**Python (no Docker needed):**

    cd site
    python -m http.server 3000

**Docker (same nginx as production):**

    docker compose up

Then open <http://localhost:3000>. `site/` is bind-mounted, so edits show up on refresh.

There is no `npm run dev` anymore — the old Next.js app was removed.

## Deploy

Push to `prod`. The GitHub Action SSHes to the server and runs
`ops/podman-quadlet-deploy.sh`, which builds the image and restarts the
Quadlet unit on 127.0.0.1:3000.
