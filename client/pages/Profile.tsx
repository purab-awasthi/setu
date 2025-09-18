import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export default function StudentProfile() {
  const [profileData, setProfileData] = useState({
    name: "Student Name",
    age: "22",
    gender: "Male",
    skills: "React, Python, Data Analysis",
    bio: "Passionate about technology and web development.",
  });

  const navigate = useNavigate();

  // Helper function to get a cookie
  const getCookie = (name) => {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const userName = getCookie("user_name");
    if (userName) {
      setProfileData(prev => ({ ...prev, name: userName }));
    }
  }, []);

  const handleEdit = () => {
    // In a real application, this would redirect to a form for editing the profile.
    alert("This is a prototype. You would now be redirected to an edit form.");
    // navigate('/student/profile/edit');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <button
            onClick={handleEdit}
            className="btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        </div>
        
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Age:</strong> {profileData.age}</p>
              <p><strong>Gender:</strong> {profileData.gender}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Skills & Interests</h2>
            <p className="mt-2">{profileData.skills}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="mt-2">{profileData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
