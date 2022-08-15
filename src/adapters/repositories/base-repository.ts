import { IInfrastructures } from "../infrastructures";

export class BaseRepository {
  readonly infra: IInfrastructures;

  constructor(infrastructure: IInfrastructures) {
    this.infra = infrastructure;
  }
}
