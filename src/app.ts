import * as fs from "fs";
import * as util from "util";
import * as url from "url";
import { MapDal } from "./dal/dal-map";
import { Logger } from "./logger";
import { IConfiguration } from "./types/config";
import express = require("express");
import bodyParser = require("body-parser");

// convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

// getting the configuration from file for now
async function getConfig(): Promise<IConfiguration> {
  let content: any = await readFile("./config.json", "utf8");
  return JSON.parse(content) as IConfiguration;
}

async function main() {
  let mapDal: MapDal = new MapDal();
  let conf = await getConfig();

  let logger = new Logger(conf.logLevel);
  logger.debug("running with configuration: ", JSON.stringify(conf));

  let app: express.Express = express();

  app.use(express.static("public"));
  app.use(bodyParser.json());

  app.get(
    "/v1/route",
    (req: express.Request, res: express.Response): any => {
      let urlParts = url.parse(req.url, true);
      // let query = urlParts.query;
      let userId: string = req.query.user;
      // let trgId: string = req.query.;

      if (userId) {
        let aRoute = mapDal.getRouteForUser(userId);
        res.send({ locations: aRoute });
      } else {
        res.sendStatus(404);
      }
    }
  );

  app.post(
    "/v1/route",
    (req: express.Request, res: express.Response): any => {
      let urlParts = url.parse(req.url, true);
      // let query = urlParts.query;
      let userId: string = req.query.user;
      // let trgId: string = req.query.;

      if (userId) {
        let aRoute = mapDal.setRouteForUser(userId, req.body.route);
        res.send("ok");
      } else {
        res.sendStatus(404);
      }
    }
  );

  let port = process.env.PORT || 3000;

  app.listen(port, () => {
    logger.info("Service listening on port: ", port);
  });
}
main();
