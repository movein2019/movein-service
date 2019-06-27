export class MapDal {
  public userRoutes: Map<string, string>;

  constructor() {
    this.userRoutes = new Map<string, string>();
    // this.userRoutes["u1"] = ["a", "b", "d"];
  }

  public setRouteForUser(userId: string, route: string[]) {
    this.userRoutes[userId] = route;
  }

  public getRouteForUser(userId: string): string[] {
    if (userId) {
      return this.userRoutes[userId];
    }
  }
}
