import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    skills: "",
    interests: "",
    goalCompanies: "",
    bio: "",
    resume: null as File | null,
  });

  const navigate = useNavigate();
  
  // Helper function to set a cookie
  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Data Submitted:", formData);
    
    // Store the user's name in a cookie and set new_user to false
    if (formData.name) {
      setCookie("user_name", formData.name, 7);
      setCookie("new_user", "false", 7);
    }
    
    alert("Profile saved successfully! The page will now reload.");
    window.location.href = "/"; // Force a full page reload to update the header
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8 sm:p-12 lg:p-16">
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <img src="/setulogodark.png" alt="Setu Logo" className="h-12 w-auto transform scale-[200%]" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your details to get started with InternSetu.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Compulsory Units */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Optional Features */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g., React, Python, Data Analysis (comma-separated)"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <input
              id="interests"
              name="interests"
              type="text"
              placeholder="e.g., Web Development, Machine Learning, UI/UX Design"
              value={formData.interests}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="goalCompanies" className="block text-sm font-medium text-gray-700">
              Goal Companies
            </label>
            <input
              id="goalCompanies"
              name="goalCompanies"
              type="text"
              placeholder="e.g., Google, TCS, Microsoft"
              value={formData.goalCompanies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              placeholder="Tell us a little about yourself..."
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.232-3.232a4 4 0 00-5.656 0L28 28m0 0l4 4m20-4V12a4 4 0 00-4-4h-8a4 4 0 00-4 4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent"
                  >
                    <span>Upload a file</span>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/90 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
