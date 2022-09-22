
var fs = require('fs');
var db : any;
var engine : any;

// load config
var cfg = JSON.parse(fs.readFileSync("./hooks.config.json"));

export function getDB() {
    // load requested engine and define engine-agnostic getDB function
    if (cfg.app.engine == "mongodb") {
        engine = require("mongodb");
        module.exports.getDB = function () {
            if (!db) db = new engine.Db(cfg.mongo.db,
                new engine.Server(cfg.mongo.host, cfg.mongo.port, cfg.mongo.opts),
                { native_parser: false, safe: true });
            return db;
        }
    } else {
        engine = require("tingodb")({});
        module.exports.getDB = function () {
            if (!db) db = new engine.Db(cfg.tingo.path, {});
            return db;
        }
    }
}
