/**
 * 环境API封装类。
 *
 * @author Guanyu Hu
 * @since 2022-10-29
 */
class Environment {
    /**
     * 应用名称。
     */
    public static applicationName = "DevTrack";
    /**
     * 标题后缀。
     */
    private static suffix = "DevTrack";

    /**
     * 设置网页标题。
     * @param prefix 标题前缀。
     * @param suffix 标题后缀，默认为Environment.#suffix.
     * @param separator 标题分隔符，默认为短横线(-)。
     * @author Guanyu Hu
     * @since 2022-10-30
     */
    public static setTitle(prefix: string, suffix?: string, separator?: string) {
        if (prefix)
            if (suffix)
                if (separator)
                    document.title = prefix + " " + separator + " " + suffix;
                else
                    document.title = prefix + " - " + suffix;
            else
                document.title = prefix + " - " + this.suffix;
        else
            document.title = this.applicationName;
    }
}

export default Environment;
