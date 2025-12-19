"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let OtpService = class OtpService {
    otpStore = new Map();
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtp(email) {
        const otp = this.generateOtp();
        await this.transporter.sendMail({
            from: `"TheThrives" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Your OTP Code',
            html: `
      <div style="background:#f4f6f8;padding:30px;font-family:Arial,Helvetica,sans-serif">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:auto;background:#ffffff;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,.08)">
        
        <tr>
          <td style="padding:25px;text-align:center">
            <img 
              src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/513987837_1264761662327387_4546765657327074072_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RfuWVh9C_K8Q7kNvwG0tkvW&_nc_oc=AdlrzybMpYvyZy5sOQCZAfr87s_PJMY4ier3jiJ2kaN4vtPGEBO3poRniW2gD62Fq-g&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=ZtWjgwj3F4SsYD6YUQ5Svw&oh=00_Afkzsh30EcLtHDN-hhqL45WsAbWKc-Tf8uqvqW-CQ1eaOw&oe=694A6256"
              alt="Thrives Logo"
              width="80"
              style="margin-bottom:10px"
            />
            <h2 style="margin:0;color:#111">Verify Your Email</h2>
          </td>
        </tr>

        <tr>
          <td style="padding:0 25px 20px;text-align:center;color:#555;font-size:14px">
            Use the verification code below to continue.
          </td>
        </tr>

        <tr>
          <td style="text-align:center;padding:10px 25px">
            <div style="
              font-size:28px;
              letter-spacing:6px;
              font-weight:bold;
              background:#f0f2f5;
              padding:15px;
              border-radius:8px;
              color:#000;
            ">
              ${otp}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 25px;text-align:center;font-size:13px;color:#777">
            This code expires in <b>5 minutes</b>.<br />
            If you didn’t request this, please ignore this email.
          </td>
        </tr>

        <tr>
          <td style="padding:15px;text-align:center;font-size:12px;color:#aaa;border-top:1px solid #eee">
            © ${new Date().getFullYear()} Thrives. All rights reserved.
          </td>
        </tr>

      </table>
    </div>
    `,
        });
        return {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        };
    }
    verifyOtp(email, otp) {
        const data = this.otpStore.get(email);
        if (!data) {
            return { valid: false, message: 'OTP not found' };
        }
        if (Date.now() > data.expiresAt) {
            this.otpStore.delete(email);
            return { valid: false, message: 'OTP expired' };
        }
        if (data.otp !== otp) {
            return { valid: false, message: 'Invalid OTP' };
        }
        this.otpStore.delete(email);
        return { valid: true, message: 'OTP verified successfully' };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)()
], OtpService);
//# sourceMappingURL=otp.service.js.map