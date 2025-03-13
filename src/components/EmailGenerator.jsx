import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Copy,
  Check,
  Mail,
  User,
  Phone,
  Briefcase,
  Building,
  FileText,
} from 'lucide-react';
import FormInput from './FormInput';
import GeneratedEmail from './GeneratedEmail';

const EmailGenerator = () => {
  const [activeTab, setActiveTab] = useState('hr'); // 'hr' or 'business'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    skills: '',
    companyName: '',
    targetCompany: '', // For Business Proposal
    proposalDetails: '',
    companyDealsIn: '',
  });
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      let prompt = '';

      if (activeTab === 'hr') {
        prompt = `
        Generate a professional email to an HR recruiter introducing myself. Follow these instructions:
        1. Start with a formal greeting.
        2. Introduce myself with my name: ${formData.name}.
        3. Mention my email: ${formData.email} for contact at end of email not in body.
        4. Highlight my skills: ${formData.skills}.
        5. Express my interest in applying to ${formData.companyName}.
        6. End with a polite closing and my name and mobile number.
        7. Add my mobile number: ${formData.mobile} at the very end of the email.
        8. Add companies have worked for: ${formData.companyDealsIn} with recent some big
        8. Keep the email concise and professional.
        9. Do not use "*" or any bullet point symbols in the response.
      `;
      } else {
        prompt = `Generate a professional business proposal email to ${formData.targetCompany}. Follow these instructions strictly:
1. Start with a formal greeting.
2. Introduce your company: ${formData.companyName}.
3. Clearly state the purpose of the proposal: ${formData.proposalDetails}.
4. Emphasize how this collaboration can benefit ${formData.targetCompany}.
5. Mention companies your organization has worked with: ${formData.companyDealsIn}, and highlight some recent big projects.
6. Express willingness to discuss the proposal further and provide additional details if needed.
7. End with a polite closing and include your contact details: Email (${formData.email}) and Mobile (${formData.mobile}).
8. Keep the email formal, concise, and compelling.
9. Do not use "*" or any bullet point symbols in the response.
      `;
      }

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

  const fieldIcons = {
    name: <User size={18} />,
    email: <Mail size={18} />,
    mobile: <Phone size={18} />,
    skills: <Briefcase size={18} />,
    companyName: <Building size={18} />,
    targetCompany: <Building size={18} />,
    proposalDetails: <FileText size={18} />,
    companyDealsIn: <Building size={18} />,
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-800 text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center text-purple-400">
        AI Email Generator
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-4 border-b border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'hr'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('hr')}
        >
          HR Recruiter Email
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'business'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('business')}
        >
          Business Proposal Email
        </button>
      </div>

      <FormInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        activeTab={activeTab}
        fieldIcons={fieldIcons}
        formData={formData}
        isLoading={isLoading}
        error={error}
        generatedEmail={generatedEmail}
      />

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {generatedEmail && <GeneratedEmail generatedEmail={generatedEmail} />}
    </div>
  );
};

export default EmailGenerator;
