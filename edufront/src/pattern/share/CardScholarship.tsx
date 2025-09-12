import { Anchor, Block, Card, Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

type CardScholarshipProps = {
  className?: string;
  headerClassName?: string;
  content1ClassName?: string;
  content2ClassName?: string;
  footerClassName?: string;
  header?: React.ReactNode;
  content1?: React.ReactNode;
  content2?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  titleButton?: React.ReactNode;
};

export default function CardScholarship({
  className,
  header,
  content1,
  content2,
  footer,
  headerClassName,
  content1ClassName,
  content2ClassName,
  footerClassName,
  onClick,
  titleButton,
  icon,
}: CardScholarshipProps) {
  const router = useRouter();
  return (
    <Section className={cn('p-20 bg-[#FAFAF6] flex flex-col gap-10', className)} onClick={onClick}>
      <Anchor className={cn('flex gap-10')}>
        <Block className={cn('p-10', headerClassName)}>{header}</Block>
        <Block className={cn('p-10', content1ClassName)}>{content1}</Block>
        <Block className={cn('p-10', content2ClassName)}>{content2}</Block>
      </Anchor>

      <Anchor className={cn('flex gap-40', footerClassName)}>
        <Block>
          {icon && <Card>{icon}</Card>}
          <Card>
            <Button onClick={() => onClick}>{titleButton}</Button>
          </Card>
        </Block>
      </Anchor>
    </Section>
  );
}
