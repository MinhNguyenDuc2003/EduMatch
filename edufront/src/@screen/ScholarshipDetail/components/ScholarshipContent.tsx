import { Button } from '@/lib/cus/button';

type ScholarshipContentProps = {
  scholarship: Scholarship;
};

export default function ScholarshipContent({ scholarship }: ScholarshipContentProps) {
  return (
    <>
      {/* Description Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {scholarship.description ||
            'Body text for whatever you would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
      </section>

      {/* Details Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
        <p className="text-gray-700 leading-relaxed">
          {scholarship.shortDescription ||
            'Body text for whatever would like to add more to the main point. It provides details, explanations, and context.'}
        </p>
        {scholarship.studyLevel || scholarship.scholarshipType || scholarship.fields ? (
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Study Level: </span>
              {scholarship.studyLevel || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Scholarship Type: </span>
              {scholarship.scholarshipType || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Fields: </span>
              {scholarship.fields || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">GPA Requirement: </span>
              {scholarship.gpaRequirement || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Language Requirement: </span>
              {scholarship.languageRequirement || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Available Slots: </span>
              {scholarship.availableSlots || 'N/A'}
            </p>
          </div>
        ) : null}
      </section>

      {/* Criteria Section */}
      {scholarship.requirements && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Criteria</h2>
          <p className="text-gray-700 leading-relaxed">{scholarship.requirements}</p>
        </section>
      )}

      {/* Application Process Section */}
      {scholarship.benefits && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
          <p className="text-gray-700 leading-relaxed">{scholarship.benefits}</p>
        </section>
      )}

      {/* Action Button */}
      <div className="mt-8">
        <Button
          value="Apply Now"
          variant="ok"
          size="lg"
          full
          className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all"
        />
      </div>
    </>
  );
}

