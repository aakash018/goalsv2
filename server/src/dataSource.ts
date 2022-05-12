import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  username: "dev",
  password: "password",
  database: "goals",
  synchronize: true,
  entities: [User],
});
