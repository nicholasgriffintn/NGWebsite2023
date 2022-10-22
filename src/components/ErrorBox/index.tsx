import { PropsWithChildren, useEffect, useState } from 'react';

import ResponsiveImage from '@src/components/ResponsiveImage';
import AdjustableLink from '@src/components/AdjustableLink';

export interface Props {
  statusCode?: string;
}

const ErrorBox = ({ statusCode = '500' }: PropsWithChildren<Props>) => {
  const [failImage, setFailImage] = useState(null);
  const [failImageWidth, setFailImageWidth] = useState(null);
  const [failImageHeight, setFailImageHeight] = useState(null);
  const [failData, setFailData] = useState<{
    url?: string;
    title?: string;
    user?: {
      display_name: string;
      profile_url: string;
    };
  }>({});

  useEffect(() => {
    const giphy = {
      baseURL: 'https://api.giphy.com/v1/gifs/',
      apiKey: '0UTRbFtkMxAplrohufYco5IY74U8hOes',
      tag: statusCode === '404' ? 'lost' : 'burning',
      type: 'random',
      rating: 'pg-13',
    };

    const giphyURL = encodeURI(
      `${giphy.baseURL + giphy.type}?api_key=${giphy.apiKey}&tag=${giphy.tag}&rating=${
        giphy.rating
      }`
    );

    fetch(giphyURL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setFailData(data.data);
          if (data.data.images && data.data.images.downsized_large) {
            setFailImage(data.data.images.downsized_large.url);
            setFailImageWidth(data.data.images.downsized_large.width);
            setFailImageHeight(data.data.images.downsized_large.height);
          } else if (data.data.image_original_url) {
            setFailImage(data.data.image_original_url);
            setFailImageWidth(data.data.images.image_original_url.width);
            setFailImageHeight(data.data.images.image_original_url.height);
          }
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [statusCode]);

  return (
    <>
      {failImage ? (
        <div className="ng-text-center">
          <ResponsiveImage
            src={failImage}
            width={failImageWidth}
            height={failImageHeight}
            alt="Everything is fine..."
            imageClassname="ng-mx-auto"
          />
        </div>
      ) : null}
      <br></br>
      {failData?.url ? (
        <div className="ng-text-primary ng-text-center">
          <small className="ng-text-center ng-min-w-[480px] ng-mx-auto">
            {failData.title} was retrieved from{' '}
            <AdjustableLink href={failData.url}>GIPHY</AdjustableLink>{' '}
            {failData.user ? (
              <>
                and was uploaded by{' '}
                <AdjustableLink href={failData.user.profile_url}>
                  {failData.user.display_name}
                </AdjustableLink>
              </>
            ) : null}
          </small>
        </div>
      ) : null}
    </>
  );
};

export default ErrorBox;
