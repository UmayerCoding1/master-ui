import GridCard from '@/components/card/grid-card';
import GridBoxLayout from '@/components/grid-box-layout';
import GridLayout from '@/components/grid-layout';
import SkillsArcAnimation from '@/components/SkillsArcAnimation';


import PathDrawing from '@/components/svg-path-animation';
import { Text } from '@/components/text';
import React from 'react';

const page = () => {
  return (
    <>
      {/* <GridLayout/> */}
      {/* <GridBoxLayout/> */}
      {/* <GridCard/> */}
      {/* <PathDrawing/> */}
      <SkillsArcAnimation />
      <Text />
    </>
  );
};

export default page;