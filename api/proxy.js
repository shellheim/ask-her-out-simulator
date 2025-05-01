export default async function handler(req, res) {
  const response = await fetch("https://naas.isalman.dev/no");
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
