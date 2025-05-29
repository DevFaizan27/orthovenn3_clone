import React from 'react';

const Footer = () => {
  return (
    <div className="w-full py-6 px-4 border-t border-gray-300 bg-blue-100">
      <div className="max-w-4xl ">
        <p className="text-gray-700 font-medium mb-2">
          OrthoVenn3 2022
        </p>
        <p className="text-gray-600 text-sm">
          If you have any questions, comments or suggestions about OrthoVenn3, please feel free to contact: 
          <a href="mailto:yiwang28@swu.edu.cn" className="text-blue-600 hover:underline ml-1">
            yiwang28@swu.edu.cn
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;