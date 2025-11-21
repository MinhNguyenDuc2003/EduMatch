import React from 'react';

const ScholarshipProviderGuildelines = () => {
  return (
    <div className="mx-auto px-4 lg:px-40 py-6 flex flex-col bg-white space-y-6 ">
      <h1 className="text-4xl font-semibold">Scholarship Provider Guidelines</h1>
      <p className="text-xl">
        Thank you for your interest in listing your scholarship with Scholarships.com. To ensure the
        inclusion of your scholarship on our platform, please ensure that it adheres to the
        following guidelines:
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>
          You need to register an account to be able to submit scholarships and use the AI support
          services of our platform.
        </li>
        <li>
          Students should not be prompted to provide their social security number during the
          application process.
        </li>
        <li>
          Students must not be prompted to provide credit card information during the application
          process.
        </li>
        <li>
          The scholarship must be associated with a legitimate and verifiable U.S. mailing address.
        </li>
        <li>
          The scholarship should offer a reasonable award, commensurate with the amount of effort
          required from applicants.
        </li>
        <li>
          The scholarship rules must be clearly displayed, outlining all eligibility criteria,
          deadlines, required materials, and the process for selecting scholarship winners or
          judging criteria.
        </li>
        <li>
          The scholarship listing must not be a duplicate of any scholarships already listed. Please
          retain all information received from system upon successful completion of the listing
          process.
        </li>
        <li>
          Contact information, including address, phone number, and email, must be easily accessible
          to students for any inquiries regarding the scholarship and its rules.
        </li>
        <li>
          The scholarship provider should provide us with a contact email address that uses the
          organization's domain name (e.g., admin@examplescholarship.org). It is the responsibility
          of the scholarship provider to ensure that they can be reached by us.
        </li>
      </ul>
    </div>
  );
};

export default ScholarshipProviderGuildelines;
