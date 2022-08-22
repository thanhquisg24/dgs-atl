export default function mockUser(mock: any): void {
  mock.onGet("/api/frontend/v1/agent/auth/check_token").reply(() => {
    const user = {
      _rcode: "SUCCESS",
      status: "ok",
      agentId: 1,
      username: "agent test",
    };
    return [200, user];
  });
  mock.onPost("/api/frontend/v1/agent/auth/signin").reply(() => {
    const jwt = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJERUFMRVIiXSwiZXhwIjoxNjE1MTk0Mzg4LCJ1c2VyIjoiZGVhbGVyMSIsInNpZCI6IkVWNUR2UW5WYm4waXY4YmYwN3IxSXZ0UDE2MTQ5MzUxODgifQ.ssCT8zU9o5zdvbfsPHL8dlodejHzUXfe8ZYT7dzfeBw",
      type: "Bearer",
      refreshToken: "tstokenasd",
      username: "alex",
      userId: 1,
      tokenExpiration: 3000,
      _rcode: "SUCCESS",
    };
    return [200, jwt];
  });
  mock.onPost("/api/frontend/v1/agent/auth/logout").reply(() => {
    const msg = {
      message: "logout successfully",
      _rcode: "SUCCESS",
    };
    return [200, msg];
  });
  mock.onPost("/api/frontend/v1/agent/auth/refresh-token").reply(() => {
    const rsJwt = {
      accessToken: "asdasdsadsadjuiohywertiuyuewryewry",
      refreshToken: "rstoken",
      tokenType: "Bearer",
    };
    return [200, rsJwt];
  });
}
