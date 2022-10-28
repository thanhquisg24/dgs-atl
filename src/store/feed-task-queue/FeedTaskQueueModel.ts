import { IFilterDeleteItemPayload, ILeagueFilterPayload } from "@adapters/dto";
import { IFilterPeriodEntity } from "@adapters/entity";

// eslint-disable-next-line no-shadow
export enum TASK_TYPE {
  SAVE_LEAGUE = "SAVE_LEAGUE",
  SAVE_GAME = "SAVE_GAME",
  SYNC_LINE = "SYNC_LINE",
  SYNC_GAME = "SYNC_GAME",
  SYNC_SCORE = "SYNC_SCORE",
  SYNC_TIMES = "SYNC_TIMES",
  SYNC_ODDS = "SYNC_ODDS",
  COPY_TO_LEAGUE = "COPY_TO_LEAGUE",
  DELETE_LEAGUE = "DELETE_LEAGUE",
  DELETE_GAME = "DELETE_GAME",
}

export interface IFeedTaskQueueModel<P, T> {
  taskObject: string;
  taskType: T;
  payload: P;
}

export type Save_League_Task_Type = IFeedTaskQueueModel<ILeagueFilterPayload, TASK_TYPE.SAVE_LEAGUE>;
export type Save_Game_Task_Type = IFeedTaskQueueModel<IFilterPeriodEntity[], TASK_TYPE.SAVE_GAME>;
export type Sync_Line_Task_Type = IFeedTaskQueueModel<{ dgsLeagueId: number }, TASK_TYPE.SYNC_LINE>;
export type Sync_Game_Task_Type = IFeedTaskQueueModel<{ dgsLeagueId: number }, TASK_TYPE.SYNC_GAME>;

export type Sync_Scores_Task_Type = IFeedTaskQueueModel<{ dgsLeagueId: number }, TASK_TYPE.SYNC_SCORE>;
export type Sync_Times_Task_Type = IFeedTaskQueueModel<{ dgsLeagueId: number }, TASK_TYPE.SYNC_TIMES>;
export type Sync_Odds_Task_Type = IFeedTaskQueueModel<{ dgsIdGame: number }, TASK_TYPE.SYNC_ODDS>;

export type Copy_to_league_Task_Type = IFeedTaskQueueModel<ILeagueFilterPayload[], TASK_TYPE.COPY_TO_LEAGUE>;
export type Delete_league_Task_Type = IFeedTaskQueueModel<IFilterDeleteItemPayload, TASK_TYPE.DELETE_LEAGUE>;
export type Delete_game_Task_Type = IFeedTaskQueueModel<IFilterDeleteItemPayload, TASK_TYPE.DELETE_GAME>;

export type CombineFeedTask =
  | Save_League_Task_Type
  | Save_Game_Task_Type
  | Sync_Line_Task_Type
  | Sync_Game_Task_Type
  | Sync_Scores_Task_Type
  | Sync_Times_Task_Type
  | Sync_Odds_Task_Type
  | Copy_to_league_Task_Type
  | Delete_league_Task_Type
  | Delete_game_Task_Type;
