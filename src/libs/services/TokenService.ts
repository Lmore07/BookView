import * as jose from "jose";
var jwt = require("jsonwebtoken");

class TokenService {
  private secretKey = "";

  public async sign(payload: any) {
    var token = jwt.sign(
      {
        data: payload,
      },
      this.secretKey,
      { expiresIn: "1h" }
    );
    return token;
  }

  public verify(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async decode(token: string) {
    var decoded = jwt.decode(token, { complete: true });
    return decoded;
  }
}

export default new TokenService();
