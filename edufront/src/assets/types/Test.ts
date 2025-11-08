declare global {
  type IListScholarshipOpportunities = {
    Id?: number;
    Provider_id?: number;
    Title?: string;
    Slug?: string;
    Short_description?: string;
    Description?: string;
    Requirements?: string;
    Benefits?: string;
    Fields?: string;
    Country?: string;
    University?: string;
    Study_level?: string;
    Scholarship_type?: string;
    Funding_amount?: number; // decimal(12,2) -> number
    Start_date?: string; // ISO date dạng "YYYY-MM-DD"
    End_date?: string; // ISO date dạng "YYYY-MM-DD"
    Available_slots?: number;
    Language_requirement?: string;
    Gpa_requirement?: number; // decimal(3,2)
  };
}

export {};
