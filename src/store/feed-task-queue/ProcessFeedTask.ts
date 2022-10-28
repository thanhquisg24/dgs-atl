import { diRepositorires } from "@adapters/di";
import { CombineFeedTask, TASK_TYPE } from "./FeedTaskQueueModel";

export function processFeedTask(task: CombineFeedTask): Promise<boolean> {
  switch (task.taskType) {
    case TASK_TYPE.SAVE_LEAGUE:
      return diRepositorires.donbestFilter.postSaveLeagueFilters(task.payload);
    case TASK_TYPE.SAVE_GAME:
      return diRepositorires.donbestFilter.postSaveEventFilters(task.payload);
    case TASK_TYPE.SYNC_LINE:
      return diRepositorires.donbestFilter.postSyncLines(task.payload.dgsLeagueId);
    case TASK_TYPE.SYNC_GAME:
      return diRepositorires.donbestFilter.postSyncLeagueGame(task.payload.dgsLeagueId);
    case TASK_TYPE.COPY_TO_LEAGUE:
      return diRepositorires.donbestFilter.postCopyLeagueFilters(task.payload);
    case TASK_TYPE.DELETE_GAME:
      return diRepositorires.donbestFilter.postDeleteFilterItem(task.payload);
    case TASK_TYPE.DELETE_LEAGUE:
      return diRepositorires.donbestFilter.postDeleteFilterItem(task.payload);
    case TASK_TYPE.SYNC_ODDS:
      return diRepositorires.donbestFilter.postSyncOdds(task.payload.dgsIdGame);

    case TASK_TYPE.SYNC_SCORE:
      return diRepositorires.donbestFilter.postSyncScores(task.payload.dgsLeagueId);
    case TASK_TYPE.SYNC_TIMES:
      return diRepositorires.donbestFilter.postSyncTimes(task.payload.dgsLeagueId);
    default:
      return Promise.resolve<boolean>(false);
  }
  return Promise.resolve<boolean>(false);
}
