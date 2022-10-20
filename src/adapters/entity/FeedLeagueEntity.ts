interface ICommonEntity {
  id: number;

  name: string;

  abbreviation: string;
}

export interface IFeedLeagueEntity extends ICommonEntity {
  sport: ICommonEntity;
}
