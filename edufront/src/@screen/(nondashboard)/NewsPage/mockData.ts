export type NewsItem = {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  link: string;
  scholarship?: Scholarship;
};

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Top 10 Scholarships for International Students in 2024',
    content: `The landscape of international education continues to evolve, with more opportunities than ever for students seeking financial support. This comprehensive guide highlights the top 10 scholarships available for international students in 2024, covering everything from merit-based awards to need-based assistance.

These scholarships span across various fields including STEM, arts, humanities, and business. Each program offers unique benefits, from full tuition coverage to living stipends and research opportunities. We've compiled detailed information about eligibility requirements, application deadlines, and selection criteria to help you navigate the application process successfully.

Whether you're pursuing undergraduate or graduate studies, there's likely a scholarship program that matches your academic profile and career goals. Early preparation and thorough research are key to maximizing your chances of securing financial aid for your international education journey.`,
    imgUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    link: '/news/top-10-scholarships-2024',
    scholarship: {
      id: 101,
      providerId: 1,
      title: 'International Excellence Scholarship',
      slug: 'international-excellence-scholarship',
      shortDescription: 'Full tuition coverage for outstanding international students',
      description: 'Comprehensive scholarship program for international students',
      requirements: 'Minimum GPA 3.5, English proficiency required',
      benefits: 'Full tuition, housing allowance, and research opportunities',
      fields: 'All fields',
      country: 'United States',
      university: 'Global University Network',
      studyLevel: 'Undergraduate, Graduate',
      scholarshipType: 'Merit-based',
      fundingAmount: '$50,000',
      startDate: Date.now(),
      endDate: Date.now() + 90 * 24 * 60 * 60 * 1000,
      availableSlots: 50,
      languageRequirement: 'English',
      gpaRequirement: 3.5,
      providerProfileVo: {
        id: 1,
        userId: '1',
        organizationName: 'Global Education Foundation',
        organizationType: 'Foundation',
        website: 'https://example.com',
        email: 'info@gef.org',
        phone: '+1-234-567-8900',
        logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        bannerUrl: '',
        addressSummary: 'New York, USA',
        description: 'Supporting global education',
        yearEstablished: 2010,
        accreditation: 'Accredited',
        specialization: 'Education',
        verified: true,
        country: 'United States',
        providerContactDtos: [],
        isFollow: 0,
      },
      scholarshipPreferences: [],
      scholarshipMedias: [],
      isFollow: 0,
    },
  },
  {
    id: 2,
    title: 'How to Write a Winning Scholarship Essay',
    content: `Writing a compelling scholarship essay is one of the most critical components of your application. This article provides expert tips and strategies to help you craft essays that stand out to selection committees.

We'll cover essential elements including how to tell your unique story, demonstrate your passion and commitment, and align your goals with the scholarship's mission. You'll learn about common mistakes to avoid and discover techniques for making your essay memorable and impactful.

Additionally, we'll share real examples of successful scholarship essays and provide templates that you can adapt for your own applications. Remember, authenticity and personal connection are key - your essay should reflect who you are and why you're the ideal candidate for this opportunity.`,
    imgUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
    link: '/news/winning-scholarship-essay',
    scholarship: {
      id: 102,
      providerId: 2,
      title: 'Academic Writing Excellence Award',
      slug: 'academic-writing-excellence-award',
      shortDescription: 'Recognition and funding for exceptional academic writing',
      description: 'Award for students demonstrating outstanding writing skills',
      requirements: 'Essay submission, minimum GPA 3.0',
      benefits: '$5,000 award and publication opportunity',
      fields: 'All fields',
      country: 'United Kingdom',
      university: 'Academic Excellence Society',
      studyLevel: 'Undergraduate, Graduate',
      scholarshipType: 'Merit-based',
      fundingAmount: '$5,000',
      startDate: Date.now(),
      endDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
      availableSlots: 20,
      languageRequirement: 'English',
      gpaRequirement: 3.0,
      providerProfileVo: {
        id: 2,
        userId: '2',
        organizationName: 'Academic Excellence Society',
        organizationType: 'Society',
        website: 'https://example.com',
        email: 'contact@aes.org',
        phone: '+44-20-1234-5678',
        logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        bannerUrl: '',
        addressSummary: 'London, UK',
        description: 'Promoting academic excellence',
        yearEstablished: 2005,
        accreditation: 'Accredited',
        specialization: 'Education',
        verified: true,
        country: 'United Kingdom',
        providerContactDtos: [],
        isFollow: 0,
      },
      scholarshipPreferences: [],
      scholarshipMedias: [],
      isFollow: 0,
    },
  },
  {
    id: 3,
    title: 'STEM Scholarships: Your Path to Innovation',
    content: `Science, Technology, Engineering, and Mathematics (STEM) fields are at the forefront of innovation and offer numerous scholarship opportunities for dedicated students. This guide explores the various STEM scholarships available and how to position yourself as a strong candidate.

From research grants to industry-sponsored programs, STEM scholarships often come with additional benefits like mentorship opportunities, internships, and networking events. We'll discuss how to highlight your technical skills, research experience, and innovative projects in your applications.

The demand for STEM professionals continues to grow, making these scholarships highly competitive but also incredibly valuable. Learn about specialized programs in areas like artificial intelligence, renewable energy, biotechnology, and more.`,
    imgUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    link: '/news/stem-scholarships-innovation',
  },
  {
    id: 4,
    title: 'Understanding Scholarship Deadlines and Timeline',
    content: `Effective scholarship application management requires careful planning and organization. This article breaks down how to create a comprehensive timeline that ensures you never miss important deadlines.

We'll cover strategies for tracking multiple applications, prioritizing opportunities based on deadlines and fit, and managing the various requirements each scholarship demands. You'll learn about early application benefits, rolling admissions, and how to handle last-minute opportunities.

Time management is crucial - we'll provide tools and techniques to help you stay organized throughout the application season. From creating a master calendar to setting up reminders, you'll have everything you need to submit strong applications on time.`,
    imgUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
    link: '/news/scholarship-deadlines-timeline',
  },
  {
    id: 5,
    title: 'Merit vs Need-Based Scholarships: What You Need to Know',
    content: `Understanding the difference between merit-based and need-based scholarships is essential for identifying the right opportunities for your situation. This comprehensive guide explains both types and how to approach each application strategically.

Merit-based scholarships reward academic achievement, talents, and accomplishments, while need-based scholarships consider your financial situation. We'll help you determine which type aligns best with your profile and how to maximize your chances for both.

Many students qualify for both types, and applying to a mix can significantly increase your funding opportunities. Learn about the documentation required for each, how to demonstrate need effectively, and how to showcase your merits compellingly.`,
    imgUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    link: '/news/merit-vs-need-based-scholarships',
  },
];

