import data from "../../../sample_data";

export default function handler(req, res) {
  const slugs = data.map((link) => link.slug);

  res.status(200).json(slugs);
}
