import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 3000, // 50 minutes
  checkperiod: 60,
  deleteOnExpire: false,
});
