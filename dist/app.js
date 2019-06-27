"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const url = require("url");
const dal_map_1 = require("./dal/dal-map");
const logger_1 = require("./logger");
const express = require("express");
const bodyParser = require("body-parser");
// convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
// getting the configuration from file for now
function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield readFile("./config.json", "utf8");
        return JSON.parse(content);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let mapDal = new dal_map_1.MapDal();
        let conf = yield getConfig();
        let logger = new logger_1.Logger(conf.logLevel);
        logger.debug("running with configuration: ", JSON.stringify(conf));
        let app = express();
        app.use(express.static("public"));
        app.use(bodyParser.json());
        app.get("/v1/route", (req, res) => {
            let urlParts = url.parse(req.url, true);
            // let query = urlParts.query;
            let userId = req.query.user;
            // let trgId: string = req.query.;
            if (userId) {
                let aRoute = mapDal.getRouteForUser(userId);
                res.send({ locations: aRoute });
            }
            else {
                res.sendStatus(404);
            }
        });
        app.post("/v1/route", (req, res) => {
            let urlParts = url.parse(req.url, true);
            // let query = urlParts.query;
            let userId = req.query.user;
            // let trgId: string = req.query.;
            if (userId) {
                let aRoute = mapDal.setRouteForUser(userId, req.body.route);
                res.send("ok");
            }
            else {
                res.sendStatus(404);
            }
        });
        let port = process.env.PORT || 3000;
        app.listen(port, () => {
            logger.info("Service listening on port: ", port);
        });
    });
}
main();
//# sourceMappingURL=app.js.map