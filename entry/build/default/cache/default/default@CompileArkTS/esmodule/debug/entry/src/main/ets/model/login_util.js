import preferences from '@ohos:data.preferences';
class login_util {
    constructor() {
        this.prefMap = new Map();
    }
    async loadPreference(context, name) {
        try {
            let pref = await preferences.getPreferences(context, name);
            await this.prefMap.set(name, pref);
            console.log('load' + `${name}`);
        }
        catch (e) {
            console.log('load' + `${name}`, JSON.stringify(e));
        }
    }
    async putPreference(name, key, value) {
        if (!this.prefMap.has(name)) {
            console.log('put' + `${name}尚未初始化`);
            return;
        }
        let pref = this.prefMap.get(name);
        // 写入数据
        await pref.put(key, value);
        // 刷盘
        await pref.flush();
    }
    async getPreference(name, key, DefaultValue) {
        if (!this.prefMap.has(name)) {
            console.log('get' + `${name}尚未初始化`);
            return;
        }
        let pref = this.prefMap.get(name);
        // 读取数据
        return await pref.get(key, DefaultValue);
    }
}
const loginUtil = new login_util();
export default loginUtil;
//# sourceMappingURL=login_util.js.map