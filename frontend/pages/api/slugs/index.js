import redis from "../../../lib/redis";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { name = null, url = null, slug = null } = req.body;
      const timestamp = new Date(Date.now()).toISOString();

      // Check if the required fields are empty
      if (!name || !url || !slug)
        res.send(400).send("Required fields are empty");

      const key = "quanta:" + slug;

      // Check if slug already exists
      const slugExists = await redis
        .hlen(key)
        .catch((e) => res.status(500).send(e));

      if (slugExists) res.status(400).send("Slug already exists");

      // If there are no conflicts, we can proceed to add the entry into the DB
      const addSlug = await redis
        .hset(key, {
          created: timestamp,
          hits: 0,
          url: url,
        })
        .catch((e) => res.status(500).send(e));

      // Add to index
      const indexVal = JSON.stringify({ slug, name });
      const addToIndex = await redis
        .sadd("quanta:index", indexVal)
        .catch((e) => res.status(500).send(e));

      if (addToIndex) return res.status(200).send(req.body);
      res.status(500).send();
      break;

    case "GET":
      const prefix = await redis.get("quanta:prefix");
      const links = await redis
        .smembers("quanta:index")
        .catch((err) => res.status(500).send(err));

      res.status(200).json({ prefix, links });
      break;

    default:
      res.status(400).send();
      break;
  }
}
