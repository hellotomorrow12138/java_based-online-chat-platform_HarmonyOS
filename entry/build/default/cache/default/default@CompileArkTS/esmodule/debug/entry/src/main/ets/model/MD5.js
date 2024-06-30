import cryptoFramework from '@ohos:security.cryptoFramework';
import util from '@ohos:util';
export class MD5 {
    static unity8ArrayToShowStr(unity8Array) {
        return Array.prototype.map
            .call(unity8Array, (x) => ('00' + x.toString(16)).slice(-2))
            .join('');
    }
    static async md5(input) {
        let md = cryptoFramework.createMd('MD5');
        let encode = new util.TextEncoder();
        let data = { data: encode.encodeInto(input) };
        await md.update(data);
        let result = await md.digest();
        if (result != null) {
            return this.unity8ArrayToShowStr(result.data);
        }
        else {
            return '';
        }
    }
}
//# sourceMappingURL=MD5.js.map