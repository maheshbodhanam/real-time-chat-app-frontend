import CryptoJS from "crypto-js";

const secretKey =
  "6e09280a9d072496281d7840f0e2467eba729ad0795aaca73de4d655cf7ebbc4"; // Replace with your actual secret key

export const EncryptMessage = (message) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
  return encryptedMessage;
};

export const DecryptMessage = (message) => {
  try {
    const decryptedMessage = CryptoJS.AES.decrypt(message, secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return decryptedMessage;
  } catch (error) {
    // Handle decryption errors (e.g., when the message is not encrypted)
    return message;
  }
};
