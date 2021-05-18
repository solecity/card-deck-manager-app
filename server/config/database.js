// libraries
import dotenv from "dotenv";

dotenv.config();

export const URI = `mongodb+srv://test:${process.env.DB_PASS}@praticecluster.3ciuh.mongodb.net/cardsmanagerdb?retryWrites=true&w=majority`;
