import ReturnImageFormattingUrl from '@src/utils/returnImageFormattingUrl';
import Image from 'next/future/image';

const ResponsiveImage = (props) => {
  const { src, alt, height, width, imageClassname } = props;

  return (
    <div
      className={`ng-text-center ng-mx-auto ng-relative ${
        height ? `ng-min-h-[${height}px]` : 'ng-min-h-[450px]'
      } ${width ? `ng-min-w-[${width}px]` : 'ng-min-w-fit'} ng-mb-4`}
    >
      {width && height ? (
        <Image
          alt={alt}
          src={ReturnImageFormattingUrl(src)}
          width={width}
          height={height}
          className={imageClassname}
          quality={80}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${ReturnImageFormattingUrl(src)}&w=16&q=1`}
        />
      ) : (
        <Image
          alt={alt}
          src={ReturnImageFormattingUrl(src)}
          className={imageClassname}
          sizes="100vw"
          fill
          quality={80}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${ReturnImageFormattingUrl(src)}&w=16&q=1`}
        />
      )}
    </div>
  );
};

export default ResponsiveImage;
