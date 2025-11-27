import express from "express";
import cors from "cors";
import { config } from "dotenv";
import ideaRoutes from "./routes/ideaRouter"
import statsRoutes from "./routes/statsRouter"

config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/ideas", ideaRoutes )

app.use("/stats", statsRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server running in PORT ${process.env.PORT}`);
})