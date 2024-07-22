import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { colors } from 'theme/muiTheme';

interface ScrollArrowsProps {
  hasOverflow: boolean;
  hovering: boolean;
  scrollWidth: number | undefined;
  offsetWidth: number | undefined;
  scrollLeft: number | undefined;
  outerRef: React.RefObject<HTMLDivElement>;
}

const ScrollArrows = ({
  hasOverflow,
  hovering,
  scrollWidth,
  offsetWidth,
  scrollLeft,
  outerRef,
}: ScrollArrowsProps) => {
  const arrowStyles = {
    border: `6px solid ${colors.color5}`,
    borderRadius: '12px',
    color: colors.color5,
    position: 'absolute' as const,
    top: '50%',
    zIndex: 1,
    opacity: hovering ? 0 : 0.7,
    transition: '0.4s',
  };

  if (
    !hasOverflow ||
    offsetWidth === undefined ||
    scrollLeft === undefined ||
    scrollWidth === undefined
  )
    return null;

  return (
    <>
      {offsetWidth + scrollLeft < scrollWidth && (
        <ArrowRight
          onClick={() =>
            outerRef.current?.scrollBy({ left: 150, behavior: 'smooth' })
          }
          fontSize="large"
          style={{ ...arrowStyles, right: '3rem' }}
        />
      )}
      {scrollLeft > 0 && (
        <ArrowLeft
          onClick={() =>
            outerRef.current?.scrollBy({ left: -150, behavior: 'smooth' })
          }
          fontSize="large"
          style={{ ...arrowStyles, left: '3rem' }}
        />
      )}
    </>
  );
};

export default ScrollArrows;
