import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  handleChange,
  handleSubmit,
  activeTab,
  fieldIcons,
  formData,
  isLoading,
}) => (
  <div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Common fields for both tabs */}
      {['name', 'email', 'mobile', 'companyName'].map((field) => (
        <div key={field}>
          <label className="block font-medium capitalize mb-2 text-purple-300 flex items-center gap-2">
            {fieldIcons[field]}{' '}
            {field === 'companyName' ? 'Your Company' : field}:
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white"
          />
        </div>
      ))}

      {/* Tab-specific fields */}
      {activeTab === 'hr' ? (
        <div>
          <label className="block font-medium capitalize mb-2 text-purple-300 flex items-center gap-2">
            {fieldIcons['skills']} Skills:
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white"
          />
        </div>
      ) : (
        <>
          <div>
            <label className="block font-medium capitalize mb-2 text-purple-300 flex items-center gap-2">
              {fieldIcons['targetCompany']} Target Company:
            </label>
            <input
              type="text"
              name="targetCompany"
              value={formData.targetCompany}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white"
            />
          </div>
          <div>
            <label className="block font-medium capitalize mb-2 text-purple-300 flex items-center gap-2">
              {fieldIcons['companyDealsIn']} Company Deals In:
            </label>
            <input
              type="text"
              name="companyDealsIn"
              value={formData.companyDealsIn}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white"
            />
          </div>
          <div>
            <label className="block font-medium capitalize mb-2 text-purple-300 flex items-center gap-2">
              {fieldIcons['proposalDetails']} Proposal Details:
            </label>
            <textarea
              name="proposalDetails"
              value={formData.proposalDetails}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="p-3 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-purple-900 disabled:text-gray-400 font-medium"
      >
        {isLoading ? 'Generating...' : 'Generate Email'}
      </button>
    </form>
  </div>
);
FormInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  fieldIcons: PropTypes.shape({
    name: PropTypes.node,
    email: PropTypes.node,
    mobile: PropTypes.node,
    companyName: PropTypes.node,
    skills: PropTypes.node,
    targetCompany: PropTypes.node,
    companyDealsIn: PropTypes.node,
    proposalDetails: PropTypes.node,
  }).isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    companyName: PropTypes.string,
    skills: PropTypes.string,
    targetCompany: PropTypes.string,
    companyDealsIn: PropTypes.string,
    proposalDetails: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default FormInput;
