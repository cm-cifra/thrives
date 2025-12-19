import { OtpService } from './otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(email: string): Promise<{
        otp: string;
        expiresAt: number;
    }>;
    verifyOtp(email: string, otp: string): {
        valid: boolean;
        message: string;
    };
}
