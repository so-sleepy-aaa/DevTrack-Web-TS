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

    /**
     * 将图片转换为Base64编码。
     *
     * @param image 图片
     * @param type 图片类型。
     * @author Guanyu Hu
     * @since 2022-11-01
     */
    public static imageToBase64(image: HTMLImageElement, type: "png" | "jpeg" | "jpg" | "gif") {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        return canvas.toDataURL("image/" + type);
    }

    public static imageFileToBase64(fileName: string) {
        const type = <"png" | "jpeg" | "jpg" | "gif">fileName.split(".")[1];
        let base64 = "";
        const image = new Image();
        image.src = fileName;
        image.onload = () => {
            base64 = this.imageToBase64(image, type);
        };
        return base64;
    }
}

export default Environment;
