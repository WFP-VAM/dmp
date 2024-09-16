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
    backgroundColor: 'white',
    border: `6px solid ${colors.color6}`,
    borderRadius: '12px',
    color: colors.color6,
    position: 'absolute' as const,
    top: '50%',
    zIndex: 1,
    opacity: hovering ? 0.9 : 1,
    cursor: 'pointer',
    transition: '0.4s',
    '@media print': {
      display: 'none',
    },
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
            outerRef.current?.scrollTo({
              left: scrollWidth,
              behavior: 'smooth',
            })
          }
          fontSize="large"
          sx={{ ...arrowStyles, right: '3rem' }}
        />
      )}
      {scrollLeft > 0 && (
        <ArrowLeft
          onClick={() =>
            outerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
          }
          fontSize="large"
          sx={{ ...arrowStyles, left: '3rem' }}
        />
      )}
    </>
  );
};

export default ScrollArrows;
