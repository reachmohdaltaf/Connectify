import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';

const PremiumProfileCard = ({user}) => {
  return (
    <Card className="w-80 shadow-none rounded-xl sticky top-20 mx-auto    border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Hi, {user.name} Unlock Your Full Potential
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">
          Upgrade to a premium profile and access exclusive features to enhance your experience.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className='border-yellow-500'>
          Try for Free
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumProfileCard;
