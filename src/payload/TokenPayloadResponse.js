module.exports = class TokenPayloadResponse {
    auth;
    token;

    constructor(token, auth) {
        this.token = token;
        this.auth = auth;
    }
}