import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface CommodityImageCarouselProps {
  images?: string[];
}

export const CommodityImageCarousel = ({ images }: CommodityImageCarouselProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full bg-muted">
        <div className="aspect-video w-full">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-muted">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video w-full">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};