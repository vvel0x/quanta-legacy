// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import redis from "../../lib/redis";

export default async function handler(req, res) {
  if (req.method !== "PATCH") res.status(400).send();

  const { prefix } = req?.body;

  const applySettings = await redis
    .set("quanta:prefix", prefix)
    .catch((e) => res.status(500).send(e));
  if (applySettings) res.json(prefix);

  res.status(500).send();
}
