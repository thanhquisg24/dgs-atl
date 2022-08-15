import Infrastructures from "../infrastructures";
import Repositories from "../repositories";
import UseCases from "../useCases";

export const diInfrastructures = Infrastructures();
export const diRepositorires = Repositories(diInfrastructures);
export const diUseCases = UseCases(diRepositorires);
