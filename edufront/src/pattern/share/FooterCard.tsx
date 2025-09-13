import { Anchor, Card } from '@/lib/by/Div'
import Image from 'next/image'
import React from 'react'
import heart from '@/assets/icon/heart.svg';
import trophy from '@/assets/icon/trophy.svg';
import { Button } from '@/lib/cus/button';

const FooterCard = ({onClick, titleButton} : {onClick: () => void, titleButton: string}) => {
  return (
   <Anchor className="flex gap-[40px] justify-between p-[20px] w-full mt-auto border-t border-[#eee]">
        <Card className="flex-1 flex justify-around">
          <Image src={heart} alt="heart" width={24} height={24} />
          <Image src={trophy} alt="trophy" width={24} height={24} />
        </Card>
        <Card className="flex-1">
          <Button className='p-6 w-full' onClick={onClick}>{titleButton}</Button>
        </Card>
      </Anchor>
  )
}

export default FooterCard