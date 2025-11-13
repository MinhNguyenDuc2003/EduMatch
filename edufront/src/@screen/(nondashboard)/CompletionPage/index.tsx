import { Check } from 'lucide-react';
import React from 'react';

const CompletionPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center ">
      <div className="text-center">
        <div className="mb-4 rounded-full bg-green-500 p-3 inline-flex items-center justify-center">
          <Check className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">COMPLETED</h1>
        <p className="mb-1">🎉 You have purchased the subscription plan successfully! 🎉</p>
      </div>
      {/* <div className="completion__support">
    <p>
      Need help? Contact our{" "}
      <Button variant="link" asChild className="p-0 m-0 text-primary-700">
        <a href="mailto:support@example.com">customer support</a>
      </Button>
      .
    </p>
  </div> */}
      {/* <div className="completion__action">
    <Link href="user/courses" scroll={false}>
      Go to Course
    </Link>
  </div> */}
    </div>
  );
};

export default CompletionPage;
