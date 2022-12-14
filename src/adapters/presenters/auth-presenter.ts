import { IUserEntity, IJwtEntity } from "@adapters/entity";
import { IAuthUseCase } from "@adapters/useCases/auth-usecase";

export type IAuthPresenter = IAuthUseCase;
export class AuthPresenter implements IAuthPresenter {
  readonly useCase: IAuthUseCase;

  constructor(usecase: IAuthUseCase) {
    this.useCase = usecase;
  }

  checkInitLocalStorageLogin(): Promise<IUserEntity> {
    return this.useCase.checkInitLocalStorageLogin();
  }

  postLogin(username: string, password: string): Promise<IUserEntity> {
    return this.useCase.postLogin(username, password);
  }

  postLogout(username: string): Promise<string> {
    return this.useCase.postLogout(username);
  }

  postRefreshToken(refreshToken: string): Promise<IJwtEntity> {
    return this.useCase.postRefreshToken(refreshToken);
  }

  postCheckToken(token: string): Promise<boolean> {
    return this.useCase.postCheckToken(token);
  }
}
