import preferences from '@ohos:data.preferences';
class PreferencesUtil {
    constructor() {
        this.prefMap = new Map();
    }
    async loadPreference(context, name) {
        try {
            let pref = await preferences.getPreferences(context, name);
            this.prefMap.set(name, pref);
            console.log('testTag', `加载preferences[${name}]成功`);
        }
        catch (e) {
            console.log('testTag', `加载preferences[${name}]失败`, JSON.stringify(e));
        }
    }
    async putPreferenceUtilValue(name, key, value) {
        if (!this.prefMap.has(name)) {
            console.log('testTag', `加载preferences[${name}]尚未初始化`);
            return;
        }
        let pref = this.prefMap.get(name);
        // 写入数据
        await pref.put(key, value);
        await pref.flush();
    }
    async getPreferenceUtilValue(name, key, defaultValue) {
        if (!this.prefMap.has(name)) {
            console.log('testTag', `加载preferences[${name}]尚未初始化`);
            return;
        }
        let pref = this.prefMap.get(name);
        // 写入数据
        return await pref.get(key, defaultValue);
    }
}
const preferencesUtil = new PreferencesUtil();
export default preferencesUtil;
//# sourceMappingURL=PerferencesUtil.js.map