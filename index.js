import { createMenu } from "./recipes";
import moment from "moment";
import normalTemplate from "./templates/normal";
import fs from "fs";

const week = moment().week();
console.log(
  `Menu para la semana ${week}`,
  JSON.stringify(createMenu(normalTemplate), null, 4),
);
