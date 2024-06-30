import mediaQuery from '@ohos:mediaquery';
/**
 * Media query listener.
 */
class MediaQueryModel {
    constructor() {
        this.listener = mediaQuery.matchMediaSync(`(height <= 360vp)`);
    }
    /**
     * Method for media query to trigger execution.
     *
     * @param mediaQueryResult Media query result.
     */
    onPortrait(mediaQueryResult) {
        AppStorage.Set('isMinHeight', mediaQueryResult.matches);
    }
    /**
     * Register listener.
     */
    register() {
        let portraitFunc = this.onPortrait.bind(this);
        this.listener.on('change', portraitFunc);
    }
    /**
     * Deregister Listener.
     */
    unRegister() {
        let portraitFunc = this.onPortrait.bind(this);
        this.listener.off('change', portraitFunc);
    }
}
let mediaQueryModel = new MediaQueryModel();
export default mediaQueryModel;
//# sourceMappingURL=MediaQueryModel.js.map