import { account } from "@/lib/appwrite/config";
import { ID, Models, OAuthProvider } from "appwrite";
import {
  AppwriteError,
  CreateUserRequest,
  LoginUserRequest,
} from "../types/auth.types";

export class AppwriteAuthService {
  // Create a new account
  async createAccount({
    email,
    password,
    name,
  }: CreateUserRequest): Promise<Models.User<Models.Preferences>> {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        await this.login({ email, password });
        return userAccount;
      } else {
        throw new Error("Account creation failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Failed to create account");
    }
  }

  // Login user
  async login({ email, password }: LoginUserRequest): Promise<Models.Session> {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  }

  // google OAuth
  async googleOAuth(): Promise<void> {
    try {
      const currentOrigin =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      account.createOAuth2Session(
        OAuthProvider.Google,
        `${currentOrigin}/auth/success`,
        `${currentOrigin}/auth/failure`
      );
    } catch (error: any) {
      console.log("Google OAuth error:", error);
      throw new Error(error.message || "Google OAuth failed");
    }
  }

  // Get current user
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await account.get();
    } catch (error) {
      console.log("No current user session");
      return null;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await account.deleteSessions();
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  }

  // Delete current session
  async deleteCurrentSession(): Promise<void> {
    try {
      await account.deleteSession("current");
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete session");
    }
  }

  // Update user profile
  async updateProfile(data: {
    name?: string;
    prefs?: object;
  }): Promise<Models.User<Models.Preferences>> {
    try {
      if (data.name) {
        await account.updateName(data.name);
      }
      if (data.prefs) {
        await account.updatePrefs(data.prefs);
      }
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error("No current user found");
      }
      return user;
    } catch (error: any) {
      throw new Error(error.message || "Profile update failed");
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<Models.Token> {
    try {
      return await account.createRecovery(
        email,
        `${window.location.origin}/auth/reset-password`
      );
    } catch (error: any) {
      throw new Error(error.message || "Password reset failed");
    }
  }

  // Confirm password reset
  async confirmPasswordReset(
    userId: string,
    secret: string,
    password: string
  ): Promise<Models.Token> {
    try {
      return await account.updateRecovery(userId, secret, password);
    } catch (error: any) {
      throw new Error(error.message || "Password reset confirmation failed");
    }
  }
}

// Create a singleton instance
export const authService = new AppwriteAuthService();
