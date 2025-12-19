export declare class OtpService {
    private otpStore;
    private transporter;
    generateOtp(): string;
    sendOtp(email: string): Promise<{
        otp: string;
        expiresAt: number;
    }>;
    verifyOtp(email: string, otp: string): {
        valid: boolean;
        message: string;
    };
}
