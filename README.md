# mestskakniznica.sk

This project is led by
the [Department of Innovation and Technology of the City of Bratislava](https://inovacie.bratislava.sk). We’re making it
entirely open-source as we believe this
promotes [savings, collaboration, auditability and innovation](https://publiccode.eu) in the public sector.

Our goal is to be transparent about services we’re developing and providing, as well as to invite other cities and
municipalities to build on top of the same or similar open-source technologies we’ve already tested and used - to foster
an ecosystem of collaboration between teams facing similar challenges. We’ll be happy
to [get in touch.](mailto:innovationteam@bratislava.sk)

We intend to make many more of our projects open-source by the end of 2022 - stay tuned!

> If you are an individual or a company who’d like to take part in these efforts, collaborate closely on development or
> report an issue, we’d love to hear from you! 🙌 Contact us using this repository or
> at [innovationteam@bratislava.sk](mailto:innovationteam@bratislava.sk)

## What's here

Each sub-folder contains README which should get you up and running. More documentation can be
found [here](https://bratislava.github.io/).

🏡 `/next` city-library Nextjs web app

🗄️ `/strapi` Strapi CMS servers (in progress, not here yet)

---

🐳 `docker-compose.yml` - if you need to quickly setup postgres or meilisearch instance, run `docker compose up` in this
directory.

### Meilisearch

After initial `docker-compose up` you have to set keys for meilisearch for both the strapi and nextjs. To get them run
the command bellow.

```
curl --request GET \
  --url http://localhost:7700/keys \
  --header 'Authorization: Bearer masterKey' \
  --header 'Content-Type: application/json' | json_pp
```

Then use "Default Admin API Key" for strapi in `strapi/.env.local` as `MEILISEARCH_ADMIN_API_KEY` and "Default Search
API Key" in `next/.env.local` file as `NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY`.

---
> Note: The project is being revisited. See notes about folder structure and the state of the project in /next/README.md
