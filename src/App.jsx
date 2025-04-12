import { useState } from "react";
import axios from "axios";
import loader from "./assets/loader.png";
import DOMPurify from "dompurify";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [responseAi, setResponseAi] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const fetchData = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCpNbgDeY2GGsnJ-lkVultPG4ZvFyQoY_A",
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const rawHtml = response.data.candidates[0].content.parts[0].text;
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setResponseAi(cleanHtml);
    } catch (error) {
      console.error("Error fetching AI data:", error);
    }
    setLoading(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    fetchData(`
      Create a professional HTML resume with the following details:
      Name: ${name}
      Email: ${email}
      LinkedIn: ${linkedinUrl}
      Skills: ${skills}

      Structure the resume with these sections:
      - Summary: A brief professional summary.
      - Skills: A bulleted list of skills.
      - Contact: Contact information.
    `);

    axios
      .post("http://localhost:3000/api/data", { name, email, skills, linkedinUrl })
      .then(() => {
        setName("");
        setEmail("");
        setSkills("");
        setLinkedinUrl("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <img src={loader} alt="Loading..." className="w-16 h-16 animate-spin" />
        </div>
      )}

      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-all">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">ResumeCreate.AI</h2>
          <form className="space-y-4" onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your LinkedIn URL"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
            <textarea
              placeholder="Enter your Skills"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {!showForm && responseAi && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Generated Resume</h2>
          <div className="border-t pt-4">
            <div
              className="resume-content font-sans leading-relaxed"
              dangerouslySetInnerHTML={{ __html: responseAi }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;