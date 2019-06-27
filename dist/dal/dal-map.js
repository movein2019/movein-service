"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapDal {
    constructor() {
        this.userRoutes = new Map();
        // this.userRoutes["u1"] = ["a", "b", "d"];
    }
    setRouteForUser(userId, route) {
        this.userRoutes[userId] = route;
    }
    getRouteForUser(userId) {
        if (userId) {
            return this.userRoutes[userId];
        }
    }
}
exports.MapDal = MapDal;
//# sourceMappingURL=dal-map.js.map