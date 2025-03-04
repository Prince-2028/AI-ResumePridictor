import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [linkdinurl, setLinkdinurl] = useState("");
  // const [resume, setResume] = useState(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    console.log(resume);
  };

  const submitbtn = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6 animate__animated animate__fadeIn">
          ResumeScore.Ai
        </h2>
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* LinkedIn URL Input */}
          <div>
            <input
              type="text"
              placeholder="Enter your LinkedIn URL"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Skills Input */}
          <div>
            <textarea
              placeholder="Enter your Skills"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={linkdinurl}
              onChange={(e) => setLinkdinurl(e.target.value)}
            />
          </div>

          {/* Resume Upload */}
          {/* <div>
            <input
              type="file"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              accept="application/pdf"
              required
              onChange={handleResumeChange}
            />
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
              onClick={submitbtn}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
