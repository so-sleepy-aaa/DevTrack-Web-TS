class ApiUrl {
    public static readonly baseUrl = "http://10.117.12.66:8181/";

    public static readonly signIn = ApiUrl.baseUrl + "accounts/signIn";
    public static readonly signUp = ApiUrl.baseUrl + "accounts/signUp";

    public static readonly sendVCode = ApiUrl.baseUrl + "email/signUpVCode";
}

export default ApiUrl;
