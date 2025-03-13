import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCRI7A-rida-6InIEmcmAQP8q-GKcP1yGE');
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const prompt = (formData) => {
  `
        Generate a professional email to an HR recruiter introducing myself. Follow these instructions:
        1. Start with a formal greeting.
        2. Introduce myself with my name: ${formData.name}.
        3. Mention my email: ${formData.email} and mobile number: ${formData.mobile} for contact.
        4. Highlight my skills: ${formData.skills}.
        5. Express my interest in applying to ${formData.companyName}.
        6. End with a polite closing and my name.
        7. Keep the email concise and professional.
      `;
};
