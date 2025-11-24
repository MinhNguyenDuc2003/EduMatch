import { formatDate } from '@/utils/formatDate';
import React from 'react';

const ApplicantDetail = ({ applicant }: { applicant: ApplicantProfile }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-4 p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {applicant.firstName} {applicant.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{applicant.contactName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Email / Contact
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.contactName}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Phone</p>
            <p className="font-medium text-sm sm:text-base">{applicant.phoneNumber}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Hometown</p>
            <p className="font-medium text-sm sm:text-base">{applicant.hometown}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Citizenship
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.citizenshipStatus}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ethnicity</p>
            <p className="font-medium text-sm sm:text-base">{applicant.ethnicity}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Religion</p>
            <p className="font-medium text-sm sm:text-base">{applicant.religion}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Race</p>
            <p className="font-medium text-sm sm:text-base">{applicant.race}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Disabilities
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.disabilities}</p>
          </div>
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Medical Conditions
            </p>
            <p className="font-medium text-sm sm:text-base">{applicant.medicalConditions}</p>
          </div>
        </div>

        <div className="bg-muted/30 p-3 sm:p-4 rounded">
          <h4 className="font-semibold mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            Overall GPA
            <span
              className="text-lg font-bold px-3 py-1 rounded"
              style={{ backgroundColor: '#3d6cb9', color: 'white' }}
            >
              {applicant.overallGpa}
            </span>
          </h4>
        </div>

        {applicant.educationHistories && applicant.educationHistories.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">Education History</h4>
            <div className="space-y-3">
              {applicant.educationHistories.map((edu) => (
                <div key={edu.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                  <p className="font-medium text-sm sm:text-base">{edu.institutionName}</p>
                  <p className="text-xs sm:text-sm">
                    {edu.degreeType} in {edu.majorName} ({edu.majorCategory})
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {edu.country} • {edu.state} • Class of {edu.graduationYear}
                  </p>
                  <p className="text-xs sm:text-sm">
                    GPA: {edu.gpa} • Class Rank: {edu.classRank}
                  </p>
                  <p className="text-xs sm:text-sm">Class Size: {edu.classSize}</p>
                  <p className="text-xs text-muted-foreground italic">
                    Enrollment: {formatDate(Number(edu.enrollmentStartDate))} to{' '}
                    {formatDate(Number(edu.enrollmentEndDate))}
                  </p>
                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Note: {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.certificates && applicant.certificates.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">Certificates</h4>
            <div className="space-y-2">
              {applicant.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">{cert.certificateName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Issued by {cert.issuedBy}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(Number(cert.issueDate))} - {formatDate(Number(cert.expiryDate))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm sm:text-base" style={{ color: '#3d6cb9' }}>
                      {cert.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.skills && applicant.skills.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicant.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{skill.skillName}</p>
                    <p className="text-xs text-muted-foreground">
                      {skill.proficiencyLevel} • {skill.yearsExperience}y
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {applicant.favoriteActivities && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Favorite Activities
              </p>
              <p className="text-xs sm:text-sm">{applicant.favoriteActivities}</p>
            </div>
          )}
          {applicant.sportsParticipated && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Sports</p>
              <p className="text-xs sm:text-sm">{applicant.sportsParticipated}</p>
            </div>
          )}
          {applicant.studentActivities && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Student Activities
              </p>
              <p className="text-xs sm:text-sm">{applicant.studentActivities}</p>
            </div>
          )}
          {applicant.organizationsJoined && (
            <div className="bg-muted/30 p-3 sm:p-4 rounded">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Organizations
              </p>
              <p className="text-xs sm:text-sm">{applicant.organizationsJoined}</p>
            </div>
          )}
        </div>

        {applicant.researchExperience && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Research Experience
            </p>
            <p className="text-xs sm:text-sm">{applicant.researchExperience}</p>
          </div>
        )}

        {applicant.careerGoals && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Career Goals
            </p>
            <p className="text-xs sm:text-sm">{applicant.careerGoals}</p>
          </div>
        )}

        {applicant.intentions && applicant.intentions.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">Future Intentions</h4>
            <div className="space-y-3">
              {applicant.intentions.map((intention) => (
                <div key={intention.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                  <p className="font-medium text-sm sm:text-base">
                    {intention.intendedInstitution}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {intention.degreeType} in {intention.intendedMajorName} (
                    {intention.intendedMajorCategory})
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {intention.intendedCountry} • {intention.intendedState}
                  </p>
                  <p className="text-xs sm:text-sm">
                    Expected Start: {formatDate(Number(intention.expectedStartDate))}
                  </p>
                  <p className="text-xs sm:text-sm">
                    Expected Graduation: {intention.expectedGraduationYear}
                  </p>
                  {intention.notes && (
                    <p className="text-xs sm:text-sm text-muted-foreground italic mt-1">
                      {intention.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.applicantPreferences && applicant.applicantPreferences.length > 0 && (
          <div className="bg-muted/30 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-base sm:text-lg">Preferences</h4>
            <div className="space-y-2">
              {applicant.applicantPreferences.map((pref) => (
                <div
                  key={pref.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{pref.type}</p>
                    <p className="text-xs text-muted-foreground">{pref.value}</p>
                    {pref.note && (
                      <p className="text-xs text-muted-foreground italic">{pref.note}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#3d6cb9' }}>
                    Weight: {(pref.weight * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicant.militaryFamilyHistory && (
          <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded">
            <p className="text-xs sm:text-sm font-semibold" style={{ color: '#3d6cb9' }}>
              Military Family History
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetail;
