import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

await connectDB();

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
