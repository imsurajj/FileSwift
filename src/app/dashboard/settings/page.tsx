"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import ProfileUpload from "@/app/components/ui/ProfileUpload";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorQRCode, setTwoFactorQRCode] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    company: "",
    country: "",
    language: "English",
    timezone: "UTC",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profileVisibility: "public",
    fileVisibility: "private",
    activityVisibility: "followers",
    emailNotifications: true,
    pushNotifications: true,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    
    // Clear success message when form is modified
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateProfileForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Name validation
    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    // Email validation
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation (optional)
    if (formValues.phone && !/^\+?[1-9]\d{9,14}$/.test(formValues.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecurityForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Current password validation
    if (!formValues.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    // New password validation
    if (!formValues.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formValues.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (formValues.newPassword !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    setIsLoading(true);
    setSuccessMessage(""); // Clear any existing success message
    
    try {
      // In a real app, this would be a call to your API to update user info
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle profile picture upload
      if (profilePicture) {
        // In a real app, you would upload the profile picture to your server/cloud storage
        console.log("Profile picture would be uploaded:", profilePicture.name);
      }
      
      // Update the session with new user info
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formValues.fullName,
          email: formValues.email
        }
      });
      
      setSuccessMessage("Profile updated successfully");
      
      // Optionally refresh the session to ensure navbar updates
      // This is already done by the update function, but explicitly setting it here
      // makes it clear that we want the navbar to update
      setTimeout(() => {
        window.dispatchEvent(new Event('session-update'));
      }, 300);
      
    } catch (error) {
      console.error("Profile update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSecurityForm()) {
      return;
    }
    
    setIsLoading(true);
    setSuccessMessage(""); // Clear any existing success message
    
    try {
      // In a real app, this would be a call to your API to update password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset password fields
      setFormValues({
        ...formValues,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      setSuccessMessage("Password updated successfully");
    } catch (error) {
      console.error("Password update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setSuccessMessage(""); // Clear any existing success message
    
    try {
      // In a real app, this would be a call to your API to update preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would save all preferences to your backend
      console.log("Saving preferences:", {
        profileVisibility: formValues.profileVisibility,
        fileVisibility: formValues.fileVisibility,
        activityVisibility: formValues.activityVisibility,
        emailNotifications: formValues.emailNotifications,
        pushNotifications: formValues.pushNotifications,
        language: formValues.language,
        timezone: formValues.timezone
      });
      
      setSuccessMessage("Preferences updated successfully");
    } catch (error) {
      console.error("Preferences update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorEnable = () => {
    // In a real app, this would call your API to request 2FA setup
    setIsLoading(true);
    
    // Simulate API call to get QR code for 2FA setup
    setTimeout(() => {
      // This is just a placeholder URL - in a real app, this would be a generated QR code from your backend
      setTwoFactorQRCode("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/FileSwift:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=FileSwift");
      setShowTwoFactorDialog(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleTwoFactorVerify = () => {
    // In a real app, this would verify the submitted code with your API
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate successful verification
      alert("Two-factor authentication enabled successfully!");
      setShowTwoFactorDialog(false);
      setTwoFactorCode("");
      setIsLoading(false);
    }, 1000);
  };

  const handleTwoFactorCancel = () => {
    setShowTwoFactorDialog(false);
    setTwoFactorCode("");
  };

  const settingsTabs = [
    { name: "Profile Information", id: "profile" },
    { name: "Security", id: "security" },
    { name: "Preferences", id: "preferences" },
    { name: "Billing", id: "billing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-base text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          {/* Settings Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`
                    whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm
                    ${tab.id === currentTab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {errors.form && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errors.form}</h3>
                </div>
              </div>
            </div>
          )}
          
          {/* Profile Information Section */}
          {currentTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="mb-6">
                  <ProfileUpload 
                    initialImage={session?.user?.image || null}
                    onChange={setProfilePicture}
                  />
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-500">JPG, PNG or GIF. 1MB max.</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formValues.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      required
                      className="h-10 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      className="h-10 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formValues.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="(Optional)"
                      className="h-10 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      name="company"
                      type="text"
                      value={formValues.company}
                      onChange={handleChange}
                      placeholder="(Optional)"
                      className="h-10 text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country / Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={formValues.country}
                      onChange={handleChange}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-base text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="ES">Spain</option>
                      <option value="BR">Brazil</option>
                      <option value="IN">India</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formValues.language}
                      onChange={handleChange}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-base text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formValues.timezone}
                      onChange={handleChange}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-base text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="CST">CST (Central Standard Time)</option>
                      <option value="MST">MST (Mountain Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="GMT">GMT (Greenwich Mean Time)</option>
                      <option value="CET">CET (Central European Time)</option>
                      <option value="JST">JST (Japan Standard Time)</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 py-2 px-5 text-base h-auto rounded"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Security Section */}
          {currentTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Password & Security</h2>
              
              <form className="space-y-5" onSubmit={handleSecuritySubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <Input
                    name="currentPassword"
                    type="password"
                    value={formValues.currentPassword}
                    onChange={handleChange}
                    error={errors.currentPassword}
                    showPasswordToggle
                    required
                    className="h-10 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <Input
                    name="newPassword"
                    type="password"
                    value={formValues.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                    showPasswordToggle
                    required
                    className="h-10 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    showPasswordToggle
                    required
                    className="h-10 text-base"
                  />
                </div>
                
                <div className="pt-3">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 py-2 px-5 text-base h-auto rounded"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                  </div>
                  <div>
                    <Button
                      type="button"
                      isLoading={isLoading}
                      className="bg-purple-600 text-white border border-purple-600 focus:ring-purple-500 py-2 px-4 text-sm h-auto rounded"
                      onClick={handleTwoFactorEnable}
                    >
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Sessions</h3>
                <p className="text-sm text-gray-500 mb-4">
                  See all your active sessions and log out devices.
                </p>
                <div>
                  <div className="rounded border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Session</p>
                        <p className="text-sm text-gray-500 mt-1">Windows • Chrome • {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                        <span className="text-sm text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-500 py-2 px-4 text-sm h-auto rounded"
                    >
                      Log Out All Devices
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Preferences Section */}
          {currentTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Preferences</h2>
              
              <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={formValues.emailNotifications}
                          onChange={(e) => setFormValues({...formValues, emailNotifications: e.target.checked})}
                          className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700 text-base">Email Notifications</label>
                        <p className="text-gray-500 text-sm">Receive notifications about file sharing, comments, and updates via email.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="pushNotifications"
                          name="pushNotifications"
                          type="checkbox"
                          checked={formValues.pushNotifications}
                          onChange={(e) => setFormValues({...formValues, pushNotifications: e.target.checked})}
                          className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="pushNotifications" className="font-medium text-gray-700 text-base">Push Notifications</label>
                        <p className="text-gray-500 text-sm">Receive browser push notifications for important updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">System Settings</h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select
                        name="language"
                        value={formValues.language}
                        onChange={handleChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-base text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        name="timezone"
                        value={formValues.timezone}
                        onChange={handleChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-base text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="CST">CST (Central Standard Time)</option>
                        <option value="MST">MST (Mountain Standard Time)</option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 py-2 px-5 text-base h-auto rounded"
                  >
                    Save Preferences
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Billing Section */}
          {currentTab === "billing" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscription & Billing</h2>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">Current Plan</h3>
                <span className="text-sm font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  Free
                </span>
              </div>
              
              <div className="border border-gray-200 rounded p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-gray-600">Storage</span>
                  <span className="text-base font-medium text-gray-900">50 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-gray-600">File Size Limit</span>
                  <span className="text-base font-medium text-gray-900">100 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-gray-600">Support</span>
                  <span className="text-base font-medium text-gray-900">Standard</span>
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  type="button" 
                  className="w-full flex justify-center py-2 px-4 border border-purple-500 rounded text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  onClick={() => window.parent.postMessage({ type: 'SHOW_UPGRADE_MODAL' }, '*')}
                >
                  Upgrade Plan
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Billing History</h3>
                
                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
                    No billing history available for free plan.
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Methods</h3>
                
                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
                    No payment methods added.
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    type="button" 
                    className="flex justify-center py-2 px-4 border border-gray-300 rounded text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Two-Factor Authentication Dialog */}
      {showTwoFactorDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 py-4">
            <div className="px-6 pb-4 pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Set Up Two-Factor Authentication</h3>
                <button 
                  type="button" 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                  onClick={handleTwoFactorCancel}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-5">
                <p className="text-sm text-gray-600">
                  Scan this QR code with your authenticator app (such as Google Authenticator, Authy, or Microsoft Authenticator).
                </p>
                
                <div className="flex justify-center my-6">
                  {twoFactorQRCode && (
                    <img 
                      src={twoFactorQRCode} 
                      alt="QR Code for Two-Factor Authentication" 
                      className="border border-gray-200 rounded"
                    />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  After scanning, enter the 6-digit verification code from your authenticator app below:
                </p>
                
                <div className="mb-4">
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="twoFactorCode"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleTwoFactorCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleTwoFactorVerify}
                  disabled={twoFactorCode.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Enable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 