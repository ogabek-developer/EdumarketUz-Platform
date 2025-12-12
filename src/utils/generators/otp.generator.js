
export const otpGenerator = () => {
    let randomNumbers = Number(Array.from({length: 6}, () => Math.ceil(Math.random() * 9)).join(""));
    let otpTime = Date.now() + 120000;
    return {
        otp: randomNumbers,
        otpTime
    }
};