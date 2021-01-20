import CryptoJS from './aes';
// var CryptoJS = require('./aes.js')
/**
 *     CryptoJS  扩展
 */
CryptoJS.pad.ZeroPadding = {
    pad: function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;

        // Pad
        data.clamp();
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
    },

    unpad: function (data) {
        // Shortcut
        var dataWords = data.words;

        // Unpad
        var i = data.sigBytes - 1;
        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
            i--;
        }
        data.sigBytes = i + 1;
    }
};

/* 解密 方法 */
export default {
  CryptoJS,
  decode: function(data){
    

      var key = CryptoJS.enc.Utf8.parse("ab6dw54f6as87941");
      var iv = CryptoJS.enc.Utf8.parse('1946446819894740');
      var decrypted = CryptoJS.AES.decrypt(data,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
      decrypted=decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
  }
};
