import { Caption } from '@/components/Typography/Caption';
import { Subheadline } from '@/components/Typography/Subheadline';
import { TypographyProps } from '@/components/Typography/Typography';
import { usePlatform } from '@/hooks/usePlatform';

export interface DescriptionTypographyProps
  extends Omit<TypographyProps, 'level'> {}

export const DescriptionTypography = (props: DescriptionTypographyProps) => {
  const platform = usePlatform();

  if (platform === 'ios') {
    return <Caption level="1" {...props} />;
  }

  return <Subheadline level="2" {...props} />;
};
