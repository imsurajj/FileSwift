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
      setIsLoading(false);
    } catch (error) {
      console.error("Profile update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSecurityForm()) {
      return;
    }
    
    setIsLoading(true);
    
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
      setIsLoading(false);
    } catch (error) {
      console.error("Password update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be a call to your API to update preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage("Preferences updated successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Preferences update error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
      setIsLoading(false);
    }
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
            <p className="text-sm text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          {/* Settings Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-6 overflow-x-auto">
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
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your account profile information and how we can reach you.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleProfileSubmit}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      {/* Profile Picture */}
                      <ProfileUpload 
                        initialImage={session?.user?.image || null}
                        onChange={setProfilePicture}
                        className="mb-4"
                      />
                      
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="Full Name"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            value={formValues.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            required
                          />
                        </div>
                        
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formValues.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                          />
                        </div>
                        
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formValues.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            placeholder="(Optional)"
                          />
                        </div>
                        
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="Company"
                            name="company"
                            type="text"
                            value={formValues.company}
                            onChange={handleChange}
                            placeholder="(Optional)"
                          />
                        </div>
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country / Region
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            value={formValues.country}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                            Language
                          </label>
                          <select
                            id="language"
                            name="language"
                            value={formValues.language}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                            Timezone
                          </label>
                          <select
                            id="timezone"
                            name="timezone"
                            value={formValues.timezone}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Security Section */}
          {currentTab === "security" && (
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Security</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your password and security settings to protect your account.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Change Password</h3>
                      <form className="mt-4 space-y-4" onSubmit={handleSecuritySubmit}>
                        <Input
                          label="Current Password"
                          name="currentPassword"
                          type="password"
                          value={formValues.currentPassword}
                          onChange={handleChange}
                          error={errors.currentPassword}
                          showPasswordToggle
                          required
                        />
                        
                        <Input
                          label="New Password"
                          name="newPassword"
                          type="password"
                          value={formValues.newPassword}
                          onChange={handleChange}
                          error={errors.newPassword}
                          showPasswordToggle
                          required
                        />
                        
                        <Input
                          label="Confirm New Password"
                          name="confirmPassword"
                          type="password"
                          value={formValues.confirmPassword}
                          onChange={handleChange}
                          error={errors.confirmPassword}
                          showPasswordToggle
                          required
                        />
                        
                        <div className="pt-2">
                          <Button
                            type="submit"
                            isLoading={isLoading}
                            className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                          >
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900">Two-Factor Authentication</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                        </div>
                        <div>
                          <Button
                            type="button"
                            className="bg-white text-purple-600 hover:text-purple-700 border border-purple-600 focus:ring-purple-500"
                          >
                            Enable 2FA
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900">Sessions</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        See all your active sessions and log out devices.
                      </p>
                      <div className="mt-4">
                        <div className="rounded-md bg-gray-50 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Current Session</p>
                              <p className="text-xs text-gray-500 mt-1">Windows • Chrome • {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                              <span className="text-xs text-green-600 font-medium">Active</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-right">
                          <Button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                          >
                            Log Out All Devices
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Preferences Section */}
          {currentTab === "preferences" && (
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Customize your application preferences and visibility settings.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handlePreferencesSubmit}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">Profile Visibility</h3>
                        <p className="text-sm text-gray-500 mt-1">Control who can see your profile information.</p>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Profile Visibility</label>
                            <div className="mt-2">
                              <select
                                name="profileVisibility"
                                value={formValues.profileVisibility}
                                onChange={handleChange}
                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                              >
                                <option value="public">Public - Anyone can view</option>
                                <option value="followers">Followers Only</option>
                                <option value="private">Private - Only me</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">File Visibility Default</label>
                            <div className="mt-2">
                              <select
                                name="fileVisibility"
                                value={formValues.fileVisibility}
                                onChange={handleChange}
                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                              >
                                <option value="public">Public - Anyone can view</option>
                                <option value="followers">Followers Only</option>
                                <option value="private">Private - Only me</option>
                              </select>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">This will be the default setting for new file uploads.</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">Activity Visibility</label>
                            <div className="mt-2">
                              <select
                                name="activityVisibility"
                                value={formValues.activityVisibility}
                                onChange={handleChange}
                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                              >
                                <option value="public">Public - Anyone can view</option>
                                <option value="followers">Followers Only</option>
                                <option value="private">Private - Only me</option>
                              </select>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Controls who can see your file activity and sharing history.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-base font-medium text-gray-900">Notification Preferences</h3>
                        <p className="text-sm text-gray-500 mt-1">Configure how you want to receive notifications.</p>
                        
                        <div className="mt-4 space-y-4">
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
                            <div className="ml-3 text-sm">
                              <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                              <p className="text-gray-500">Receive notifications about file sharing, comments, and updates via email.</p>
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
                            <div className="ml-3 text-sm">
                              <label htmlFor="pushNotifications" className="font-medium text-gray-700">Push Notifications</label>
                              <p className="text-gray-500">Receive browser push notifications for important updates.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-base font-medium text-gray-900">Language & Regional</h3>
                        <p className="text-sm text-gray-500 mt-1">Configure your language and timezone preferences.</p>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Language</label>
                            <div className="mt-2">
                              <select
                                name="language"
                                value={formValues.language}
                                onChange={handleChange}
                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                              >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Japanese">Japanese</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700">Timezone</label>
                            <div className="mt-2">
                              <select
                                name="timezone"
                                value={formValues.timezone}
                                onChange={handleChange}
                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      {successMessage && (
                        <div className="mb-4 text-sm text-green-700 bg-green-100 p-2 rounded">
                          {successMessage}
                        </div>
                      )}
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Billing Section */}
          {currentTab === "billing" && (
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Billing & Plans</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your subscription and view billing history.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    {/* Current Plan */}
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium text-gray-900">Current Plan</h3>
                        <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          Free
                        </span>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Storage</span>
                          <span className="text-sm font-medium text-gray-900">50 GB</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">File Size Limit</span>
                          <span className="text-sm font-medium text-gray-900">100 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Support</span>
                          <span className="text-sm font-medium text-gray-900">Standard</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button 
                          type="button" 
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          onClick={() => window.parent.postMessage({ type: 'SHOW_UPGRADE_MODAL' }, '*')}
                        >
                          Upgrade Plan
                        </button>
                      </div>
                    </div>
                    
                    {/* Billing History */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900">Billing History</h3>
                      <p className="text-sm text-gray-500 mt-1">View your recent billing history and download invoices.</p>
                      
                      <div className="mt-4">
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500">
                            No billing history available
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900">Payment Methods</h3>
                      <p className="text-sm text-gray-500 mt-1">Add or update your payment methods.</p>
                      
                      <div className="mt-4">
                        <button 
                          type="button" 
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 