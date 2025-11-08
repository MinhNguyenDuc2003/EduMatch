import React from 'react';

const Header = ({
  subtitle,
  title,
  rightElement,
}: {
  subtitle: string;
  title: string;
  rightElement?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default Header;
