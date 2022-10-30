class ApiUrl {
    public static readonly baseUrl = "http://10.117.12.66:8181/";

    public static readonly signIn = ApiUrl.baseUrl + "accounts/login";
    public static readonly signUp = ApiUrl.baseUrl + "accounts/signup";

    public static readonly sendVCode = ApiUrl.baseUrl + "email-task/send-verification-code";
}

export default ApiUrl;
