import { handleMethods } from '@bratislava/next-backend-api';
import OpacClient from '../../utils/opac-old';

export default handleMethods()
  .get()<any>(async (req, res) => {
    try {
      const books = await OpacClient.fetchOpacBookNews();
      return res.json({ books });
    } catch (error: any) {
      return res.status(500).json({
        message: error?.message ?? 'Could not load fetchOpacBookNews',
      });
    }
  })
  .prepare();
