import { useState } from "react";
import axios from "axios";
import loader from "./assets/loader.png";
const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [linkdinurl, setLinkdinurl] = useState("");
  const [responsiveAi, setResponsiveAi] = useState("");
  const [Loading, setLoading] = useState(false);
  const [uishow, setUishow] = useState(true);



  const fetchData = async (propmt) => {
    const data = await axios
      .post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCpNbgDeY2GGsnJ-lkVultPG4ZvFyQoY_A",
        {
          contents: [
            {
              parts: [{ text: propmt }],
            },
          ],
        }
      )
      .then((res) => {
        setLoading(false);
        setResponsiveAi(res.data.candidates[0].content.parts[0].text);
      });
  };

  const submitbtn = (e) => {
    setLoading(true);
    setUishow(false);

    e.preventDefault();
    fetchData(` My name is ${name}. My email is ${email}, and my LinkedIn URL is ${linkdinurl}. My skillset includes ${skills}. Create a resume based of these details in inner html . 
 
} `);

    axios
      .post("http://localhost:3000/api/data", {
        name: name,
        email: email,
        skills: skills,
        linkdinurl: linkdinurl,
      })
      .then(function (response) {
        console.log("Response:", response);
        setName("");
        setEmail("");
        setLinkdinurl("");
        setSkills("");
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  return (
    <>
      {Loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <img
            src={loader}
            alt="Loading..."
            className="w-50 h-50 animate-spin"
          />
        </div>
      )}
      {uishow && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-6 animate__animated animate__fadeIn">
              ResumeCreate.Ai
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
      )}
      <div dangerouslySetInnerHTML={{__html: responsiveAi}}></div>
    </>
  );
};

export default App;
