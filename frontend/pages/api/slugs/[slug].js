import redis from "../../../lib/redis";

export default async function handler(req, res) {
  const { slug } = req.query;
  const key = "quanta:" + slug;

  switch (req.method) {
    case "GET":
      const data = await redis
        .hgetall(key)
        .catch((err) => res.status(500).send(err));

      res.status(200).json(data);
      break;

    case "DELETE":
      const { data: link } = req.body;
      const deleteSlug = await redis
        .del(key)
        .then(
          async () => await redis.srem("quanta:index", JSON.stringify(link))
        )
        .catch((err) => res.status(500).send(err));

      if (!deleteSlug) res.status(500).send();
      res.status(200).send();

    default:
      break;
  }
}
