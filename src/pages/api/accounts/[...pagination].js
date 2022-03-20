import nextConnect from 'next-connect';
import { getAllAccounts } from '../../../controllers/account.controller';

const handler = nextConnect();

handler.get(async (req, res) => {
  const {
    pagination: [page, limit],
  } = req.query;
  const data = await getAllAccounts(page, limit);
  res.json(data);
});

export default handler;
