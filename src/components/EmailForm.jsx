import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import FormInput from './FormInput';
import GeneratedEmail from './GeneratedEmail';
import { Mail, User, Phone, Briefcase, Building } from 'lucide-react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: 'Mohd Arsalan',
    email: 'thesiddiqui7@gmail.com',
    mobile: '123456790',
    skills: 'reactjs, nodejs, mongodb, typescript, web3, blockchain',
    companyName: 'secureyourself',
  });

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fieldIcons = {
    name: <User size={18} />,
    email: <Mail size={18} />,
    mobile: <Phone size={18} />,
    skills: <Briefcase size={18} />,
    companyName: <Building size={18} />,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `
        Generate a professional email to an HR recruiter introducing myself. Follow these instructions strictly:
        1. Start with a formal greeting.
        2. Introduce myself with my name: ${formData.name}.
        3. Mention my email: ${formData.email} for contact at end of email not in body.
        4. Highlight my skills: ${formData.skills}.
        5. Express my interest in applying to ${formData.companyName}.
        6. End with a polite closing and my name and mobile number.
        7. Add my mobile number: ${formData.mobile} at the very end of the email, after my name.
        8. Keep the email concise and professional.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setGeneratedEmail(text);
    } catch (error) {
      console.error('Error generating text:', error);
      setError('Failed to generate email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-800 text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-purple-400">
        Email Generator for HR Recruiter
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {Object.keys(fieldIcons).map((field) => (
          <FormInput
            key={field}
            label={field}
            icon={fieldIcons[field]}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            type={field === 'email' ? 'email' : 'text'}
          />
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="p-3 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-purple-900 disabled:text-gray-400 font-medium text-lg"
        >
          {isLoading ? 'Generating...' : 'Generate Email'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {generatedEmail && <GeneratedEmail generatedEmail={generatedEmail} />}
    </div>
  );
};

export default EmailForm;
