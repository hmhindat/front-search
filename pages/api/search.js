// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function search(req, res) {

  const data = await fetch('127.0.0.1:3001/search').then(result => result.json())
  res.json(data)
}

