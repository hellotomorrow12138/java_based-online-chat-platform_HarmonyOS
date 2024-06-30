// import preferences from '@ohos.data.preferences';
//
// class login_util {
//
//   prefMap: Map<string, preferences.Preferences> = new Map()
//
//   async loadPreference(context, name:string) {
//       try {
//         let pref = await preferences.getPreferences(context, name)
//         await this.prefMap.set(name, pref)
//         console.log('load'+ `${name}`);
//       } catch (e) {
//         console.log('load'+`${name}`, JSON.stringify(e));
//       }
//
//   }
//
//   async putPreference(name:string, key:string, value: preferences.ValueType) {
//     if (!this.prefMap.has(name)) {
//       console.log('put'+`${name}尚未初始化`);
//       return
//     }
//     let pref = this.prefMap.get(name)
//     // 写入数据
//     await pref.put(key, value)
//     // 刷盘
//     await pref.flush()
//   }
//
//   async getPreference(name:string, key:string, DefaultValue: preferences.ValueType) {
//     if (!this.prefMap.has(name)) {
//       console.log('get'+`${name}尚未初始化`);
//       return
//     }
//     let pref = this.prefMap.get(name)
//     // 读取数据
//     return await pref.get(key, DefaultValue)
//   }
// }
// const loginUtil = new login_util()
// export default loginUtil as login_util