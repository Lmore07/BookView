const jwt = require("jsonwebtoken");

class TokenService {
  private secretKey = "token_decode";

  public async sign(payload: any) {
    const token = jwt.sign(
      {
        data: payload,
      },
      this.secretKey,
      { expiresIn: "2h" }
    );
    return token;
  }

  public verify(token: string): boolean {
    try {
      return jwt.verify(token, this.secretKey);
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
