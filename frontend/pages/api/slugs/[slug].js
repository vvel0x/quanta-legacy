import data from "../../../sample_data";

export default function handler(req, res) {
  const { slug } = req.query;

  const slugs = data.find((link) => link.slug === slug);

  res.status(200).json(slugs);
}
