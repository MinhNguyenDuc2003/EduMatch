declare global {
  type IListScholarshipOpportunities = {
    OpportunityId?: number;
    ProviderId?: number;
    Title?: string;
    ShortDescription?: string;
    Description?: string;
    Country?: string;
    FieldOfStudy?: string;
    FundingAmount?: number; // decimal(12,2) -> number
    Deadline?: string; // ISO date dạng "YYYY-MM-DD"
    MinGPA?: number; // decimal(3,2)
    RequiredSkills?: string;
    EligibilityCriteria?: string;
    Status?: string;
    // Status?: 'Open' | 'Closed' | 'Paused';
    CreatedAt?: string; // timestamp
    UpdatedAt?: string; // timestamp
  };
}

export { };

