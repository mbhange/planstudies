// Mock for swiper/react
export const Swiper = ({ children, autoplay, onSlideChange, ...props }) => {
  // Filter out swiper-specific props that are not valid DOM attributes
  const validProps = { ...props };
  delete validProps.autoplay;
  delete validProps.onSlideChange;
  delete validProps.pagination;
  delete validProps.navigation;
  delete validProps.modules;
  delete validProps.spaceBetween;
  delete validProps.slidesPerView;
  delete validProps.loop;
  delete validProps.centeredSlides;
  delete validProps.coverflowEffect;
  delete validProps.grabCursor;
  delete validProps.effect;
  
  return (
    <div data-testid="swiper" {...validProps}>
      {children}
    </div>
  );
};

export const SwiperSlide = ({ children, ...props }) => (
  <div data-testid="swiper-slide" {...props}>
    {children}
  </div>
);
